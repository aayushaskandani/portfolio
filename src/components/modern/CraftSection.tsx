import React, { useState } from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { ShieldCheck, Sparkles, Award, CheckCircle2 } from 'lucide-react';

export const CraftSection: React.FC = () => {
  const { arsenal, personal } = portfolioConfig;
  const [craftedSet, setCraftedSet] = useState<Set<number>>(new Set([0, 1, 2])); // initial 3 unlocked
  const [isSimulating, setIsSimulating] = useState(false);

  const toggleCraft = (index: number) => {
    soundFX.playFrequency(720 + index * 25, 0.08);
    setCraftedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const autoCraftAll = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step >= arsenal.length) {
        clearInterval(interval);
        setIsSimulating(false);
        soundFX.playBeep();
        return;
      }
      soundFX.playFrequency(700 + step * 30, 0.06);
      const current = step;
      setCraftedSet((prev) => new Set([...prev, current]));
      step++;
    }, 90);
  };

  return (
    <section id="craft" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Philosophy & Craft Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-mono text-brand-red tracking-widest uppercase mb-1">
              03 / BEHIND THE CRAFT
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
              MORE THAN CODE.<br />
              <span className="text-brand-red">CRAFTING EXPERIENCES.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mt-3">
              {personal.philosophy}
            </p>
          </div>

          {/* 3 Core Highlight Cards */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-brand-red/40 transition-all">
              <div className="p-2.5 rounded-lg bg-brand-red/10 text-brand-red shrink-0 mt-0.5">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Resilient Systems Architecture</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Engineered distributed simulations with circuit breakers, idempotency keys, and sub-100ms P99 SLAs under cascading failures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">AI Evaluation & Prompt Guardrails</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Evaluated model factuality, instruction-following, and built strict source-grounded RAG pipelines to eliminate hallucinations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition-all">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                <Award size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Cloud Infrastructure & Telemetry</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Certified Cloud Developer with hands-on container orchestration, PgBouncer pooling, Redis buffering, and WebSocket streaming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Arsenal 12 Boxes */}
        <div className="lg:col-span-6 p-5 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-2xl">
          <div className="flex items-center justify-between mb-6 gap-2">
            <div>
              <h3 className="font-anton text-2xl text-white tracking-wide">
                ENGINEERING ARSENAL
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Tap any box to synthesize audio & craft
              </p>
            </div>

            <button
              onClick={autoCraftAll}
              disabled={isSimulating}
              className="px-3 py-1.5 rounded-lg bg-brand-red/15 hover:bg-brand-red text-brand-red hover:text-white border border-brand-red/30 font-mono text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={12} className={isSimulating ? "animate-spin" : ""} />
              <span>{isSimulating ? "Crafting..." : "Auto-Craft All"}</span>
            </button>
          </div>

          {/* 12 Grid Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {arsenal.map((item, index) => {
              const isCrafted = craftedSet.has(index);

              return (
                <div
                  key={item.name}
                  onClick={() => toggleCraft(index)}
                  className={`p-3 rounded-xl border transition-all duration-300 relative select-none cursor-pointer ${
                    isCrafted
                      ? "bg-white/[0.04] border-white/[0.15] hover:border-brand-red/50 shadow-md shadow-black/30 hover:-translate-y-0.5"
                      : "border-dashed border-cyan-400/40 bg-cyan-400/[0.02] hover:border-cyan-400 opacity-60"
                  }`}
                  title={isCrafted ? `${item.name} (Crafted)` : `Click to craft ${item.name}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white truncate mr-1">
                      {item.name}
                    </span>
                    {isCrafted ? (
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[9px] font-mono text-cyan-400 animate-pulse shrink-0">
                        CRAFT
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                    {item.category}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Crafted: {craftedSet.size} / {arsenal.length}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Web Audio Synthesizer Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

