import React, { useState, useEffect, createContext, useContext } from 'react';
import { soundFX } from '../../utils/audio';
import { Zap, ShieldCheck, Activity, Terminal, X, Volume2, Sparkles, ChevronRight, Eye, Crosshair } from 'lucide-react';

interface StarkHudContextType {
  isStarkHudActive: boolean;
  toggleStarkHud: () => void;
  triggerSpiderSense: () => void;
}

const StarkHudContext = createContext<StarkHudContextType>({
  isStarkHudActive: false,
  toggleStarkHud: () => {},
  triggerSpiderSense: () => {}
});

export const useStarkHud = () => useContext(StarkHudContext);

const JARVIS_DOSSIERS = [
  {
    topic: "SYSTEM ARCHITECTURE & LATENCY",
    badge: "LINKFORGE // REDIS CACHE-ASIDE",
    summary: "Sub-15ms redirect latency achieved via Base62 encoding and Redis cache-aside design. Sliding-window rate limiting guarantees zero API saturation under surge traffic.",
    telemetry: { p99: "12.4ms", resilience: "99.98%", failover: "<50ms" }
  },
  {
    topic: "REAL-TIME DISTRIBUTED CONCURRENCY",
    badge: "SYNCBOARD // POSTGRESQL + SOCKETS",
    summary: "Optimistic UI state with React 19 coupled to O(1) PostgreSQL fractional re-indexing. Board-scoped Socket.IO rooms ensure zero cross-tenant broadcast leakage.",
    telemetry: { throughput: "14.2k ops/s", concurrency: "100%", drift: "0.00%" }
  },
  {
    topic: "OFFLINE PWA & COGNITIVE NAVIGATION",
    badge: "TREKPEDIA // SERVICE WORKERS + CLAUDE API",
    summary: "Complete offline-first expedition atlas spanning 210+ Himalayan treks. Dynamic service worker caching ensures full offline maps even in remote dead-zones.",
    telemetry: { cachedRoutes: "210+", offlineReadiness: "100%", pwaScore: "98/100" }
  },
  {
    topic: "CLOUD INFRASTRUCTURE & AUTOMATION",
    badge: "GOOGLE CLOUD ARCADE LEGEND",
    summary: "359 hands-on cloud labs completed across Compute Engine, GKE, BigQuery, and IAM. 121 verified skill badges and 55,267 earned infrastructure points.",
    telemetry: { labs: "359", courses: "76", badges: "121", rank: "LEGEND" }
  }
];

