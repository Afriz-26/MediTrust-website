import { GoogleGenAI } from '@google/genai';
import { withRetry } from '../utils/retry';
import { cleanBase64Data, sanitizeMimeType } from '../utils/base64';

export interface VoiceTriageResult {
  transcript: string;
  responseText: string;
  audioWavBase64?: string;
  language: string;
  disclaimer: string;
}

export class VoiceService {
  private static aiClient: GoogleGenAI | null = null;

  private static PLACEHOLDER_API_KEYS = [
    'MY_GEMINI_API_KEY',
    'your_gemini_api_key_here',
    'your-gemini-api-key',
    'YOUR_API_KEY',
    'REPLACE_WITH_YOUR_KEY',
    'your-supabase-anon-key',
  ];

  private static getAiClient(): GoogleGenAI | null {
    if (!this.aiClient) {
      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('GEMINI_API_KEY environment variable is missing. Voice features will use fallback mode.');
        return null;
      }
      const isPlaceholder = this.PLACEHOLDER_API_KEYS.some(p => apiKey.includes(p)) || apiKey === '';
      if (isPlaceholder) {
        console.warn('GEMINI_API_KEY is set to a placeholder or empty value. Voice features will use fallback mode.');
        return null;
      }
      this.aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
    return this.aiClient;
  }

