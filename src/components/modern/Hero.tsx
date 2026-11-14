import React from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { ArrowDownRight, Terminal, Layers, Mic, ExternalLink } from 'lucide-react';

interface HeroProps {
  onSwitchToOS: (openAppId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSwitchToOS }) => {
  const { personal } = portfolioConfig;

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh] overflow-hidden select-none font-sans">
      {/* Giant Watermark Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <span 
          className="font-anton text-[18vw] sm:text-[19vw] leading-none tracking-tight block text-brand-red/[0.04] sm:text-brand-red/[0.07] scale-y-110 drop-shadow-[0_10px_50px_rgba(255,59,59,0.08)]"
          style={{ WebkitTextStroke: "1px rgba(255, 59, 59, 0.12)" }}
        >
          ENGINEER
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Headline and Bio */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-5">
          {/* Handwritten greeting */}
          <div className="flex items-center gap-3">
            <span className="font-caveat text-2xl sm:text-3xl text-amber-300 rotate-[-3deg] inline-block">
              {personal.greeting}
            </span>
            <span className="h-[1px] w-12 bg-amber-300/40" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {personal.statusBadge}
            </span>
          </div>

          {/* Name Headline */}
          <h1 className="font-anton text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.92] text-white">
            {personal.name.toUpperCase()}
            <span className="text-brand-red inline-block ml-2 sm:ml-3 animate-pulse">.</span>
          </h1>

          {/* Title and Bio */}
          <div className="space-y-3 max-w-xl">
            <h2 className="text-lg sm:text-xl font-medium text-slate-200">
              {personal.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              {personal.shortBio}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#work"
              onClick={() => soundFX.playClick()}
              className="px-5 py-3 rounded-xl bg-brand-red hover:bg-brand-redHover text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-brand-red/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowDownRight size={16} />
            </a>

            <button
              onClick={() => {
                soundFX.playVoiceChime();
                onSwitchToOS("interview");
              }}
              className="px-5 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              <Mic size={15} className="text-emerald-400" />
              <span>Live AI Interview</span>
            </button>

            <button
              onClick={() => {
                soundFX.playWindowOpen();
                onSwitchToOS("terminal");
              }}
              className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-200 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Terminal size={15} className="text-cyan-400" />
              <span>PowerShell 7</span>
            </button>

            <button
              onClick={() => {
                soundFX.playWindowOpen();
                onSwitchToOS("builder");
              }}
              className="px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Layers size={14} className="text-teal-400" />
              <span>Builder Lab</span>
            </button>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-500">
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              GitHub <ExternalLink size={11} />
            </a>
            <span>/</span>
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              LinkedIn <ExternalLink size={11} />
            </a>
            <span>/</span>
            <span className="text-slate-400">{personal.location}</span>
          </div>
        </div>

        {/* Right Column: Key Metrics Bento Box */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group">
            <div className="font-anton text-4xl sm:text-5xl text-brand-red group-hover:scale-105 transition-transform">
              359+
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300 mt-2 font-semibold">
              GCP Labs Completed
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Arcade Legend · 121 Skill Badges · 55k+ Points
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group">
            <div className="font-anton text-4xl sm:text-5xl text-teal-400 group-hover:scale-105 transition-transform">
              200+
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300 mt-2 font-semibold">
              Students Coordinated
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              GDG on Campus Coordinator & Training Lead
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group">
            <div className="font-anton text-4xl sm:text-5xl text-amber-400 group-hover:scale-105 transition-transform">
              &lt;15ms
            </div>
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300 mt-2 font-semibold">
              Redirect Latency
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Redis Cache-Aside Layer & Base62 Architecture
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-red/10 to-teal-900/10 border border-white/10 hover:border-brand-red/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-brand-red uppercase tracking-widest font-semibold">
                SYSTEM PHILOSOPHY
              </div>
              <p className="text-xs text-slate-300 mt-2 font-light italic leading-relaxed">
                "Deterministic state, O(1) performance."
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-white/10 mt-3">
              Poornima University · B.Tech CSE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
