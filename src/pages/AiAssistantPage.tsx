import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Mic, 
  MicOff,
  Send, 
  Sparkles, 
  Globe, 
  MapPin, 
  Search, 
  Brain, 
  Camera, 
  Upload, 
  Pill, 
  RefreshCw, 
  Copy, 
  Check, 
  Square, 
  AlertCircle, 
  AlertTriangle,
  RotateCcw, 
  MessageSquare, 
  User, 
  Volume2, 
  X, 
  ChevronRight, 
  HeartHandshake,
  Radio,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { AI_KEYWORDS } from '../lib/seo';
import { useAuth } from '../context/AuthContext';
import { VoiceModal } from '../components/assistant/VoiceModal';


interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  groundingChunks?: Array<{ web?: { uri: string; title: string }; maps?: { uri: string; title: string } }>;
  thinkingUsed?: boolean;
  isError?: boolean;
}

interface SkinAnalysis {
  skinTypeEstimated: string;
  observation: string;
  recommendations: string[];
  suggestedSpecialty: string;
  urgencyLevel?: string;
}

interface MedicineDetail {
  name: string;
  uses: string;
  dosage: string;
  warnings: string;
  sideEffects: string;
  manufacturer?: string;
  verificationBadge?: string;
}

// Typing indicator component for humanized streaming pauses
const TypingIndicator: React.FC<{ thinkingMode?: boolean; language?: string }> = ({ thinkingMode, language }) => {
  const [stageIndex, setStageIndex] = useState(0);

  const stages = thinkingMode
    ? [
        'Analyzing clinical history & query parameters...',
        'Consulting internal medical knowledge base...',
        'Synthesizing diagnostic reasoning & safety guidelines...',
        `Formulating response in ${language || 'English'}...`
      ]
    : [
        'MediTrust AI is formulating response...',
        'Evaluating healthcare context...',
        `Drafting advice in ${language || 'English'}...`
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="py-2 px-1 space-y-2.5">
      <div className="flex items-center space-x-3">
        {/* Animated Bouncing Dots */}
        <div className="flex items-center space-x-1.5 p-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -6, 0],
                scale: [0.85, 1.2, 0.85],
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 0.75,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400 shadow-sm shadow-cyan-400/60"
            />
          ))}
        </div>

        {/* Dynamic Human-like Pause Text */}
        <div className="flex items-center space-x-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={stageIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-mono text-cyan-300 font-semibold tracking-wide"
            >
              {stages[stageIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full bg-slate-800/60 h-1 rounded-full overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>
    </div>
  );
};