  /**
   * Helper to prepend a 44-byte standard RIFF/WAVE header to raw 16-bit PCM buffer.
   */
  public static pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000, numChannels: number = 1, bitsPerSample: number = 16): Buffer {
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = pcmBuffer.length;
    const header = Buffer.alloc(44);

    header.write('RIFF', 0);
    header.writeUInt32LE(36 + dataSize, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20); // PCM format
    header.writeUInt16LE(numChannels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write('data', 36);
    header.writeUInt32LE(dataSize, 40);

    return Buffer.concat([header, pcmBuffer]);
  }

  /**
   * Generates natural neural speech audio for given text using Gemini native TTS.
   */
  public static async generateSpeechAudio(
    text: string,
    voiceName: string = 'Aoede'
  ): Promise<{ audioBase64: string; mimeType: string }> {
    const ai = this.getAiClient();

    // If no valid API key, return empty audio (browser Web Speech API fallback)
    if (!ai) {
      console.warn('[Gemini TTS] No valid API key. Returning empty audio (Web Speech API fallback will be used).');
      return {
        audioBase64: '',
        mimeType: 'audio/wav'
      };
    }

    // Clean markdown symbols for cleaner pronunciation
    const spokenText = text
      .replace(/[*#_`~[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    try {
      const response: any = await withRetry(async () => {
        return await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: spokenText,
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName
                }
              }
            }
          }
        });
      }, {
        maxRetries: 1,
        initialDelayMs: 400
      });

      const candidatePart = response.candidates?.[0]?.content?.parts?.[0];
      const rawPcmBase64 = candidatePart?.inlineData?.data;

      if (!rawPcmBase64) {
        throw new Error('Gemini TTS did not return audio data.');
      }

      const pcmBuffer = Buffer.from(rawPcmBase64, 'base64');
      const wavBuffer = this.pcmToWav(pcmBuffer, 24000, 1, 16);
      const audioWavBase64 = wavBuffer.toString('base64');

      return {
        audioBase64: audioWavBase64,
        mimeType: 'audio/wav'
      };
    } catch (err: any) {
      console.warn('[Gemini TTS] Speech audio generation unavailable (browser Web Speech API fallback will be used):', err?.message || err);
      return {
        audioBase64: '',
        mimeType: 'audio/wav'
      };
    }
  }

  /**
   * Processes multimodal voice input directly with Gemini:
   * 1. Transcribes what the user said
   * 2. Formulates empathetic clinical triage guidance with healthcare guardrails
   * 3. Optionally synthesizes neural speech audio
   */
  public static async processVoiceQuery(
    audioBase64?: string,
    mimeType: string = 'audio/webm',
    language: string = 'English',
    voiceName: string = 'Aoede',
    fallbackTextQuery?: string
  ): Promise<VoiceTriageResult> {
    const ai = this.getAiClient();

    // If no valid API key, return a fallback voice response
    if (!ai) {
      console.warn('[VoiceService] No valid API key. Returning offline fallback voice response.');
      return {
        transcript: fallbackTextQuery || 'Voice consultation request received',
        responseText: `Hello! I'm MediTrust AI Voice Assistant. I heard your query about "${fallbackTextQuery || 'healthcare'}". For immediate assistance, please switch to text chat mode or type your question directly. Remember to consult a licensed doctor for any medical concerns.`,
        language,
        disclaimer: 'MediTrust AI provides health guidance, not medical diagnosis. Please consult a licensed doctor for personalized care.',
      };
    }

    const systemPrompt = `You are MediTrust Voice Clinical & Healthcare Assistant, developed by Medynex Solutions LLP.
You are assisting a patient through spoken voice in ${language}.

Core Mandates & Communication Rules:
1. Warm Greetings & Politeness: Always warmly and politely respond to EVERY greeting (such as "Hello", "Hi", "Good morning", "Good evening", "Namaste", "Namaskara", "Vanakkam", "Adab", "How are you?", etc.). Never dismiss or give robotic refusal to greetings.
2. Comprehensive Answers: Answer EACH and EVERY question the patient asks — whether it is a symptom check, fever/cold advice, doctor search, hospital OPD queue token question, prescription query, medicine use/side-effects, appointment booking, or general healthcare guidance.
3. Empathetic Clinical Voice: Provide clear, calming, evidence-based guidance in natural conversational spoken language.
4. Patient Safety: For medical symptoms, offer safe home self-care (hydration, rest, fever monitoring) and identify red flags. Remind them gently to visit a licensed doctor for formal clinical diagnosis and prescriptions.
5. Multilingual Mastery: Respond entirely in the user's selected language (${language}) using natural, easy-to-understand phrasing.
6. JSON Schema: You MUST respond ONLY in valid JSON matching this exact structure:
{
  "transcript": "Accurate transcription of the user's spoken voice query or message in ${language}",
  "responseText": "Your complete, empathetic, conversational spoken response (around 60-120 words for pleasant voice listening)",
  "disclaimer": "MediTrust AI provides health guidance, not a medical diagnosis. Please consult a licensed doctor for personalized care."
}
`;


    const cleanBase64 = cleanBase64Data(audioBase64);
    const cleanMime = sanitizeMimeType(mimeType, 'audio/webm');

    let contents: any[] = [];
    if (cleanBase64 && cleanBase64.length > 50) {
      contents = [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: cleanMime
          }
        },
        { text: systemPrompt }
      ];
    } else if (fallbackTextQuery) {
      contents = [
        { text: `User Spoken/Transcribed Query: "${fallbackTextQuery}"\n\n${systemPrompt}` }
      ];
    } else {
      throw new Error('No audio or transcribed text provided for voice query.');
    }

    const response: any = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents,
        config: {
          responseMimeType: 'application/json'
        }
      });
    }, {
      maxRetries: 2,
      initialDelayMs: 600
    });

    const textOutput = response.text || '{}';
    let parsed: any = {};
    try {
      parsed = JSON.parse(textOutput);
    } catch {
      parsed = {
        transcript: fallbackTextQuery || 'Spoken health consultation',
        responseText: textOutput,
        disclaimer: 'MediTrust AI provides healthcare guidance, not formal diagnosis. Consult a doctor for personal care.'
      };
    }

    const transcript = parsed.transcript || fallbackTextQuery || 'Spoken query received';
    const responseText = parsed.responseText || 'I heard your request. Please consult a healthcare professional for clinical advice.';
    const disclaimer = parsed.disclaimer || 'MediTrust AI provides health guidance, not medical diagnosis.';

    // Generate neural spoken audio for the response
    let audioWavBase64: string | undefined = undefined;
    try {
      const speech = await this.generateSpeechAudio(`${responseText} ${disclaimer}`, voiceName);
      audioWavBase64 = speech.audioBase64;
    } catch (ttsErr: any) {
      console.warn('[VoiceService] TTS generation fallback:', ttsErr?.message);
    }

    return {
      transcript,
      responseText,
      audioWavBase64,
      language,
      disclaimer
    };
  }
}
