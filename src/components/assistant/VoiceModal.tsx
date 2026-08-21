import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  MessageSquare, 
  RotateCcw, 
  ShieldAlert, 
  Globe, 
  Radio, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { fetchJSONWithRetryAndTimeout } from '../../utils/retry';

export interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat: (userText: string, assistantReply: string) => void;
  initialLanguage?: string;
}

export type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

const SUPPORTED_LANGUAGES = [
  { code: 'English', label: 'English (India / Global)', flag: '🇮🇳' },
  { code: 'Telugu (తెలుగు)', label: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: 'Hindi (हिंदी)', label: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'Tamil (தமிழ்)', label: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'Kannada (ಕನ್ನಡ)', label: 'Kannada (ಕನ್ನಡ)', flag: '🇮🇳' },
  { code: 'Malayalam (മലയാളം)', label: 'Malayalam (മലയാളം)', flag: '🇮🇳' },
  { code: 'Bengali (বাংলা)', label: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: 'Marathi (मराठी)', label: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'Gujarati (ગુજરાતી)', label: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: 'Spanish (Español)', label: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'French (Français)', label: 'French (Français)', flag: '🇫🇷' },
  { code: 'German (Deutsch)', label: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'Arabic (العربية)', label: 'Arabic (العربية)', flag: '🇦🇪' },
];