export const StarkHudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isStarkHudActive, setIsStarkHudActive] = useState<boolean>(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
  const [activeDossierIndex, setActiveDossierIndex] = useState<number>(0);
  const [spiderSensePulse, setSpiderSensePulse] = useState<boolean>(false);

  const toggleStarkHud = () => {
    soundFX.playJarvisChime();
    setIsStarkHudActive(prev => !prev);
  };

  const triggerSpiderSense = () => {
    soundFX.playSpiderSenseAlert();
    setSpiderSensePulse(true);
    setTimeout(() => setSpiderSensePulse(false), 800);
  };

  return (
    <StarkHudContext.Provider value={{ isStarkHudActive, toggleStarkHud, triggerSpiderSense }}>
      {children}

      {/* STARK TACTICAL HUD OVERLAY (When Toggled Active) */}
      {isStarkHudActive && (
        <div className="fixed inset-0 pointer-events-none z-[80] select-none overflow-hidden">
          {/* Holographic Cyan Scanline sweeping down */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,240,255,0.04)_51%,transparent_52%)] bg-[length:100%_8px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_15px_#00f0ff] animate-[starkScan_4s_linear_infinite]" />

          {/* Top HUD Telemetry Ribbon */}
          <div className="absolute top-2 left-6 right-6 hidden md:flex items-center justify-between text-[10px] font-mono text-cyan-400 bg-[#060810]/85 px-4 py-1.5 rounded-lg border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold tracking-widest uppercase">STARK TACTICAL VISION // MK-85</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">TARGET: AAYUSH_ASKANDANI.SYS</span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-400 font-semibold">ARC REACTOR: OPTIMAL</span>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <span>LATENCY: &lt;15ms</span>
              <span>GRID: 60 FPS</span>
              <button
                onClick={toggleStarkHud}
                className="pointer-events-auto text-xs px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 cursor-pointer"
              >
                Exit HUD (Esc)
              </button>
            </div>
          </div>

          {/* 4 Viewport Corner Targeting Brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-70" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-70" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-70" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-70" />
        </div>
      )}

      {/* Spider-Sense Precognitive Wave Ripple on Screen */}
      {spiderSensePulse && (
        <div className="fixed inset-0 pointer-events-none z-[90] flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border-2 border-red-500/80 shadow-[0_0_60px_rgba(239,68,68,0.6)] animate-ping opacity-75" />
          <div className="w-[300px] h-[300px] rounded-full border-2 border-amber-400/90 shadow-[0_0_40px_rgba(245,158,11,0.5)] animate-ping opacity-90" style={{ animationDuration: '0.4s' }} />
        </div>
      )}

      {/* FLOATING STARK ARC REACTOR / J.A.R.V.I.S. DOCK BEACON (Bottom Right) */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[95] select-none flex flex-col items-end gap-2">
        {/* Expanded Quick Menu Pill on Hover/Active */}
        <div className="flex items-center gap-2 bg-[#090d1a]/95 backdrop-blur-xl border border-cyan-500/40 p-1.5 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.25)] text-xs font-mono">
          {/* Tactical HUD Toggle */}
          <button
            onClick={toggleStarkHud}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              isStarkHudActive
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_#00f0ff]'
                : 'hover:bg-cyan-500/20 text-cyan-300'
            }`}
            title="Toggle Stark Tactical HUD overlay"
          >
            <Crosshair size={13} className={isStarkHudActive ? 'animate-spin' : ''} />
            <span className="hidden sm:inline font-semibold">
              {isStarkHudActive ? 'HUD ACTIVE' : 'STARK HUD'}
            </span>
          </button>

          {/* Spider-Sense Quick Pulse */}
          <button
            onClick={triggerSpiderSense}
            className="px-2.5 py-1.5 rounded-full hover:bg-red-500/20 text-rose-400 hover:text-white transition-all cursor-pointer flex items-center gap-1"
            title="Trigger Spider-Sense Architecture Scan"
          >
            <Zap size={13} />
            <span className="hidden sm:inline text-[11px]">SPIDER-SENSE</span>
          </button>

          {/* J.A.R.V.I.S. Interactive Console Trigger */}
          <button
            onClick={() => {
              soundFX.playJarvisChime();
              setIsConsoleOpen(true);
            }}
            className="relative p-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-400/50 text-cyan-300 hover:text-white transition-all cursor-pointer group"
            title="Open J.A.R.V.I.S. Intelligence Dossier"
          >
            {/* Animated Rotating Arc Reactor Core SVG */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              {/* Outer Counter-Rotating Dashed Ring */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  opacity="0.8"
                />
              </svg>
              {/* Inner Pulsing Triangle Arc Reactor Core */}
              <div className="w-3 h-3 bg-gradient-to-tr from-cyan-400 to-amber-300 rounded-sm shadow-[0_0_8px_#00f0ff] animate-pulse" />
            </div>
          </button>
        </div>
      </div>

      {/* J.A.R.V.I.S. HOLOGRAPHIC INTELLIGENCE CONSOLE MODAL */}
      {isConsoleOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none">
          <div
            className="relative w-full max-w-2xl bg-[#070a14]/95 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.3)] text-white overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
            }}
          >
            {/* Holographic Matrix Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#00f0ff15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* Top Console Header */}
            <div className="relative flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span>STARK INDUSTRIES // ARTIFICIAL INTELLIGENCE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <h3 className="font-anton text-2xl text-white tracking-wide">
                    J.A.R.V.I.S. // ARCHITECTURAL DOSSIER
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsConsoleOpen(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dossier Tabs */}
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 font-mono text-[11px]">
              {JARVIS_DOSSIERS.map((dossier, idx) => (
                <button
                  key={dossier.badge}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveDossierIndex(idx);
                  }}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    activeDossierIndex === idx
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <div className="text-[9px] text-slate-400 truncate">SYS_0{idx + 1}</div>
                  <div className="font-bold truncate mt-0.5 text-white">{dossier.badge.split('//')[0].trim()}</div>
                </button>
              ))}
            </div>

            {/* Active Dossier Content */}
            <div className="relative p-5 rounded-xl bg-white/[0.03] border border-cyan-500/20 space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                <span className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400" />
                  {JARVIS_DOSSIERS[activeDossierIndex].topic}
                </span>
                <span className="text-cyan-400 text-[10px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {JARVIS_DOSSIERS[activeDossierIndex].badge}
                </span>
              </div>

              <p className="text-sm font-sans text-slate-200 leading-relaxed font-light">
                "{JARVIS_DOSSIERS[activeDossierIndex].summary}"
              </p>

              {/* Telemetry Matrix Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-cyan-500/20 text-center">
                {Object.entries(JARVIS_DOSSIERS[activeDossierIndex].telemetry).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-lg bg-[#050811] border border-cyan-500/25">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">{key}</div>
                    <div className="text-sm font-bold text-cyan-300 mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="relative mt-6 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>VOICE SYNTHESIS: WEBAUDIO_64K</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={triggerSpiderSense}
                  className="px-3.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Zap size={13} />
                  <span>Run Spider-Sense Scan</span>
                </button>

                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  Close Console
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Keyframes for Stark HUD scanning */}
      <style>{`
        @keyframes starkScan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </StarkHudContext.Provider>
  );
};