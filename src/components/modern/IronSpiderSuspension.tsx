import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from '../../utils/audio';
import { Zap, Activity, Crosshair, Sparkles, Terminal } from 'lucide-react';
import { useStarkHud } from './StarkJarvisHUD';

export const IronSpiderSuspension: React.FC = () => {
  const { triggerSpiderSense } = useStarkHud();
  const [pullY, setPullY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [eyeTracking, setEyeTracking] = useState({ x: 0, y: 0 });
  const [laserTarget, setLaserTarget] = useState({ x: 0, y: 0, active: false });
  const [webFired, setWebFired] = useState(false);
  const [activeTab, setActiveTab] = useState<'nanotech' | 'spidersense' | 'architecture'>('nanotech');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const startDragY = useRef(0);
  const rafId = useRef<number | null>(null);

  // Dynamic eye and laser tracking towards cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.25; // Center of left column
      const centerY = rect.top + 95 + pullY;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      // Max eye pupil shift is 4px
      const maxShift = 4;
      const shiftX = Math.cos(angle) * Math.min(maxShift, dist / 50);
      const shiftY = Math.sin(angle) * Math.min(maxShift, dist / 50);

      setEyeTracking({ x: shiftX, y: shiftY });

      // Laser guide line relative to component container
      if (dist < 700) {
        setLaserTarget({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true
        });
      } else {
        setLaserTarget(prev => ({ ...prev, active: false }));
      }
    });
  }, [pullY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  // Drag and spring bounce physics
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startDragY.current = e.clientY - pullY;
    soundFX.playHydraulicServo();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newY = Math.max(0, Math.min(80, e.clientY - startDragY.current));
      setPullY(newY);
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      soundFX.playWebThwip();
      // Damped harmonic oscillation release
      setPullY(-14);
      setTimeout(() => setPullY(8), 120);
      setTimeout(() => setPullY(-4), 240);
      setTimeout(() => setPullY(2), 340);
      setTimeout(() => setPullY(0), 440);
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
    setTimeout(() => setWebFired(false), 2200);
  };

  return (
    <div
      ref={containerRef}
      className="relative p-6 sm:p-8 rounded-2xl bg-[#070a14]/95 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 shadow-2xl overflow-hidden select-none"
    >
      {/* Background Stark Hexagonal Blueprint Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff0e_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Dynamic Laser Guide Line (Tracks cursor when hovered) */}
      {isHovered && laserTarget.active && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <line
            x1="25%"
            y1={95 + pullY}
            x2={laserTarget.x}
            y2={laserTarget.y}
            stroke="#00f0ff"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.35"
          />
          <circle
            cx={laserTarget.x}
            cy={laserTarget.y}
            r="3"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1"
            opacity="0.6"
            className="animate-ping"
          />
        </svg>
      )}

      {/* Top Header */}
      <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 z-20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              STARK INDUSTRIES // MARK-L (50)
            </span>
          </div>
          <h3 className="font-anton text-2xl sm:text-3xl text-white tracking-wide mt-0.5">
            IRON SPIDER SUSPENSION APPARATUS
          </h3>
        </div>

        <button
          onClick={handleShootWebs}
          className="px-3.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          title="Shoot High-Tensile Nanotech Web Strands"
        >
          <Zap size={13} />
          <span>THWIP // WEBS</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20">
        {/* Left Column: Interactive Cybernetic Inverted Suspension Unit */}
        <div className="md:col-span-5 flex flex-col items-center justify-start min-h-[300px] relative">
          {/* Ceiling Titanium Winch Bracket */}
          <div className="w-20 h-3.5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-b-md border-x border-b border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center justify-center">
            <div className="w-3 h-1 bg-amber-400 rounded-xs shadow-[0_0_6px_#f59e0b]" />
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
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            {/* Cable Strand */}
            <div className="w-[1.5px] h-20 sm:h-24 bg-gradient-to-b from-white via-cyan-300 to-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.9)] relative">
              {/* Cable Pulley Clamp */}
              <div className="absolute top-1/2 -left-1.5 w-3 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xs border border-amber-300 shadow" />
            </div>

            {/* Inverted Cybernetic Stark Iron Spider Ocular Chassis */}
            <div
              className={`relative transition-transform duration-300 ${
                isHovered ? 'scale-105' : ''
              }`}
            >
              <svg
                width="84"
                height="92"
                viewBox="0 0 84 92"
                fill="none"
                className="drop-shadow-[0_15px_35px_rgba(225,29,72,0.55)] transition-all"
              >
                <defs>
                  {/* Metallic Crimson Titanium Gradient */}
                  <linearGradient id="ironArmor" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="35%" stopColor="#e11d48" />
                    <stop offset="70%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#701a28" />
                  </linearGradient>

                  {/* Stark Gold Nanotech Trim */}
                  <linearGradient id="starkGoldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>

                  {/* Carbon Fiber Inlay */}
                  <linearGradient id="carbonTexture" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0b0f19" />
                  </linearGradient>

                  {/* Ocular Lens Cyan Luminescence */}
                  <filter id="ocularGlow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Aerodynamic Inverted Helmet Shell */}
                <path
                  d="M42 88 C24 74 12 56 12 28 C12 12 25 4 42 4 C59 4 72 12 72 28 C72 56 60 74 42 88 Z"
                  fill="url(#ironArmor)"
                  stroke="url(#starkGoldTrim)"
                  strokeWidth="1.8"
                />

                {/* Lateral Carbon Fiber Cheek Vents */}
                <path
                  d="M16 26 L30 38 L24 54 L14 42 Z"
                  fill="url(#carbonTexture)"
                  stroke="#f59e0b"
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                <path
                  d="M68 26 L54 38 L60 54 L70 42 Z"
                  fill="url(#carbonTexture)"
                  stroke="#f59e0b"
                  strokeWidth="0.8"
                  opacity="0.9"
                />

                {/* Golden Nanotech Circuit Chevrons */}
                <path
                  d="M42 6 L42 36 M42 36 L26 56 M42 36 L58 56 M20 18 L42 28 L64 18 M18 48 L42 60 L66 48"
                  stroke="#5c0615"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M26 30 L42 38 L58 30"
                  stroke="url(#starkGoldTrim)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                {/* Left Dynamic Mechanical Aperture Eye */}
                <g transform={`translate(${eyeTracking.x * 0.45}, ${eyeTracking.y * 0.45})`}>
                  <path
                    d={
                      isHovered
                        ? "M18 34 Q30 38 38 34 Q28 48 18 34 Z" // Focused tactical squint
                        : "M16 32 Q30 39 38 34 Q28 52 16 32 Z"
                    }
                    fill="#050811"
                    stroke="#00f0ff"
                    strokeWidth="1.6"
                    filter="url(#ocularGlow)"
                    className="transition-all duration-150"
                  />
                  {/* Inner Optical Reticle / Targeting Crosshair */}
                  <circle
                    cx={26 + eyeTracking.x}
                    cy={42 + eyeTracking.y}
                    r="2.5"
                    fill="#00f0ff"
                    className="animate-pulse"
                  />
                  <line
                    x1={22 + eyeTracking.x}
                    y1={42 + eyeTracking.y}
                    x2={30 + eyeTracking.x}
                    y2={42 + eyeTracking.y}
                    stroke="#00f0ff"
                    strokeWidth="0.6"
                    opacity="0.8"
                  />
                </g>

                {/* Right Dynamic Mechanical Aperture Eye */}
                <g transform={`translate(${eyeTracking.x * 0.45}, ${eyeTracking.y * 0.45})`}>
                  <path
                    d={
                      isHovered
                        ? "M66 34 Q54 38 46 34 Q56 48 66 34 Z"
                        : "M68 32 Q54 39 46 34 Q56 52 68 32 Z"
                    }
                    fill="#050811"
                    stroke="#00f0ff"
                    strokeWidth="1.6"
                    filter="url(#ocularGlow)"
                    className="transition-all duration-150"
                  />
                  <circle
                    cx={58 + eyeTracking.x}
                    cy={42 + eyeTracking.y}
                    r="2.5"
                    fill="#00f0ff"
                    className="animate-pulse"
                  />
                  <line
                    x1={54 + eyeTracking.x}
                    y1={42 + eyeTracking.y}
                    x2={62 + eyeTracking.x}
                    y2={42 + eyeTracking.y}
                    stroke="#00f0ff"
                    strokeWidth="0.6"
                    opacity="0.8"
                  />
                </g>

                {/* Inverted Apex Core Diode */}
                <circle cx="42" cy="84" r="2.2" fill="#f59e0b" />
              </svg>

              {/* Status Pill Badge */}
              <div className="text-center mt-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-[#04060d]/90 px-3 py-0.5 rounded-full border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.3)] inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SUSPENSION // ACTIVE</span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-3 text-center">
            Drag & release cable for spring physics
          </div>

          {/* Curved High-Tensile Web Strands on THWIP */}
          {webFired && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
              <path d="M50% 50% Q 25% 20% 0% 0%" stroke="#00f0ff" strokeWidth="2" fill="none" strokeDasharray="6 4" className="animate-pulse" />
              <path d="M50% 50% Q 75% 20% 100% 0%" stroke="#00f0ff" strokeWidth="2" fill="none" strokeDasharray="6 4" className="animate-pulse" />
              <path d="M50% 50% Q 25% 80% 0% 100%" stroke="#e11d48" strokeWidth="2" fill="none" strokeDasharray="6 4" className="animate-pulse" />
              <path d="M50% 50% Q 75% 80% 100% 100%" stroke="#e11d48" strokeWidth="2" fill="none" strokeDasharray="6 4" className="animate-pulse" />
            </svg>
          )}
        </div>

        {/* Right Column: Telemetry & System Diagnostics */}
        <div className="md:col-span-7 space-y-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 font-mono text-[11px] border-b border-white/[0.08] pb-2">
            <button
              onClick={() => setActiveTab('nanotech')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === 'nanotech'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              01 // NANOTECH WEAVE
            </button>
            <button
              onClick={() => setActiveTab('spidersense')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === 'spidersense'
                  ? 'bg-red-500/20 text-rose-300 border border-red-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              02 // SPIDER-SENSE SLA
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              03 // ETHOS & ETHICS
            </button>
          </div>

          {/* Tab 1: Nanotech Weave */}
          {activeTab === 'nanotech' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-cyan-500/20">
                <div className="text-[10px] text-cyan-400 font-bold mb-1">
                  STARK NANOTECH // HARDENED DISTRIBUTED COMPUTE
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed font-light">
                  Modern distributed architectures must withstand sudden load bursts without yielding. Engineered with Redis cache-aside, PostgreSQL fractional indexing, and FastAPI microservices.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2.5 rounded-lg bg-cyan-950/25 border border-cyan-500/25">
                  <div className="text-slate-400 text-[8px] uppercase">Cache Hit SLA</div>
                  <div className="font-bold text-xs mt-0.5 text-cyan-300">&lt;15ms</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/25 border border-emerald-500/25">
                  <div className="text-slate-400 text-[8px] uppercase">Indexing Cost</div>
                  <div className="font-bold text-xs mt-0.5 text-emerald-300">O(1) Fractional</div>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/25">
                  <div className="text-slate-400 text-[8px] uppercase">PWA Routes</div>
                  <div className="font-bold text-xs mt-0.5 text-amber-300">210+ Offline</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Spider-Sense SLA */}
          {activeTab === 'spidersense' && (
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
                <div className="p-2.5 rounded-lg bg-red-950/25 border border-red-500/25">
                  <div className="text-slate-400 text-[8px] uppercase">Rate Limiter</div>
                  <div className="font-bold text-xs mt-0.5 text-rose-300">Sliding Window</div>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/25 border border-cyan-500/25">
                  <div className="text-slate-400 text-[8px] uppercase">GCP Labs</div>
                  <div className="font-bold text-xs mt-0.5 text-cyan-300">359 Completed</div>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-950/25 border border-amber-500/25">
                  <div className="text-slate-400 text-[8px] uppercase">Sync Drift</div>
                  <div className="font-bold text-xs mt-0.5 text-amber-300">0.00% Zero-Leak</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Ethos */}
          {activeTab === 'architecture' && (
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