import React, { useState } from 'react';
import { soundFX } from '../../utils/audio';

const SPIDEY_QUOTES = [
  "Hey! Friendly neighborhood engineer. Need full-stack systems web-slinged into production? 🕷️",
  "Spidey-Sense is tingling... Looks like you've found the right candidate for your engineering team! ⚡",
  "With great computing power comes great architectural responsibility. 🕸️",
  "Just hanging out while background microservices achieve sub-15ms latencies! 🚀",
  "Did somebody say web developer? I literally build webs all day. 🕸️",
  "Stark Tech nanotech suit upgraded with React 19, Redis cache-aside, and Docker! 🤖"
];

export const SpiderHanging: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isThwipping, setIsThwipping] = useState(false);
  const [thwipRipples, setThwipRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleSpideyClick = (e: React.MouseEvent) => {
    soundFX.playWebThwip();
    setIsThwipping(true);
    setQuoteIndex((prev) => (prev + 1) % SPIDEY_QUOTES.length);

    // Trigger visual web ripple
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
    setThwipRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setIsThwipping(false);
    }, 400);

    setTimeout(() => {
      setThwipRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  return (
    <>
      {/* Web Ripple Effects */}
      {thwipRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[140] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        >
          {/* Expanding Web SVG Particle */}
          <svg width="120" height="120" viewBox="0 0 100 100" className="animate-ping opacity-70">
            <line x1="50" y1="50" x2="10" y2="10" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="90" y2="10" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="90" y2="90" stroke="#00f0ff" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="10" y2="90" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#00f0ff" strokeWidth="1" />
          </svg>
        </div>
      ))}

      {/* Spider-Man Reverse Hanging Container */}
      <div
        className="fixed top-0 right-16 sm:right-28 z-40 select-none pointer-events-auto cursor-pointer group"
        onClick={handleSpideyClick}
        onMouseEnter={() => {
          setIsHovered(true);
          soundFX.playClick();
        }}
        onMouseLeave={() => setIsHovered(false)}
        title="Friendly neighborhood developer — Click for Web-Thwip!"
      >
        {/* Web Strand descending from screen ceiling */}
        <div className="relative w-0.5 mx-auto">
          {/* Silvery glowing web thread */}
          <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-white/90 via-cyan-200/80 to-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          {/* Dewdrop sparkle */}
          <span className="absolute top-10 -left-0.5 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px] animate-pulse" />
        </div>

        {/* Upside Down Hanging Spider-Man with physics pendulum sway */}
        <div
          className={`relative transition-transform duration-300 origin-top will-change-transform ${
            isThwipping ? 'scale-110 -translate-y-2' : ''
          }`}
          style={{
            animation: isThwipping ? 'none' : 'spiderSway 4s ease-in-out infinite'
          }}
        >
          {/* SVG Vector Upside-Down Spider-Man */}
          <svg
            width="48"
            height="68"
            viewBox="0 0 48 68"
            fill="none"
            className="drop-shadow-[0_8px_20px_rgba(255,59,59,0.35)] hover:drop-shadow-[0_8px_25px_rgba(0,240,255,0.6)] transition-all"
          >
            {/* Hanging Web Loop around feet */}
            <path d="M24 0 L24 8 Q24 14 21 16" stroke="#ffffff" strokeWidth="1.5" />

            {/* Legs (Upside down, crossed in iconic Spidey pose) */}
            <path
              d="M21 16 C16 12 12 18 17 25 C19 28 22 30 22 34"
              stroke="#0066cc"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M23 16 C28 12 32 18 27 25 C25 28 22 30 22 34"
              stroke="#cc1122"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Boots / Feet hanging from line */}
            <circle cx="21" cy="14" r="3" fill="#cc1122" />
            <circle cx="25" cy="14" r="3" fill="#cc1122" />

            {/* Torso (Iron Spider / Classic red & blue nanotech) */}
            <path
              d="M17 32 C15 36 15 44 18 48 C20 50 28 50 30 48 C33 44 33 36 31 32 Z"
              fill="#cc1122"
              stroke="#111"
              strokeWidth="1"
            />
            {/* Blue Side Panels */}
            <path d="M17 36 C16 40 16 44 18 46 L21 44 L20 36 Z" fill="#0066cc" />
            <path d="M31 36 C32 40 32 44 30 46 L27 44 L28 36 Z" fill="#0066cc" />

            {/* Chest Spider Emblem (Gold Nanotech / Classic Black) */}
            <path
              d="M24 38 L22 41 L20 40 M24 38 L26 41 L28 40 M24 44 L22 46 L20 45 M24 44 L26 46 L28 45"
              stroke="#ffd700"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <ellipse cx="24" cy="41" rx="2" ry="3" fill="#111" />

            {/* Arms (Resting comfortably / folded upside down) */}
            <path
              d="M17 34 C12 38 12 44 16 48"
              stroke="#cc1122"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M31 34 C36 38 36 44 32 48"
              stroke="#cc1122"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Hands with web shooter bracers */}
            <circle cx="16" cy="49" r="2.5" fill="#ffd700" />
            <circle cx="32" cy="49" r="2.5" fill="#ffd700" />

            {/* Head (Upside down, at the bottom) */}
            <ellipse cx="24" cy="56" rx="9" ry="11" fill="#cc1122" stroke="#111" strokeWidth="1" />

            {/* Web lines on mask */}
            <path d="M24 45 L24 67 M15 56 L33 56" stroke="#880000" strokeWidth="0.75" />
            <ellipse cx="24" cy="56" rx="5" ry="6" fill="none" stroke="#880000" strokeWidth="0.75" />

            {/* Big expressive Spider-Man Eyes (White with black border) */}
            {/* Left Eye */}
            <path
              d={isHovered ? "M19 54 Q21 52 23 55 Q21 55 19 54 Z" : "M17 53 Q21 50 23 57 Q19 57 17 53 Z"}
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="1.2"
              className="transition-all duration-200"
            />
            {/* Right Eye */}
            <path
              d={isHovered ? "M29 54 Q27 52 25 55 Q27 55 29 54 Z" : "M31 53 Q27 50 25 57 Q29 57 31 53 Z"}
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="1.2"
              className="transition-all duration-200"
            />
          </svg>

          {/* "THWIP!" badge indicator on hover */}
          <div className="text-center mt-1">
            <span className="text-[9px] font-mono font-bold text-red-400 bg-black/80 px-1.5 py-0.5 rounded-full border border-red-500/40 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
              {isThwipping ? "⚡ THWIP!" : "🕸️ SPIDEY"}
            </span>
          </div>
        </div>

        {/* Interactive Comic Speech Bubble */}
        <div
          className={`absolute top-28 right-0 w-64 p-3 rounded-2xl bg-[#0e101a]/95 backdrop-blur-xl border border-red-500/30 shadow-2xl transition-all duration-300 pointer-events-none z-50 ${
            isHovered
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          {/* Small Speech Pointer Triangle */}
          <div className="absolute -top-1.5 right-6 w-3 h-3 bg-[#0e101a] border-t border-l border-red-500/30 rotate-45" />

          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
            <span className="text-[10px] font-mono text-red-400 font-bold flex items-center gap-1">
              <span>🕷️ PETER PARKER PROTOCOL</span>
            </span>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.2 rounded">
              CLICK TO THWIP
            </span>
          </div>

          <p className="text-xs text-slate-200 font-sans leading-snug">
            "{SPIDEY_QUOTES[quoteIndex]}"
          </p>

          <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>Stark Suit Nanotech</span>
            <span className="text-emerald-400">● Web Active</span>
          </div>
        </div>
      </div>

      {/* Spider-Man pendulum sway keyframes in style tag */}
      <style>{`
        @keyframes spiderSway {
          0% { transform: rotate(-4deg); }
          50% { transform: rotate(4.5deg); }
          100% { transform: rotate(-4deg); }
        }
      `}</style>
    </>
  );
};
