import React, { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { soundFX } from '../../../utils/audio';
import { InterviewQnA } from '../../../types';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw, Send, CheckCircle2, Radio } from 'lucide-react';

export const InterviewApp: React.FC = () => {
  const { interviewQnA, personal } = portfolioConfig;
  const [selectedQnA, setSelectedQnA] = useState<InterviewQnA>(interviewQnA[0]);
  const [displayedAnswer, setDisplayedAnswer] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'interview' | 'breakdown'>('interview');

  const typewriterTimeoutRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSpeech = 'speechSynthesis' in window;
      setSpeechSupported(hasSpeech);

      // Setup speech recognition if available
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setIsListening(false);
          handleVoiceSearch(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Match voice query or fallback
  const handleVoiceSearch = (query: string) => {
    soundFX.playClick();
    const match = interviewQnA.find(q =>
      query.includes(q.id) ||
      query.split(' ').some(w => q.query.toLowerCase().includes(w) && w.length > 3)
    );
    if (match) {
      triggerAnswer(match);
    } else {
      // Create dynamic response
      const fallback: InterviewQnA = {
        id: 'custom',
        label: `Interrogation: "${query}"`,
        query: query,
        answer: `Regarding "${query}": I build deterministic distributed software and high-cadence interfaces. Every component is designed failure-first with strict fallback states. For deep technical discussions on this topic, reach out directly at ${personal.email}.`,
        tags: ["Custom Query", "Real-Time AI"],
        keyPoints: [
          "Deterministic state machines and automated fallbacks",
          "Voice-first engineering velocity with Wispr Flow",
          "Full open-source dossiers in BUILDER_LAB.EXE"
        ]
      };
      triggerAnswer(fallback);
    }
  };

  // Trigger typewriter text + optional speech synthesis
  const triggerAnswer = (qna: InterviewQnA) => {
    setSelectedQnA(qna);
    soundFX.playJarvisChime();

    // Cancel any ongoing speech or typewriter
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }

    // Typewriter effect
    setIsTyping(true);
    setDisplayedAnswer('');
    let idx = 0;
    const fullText = qna.answer;

    const streamToken = () => {
      if (idx < fullText.length) {
        const chunk = fullText.slice(0, idx + 4);
        setDisplayedAnswer(chunk);
        idx += 4;
        typewriterTimeoutRef.current = setTimeout(streamToken, 16);
      } else {
        setDisplayedAnswer(fullText);
        setIsTyping(false);
      }
    };
    streamToken();

    // Natural Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(qna.answer);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Pick clean English voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMicListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please click the pre-canned questions or type in the input bar.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      soundFX.playClick();
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Run initial answer on mount
  useEffect(() => {
    triggerAnswer(interviewQnA[0]);
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0c0d14] text-[#f1f5f9] select-none font-sans">
      {/* Left Column: Interactive 3D Audio Visualizer & Question Hub */}
      <div className="w-full md:w-80 bg-[#121420] border-b md:border-b-0 md:border-r border-white/10 p-4 sm:p-5 flex flex-col justify-between shrink-0 overflow-y-auto space-y-4">
        <div>
          {/* Top Header Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isSpeaking ? 'animate-ping' : ''}`} />
              J.A.R.V.I.S. MK-85
            </span>
            <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">STARK PROTOCOL</span>
          </div>

          {/* Central Iron Man Arc Reactor Holographic HUD */}
          <div className="relative h-48 rounded-2xl bg-gradient-to-b from-[#0b1528] to-[#060810] border border-cyan-500/30 p-3 flex flex-col items-center justify-center overflow-hidden shadow-[inset_0_0_25px_rgba(0,240,255,0.08)]">
            {/* Subtle Arc Reactor Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

            {/* Rotating Holographic HUD Rings & Arc Reactor Core */}
            <div className="relative flex items-center justify-center w-28 h-28">
              {/* Outer Holographic Dashed Ring (Clockwise) */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite] pointer-events-none opacity-60"
              >
                <circle cx="50" cy="50" r="46" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="6,4,2,4" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="#00f0ff" strokeWidth="0.75" strokeDasharray="18,12" />
              </svg>

              {/* Inner Counter-Rotating Golden HUD Ring (Counter-Clockwise) */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_8s_linear_infinite_reverse] pointer-events-none opacity-50"
              >
                <circle cx="50" cy="50" r="38" fill="none" stroke="#ffd700" strokeWidth="1.2" strokeDasharray="10,6" />
                <line x1="50" y1="6" x2="50" y2="14" stroke="#ffd700" strokeWidth="1.5" />
                <line x1="50" y1="86" x2="50" y2="94" stroke="#ffd700" strokeWidth="1.5" />
                <line x1="6" y1="50" x2="14" y2="50" stroke="#ffd700" strokeWidth="1.5" />
                <line x1="86" y1="50" x2="94" y2="50" stroke="#ffd700" strokeWidth="1.5" />
              </svg>

              {/* Pulsing Arc Glow Waves */}
              <div
                className={`absolute rounded-full transition-all duration-300 ${
                  isSpeaking
                    ? 'w-24 h-24 bg-cyan-400/35 animate-ping'
                    : isListening
                    ? 'w-24 h-24 bg-red-500/30 animate-pulse'
                    : 'w-20 h-20 bg-cyan-500/15'
                }`}
              />

              {/* Central Arc Reactor Core */}
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all duration-300 border-2 ${
                  isSpeaking
                    ? 'bg-gradient-to-tr from-cyan-900 via-sky-600 to-cyan-300 border-cyan-200 scale-110'
                    : isListening
                    ? 'bg-gradient-to-tr from-red-900 to-amber-500 border-amber-300 scale-105'
                    : 'bg-gradient-to-tr from-slate-900 via-cyan-950 to-blue-900 border-cyan-400/60'
                }`}
              >
                {/* Arc Reactor Triangular Core SVG */}
                <svg width="28" height="28" viewBox="0 0 40 40" className="animate-pulse">
                  <polygon
                    points="20,6 34,30 6,30"
                    fill="none"
                    stroke={isListening ? "#ff4444" : "#00f0ff"}
                    strokeWidth="2.5"
                    style={{ filter: "drop-shadow(0 0 6px #00f0ff)" }}
                  />
                  <circle
                    cx="20"
                    cy="22"
                    r="5"
                    fill={isListening ? "#ff4444" : "#00f0ff"}
                    className="animate-ping"
                  />
                </svg>
              </div>
            </div>

            {/* Dynamic Waveform Visualizer Bars */}
            <div className="flex items-center gap-1.5 mt-3 h-5">
              {[40, 75, 100, 60, 90, 50, 85, 30].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isSpeaking
                      ? 'bg-cyan-300 shadow-[0_0_8px_#00f0ff] animate-pulse'
                      : isListening
                      ? 'bg-amber-400 animate-bounce'
                      : 'bg-cyan-500/20'
                  }`}
                  style={{
                    height: isSpeaking ? `${Math.max(6, Math.floor(h * Math.random()))}px` : isListening ? `${h * 0.4}px` : '4px',
                    animationDelay: `${i * 70}ms`
                  }}
                />
              ))}
            </div>

            {/* Status text */}
            <div className="text-[10px] font-mono text-cyan-300 mt-2 font-medium tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {isListening
                ? 'AUDIO INGESTION IN PROGRESS...'
                : isSpeaking
                ? 'J.A.R.V.I.S. SYNTHESIZING VOICE...'
                : 'ARC REACTOR 100% // ALL SYSTEMS NOMINAL'}
            </div>
          </div>

          {/* Microphone Out-Loud Button */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={toggleMicListening}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isListening
                  ? 'bg-brand-red text-white border-red-400 animate-pulse'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/10 hover:border-white/20'
              }`}
            >
              {isListening ? <MicOff size={14} /> : <Mic size={14} className="text-emerald-400" />}
              <span>{isListening ? 'Stop Listening' : 'Speak to AI via Mic'}</span>
            </button>

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title="Mute Voice"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <VolumeX size={14} />
              </button>
            )}
          </div>

          {/* Quick Technical Interview Questions */}
          <div className="mt-4 space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
              <span>EXPLORE ARCHITECTURE TOPICS</span>
              <span className="text-slate-500">6 DOSSIERS</span>
            </div>
            {interviewQnA.map(qna => (
              <button
                key={qna.id}
                onClick={() => triggerAnswer(qna)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                  selectedQnA.id === qna.id
                    ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 font-semibold shadow-sm'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-slate-300'
                }`}
              >
                <span className="truncate mr-2">{qna.label}</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase shrink-0 border border-white/10 px-1 rounded">
                  {qna.tags[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Wispr Flow Callout Footnote */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-400 font-light leading-relaxed">
          <span className="text-amber-400 font-medium">⚡ Voice-First Velocity:</span> This entire portfolio was conceptualized and iterated speaking into Wispr Flow voice dictation at 3× typing speed.
        </div>
      </div>

      {/* Right Column: Live Teletype Transcript & Deep Architectural Breakdown */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0b12]">
        {/* Navigation Tabs */}
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-[#121420]/60 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setActiveTab('interview');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'interview'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LIVE TRANSCRIPT
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                setActiveTab('breakdown');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'breakdown'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              KEY TAKEAWAYS ({selectedQnA.keyPoints.length})
            </button>
          </div>

          <button
            onClick={() => triggerAnswer(selectedQnA)}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw size={12} className={isTyping ? 'animate-spin' : ''} />
            <span>Replay</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Question Banner */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              INTERROGATION QUERY
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              "{selectedQnA.query}"
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedQnA.tags.map(t => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {activeTab === 'interview' ? (
            /* Teletype Transcript Answer */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  RESPONSE FROM AAYUSH ASKANDANI
                </span>
                <span>{isTyping ? 'STREAMING...' : 'COMPLETED'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#121422] border border-white/[0.08] shadow-lg leading-relaxed text-sm sm:text-base text-slate-200 font-light relative">
                <p className="whitespace-pre-wrap">{displayedAnswer}</p>
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
                )}
              </div>
            </div>
          ) : (
            /* Key Architectural Takeaways */
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                VERIFIED ARCHITECTURAL HIGHLIGHTS:
              </div>
              {selectedQnA.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3 hover:border-white/20 transition-all"
                >
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Custom Question Input */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-[#121420]/80">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (customQuestion.trim()) {
                handleVoiceSearch(customQuestion.trim());
                setCustomQuestion('');
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={customQuestion}
              onChange={e => setCustomQuestion(e.target.value)}
              placeholder="Ask anything about my projects, architecture, or tech stack..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={!customQuestion.trim()}
              className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redHover disabled:opacity-40 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>Ask</span>
              <Send size={12} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