export const AiAssistantPage: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'chat' | 'skin' | 'medicine'>('chat');
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const chatInputRef = useRef<HTMLInputElement | null>(null);

  // Chat State
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [inputQuery, setInputQuery] = useState('');
  const [enableSearch, setEnableSearch] = useState(false);
  const [enableMaps, setEnableMaps] = useState(true);
  const [thinkingMode, setThinkingMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // AbortController for Stop Generation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll ref
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Voice Assistant State
  const [isRecording, setIsRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Skin Scanner State
  const [skinImage, setSkinImage] = useState<string | null>(null);
  const [skinNotes, setSkinNotes] = useState('');
  const [skinAnalyzing, setSkinAnalyzing] = useState(false);
  const [skinResult, setSkinResult] = useState<SkinAnalysis | null>(null);

  // Medicine Verification State
  const [medQuery, setMedQuery] = useState('');
  const [medImage, setMedImage] = useState<string | null>(null);
  const [medVerifying, setMedVerifying] = useState(false);
  const [medResult, setMedResult] = useState<MedicineDetail | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const greetingName = user?.name ? ` ${user.name}` : '';
    setMessages([
      {
        id: 'm-1',
        sender: 'ai',
        text: `Hello${greetingName}! I am your **MediTrust AI Healthcare Assistant** by Medynex Solutions LLP. Powered by Gemini models, I can help you with:\n\n- **Symptom Triage & Clinical Guidance**\n- **Grounded Doctor & Hospital Discovery** in Tirupati, Hyderabad, etc.\n- **Medicine Uses, Dosages & Contraindications**\n- **Digital Token & Hospital Queue Guidance**\n\nHow can I assist you today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [user?.name]);

  const languages = [
    'English',
    'Hindi (हिंदी)',
    'Telugu (తెలుగు)',
    'Tamil (தமிழ்)',
    'Kannada (ಕನ್ನಡ)',
    'Malayalam (മലയാളം)',
    'Marathi (मराठी)',
    'Bengali (বাংলা)',
    'Gujarati (ગુજરાતી)',
    'Punjabi (ਪੰਜਾਬੀ)',
    'Urdu (اردو)'
  ];

  const quickPrompts = [
    'Find offline cardiologists near Tirupati OPD',
    'Uses and side effects of Telmisartan 40mg',
    'I have mild fever and sore throat for 2 days',
    'How do I track my live hospital queue token?'
  ];

  // Multimodal Scan sub-mode state
  const [scanType, setScanType] = useState<'medicine' | 'prescription' | 'skin' | 'lab_report'>('medicine');
  const [imageNotes, setImageNotes] = useState('');
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [scanAnalysisResult, setScanAnalysisResult] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const activeAudioElemRef = useRef<HTMLAudioElement | null>(null);

  // Web Speech API Dictation & Microphone Permission Management
  const [isDictating, setIsDictating] = useState(false);
  const [dictationInterim, setDictationInterim] = useState('');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt' | 'unsupported' | 'unknown'>('unknown');
  const [speechAlert, setSpeechAlert] = useState<{
    type: 'error' | 'warning' | 'info';
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null>(null);
  const dictationRecognitionRef = useRef<any>(null);

  // Map selected language to BCP-47 tag for Web Speech Recognition
  const getSpeechLanguageTag = (lang: string): string => {
    const l = lang.toLowerCase();
    if (l.includes('telugu')) return 'te-IN';
    if (l.includes('hindi')) return 'hi-IN';
    if (l.includes('tamil')) return 'ta-IN';
    if (l.includes('kannada')) return 'kn-IN';
    if (l.includes('malayalam')) return 'ml-IN';
    if (l.includes('bengali')) return 'bn-IN';
    if (l.includes('marathi')) return 'mr-IN';
    if (l.includes('gujarati')) return 'gu-IN';
    if (l.includes('punjabi')) return 'pa-IN';
    if (l.includes('urdu')) return 'ur-PK';
    return 'en-IN';
  };

  // Monitor microphone permission state
  useEffect(() => {
    const checkPermissionState = async () => {
      if (typeof navigator !== 'undefined' && navigator.permissions) {
        try {
          const status = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          setMicPermission(status.state as any);
          status.onchange = () => {
            setMicPermission(status.state as any);
            if (status.state === 'granted') {
              setSpeechAlert(null);
            }
          };
        } catch (e) {
          // Permissions API for microphone might not be supported on all browsers
          setMicPermission('unknown');
        }
      }
    };
    checkPermissionState();
  }, []);

  // Stop inline speech dictation
  const stopDictation = useCallback(() => {
    if (dictationRecognitionRef.current) {
      try {
        dictationRecognitionRef.current.stop();
      } catch (e) {}
      dictationRecognitionRef.current = null;
    }
    setIsDictating(false);
    setDictationInterim('');
  }, []);

  // Toggle inline speech dictation
  const toggleDictation = async () => {
    if (isDictating) {
      stopDictation();
      return;
    }

    setSpeechAlert(null);

    // 1. Check if browser supports Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicPermission('unsupported');
      setSpeechAlert({
        type: 'warning',
        title: 'Speech Recognition Unavailable',
        message: 'Your current browser does not natively support the Web Speech API. You can open the Neural Voice Assistant or type your question.',
        actionLabel: 'Open Voice Assistant',
        onAction: () => setIsVoiceModalOpen(true)
      });
      return;
    }

    // 2. Check for microphone availability
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasAudioInput = devices.some(d => d.kind === 'audioinput');
        if (!hasAudioInput && devices.length > 0) {
          setSpeechAlert({
            type: 'error',
            title: 'No Microphone Detected',
            message: 'No active microphone found on your device. Please plug in a microphone or headset and try again.'
          });
          return;
        }
      } catch (devErr) {
        console.warn('Microphone device check skipped:', devErr);
      }
    }

    // 3. Initiate Speech Recognition
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getSpeechLanguageTag(selectedLanguage);

      recognition.onstart = () => {
        setIsDictating(true);
        setMicPermission('granted');
      };

      recognition.onresult = (event: any) => {
        let interimStr = '';
        let finalStr = '';

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            finalStr += res[0].transcript + ' ';
          } else {
            interimStr += res[0].transcript;
          }
        }

        const combined = (finalStr + interimStr).trim();
        if (combined) {
          setDictationInterim(interimStr);
          setInputQuery(combined);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[Dictation SpeechRecognition error]', event.error);
        stopDictation();

        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setMicPermission('denied');
          setSpeechAlert({
            type: 'error',
            title: 'Microphone Permission Blocked',
            message: 'Microphone access was denied. Click the Lock 🔒 or Camera icon in your browser address bar and select "Allow" for Microphone, then try again.',
            actionLabel: 'Try Again',
            onAction: () => toggleDictation()
          });
        } else if (event.error === 'no-speech') {
          setSpeechAlert({
            type: 'info',
            title: 'No Speech Heard',
            message: 'No voice was detected. Tap the microphone and speak clearly.'
          });
        } else if (event.error === 'network') {
          setSpeechAlert({
            type: 'warning',
            title: 'Speech Network Spike',
            message: 'Speech recognition network connectivity was interrupted. You can type or use the Neural Voice Assistant.',
            actionLabel: 'Open Neural Voice',
            onAction: () => setIsVoiceModalOpen(true)
          });
        }
      };

      recognition.onend = () => {
        setIsDictating(false);
        setDictationInterim('');
      };

      recognition.start();
      dictationRecognitionRef.current = recognition;
    } catch (err: any) {
      console.error('Failed to start SpeechRecognition:', err);
      stopDictation();
      setSpeechAlert({
        type: 'error',
        title: 'Microphone Initialization Failed',
        message: err.message || 'Could not access audio recording service. Please check your browser permissions.'
      });
    }
  };


  // Text To Speech handler using Gemini Studio Neural TTS + Browser Fallback
  const handleSpeak = async (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      if (activeAudioElemRef.current) {
        activeAudioElemRef.current.pause();
        activeAudioElemRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingMsgId(null);
      return;
    }

    if (activeAudioElemRef.current) {
      activeAudioElemRef.current.pause();
      activeAudioElemRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setSpeakingMsgId(msgId);

    // 1. Try Gemini Studio Native TTS first
    try {
      const response = await fetchJSONWithRetryAndTimeout('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'Aoede' })
      });

      if (response?.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${response.audioBase64}`);
        activeAudioElemRef.current = audio;
        audio.onended = () => {
          setSpeakingMsgId(null);
          activeAudioElemRef.current = null;
        };
        audio.onerror = () => {
          fallbackSpeechSynthesis(msgId, text);
        };
        await audio.play();
        return;
      }
    } catch (ttsErr) {
      console.warn('Gemini TTS fallback to Web Speech:', ttsErr);
    }

    // 2. Fallback to browser synthesis
    fallbackSpeechSynthesis(msgId, text);
  };

  const fallbackSpeechSynthesis = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      setSpeakingMsgId(null);
      return;
    }
    const cleanText = text.replace(/[*_#`~-]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (selectedLanguage.includes('Telugu')) utterance.lang = 'te-IN';
    else if (selectedLanguage.includes('Hindi')) utterance.lang = 'hi-IN';
    else if (selectedLanguage.includes('Tamil')) utterance.lang = 'ta-IN';
    else if (selectedLanguage.includes('Kannada')) utterance.lang = 'kn-IN';
    else if (selectedLanguage.includes('Malayalam')) utterance.lang = 'ml-IN';
    else if (selectedLanguage.includes('Marathi')) utterance.lang = 'mr-IN';
    else if (selectedLanguage.includes('Bengali')) utterance.lang = 'bn-IN';
    else if (selectedLanguage.includes('Gujarati')) utterance.lang = 'gu-IN';
    else if (selectedLanguage.includes('Punjabi')) utterance.lang = 'pa-IN';
    else if (selectedLanguage.includes('Urdu')) utterance.lang = 'ur-PK';
    else utterance.lang = 'en-US';

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceConsultationToChat = (userSpeech: string, assistantReplyText: string) => {
    const userMsg: ChatMessage = {
      id: `voice-u-${Date.now()}`,
      sender: 'user',
      text: userSpeech,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const aiMsg: ChatMessage = {
      id: `voice-ai-${Date.now() + 1}`,
      sender: 'ai',
      text: assistantReplyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg, aiMsg]);
  };
  const STREAM_TIMEOUT_MS = 25000;

  const fetchStreamWithRetryAndTimeout = async (
    url: string,
    payload: any,
    onChunk: (text: string) => void,
    userSignal: AbortSignal
  ) => {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt <= maxRetries) {
      attempt++;
      let inactivityTimeoutId: any = null;
      const internalController = new AbortController();

      if (userSignal.aborted) {
        throw new Error('USER_ABORTED');
      }

      const onUserAbort = () => internalController.abort();
      userSignal.addEventListener('abort', onUserAbort);

      const resetInactivityTimer = () => {
        if (inactivityTimeoutId) clearTimeout(inactivityTimeoutId);
        inactivityTimeoutId = setTimeout(() => {
          internalController.abort();
        }, STREAM_TIMEOUT_MS);
      };

      try {
        resetInactivityTimer();

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: internalController.signal,
          body: JSON.stringify(payload)
        });

        if (!response.ok || !response.body) {
          if (response.status === 429 || response.status >= 500) {
            throw new Error(`HTTP_${response.status}`);
          }
          throw new Error(`HTTP_STATUS_${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          resetInactivityTimer();

          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              if (dataStr === '[DONE]') break;

              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  onChunk(parsed.text);
                }
              } catch {
                // Ignore partial JSON chunks
              }
            }
          }
        }

        if (inactivityTimeoutId) clearTimeout(inactivityTimeoutId);
        userSignal.removeEventListener('abort', onUserAbort);
        return; // Stream finished successfully!

      } catch (err: any) {
        if (inactivityTimeoutId) clearTimeout(inactivityTimeoutId);
        userSignal.removeEventListener('abort', onUserAbort);

        if (userSignal.aborted) {
          throw new Error('USER_ABORTED');
        }

        const isRetryable =
          attempt < maxRetries &&
          (err.name === 'AbortError' ||
           err.message?.includes('HTTP_429') ||
           err.message?.includes('HTTP_500') ||
           err.message?.includes('HTTP_503') ||
           err.message?.includes('Failed to fetch') ||
           err.message?.includes('fetch failed'));

        if (!isRetryable) {
          throw err;
        }

        const delayMs = Math.min(1000 * Math.pow(2, attempt - 1) + Math.random() * 300, 5000);
        console.warn(`[Client Stream Retry ${attempt}/${maxRetries}] ${err.message}. Retrying in ${Math.round(delayMs)}ms...`);
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  };

  // Generic JSON Fetch with Retry and Timeout
  const fetchJSONWithRetryAndTimeout = async (
    url: string,
    options: RequestInit = {},
    timeoutMs: number = 25000,
    maxRetries: number = 3
  ) => {
    let attempt = 0;

    while (attempt <= maxRetries) {
      attempt++;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 429 || response.status >= 500) {
            throw new Error(`HTTP_${response.status}`);
          }
          throw new Error(`Server status ${response.status}`);
        }

        return await response.json();
      } catch (err: any) {
        clearTimeout(timeoutId);

        const isRetryable =
          attempt < maxRetries &&
          (err.name === 'AbortError' ||
           err.message?.includes('HTTP_429') ||
           err.message?.includes('HTTP_500') ||
           err.message?.includes('HTTP_503') ||
           err.message?.includes('Failed to fetch') ||
           err.message?.includes('fetch failed'));

        if (!isRetryable) {
          throw err;
        }

        const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1) + Math.random() * 300, 5000);
        console.warn(`[Client JSON Retry ${attempt}/${maxRetries}] Retrying in ${Math.round(backoffMs)}ms...`);
        await new Promise((res) => setTimeout(res, backoffMs));
      }
    }
  };

  // Streaming SSE Chat handler
  const handleSendMessage = async (e?: React.FormEvent, customText?: string, isRegenerate = false) => {
    if (e) e.preventDefault();
    const query = customText || inputQuery;
    if (!query.trim() || isLoading) return;

    let updatedHistory = [...messages];

    if (!isRegenerate) {
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: query,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      updatedHistory = [...messages, userMsg];
      setMessages(updatedHistory);
      setInputQuery('');
    } else {
      // Clear previous error AI message if regenerating
      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.sender === 'ai' && lastMsg.isError) {
          return prev.slice(0, prev.length - 1);
        }
        return prev;
      });
    }

    setIsLoading(true);

    const streamAiMsgId = `ai-${Date.now()}`;
    const initialAiMsg: ChatMessage = {
      id: streamAiMsgId,
      sender: 'ai',
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, initialAiMsg]);

    const userController = new AbortController();
    abortControllerRef.current = userController;

    let accumulatedText = '';

    try {
      await fetchStreamWithRetryAndTimeout(
        '/api/gemini/stream',
        {
          messages: updatedHistory.filter(m => !m.isError).map(m => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.text })),
          language: selectedLanguage,
          model: thinkingMode ? 'gemini-3.6-flash' : 'gemini-3.6-flash'
        },
        (token) => {
          accumulatedText += token;
          setMessages(prev => prev.map(msg => msg.id === streamAiMsgId ? { ...msg, text: accumulatedText } : msg));
        },
        userController.signal
      );
    } catch (err: any) {
      if (err.message === 'USER_ABORTED' || userController.signal.aborted) {
        setMessages(prev => prev.map(msg => msg.id === streamAiMsgId ? {
          ...msg,
          text: msg.text + (msg.text ? '\n\n_[Generation stopped by user.]_' : '_[Request cancelled.]_')
        } : msg));
      } else {
        const errorDetail = err?.message || JSON.stringify(err);
        console.error('Chat Stream API Error:', errorDetail, err);
        setMessages(prev => prev.map(msg => msg.id === streamAiMsgId ? {
          ...msg,
          text: accumulatedText || `I am temporarily unable to reach the Gemini server (${errorDetail}). Please check your connection or try again shortly.`,
          isError: true
        } : msg));
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleRetryLast = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user');
    if (lastUserMsg) {
      handleSendMessage(undefined, lastUserMsg.text, true);
    }
  };

  // Voice Recording and Transcription
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          setTranscribing(true);
          try {
            const data = await fetchJSONWithRetryAndTimeout('/api/gemini/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64Audio, mimeType: 'audio/webm' })
            });
            if (data?.text) {
              setInputQuery(data.text);
              handleSendMessage(undefined, data.text);
            }
          } catch (error) {
            console.error('Transcription error:', error);
          } finally {
            setTranscribing(false);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access is required for voice transcription.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle Skin Scanner
  const handleSkinImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSkinImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeSkin = async () => {
    if (!skinImage) return;
    setSkinAnalyzing(true);
    setSkinResult(null);

    try {
      const data = await fetchJSONWithRetryAndTimeout('/api/gemini/skin-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: skinImage, notes: skinNotes })
      });
      if (data?.analysis) {
        setSkinResult(data.analysis);
      }
    } catch (err) {
      console.error('Skin scan error:', err);
    } finally {
      setSkinAnalyzing(false);
    }
  };

  // Handle Medicine Verification
  const handleMedicineImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medQuery && !medImage) return;
    setMedVerifying(true);
    setMedResult(null);

    try {
      const data = await fetchJSONWithRetryAndTimeout('/api/gemini/verify-medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: medQuery, imageBase64: medImage })
      });
      if (data?.medicine) {
        setMedResult(data.medicine);
      }
    } catch (err) {
      console.error('Medicine verify error:', err);
    } finally {
      setMedVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="AI Medical Assistant & Symptom Triage | MediTrust AI"
        description="AI-powered clinical symptom triage, voice assistant, grounded doctor search, multimodal skin scanner, and medicine verifier by Medynex Solutions LLP."
        keywords={AI_KEYWORDS}
        canonicalUrl="https://medynex.com/ai-assistant"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Powered by Gemini Clinical AI Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Medynex AI Healthcare Suite</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Multilingual clinical triage, voice-activated guidance, grounded Google Maps doctor discovery, skin analysis, and medicine verifier.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center border-b border-slate-800 pb-2 gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'chat' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Healthcare Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('skin')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'skin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Multimodal Skin Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('medicine')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'medicine' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Medicine Verifier</span>
          </button>
        </div>

        {/* TAB 1: AI HEALTHCARE ASSISTANT & CHAT */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            
            {/* Triage & Grounding Controls */}
            <div className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-300">Respond In:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#0B1120] border border-slate-700 font-semibold text-white focus:outline-none focus:border-cyan-500"
                >
                  {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>

              {/* Grounding & Thinking Toggles */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer bg-[#0B1120] px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={enableMaps}
                    onChange={(e) => {
                      setEnableMaps(e.target.checked);
                      if (e.target.checked) setEnableSearch(false);
                    }}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300 font-medium">Maps Grounding</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer bg-[#0B1120] px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={enableSearch}
                    onChange={(e) => {
                      setEnableSearch(e.target.checked);
                      if (e.target.checked) setEnableMaps(false);
                    }}
                    className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                  />
                  <Search className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-300 font-medium">Search Grounding</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer bg-[#0B1120] px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={thinkingMode}
                    onChange={(e) => setThinkingMode(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-purple-500 focus:ring-0"
                  />
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-slate-300 font-medium">Deep Thinking Mode</span>
                </label>
              </div>

            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold mr-1">Suggestions:</span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(undefined, p)}
                  className="px-3 py-1 rounded-full bg-[#111827] border border-slate-800 hover:border-cyan-500/50 text-[11px] text-slate-300 hover:text-white transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Console */}
            <div className="rounded-3xl bg-[#111827] border border-slate-800 shadow-2xl flex flex-col h-[560px] overflow-hidden">
              
              {/* Header */}
              <div className="p-4 border-b border-slate-800 bg-[#0B1120]/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>MediTrust AI Clinical Assistant</span>
                      {thinkingMode && <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[10px] font-mono border border-purple-500/30">Thinking Mode Active</span>}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono">Multi-Turn Gemini Model • {selectedLanguage} Script Enforced</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-cyan-500/10"
                    title="Launch Multimodal Neural Voice Assistant"
                  >
                    <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="hidden sm:inline">Voice Assistant</span>
                  </button>

                  {isLoading && (
                    <button
                      onClick={handleStopGeneration}
                      className="px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-5">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                      msg.isError ? 'bg-rose-950/40 border border-rose-500/30 text-rose-200' :
                      msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#0B1120] border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      
                      {msg.isError ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-rose-400 font-semibold">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>Service Notification</span>
                          </div>
                          <p>{msg.text}</p>
                          <button
                            onClick={handleRetryLast}
                            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retry Request</span>
                          </button>
                        </div>
                      ) : msg.sender === 'ai' && msg.text === '' ? (
                        <TypingIndicator thinkingMode={thinkingMode} language={selectedLanguage} />
                      ) : (
                        <div className="prose prose-invert max-w-none text-xs sm:text-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-cyan-300 relative">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                          {isLoading && msg.id === messages[messages.length - 1]?.id && (
                            <span className="inline-flex items-center ml-1">
                              <motion.span
                                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                                className="inline-block w-2.5 h-4 bg-cyan-400 rounded-sm shadow-sm shadow-cyan-400/80 align-middle"
                              />
                            </span>
                          )}
                        </div>
                      )}
                      
                      {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                          <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold block">Grounded Sources & Local Listings:</span>
                          {msg.groundingChunks.map((chunk, idx) => (
                            <div key={idx} className="truncate">
                              {chunk.web && (
                                <a href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                                  🔗 {chunk.web.title || chunk.web.uri}
                                </a>
                              )}
                              {chunk.maps && (
                                <a href={chunk.maps.uri} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                                  📍 {chunk.maps.title || chunk.maps.uri}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer Actions & Timestamp */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-1.5 border-t border-slate-800/50 font-mono">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                            title="Copy response"
                          >
                            {copiedMsgId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>

                          {msg.sender === 'ai' && !msg.isError && (
                            <>
                              <button
                                onClick={() => handleSpeak(msg.id, msg.text)}
                                className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${speakingMsgId === msg.id ? 'text-cyan-400 font-bold animate-pulse' : ''}`}
                                title="Listen to response (TTS)"
                              >
                                <Volume2 className="w-3 h-3" />
                                <span>{speakingMsgId === msg.id ? 'Speaking...' : 'Listen'}</span>
                              </button>

                              <button
                                onClick={handleRetryLast}
                                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                                title="Regenerate response"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Regenerate</span>
                              </button>
                            </>
                          )}
                        </div>

                        <span>{msg.time}</span>
                      </div>

                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center space-x-3 text-slate-400 text-xs bg-[#0B1120] p-3 rounded-2xl border border-slate-800 w-fit">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    </div>
                    <span className="font-mono text-cyan-400 text-[11px]">Evaluating clinical query & generating response in {selectedLanguage}...</span>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Speech Error / Warning Notification Banner */}
              <AnimatePresence>
                {speechAlert && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 py-3 border-t flex items-start justify-between gap-3 text-xs ${
                      speechAlert.type === 'error'
                        ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                        : speechAlert.type === 'warning'
                        ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                        : 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {speechAlert.type === 'error' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : speechAlert.type === 'warning' ? (
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-[13px]">{speechAlert.title}</div>
                        <p className="text-[11px] opacity-90 leading-relaxed mt-0.5">{speechAlert.message}</p>
                        {speechAlert.actionLabel && speechAlert.onAction && (
                          <button
                            type="button"
                            onClick={speechAlert.onAction}
                            className="mt-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] border border-white/20 transition-all"
                          >
                            {speechAlert.actionLabel}
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSpeechAlert(null)}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Dictation Live Indicator */}
              {isDictating && (
                <div className="px-4 py-2.5 bg-cyan-950/30 border-t border-cyan-800/40 flex items-center justify-between gap-3 text-xs text-cyan-300">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    <span className="font-mono font-medium">Listening in {selectedLanguage}...</span>
                    {dictationInterim && (
                      <span className="italic text-slate-300 max-w-xs truncate">"{dictationInterim}"</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={stopDictation}
                    className="px-2 py-0.5 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-[10px] font-mono"
                  >
                    Done Speaking
                  </button>
                </div>
              )}

              {/* Input Form & Voice Controls */}
              <form onSubmit={(e) => handleSendMessage(e)} className="p-4 border-t border-slate-800 bg-[#0B1120] flex items-center gap-2.5 sm:gap-3">
                {/* 1. Full Spoken Clinical Assistant Dialog Modal */}
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 hover:text-white transition-all shadow-md shadow-cyan-500/10 group relative shrink-0"
                  title="Open Neural Spoken Voice Assistant (Gemini Studio)"
                >
                  <Radio className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping pointer-events-none" />
                </button>

                {/* 2. Direct Web Speech Dictation Toggle */}
                <button
                  type="button"
                  onClick={toggleDictation}
                  className={`p-3 rounded-xl border transition-all shadow-md shrink-0 ${
                    isDictating
                      ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-rose-500/30'
                      : 'bg-[#111827] border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50'
                  }`}
                  title={isDictating ? 'Stop Voice Dictation' : `Dictate in ${selectedLanguage}`}
                >
                  {isDictating ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5 text-cyan-400" />
                  )}
                </button>

                <input
                  ref={chatInputRef}
                  type="text"
                  placeholder={`Ask clinical query or local doctor search in ${selectedLanguage}... (or tap mic for speech)`}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#111827] border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />

                <button
                  type="submit"
                  disabled={isLoading || !inputQuery.trim()}
                  className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-lg shadow-cyan-600/20 disabled:opacity-50 shrink-0"
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>


            </div>
          </div>
        )}

        {/* TAB 2: MULTIMODAL SKIN SCANNER */}
        {activeTab === 'skin' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <span>Multimodal Skin Scanner & Dermatology Guide</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Upload or capture a photo of a skin condition to receive AI analysis on estimated skin type, visual observations, daily guidance, and nearby dermatologists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Image Input Box */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer bg-[#0B1120] relative">
                  {skinImage ? (
                    <div className="space-y-3">
                      <img src={skinImage} alt="Skin condition upload" className="max-h-48 rounded-xl mx-auto object-cover border border-slate-700" />
                      <button
                        onClick={() => setSkinImage(null)}
                        className="text-xs text-rose-400 font-semibold underline"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block space-y-2">
                      <Upload className="w-10 h-10 text-slate-500 mx-auto" />
                      <span className="text-xs font-bold text-slate-300 block">Click to Upload Skin Photo</span>
                      <span className="text-[10px] text-slate-500 block">JPEG, PNG supported</span>
                      <input type="file" accept="image/*" onChange={handleSkinImageUpload} className="hidden" />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Symptoms / Notes (Optional)</label>
                  <textarea
                    value={skinNotes}
                    onChange={(e) => setSkinNotes(e.target.value)}
                    placeholder="e.g. Mild itching on forearm for 3 days after outdoor sun exposure..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-xs h-20 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  onClick={handleAnalyzeSkin}
                  disabled={!skinImage || skinAnalyzing}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {skinAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analyzing with Gemini Vision...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run AI Skin Analysis</span>
                    </>
                  )}
                </button>
              </div>

              {/* Analysis Results Display */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono text-cyan-400 border-b border-slate-800 pb-2">
                  AI Dermatology Insights
                </h3>

                {skinResult ? (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-slate-400 block font-mono text-[10px]">Estimated Skin Type:</span>
                      <strong className="text-sm text-white">{skinResult.skinTypeEstimated}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-mono text-[10px]">Observation:</span>
                      <p className="text-slate-300">{skinResult.observation}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-mono text-[10px] mb-1">Recommendations:</span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {skinResult.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-slate-400">
                      <span>Suggested Specialist: <strong className="text-cyan-400">{skinResult.suggestedSpecialty}</strong></span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    Upload an image on the left and click "Run AI Skin Analysis" to see results.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: MEDICINE VERIFIER */}
        {activeTab === 'medicine' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-400" />
                <span>Medicine Verification & Information Explainer</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Search medicine name or upload packaging photo to verify official composition, recommended dosage, side effects, and warnings.
              </p>
            </div>

            <form onSubmit={handleVerifyMedicine} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Enter Medicine Name (e.g. Telmisartan 40mg)..."
                  value={medQuery}
                  onChange={(e) => setMedQuery(e.target.value)}
                  className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
                
                <label className="px-4 py-2.5 rounded-xl bg-[#0B1120] border border-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer flex items-center justify-center gap-2 truncate">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>{medImage ? 'Image Attached' : 'Attach Photo'}</span>
                  <input type="file" accept="image/*" onChange={handleMedicineImageUpload} className="hidden" />
                </label>
              </div>

              <button
                type="submit"
                disabled={medVerifying}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {medVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with Gemini Search...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Verify Medicine & View Clinical Details</span>
                  </>
                )}
              </button>
            </form>

            {medResult && (
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-emerald-500/30 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Verified Salt / Formulation</span>
                    <h3 className="text-lg font-bold text-white">{medResult.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    {medResult.verificationBadge || 'CDSCO Verified'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <strong className="text-slate-400 block mb-1">Primary Uses:</strong>
                    <p className="text-slate-200">{medResult.uses}</p>
                  </div>

                  <div>
                    <strong className="text-slate-400 block mb-1">Dosage Guidance:</strong>
                    <p className="text-slate-200">{medResult.dosage}</p>
                  </div>

                  <div>
                    <strong className="text-slate-400 block mb-1">Warnings & Precautions:</strong>
                    <p className="text-amber-300">{medResult.warnings}</p>
                  </div>

                  <div>
                    <strong className="text-slate-400 block mb-1">Side Effects:</strong>
                    <p className="text-slate-300">{medResult.sideEffects}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Persistent Floating Greeting Bubble */}
      <AnimatePresence>
        {showGreetingBubble ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-3xl bg-[#111827]/95 border border-cyan-500/40 p-5 shadow-2xl backdrop-blur-xl text-slate-100 ring-1 ring-cyan-500/20"
          >
            {/* Top Row: AI Avatar & Close Button */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/40">
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#111827] rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>MediTrust AI Assistant</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono">Online • Gemini Clinical Model</div>
                </div>
              </div>

              <button
                onClick={() => setShowGreetingBubble(false)}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Dismiss greeting"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bubble Content Body */}
            <div className="mt-3.5 space-y-2.5">
              <div className="p-3 rounded-2xl bg-[#0B1120] border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                👋 <strong className="text-white">Hello{user?.name ? ` ${user.name}` : ''}!</strong> Welcome to your AI Healthcare Assistant. Ask me about your health symptoms, medicines, or doctors in your city!
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('chat');
                    setTimeout(() => chatInputRef.current?.focus(), 100);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask a Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setShowGreetingBubble(false)}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowGreetingBubble(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-2xl shadow-cyan-600/40 border border-cyan-400/40 hover:scale-105 transition-transform flex items-center space-x-2.5 group"
            title="Open AI Assistant Greeting"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-cyan-600 rounded-full animate-ping" />
            </div>
            <span className="text-xs font-bold hidden sm:inline-block">AI Assistant Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Multimodal Neural Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSendToChat={handleVoiceConsultationToChat}
        initialLanguage={selectedLanguage}
      />
    </div>
  );
};
