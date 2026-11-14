import React, { useState, useEffect, useRef } from 'react';
import { soundFX } from '../../utils/audio';
import { Zap, ShieldCheck, Crosshair, Sparkles, Terminal, Activity, RefreshCw } from 'lucide-react';
import { useStarkHud } from './StarkJarvisHUD';

export const IronSpiderSuspension: React.FC = () => {
  const { isStarkHudActive, triggerSpiderSense } = useStarkHud();
  const [pullY, setPullY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [eyeTracking, setEyeTracking] = useState({ x: 0, y: 0, angle: 0 });
  const [webFired, setWebFired] = useState(false);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'nanotech' | 'spidersense' | 'architecture'>('nanotech');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const startDragY = useRef(0);

  // Dynamic eye and laser angle tracking towards cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + 100; // Anchor around the ocular unit

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      // Max eye pupil shift is 4px
      const maxShift = 4.2;
      const shiftX = Math.cos(angle) * Math.min(maxShift, dist / 60);
      const shiftY = Math.sin(angle) * Math.min(maxShift, dist / 60);

      setEyeTracking({
        x: shiftX,
        y: shiftY,
        angle: angle * (180 / Math.PI)
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Drag and spring bounce physics
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startDragY.current = e.clientY - pullY;
    soundFX.playHydraulicServo();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newY = Math.max(0, Math.min(70, e.clientY - startDragY.current));
      setPullY(newY);
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      // Damped harmonic oscillation release
      soundFX.playWebThwip();
      setPullY(-12);
      setTimeout(() => setPullY(6), 140);
      setTimeout(() => setPullY(-3), 260);
      setTimeout(() => setPullY(0), 380);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleShootWebs = () => {
    soundFX.playWebThwip();
    setWebFired(true);
    triggerSpiderSense();
    setTimeout(() => setWebFired(false), 2400);
  };

  return (
    <div
      ref={containerRef}
      className="relative p-6 sm:p-8 rounded-2xl bg-[#070a14]/90 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden select-none"
    >
      {/* Background Stark Hexagonal Blueprint Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff10_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              STARK INDUSTRIES LABS // MK-L
            </span>
          </div>
          <h3 className="font-anton text-2xl text-white tracking-wide mt-0.5">
            IRON SPIDER SUSPENSION UNIT
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShootWebs}
            className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
            title="Deploy High-Tensile Web Strands"
          >
            <Zap size={13} />
            <span>THWIP // WEBS</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Cybernetic Inverted Suspension Apparatus */}
        <div className="md:col-span-5 flex flex-col items-center justify-start min-h-[280px] relative">
          {/* Ceiling Winch Mount */}
          <div className="w-16 h-3 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 rounded-b-md border-x border-b border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] flex items-center justify-center">
            <div className="w-2 h-1 bg-amber-400 rounded-sm" />
          </div>

          {/* High-Tensile Suspended Carbon-Nanotube Fiber */}
          <div
            className="relative flex flex-col items-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseEnter={() => {
              setIsHovered(true);
              soundFX.playHydraulicServo();
            }}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: `translate3d(0, ${pullY}px, 0)`,
              transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            {/* Cable Strand */}
            <div className="w-0.5 h-16 sm:h-20 bg-gradient-to-b from-cyan-300 via-white to-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] relative">
              {/* Cable Pulley clamp */}
              <div className="absolute top-1/2 -left-1 w-2.5 h-1.5 bg-amber-400 rounded-xs border border-amber-300 shadow" />
            </div>

            {/* Inverted Cybernetic Stark Iron Spider Ocular Chassis */}
            <div
              className={`relative transition-transform duration-300 ${
                isHovered ? 'scale-105' : ''
              }`}
            >
              {/* Mechanical Armor Chassis (Inverted Silhouette) */}
              <svg
                width="74"
                height="82"
                viewBox="0 0 74 82"
                fill="none"
                className="drop-shadow-[0_12px_30px_rgba(225,29,72,0.5)] transition-all"
              >
                <defs>
                  {/* Metallic Crimson Titanium Gradient */}
                  <linearGradient id="ironTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="40%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>

                  {/* Stark Gold Nanotech Circuitry */}
                  <linearGradient id="starkGoldCircuit" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#eab308" />
                    <stop offset="50%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>

                  {/* Carbon-Fiber Inlay */}
                  <linearGradient id="carbonInlay" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#090d16" />
                  </linearGradient>

                  {/* Glowing Ocular Lens Filter */}
                  <filter id="lensCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Cybernetic Armor Outer Shell (Inverted Wedge) */}
                <path
                  d="M37 78 L14 56 L12 24 L37 4 L62 24 L60 56 Z"
                  fill="url(#ironTitanium)"
                  stroke="url(#starkGoldCircuit)"
                  strokeWidth="1.8"
                />

                {/* Carbon Fiber Cheek Vents */}
                <path
                  d="M16 28 L28 38 L24 50 L14 42 Z"
                  fill="url(#carbonInlay)"
                  stroke="#eab308"
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                <path
                  d="M58 28 L46 38 L50 50 L60 42 Z"
                  fill="url(#carbonInlay)"
                  stroke="#eab308"
                  strokeWidth="0.8"
                  opacity="0.9"
                />

                {/* Stark Nanotech Geometric Grooves */}
                <path
                  d="M37 4 L37 32 M37 32 L24 48 M37 32 L50 48 M20 18 L37 26 L54 18 M16 46 L37 54 L58 46"
                  stroke="#450a0a"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Left Dynamic Mechanical Aperture Eye */}
                <g transform={`translate(${eyeTracking.x * 0.4}, ${eyeTracking.y * 0.4})`}>
                  {/* Outer Mechanical Iris Bevel */}
                  <path
                    d={
                      isHovered
                        ? "M18 32 Q28 35 34 32 Q26 44 18 32 Z" // Aggressive tactical squint
                        : "M16 30 Q28 36 34 32 Q26 48 16 30 Z"
                    }
                    fill="#030712"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                    filter="url(#lensCyanGlow)"
                    className="transition-all duration-150"
                  />
                  {/* Inner Optical Reticle / Pupil */}
                  <circle
                    cx={24 + eyeTracking.x}
                    cy={38 + eyeTracking.y}
                    r="2.2"
                    fill="#00f0ff"
                    className="animate-pulse"
                  />
                </g>

                {/* Right Dynamic Mechanical Aperture Eye */}
                <g transform={`translate(${eyeTracking.x * 0.4}, ${eyeTracking.y * 0.4})`}>
                  {/* Outer Mechanical Iris Bevel */}
                  <path
                    d={
                      isHovered
                        ? "M56 32 Q46 35 40 32 Q48 44 56 32 Z"
                        : "M58 30 Q46 36 40 32 Q48 48 58 30 Z"
                    }
                    fill="#030712"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                    filter="url(#lensCyanGlow)"
                    className="transition-all duration-150"
                  />
                  {/* Inner Optical Reticle / Pupil */}
                  <circle
                    cx={50 + eyeTracking.x}
                    cy={38 + eyeTracking.y}
                    r="2.2"
                    fill="#00f0ff"
                    className="animate-pulse"
                  />
                </g>

                {/* Inverted Apex Core Diode */}
                <circle cx="37" cy="74" r="2" fill="#eab308" />
              </svg>

              {/* Status Pill Badge */}
              <div className="text-center mt-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-[#04060d]/90 px-2.5 py-0.5 rounded-full border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.3)] inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SUSPENSION // ACTIVE</span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-3 text-center">
            Pull & release cable for spring physics
          </div>

          {/* Web Strands shooting to card edges when THWIP fired */}
          {webFired && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <line x1="50%" y1="50%" x2="0%" y2="0%" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              <line x1="50%" y1="50%" x2="100%" y2="0%" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              <line x1="50%" y1="50%" x2="0%" y2="100%" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
              <line x1="50%" y1="50%" x2="100%" y2="100%" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
            </svg>
          )}
        </div>

        {/* Right Column: High-Tech Telemetry & System Diagnostics */}
        <div className="md:col-span-7 space-y-4">
          {/* Telemetry Navigation Tabs */}
          <div className="flex items-center gap-2 font-mono text-[11px] border-b border-white/[0.08] pb-2">
            <button
              onClick={() => setActiveTelemetryTab('nanotech')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTelemetryTab === 'nanotech'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              01 // NANOTECH WEAVE
            </button>
            <button
              onClick={() => setActiveTelemetryTab('spidersense')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTelemetryTab === 'spidersense'
                  ? 'bg-red-500/20 text-rose-300 border border-red-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              02 // SPIDER-SENSE SLA
            </button>
            <button
              onClick={() => setActiveTelemetryTab('architecture')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTelemetryTab === 'architecture'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              03 // ETHOS & ETHICS
            </button>
          </div>

          {/* Tab Content 1: Nanotech Weave */}
          {activeTelemetryTab === 'nanotech' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-cyan-500/20">
                <div className="text-[10px] text-cyan-400 font-bold mb-1">
                  STARK NANOTECH // HARDENED DISTRIBUTED COMPUTE
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed font-light">
                  Like the Iron Spider's adaptive titanium mesh, modern distributed architectures must withstand sudden load bursts without yielding. Engineered with Redis cache-aside, PostgreSQL fractional indexing, and FastAPI microservices.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                  <div className="text-slate-400 text-[8px] uppercase">Cache Hit SLA</div>
                  <div className="font-bold text-xs mt-0.5 text-cyan-300">&lt;15ms</div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                  <div className="text-slate-400 text-[8px] uppercase">Indexing Cost</div>
                  <div className="font-bold text-xs mt-0.5 text-emerald-300">O(1) Fractional</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/20">
                  <div className="text-slate-400 text-[8px] uppercase">PWA Routes</div>
                  <div className="font-bold text-xs mt-0.5 text-amber-300">210+ Offline</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Spider-Sense SLA */}
          {activeTelemetryTab === 'spidersense' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-red-500/20">
                <div className="text-[10px] text-red-400 font-bold mb-1">
                  PRECOGNITIVE RESILIENCE // ZERO CASCADING FAILURES
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed font-light">
                  Spider-Sense in software engineering means preemptive telemetry: sliding-window rate limiters that prevent API exhaustion, health-check probes, and graceful degradation during network partitions.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-red-950/20 border border-red-500/20">
                  <div className="text-slate-400 text-[8px] uppercase">Rate Limiter</div>
                  <div className="font-bold text-xs mt-0.5 text-rose-300">Sliding Window</div>
                </div>
                <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                  <div className="text-slate-400 text-[8px] uppercase">GCP Labs</div>
                  <div className="font-bold text-xs mt-0.5 text-cyan-300">359 Completed</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-500/20">
                  <div className="text-slate-400 text-[8px] uppercase">Sync Drift</div>
                  <div className="font-bold text-xs mt-0.5 text-amber-300">0.00% Zero-Leak</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Ethos */}
          {activeTelemetryTab === 'architecture' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-amber-500/20">
                <div className="text-[10px] text-amber-400 font-bold mb-1">
                  PETER PARKER PROTOCOL // ETHOS & INTEGRITY
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed font-light">
                  "With great computing power comes great architectural responsibility." Real engineers build honest, failure-first systems, mentor students (GDG on Campus Lead for 200+ developers), and pursue relentless technical craftsmanship.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#050811] border border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">GDG Campus Network:</span>
                <span className="text-cyan-300 font-bold">Training & Mentoring 200+ Peers</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};