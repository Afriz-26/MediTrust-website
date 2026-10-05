import type { InitProgressReport, MLCEngineInterface } from '@mlc-ai/web-llm';

const MODEL_ID = 'Qwen3-0.6B-q4f16_1-MLC';

type OnDeviceMessage = {
  role: 'assistant' | 'user';
  content: string;
};

type ProgressHandler = (report: InitProgressReport) => void;

let enginePromise: Promise<MLCEngineInterface> | undefined;
let modelWorker: Worker | undefined;

function visibleAssistantText(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>\s*/gi, '')
    .replace(/<think>[\s\S]*$/i, '')
    .trimStart();
}

function loadEngine(onProgress: ProgressHandler): Promise<MLCEngineInterface> {
  if (enginePromise) return enginePromise;

  const worker = new Worker(new URL('./onDeviceAssistant.worker.ts', import.meta.url), {
    type: 'module',
  });
  modelWorker = worker;
  enginePromise = import('@mlc-ai/web-llm')
    .then(({ CreateWebWorkerMLCEngine }) =>
      CreateWebWorkerMLCEngine(worker, MODEL_ID, { initProgressCallback: onProgress }),
    )
    .catch((error: unknown) => {
      worker.terminate();
      if (modelWorker === worker) {
        modelWorker = undefined;
        enginePromise = undefined;
      }
      throw error;
    });

  return enginePromise;
}

function waitForEngine(
  onProgress: ProgressHandler,
  signal: AbortSignal,
): Promise<MLCEngineInterface> {
  if (signal.aborted) {
    return Promise.reject(new DOMException('Request cancelled.', 'AbortError'));
  }

  const pendingEngine = loadEngine(onProgress);
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(new DOMException('Request cancelled.', 'AbortError'));
    signal.addEventListener('abort', onAbort, { once: true });

    pendingEngine.then(resolve, reject).finally(() => {
      signal.removeEventListener('abort', onAbort);
    });
  });
}

export async function streamOnDeviceAssistantReply(options: {
  query: string;
  history: OnDeviceMessage[];
  language: string;
  signal: AbortSignal;
  onProgress: ProgressHandler;
  onText: (text: string) => void;
}): Promise<string> {
  if (!('gpu' in navigator) || !navigator.gpu) {
    throw new Error('This browser does not support WebGPU, which the on-device assistant needs.');
  }

  const engine = await waitForEngine(options.onProgress, options.signal);
  if (options.signal.aborted) {
    throw new DOMException('Request cancelled.', 'AbortError');
  }

  const language = options.language || 'English';
  const messages = [
    {
      role: 'system' as const,
      content: `You are MediTrust's on-device healthcare information assistant. Reply in ${language}. You are not a clinician and must not diagnose, prescribe medicines, or give individualized doses. Give brief, general educational information, clearly state uncertainty, and recommend a qualified clinician or pharmacist for personal decisions. For an uncomplicated mild headache, suggest only rest in a quiet place, water if the person may be dehydrated, and a cool compress; do not suggest exercise, medication, or unsupported dietary restrictions. Do not invent local doctors, hospitals, prices, opening hours, queue status, or live search results; explain that this chat has no live web or maps access and direct users to MediTrust's doctor and pharmacy search pages. For potentially urgent symptoms such as trouble breathing, chest pain, fainting, severe bleeding, sudden severe headache, sudden weakness, or confusion, advise immediate emergency care. MediTrust serves India: if giving an emergency number, say 112; never say 911. If the person's country is unclear or outside India, say to contact local emergency services without guessing a number. Ask one concise follow-up question when essential details are missing.`,
    },
    ...options.history.slice(-8),
    { role: 'user' as const, content: options.query },
  ];

  const onAbort = () => engine.interruptGenerate();
  options.signal.addEventListener('abort', onAbort, { once: true });

  let response = '';
  try {
    const stream = await engine.chat.completions.create({
      messages,
      stream: true,
      temperature: 0.3,
      max_tokens: 240,
      extra_body: { enable_thinking: false },
    });

    for await (const chunk of stream) {
      if (options.signal.aborted) break;
      const text = chunk.choices[0]?.delta?.content;
      if (typeof text === 'string' && text) {
        response += text;
        options.onText(visibleAssistantText(response));
      }
    }
    if (options.signal.aborted) {
      throw new DOMException('Request cancelled.', 'AbortError');
    }
    return visibleAssistantText(response);
  } catch (error) {
    if (options.signal.aborted) {
      throw new DOMException('Request cancelled.', 'AbortError');
    }
    throw error;
  } finally {
    options.signal.removeEventListener('abort', onAbort);
  }
}
