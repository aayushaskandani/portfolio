import React, { useState, useRef, useCallback } from 'react';
import { soundFX } from '../../utils/audio';
import { useCanvasCraft } from './CanvasCraftTour';
import { Terminal, Cpu, Database, Activity, GitBranch } from 'lucide-react';

export const WireframeSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const { registerRef } = useCanvasCraft();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section
      ref={(el) => registerRef('wireframeSection', el)}
      id="wireframe"
      className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="mb-10">
        <div className="text-xs font-mono text-brand-red tracking-widest uppercase mb-1">
          02 / PROCESS REVEALED
        </div>
        <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
          FROM WIREFRAME <span className="text-brand-red">TO LIVE.</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-light">
          One interface. Every layer of technical thinking. Drag the divider to reveal how raw architectural wireframes transform into production-grade systems.
        </p>
      </div>

      {/* Interactive Split-Screen Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => {
          isDragging.current = true;
          soundFX.playClick();
        }}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[320px] sm:h-[440px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize bg-[#090b10] touch-none"
      >
        {/* Layer 1 (Full): Live Production System (Right/Underneath) */}
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#12131c] via-[#0d0f18] to-[#08090e]">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="font-mono text-xs text-slate-300 ml-2 hidden sm:inline">
                production-cluster-01.telemetry.live
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                HEALTHY · 99.99%
              </span>
            </div>
          </div>

          {/* High-Fidelity Production Content */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <Cpu size={15} className="text-teal-400" />
                FastAPI Stream Consumer
              </div>
              <div className="font-anton text-2xl sm:text-3xl text-white">48,210 <span className="text-xs font-mono text-slate-500">msg/s</span></div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-teal-400 h-full w-[65%]" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <Activity size={15} className="text-brand-red" />
                P99 Latency SLA
              </div>
              <div className="font-anton text-2xl sm:text-3xl text-brand-red">42ms <span className="text-xs font-mono text-slate-500">p99</span></div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-brand-red h-full w-[24%]" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                <Database size={15} className="text-amber-400" />
                Active Database Pool
              </div>
              <div className="font-anton text-2xl sm:text-3xl text-white">PgBouncer <span className="text-xs font-mono text-emerald-400">SYNC</span></div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-amber-400 h-full w-[45%]" />
              </div>
            </div>
          </div>

          {/* Terminal stream bottom banner */}
          <div className="p-3 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2 text-emerald-400">
              <Terminal size={14} /> [SUCCESS] 0 anomalies detected in last 1,000,000 packets.
            </span>
            <span className="text-slate-500 hidden sm:inline">LIVE PRODUCTION</span>
          </div>
        </div>

        {/* Layer 2 (Clipped): Raw Wireframe Blueprint (Left) */}
        <div
          className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between bg-[#050608] border-r-2 border-cyan-400/80 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {/* Wireframe Grid Blueprint Overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#00ffff 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} 
          />

          {/* Top Wireframe Bar */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-dashed border-cyan-400/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-none border border-cyan-400/60" />
              <span className="w-3 h-3 rounded-none border border-cyan-400/60" />
              <span className="w-3 h-3 rounded-none border border-cyan-400/60" />
              <span className="font-mono text-xs text-cyan-400/80 ml-2 hidden sm:inline">
                &lt;ARCHITECTURAL_BLUEPRINT / SPEC_V1&gt;
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-dashed border-cyan-400/60 text-cyan-400">
              WIREFRAME STATE
            </span>
          </div>

          {/* Wireframe Mock Blocks */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto">
            <div className="p-4 rounded border border-dashed border-cyan-400/40 bg-cyan-950/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 mb-2">
                <GitBranch size={15} />
                [STREAM_INGESTOR]
              </div>
              <div className="font-mono text-xl text-cyan-300">RAW_SOCKET()</div>
              <div className="text-[10px] font-mono text-cyan-400/60 mt-2">Buffer: CircularQueue(1024)</div>
            </div>

            <div className="p-4 rounded border border-dashed border-cyan-400/40 bg-cyan-950/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 mb-2">
                <Activity size={15} />
                [SLA_THRESHOLD]
              </div>
              <div className="font-mono text-xl text-cyan-300">&lt;50MS_GOAL</div>
              <div className="text-[10px] font-mono text-cyan-400/60 mt-2">Constraint: Zero-alloc heap</div>
            </div>

            <div className="p-4 rounded border border-dashed border-cyan-400/40 bg-cyan-950/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 mb-2">
                <Database size={15} />
                [POOL_STRATEGY]
              </div>
              <div className="font-mono text-xl text-cyan-300">QUEUE_LIMIT</div>
              <div className="text-[10px] font-mono text-cyan-400/60 mt-2">Driver: AsyncPG + PgBouncer</div>
            </div>
          </div>

          {/* Wireframe bottom bar */}
          <div className="relative z-10 p-3 rounded border border-dashed border-cyan-400/40 font-mono text-xs text-cyan-400 flex items-center justify-between bg-cyan-950/20">
            <span>// ARCHITECTURE SPEC: Deterministic resilience guarantees</span>
            <span className="hidden sm:inline">BLUEPRINT REVEALED</span>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center font-mono text-[10px] font-bold shadow-lg shadow-cyan-400/50">
            ⇄
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mt-3 px-1">
        <span>← Wireframe Blueprint</span>
        <span>Drag to compare</span>
        <span>Live Production UI →</span>
      </div>
    </section>
  );
};