const VOICE_OPTIONS = [
  { id: 'Aoede', name: 'Aoede (Studio Warm)', desc: 'Empathetic, clear, clinical consultation tone' },
  { id: 'Kore', name: 'Kore (Studio Calm)', desc: 'Soothing, steady patient guidance tone' },
  { id: 'Puck', name: 'Puck (Studio Energetic)', desc: 'Dynamic, crisp, informative tone' },
  { id: 'Fenrir', name: 'Fenrir (Studio Deep)', desc: 'Resonant, authoritative, calm tone' }
];

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onSendToChat,
  initialLanguage = 'English'
}) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [selectedVoice, setSelectedVoice] = useState('Aoede');
  const [userTranscript, setUserTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [audioVolume, setAudioVolume] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [textTestInput, setTextTestInput] = useState('');

  // Audio recording & playback refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedMimeTypeRef = useRef<string>('audio/webm');
  const liveTranscriptRef = useRef<string>('');

  // Map selected language to BCP-47 tag for SpeechRecognition
  const getLanguageTag = (lang: string): string => {
    const l = lang.toLowerCase();
    if (l.includes('telugu')) return 'te-IN';
    if (l.includes('hindi')) return 'hi-IN';
    if (l.includes('tamil')) return 'ta-IN';
    if (l.includes('kannada')) return 'kn-IN';
    if (l.includes('malayalam')) return 'ml-IN';
    if (l.includes('bengali')) return 'bn-IN';
    if (l.includes('marathi')) return 'mr-IN';
    if (l.includes('gujarati')) return 'gu-IN';
    if (l.includes('spanish')) return 'es-ES';
    if (l.includes('french')) return 'fr-FR';
    if (l.includes('german')) return 'de-DE';
    if (l.includes('arabic')) return 'ar-SA';
    return 'en-IN';
  };

  // Initialize and clean up audio
  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
      setUserTranscript('');
      setAssistantReply('');
      setVoiceState('idle');
      setErrorMessage(null);
    }
  }, [isOpen]);

  const stopAllAudio = () => {
    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    // Stop tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    // Stop audio playback
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    // Stop browser speech synthesis if active
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // Cancel visualizer animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
  };

  const getBestSupportedMimeType = (): string => {
    if (typeof MediaRecorder === 'undefined') return 'audio/webm';
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus',
      'audio/wav'
    ];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return 'audio/webm';
  };

  const startListening = async () => {
    stopAllAudio();
    setErrorMessage(null);
    setUserTranscript('');
    setAssistantReply('');
    setDisclaimer('');
    liveTranscriptRef.current = '';

    // 1. Try to start browser Web Speech API for instant live recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getLanguageTag(selectedLanguage);
        
        recognition.onresult = (event: any) => {
          let interimText = '';
          let finalText = '';
          for (let i = 0; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) {
              finalText += res[0].transcript + ' ';
            } else {
              interimText += res[0].transcript;
            }
          }
          const fullText = (finalText + interimText).trim();
          if (fullText) {
            liveTranscriptRef.current = fullText;
            setUserTranscript(fullText);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('[SpeechRecognition] Interim note:', e?.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (recErr) {
        console.warn('SpeechRecognition init skipped:', recErr);
      }
    }

    // 2. Access microphone via getUserMedia for audio recording and live visualizer
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;

      // Setup Web Audio Analyser for live pulsating waveform
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const updateMeter = () => {
          if (!analyserRef.current) return;
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioVolume(Math.min(100, Math.round((avg / 255) * 130)));
          animationFrameRef.current = requestAnimationFrame(updateMeter);
        };
        updateMeter();
      }

      audioChunksRef.current = [];
      const supportedMime = getBestSupportedMimeType();
      recordedMimeTypeRef.current = supportedMime;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: supportedMime
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        const mime = recordedMimeTypeRef.current;
        const audioBlob = new Blob(audioChunksRef.current, { type: mime });

        // If audio blob is captured or we have a live transcript from Web Speech
        if (audioBlob.size > 200) {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            await processVoiceInput(base64Audio, mime, liveTranscriptRef.current);
          };
        } else if (liveTranscriptRef.current) {
          // If audio was short but speech was recognized
          await processVoiceInput('', mime, liveTranscriptRef.current);
        } else {
          setVoiceState('idle');
          setErrorMessage('No voice detected. Please hold the button or speak clearly into your microphone.');
        }
      };

      // Start recording with 200ms slice so data buffers reliably
      mediaRecorder.start(200);
      setVoiceState('listening');
    } catch (err: any) {
      console.error('Microphone access denied or error:', err);
      // Detailed user guidance for permissions
      const isPermissionBlocked = err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
      if (isPermissionBlocked) {
        setErrorMessage('Microphone blocked by browser. Please click the Lock 🔒 or Camera icon in your browser address bar and choose "Allow Microphone".');
      } else {
        setErrorMessage(`Microphone error: ${err.message || 'Device unavailable'}. You can also type your question below.`);
      }
      setVoiceState('idle');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.requestData();
        mediaRecorderRef.current.stop();
      } catch (e) {
        mediaRecorderRef.current.stop();
      }
      setVoiceState('thinking');
    }
  };

  const processVoiceInput = async (base64Audio?: string, mime: string = 'audio/webm', fallbackText?: string) => {
    setVoiceState('thinking');
    try {
      const response = await fetchJSONWithRetryAndTimeout('/api/gemini/voice-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: base64Audio,
          mimeType: mime,
          language: selectedLanguage,
          voice: selectedVoice,
          fallbackTextQuery: fallbackText || undefined
        })
      });

      const transcript = response?.transcript || fallbackText || 'Spoken healthcare query';
      const reply = response?.responseText || 'Here is clinical guidance based on your symptoms.';
      const disc = response?.disclaimer || 'MediTrust AI provides health guidance, not formal diagnosis. Consult a verified doctor.';
      const audioWavBase64 = response?.audioWavBase64;

      setUserTranscript(transcript);
      setAssistantReply(reply);
      setDisclaimer(disc);
      setVoiceState('speaking');

      // Play audio response
      if (audioWavBase64 && !isMuted) {
        playWavAudio(audioWavBase64);
      } else if (!isMuted) {
        // Fallback to high-quality browser speech synthesis
        playSpeechFallback(`${reply} ${disc}`);
      }
    } catch (err: any) {
      console.error('Voice processing error:', err);
      setErrorMessage('Could not process voice triage. Please try speaking again or type your symptom.');
      setVoiceState('idle');
    }
  };

  const handleTestTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textTestInput.trim()) return;
    const text = textTestInput.trim();
    setTextTestInput('');
    setUserTranscript(text);
    await processVoiceInput('', 'audio/webm', text);
  };

  const playWavAudio = (base64Wav: string) => {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Wav}`);
      audioElementRef.current = audio;
      audio.onended = () => {
        setVoiceState('idle');
      };
      audio.onerror = () => {
        playSpeechFallback(`${assistantReply} ${disclaimer}`);
      };
      audio.play().catch(err => {
        console.warn('Audio autoplay prevented:', err);
        playSpeechFallback(`${assistantReply} ${disclaimer}`);
      });
    } catch (e) {
      playSpeechFallback(`${assistantReply} ${disclaimer}`);
    }
  };

  const playSpeechFallback = (fullText: string) => {
    if (!('speechSynthesis' in window)) {
      setVoiceState('idle');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = fullText.replace(/[*#_`~[\]()]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    // Choose regional voice if available
    const voices = window.speechSynthesis.getVoices();
    const langCode = selectedLanguage.toLowerCase();
    const matchedVoice = voices.find(v => 
      (langCode.includes('hindi') && v.lang.includes('hi')) ||
      (langCode.includes('telugu') && v.lang.includes('te')) ||
      (langCode.includes('tamil') && v.lang.includes('ta')) ||
      (langCode.includes('spanish') && v.lang.includes('es')) ||
      (langCode.includes('french') && v.lang.includes('fr')) ||
      (v.name.includes('Natural') || v.name.includes('Studio') || v.name.includes('Neural') || v.name.includes('Google'))
    );
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => {
      setVoiceState('idle');
    };
    utterance.onerror = () => {
      setVoiceState('idle');
    };
    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (nextMute) {
      if (audioElementRef.current) audioElementRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (voiceState === 'speaking') setVoiceState('idle');
    }
  };

  const handleInsertToChat = () => {
    if (userTranscript || assistantReply) {
      onSendToChat(
        userTranscript || 'Voice Clinical Consultation',
        assistantReply || 'Spoken healthcare response received.'
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="voice-assistant-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          id="voice-assistant-modal-card"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#111927] to-[#0A0F1D] border border-cyan-500/30 shadow-2xl shadow-cyan-900/30 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0B1120]/80">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white tracking-wide">MediTrust Voice Assistant</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Gemini 3.6 Multimodal
                  </span>
                </div>
                <p className="text-xs text-slate-400">Natural Spoken Clinical Guidance by Medynex Solutions</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                id="btn-voice-toggle-mute"
                onClick={toggleMute}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className={`p-2 rounded-xl border transition-all ${
                  isMuted 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                id="btn-voice-close-modal"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controls Strip (Language & Voice Selector) */}
          <div className="px-6 py-2.5 bg-[#0D1527] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <label htmlFor="voice-language-select" className="text-slate-400 font-medium">Language:</label>
              <select
                id="voice-language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-800/90 text-white rounded-lg px-2.5 py-1 text-xs border border-slate-700 focus:outline-none focus:border-cyan-400"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <label htmlFor="voice-persona-select" className="text-slate-400 font-medium">Neural Voice:</label>
              <select
                id="voice-persona-select"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="bg-slate-800/90 text-white rounded-lg px-2.5 py-1 text-xs border border-slate-700 focus:outline-none focus:border-cyan-400"
              >
                {VOICE_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center Visualizer & State Orb */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center min-h-[260px] text-center">
            {/* Visualizer Pulsing Orb */}
            <div className="relative flex items-center justify-center my-4">
              {/* Outer Glow Halo */}
              <motion.div
                animate={{
                  scale: voiceState === 'listening' ? [1, 1.2 + audioVolume / 150, 1] : voiceState === 'speaking' ? [1, 1.15, 1] : [1, 1.05, 1],
                  opacity: voiceState === 'listening' ? 0.8 : 0.4
                }}
                transition={{ repeat: Infinity, duration: voiceState === 'listening' ? 0.4 : 1.6 }}
                className={`absolute w-36 h-36 rounded-full blur-2xl pointer-events-none ${
                  voiceState === 'listening'
                    ? 'bg-rose-500/40'
                    : voiceState === 'thinking'
                    ? 'bg-amber-500/40'
                    : voiceState === 'speaking'
                    ? 'bg-cyan-500/40'
                    : 'bg-blue-600/20'
                }`}
              />

              {/* Middle Orbital Ring */}
              <motion.div
                animate={{
                  rotate: voiceState === 'thinking' ? 360 : 0
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className={`w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center p-2 transition-colors duration-500 ${
                  voiceState === 'listening'
                    ? 'border-rose-400 shadow-lg shadow-rose-500/30'
                    : voiceState === 'thinking'
                    ? 'border-amber-400 shadow-lg shadow-amber-500/30'
                    : voiceState === 'speaking'
                    ? 'border-cyan-400 shadow-lg shadow-cyan-500/30'
                    : 'border-slate-700'
                }`}
              >
                {/* Core Button / Orb */}
                <motion.button
                  id="btn-voice-orb-action"
                  whileTap={{ scale: 0.92 }}
                  onClick={voiceState === 'listening' ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
                    voiceState === 'listening'
                      ? 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-600/40 animate-pulse'
                      : voiceState === 'thinking'
                      ? 'bg-gradient-to-tr from-amber-600 to-orange-500 text-white shadow-amber-600/40'
                      : voiceState === 'speaking'
                      ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-cyan-600/40'
                      : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-600/30 hover:scale-105'
                  }`}
                >
                  {voiceState === 'listening' ? (
                    <MicOff className="w-8 h-8" />
                  ) : voiceState === 'thinking' ? (
                    <Activity className="w-8 h-8 animate-spin" />
                  ) : voiceState === 'speaking' ? (
                    <Volume2 className="w-8 h-8 animate-bounce" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Status Label & Waveform Bars */}
            <div className="mt-2">
              <div className="text-sm font-bold tracking-wide flex items-center justify-center space-x-2">
                {voiceState === 'listening' && (
                  <span className="text-rose-400 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    Listening to your voice... Tap orb when finished speaking
                  </span>
                )}
                {voiceState === 'thinking' && (
                  <span className="text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                    MediTrust AI is clinically analyzing with Gemini 3.6...
                  </span>
                )}
                {voiceState === 'speaking' && (
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 animate-pulse text-cyan-400" />
                    Speaking MediTrust guidance ({selectedVoice})...
                  </span>
                )}
                {voiceState === 'idle' && (
                  <span className="text-slate-300">
                    Tap the microphone orb to speak your health question
                  </span>
                )}
              </div>

              {/* Live Audio Waveform Bars when listening */}
              {voiceState === 'listening' && (
                <div className="flex items-center justify-center space-x-1.5 mt-3 h-8">
                  {[20, 45, 80, 100, 70, 95, 40, 60, 85, 30].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: `${Math.max(6, Math.min(32, (audioVolume / 100) * h + Math.random() * 8))}px`
                      }}
                      transition={{ duration: 0.1 }}
                      className="w-1.5 bg-gradient-to-t from-rose-500 to-amber-400 rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mt-4 px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Text Input for Testing or Silent Consultation */}
            <form onSubmit={handleTestTextSubmit} className="w-full mt-4 flex items-center gap-2">
              <input
                type="text"
                value={textTestInput}
                onChange={(e) => setTextTestInput(e.target.value)}
                placeholder={`Or type a symptom in ${selectedLanguage} to hear ${selectedVoice}...`}
                className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={!textTestInput.trim() || voiceState === 'thinking'}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-600/20 whitespace-nowrap"
              >
                Consult & Speak
              </button>
            </form>

            {/* Dual Transcript & Response Box (Accessibility Requirement) */}
            {(userTranscript || assistantReply) && (
              <div className="w-full mt-5 space-y-3 text-left">
                {/* User Speech Transcript */}
                {userTranscript && (
                  <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" /> You Said (Transcribed):
                    </div>
                    <p className="text-sm text-slate-100 italic">"{userTranscript}"</p>
                  </div>
                )}

                {/* Assistant Spoken Response Text */}
                {assistantReply && (
                  <div className="p-4 rounded-2xl bg-[#131E33] border border-cyan-500/40 shadow-lg">
                    <div className="text-[10px] font-mono text-cyan-300 uppercase font-bold mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> MediTrust Spoken Guidance:
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-normal">{assistantReply}</p>
                    
                    {disclaimer && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-start space-x-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{disclaimer}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Action Strip */}
          <div className="px-6 py-4 bg-[#0B1120] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                id="btn-voice-restart"
                onClick={startListening}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Speak Again</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                id="btn-voice-insert-chat"
                disabled={!assistantReply}
                onClick={handleInsertToChat}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/30 flex items-center space-x-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Switch to Text Chat</span>
              </button>

              <button
                id="btn-voice-modal-close"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
