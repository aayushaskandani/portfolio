import React from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { useCanvasCraft } from './CanvasCraftTour';
import { ShieldCheck, Sparkles, Award, CheckCircle2, Cloud, Cpu, Terminal } from 'lucide-react';

export const CraftSection: React.FC = () => {
  const { arsenal, personal } = portfolioConfig;
  const { registerRef, isElementCrafted, manuallyCraft } = useCanvasCraft();

  const craftCards = [
    {
      id: "craftCard0",
      title: "Resilient Systems First",
      desc: "Architected LinkForge with Redis cache-aside & sliding-window rate limiters for sub-15ms redirects.",
      icon: ShieldCheck,
      iconBg: "bg-brand-red/10 text-brand-red",
      sound: 650
    },
    {
      id: "craftCard1",
      title: "Real-Time Concurrency",
      desc: "Designed SyncBoard with O(1) PostgreSQL fractional indexing and scoped Socket.IO rooms.",
      icon: Cpu,
      iconBg: "bg-emerald-500/10 text-emerald-400",
      sound: 680
    },
    {
      id: "craftCard2",
      title: "Cloud Arcade Legend",
      desc: "Completed 359 hands-on Google Cloud labs, 76 courses, and earned 121 verified skill badges.",
      icon: Cloud,
      iconBg: "bg-cyan-500/10 text-cyan-400",
      sound: 710
    }
  ];

  return (
    <section
      ref={(el) => registerRef('craftSection', el)}
      id="craft"
      className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
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
            {craftCards.map((card, idx) => {
              const crafted = isElementCrafted(card.id);
              const Icon = card.icon;

              return (
                <div
                  key={card.id}
                  ref={(el) => registerRef(card.id, el)}
                  onClick={() => {
                    if (!crafted) manuallyCraft(card.id, card.sound);
                  }}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-300 relative select-none ${
                    crafted
                      ? "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                      : "border-dashed border-cyan-400/30 bg-cyan-400/[0.02] cursor-pointer hover:border-cyan-400/60 opacity-60"
                  }`}
                  title={crafted ? card.title : `Click to craft ${card.title}`}
                >
                  <div className={`p-2.5 rounded-lg ${card.iconBg} shrink-0 mt-0.5`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-white">{card.title}</h4>
                      {!crafted && (
                        <span className="text-[9px] font-mono text-cyan-400 border border-cyan-400/40 px-1 py-0.5 rounded animate-pulse">
                          CRAFT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
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
                Multiplayer selector boxes craft each tool
              </p>
            </div>

            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20 whitespace-nowrap shrink-0">
              12 CRAFTED BOXES
            </span>
          </div>

          {/* 12 Grid Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {arsenal.map((item, index) => {
              const boxId = `arsenal${index}`;
              const crafted = isElementCrafted(boxId);

              return (
                <div
                  key={item.name}
                  ref={(el) => registerRef(boxId, el)}
                  onClick={() => {
                    if (!crafted) manuallyCraft(boxId, 720 + index * 25);
                  }}
                  className={`p-3 rounded-xl border transition-all duration-300 relative select-none ${
                    crafted
                      ? "bg-white/[0.04] border-white/[0.15] hover:border-brand-red/50 shadow-md shadow-black/30 hover:-translate-y-0.5"
                      : "border-dashed border-cyan-400/40 bg-cyan-400/[0.02] hover:border-cyan-400/80 cursor-pointer opacity-70"
                  }`}
                  title={crafted ? `${item.name} (Crafted)` : `Click to craft ${item.name}`}
                >
                  {crafted ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-white truncate mr-1">
                          {item.name}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                        {item.category}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-3 w-16 bg-cyan-400/20 rounded font-mono text-[9px] text-cyan-300 flex items-center px-1 truncate">
                          {item.name.slice(0, 9)}
                        </div>
                        <div className="h-2 w-10 bg-cyan-400/10 rounded mt-1.5" />
                      </div>
                      <span className="text-[8px] font-mono text-cyan-400 border border-cyan-400/40 px-1 py-0.5 rounded">
                        BOX_{index + 1}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-cyan-400">
              Auto-Spanning Animated Canvas Active
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Synthesizer Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
