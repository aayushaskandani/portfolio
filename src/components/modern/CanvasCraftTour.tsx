import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from '../../utils/audio';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface SelectorBoxState {
  x: number;
  y: number;
  width: number;
  height: number;
  pointerX: number;
  pointerY: number;
  rotation: number;
  color: string;
  title: string;
}

interface AmbientCursor {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  color: string;
  clicking: boolean;
}

interface TourStep {
  id: string;
  sound?: number;
  duration?: number;
  autoScroll?: boolean;
}

const PALETTE = ["#0095f6", "#ff3b30", "#34c759", "#ff9500", "#af52de", "#5856d6", "#00c7be", "#ff2d55"];

// Ambient cursor pointer SVG
export const ArrowPointer: React.FC<{
  color?: string;
  rotation?: number;
  isClicking?: boolean;
  size?: number;
}> = ({ color = "#0095f6", rotation = 0, isClicking = false, size = 20 }) => (
  <div
    className="relative pointer-events-none select-none"
    style={{
      transformOrigin: "4px 4px",
      transform: `rotate(${rotation}deg)`,
      transition: "transform 0.08s ease-out"
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.65))" }}
    >
      <polygon points="12 2 19 21 12 17 5 21" />
    </svg>
    {isClicking && (
      <span
        className="absolute -top-1 left-2 w-6 h-6 rounded-full border border-cyan-400 animate-ping opacity-90 pointer-events-none"
        style={{ animationDuration: "0.5s" }}
      />
    )}
  </div>
);

interface CanvasCraftContextType {
  isTourActive: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  craftedIds: Set<string>;
  registerRef: (id: string, el: HTMLElement | null) => void;
  rebuildCanvas: (speedMultiplier?: number) => void;
  skipToLive: () => void;
  togglePause: () => void;
  toggleSpeed: () => void;
  isElementCrafted: (id: string) => boolean;
  manuallyCraft: (id: string, soundFreq?: number) => void;
}

const CanvasCraftContext = createContext<CanvasCraftContextType | null>(null);

export const useCanvasCraft = () => {
  const context = useContext(CanvasCraftContext);
  if (!context) {
    throw new Error('useCanvasCraft must be used within CanvasCraftProvider');
  }
  return context;
};

// All 34 stages of the site tour
export const TOUR_STEPS: TourStep[] = [
  { id: "heroTitle", sound: 440, duration: 420 },
  { id: "heroName", sound: 520, duration: 480 },
  { id: "heroPortrait", sound: 600, duration: 520 },
  { id: "heroBio", sound: 480, duration: 420 },
  { id: "heroStats", sound: 560, duration: 420 },
  { id: "workHeader", sound: 500, autoScroll: true, duration: 400 },
  { id: "workCard0", sound: 640, duration: 460 },
  { id: "workCard1", sound: 680, duration: 460 },
  { id: "workCard2", sound: 720, duration: 460 },
  { id: "wireframeSection", sound: 580, autoScroll: true, duration: 500 },
  { id: "craftSection", sound: 620, autoScroll: true, duration: 420 },
  { id: "craftCard0", sound: 650, duration: 340 },
  { id: "craftCard1", sound: 680, duration: 340 },
  { id: "craftCard2", sound: 710, duration: 340 },
  { id: "arsenal0", sound: 720, duration: 220 },
  { id: "arsenal1", sound: 750, duration: 220 },
  { id: "arsenal2", sound: 780, duration: 220 },
  { id: "arsenal3", sound: 810, duration: 220 },
  { id: "arsenal4", sound: 840, duration: 220 },
  { id: "arsenal5", sound: 870, duration: 220 },
  { id: "arsenal6", sound: 900, duration: 220 },
  { id: "arsenal7", sound: 930, duration: 220 },
  { id: "arsenal8", sound: 960, duration: 220 },
  { id: "arsenal9", sound: 990, duration: 220 },
  { id: "arsenal10", sound: 1020, duration: 220 },
  { id: "arsenal11", sound: 1050, duration: 220 },
  { id: "journeySection", sound: 660, autoScroll: true, duration: 420 },
  { id: "journeyMilestone0", sound: 690, duration: 320 },
  { id: "journeyMilestone1", sound: 720, duration: 320 },
  { id: "journeyMilestone2", sound: 750, duration: 320 },
  { id: "journeyPhoto", sound: 780, duration: 480, autoScroll: true },
  { id: "contactSection", sound: 740, autoScroll: true, duration: 440 },
  { id: "contactDirectCard", sound: 780, duration: 380 },
  { id: "footerSection", sound: 820, duration: 500, autoScroll: true }
];

export const CanvasCraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [craftedIds, setCraftedIds] = useState<Set<string>>(() => new Set(TOUR_STEPS.map(s => s.id)));
  const [selectorBox, setSelectorBox] = useState<SelectorBoxState | null>(null);
  const [ambientCursors, setAmbientCursors] = useState<AmbientCursor[]>([]);

  const elementsRef = useRef<Record<string, HTMLElement | null>>({});

  const registerRef = useCallback((id: string, el: HTMLElement | null) => {
    elementsRef.current[id] = el;
  }, []);

  const isElementCrafted = useCallback((id: string) => {
    return !isTourActive || craftedIds.has(id);
  }, [isTourActive, craftedIds]);

  const manuallyCraft = useCallback((id: string, soundFreq = 700) => {
    soundFX.playFrequency(soundFreq, 0.08);
    setCraftedIds(prev => new Set([...prev, id]));
  }, []);

  // Initialize ambient cursors on canvas
  useEffect(() => {
    const cursors = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      rotation: Math.random() * 40 - 20,
      color: PALETTE[i % PALETTE.length],
      clicking: false
    }));
    setAmbientCursors(cursors);
  }, []);

  // Ambient cursor gentle physics drift
  useEffect(() => {
    if (!isTourActive || isPaused) return;

    const interval = setInterval(() => {
      setAmbientCursors(prev =>
        prev.map(c => {
          let nx = c.x + c.vx * speed;
          let ny = c.y + c.vy * speed;
          let nvx = c.vx;
          let nvy = c.vy;

          if (nx < 6 || nx > 94) nvx = -nvx + (Math.random() - 0.5) * 0.3;
          if (ny < 8 || ny > 92) nvy = -nvy + (Math.random() - 0.5) * 0.3;

          if (Math.random() < 0.12) {
            nvx += (Math.random() - 0.5) * 0.5;
            nvy += (Math.random() - 0.5) * 0.5;
            const mag = Math.hypot(nvx, nvy);
            if (mag > 1.8) {
              nvx = (nvx / mag) * 1.8;
              nvy = (nvy / mag) * 1.8;
            }
          }

          const rot = Math.atan2(nvy, nvx) * (180 / Math.PI) - 90;
          const clicking = Math.random() < 0.06;

          return {
            ...c,
            x: Math.max(4, Math.min(96, nx)),
            y: Math.max(6, Math.min(94, ny)),
            vx: nvx,
            vy: nvy,
            rotation: rot * 0.35,
            clicking
          };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, [isTourActive, isPaused, speed]);

  // Smooth scroll helper to start
  const smoothScrollToTop = useCallback((onDone?: () => void) => {
    const startY = window.scrollY || window.pageYOffset || 0;
    if (startY <= 15) {
      onDone?.();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onDone?.();
    }, 600);
  }, []);

  // Rebuild Canvas Tour Trigger
  const rebuildCanvas = useCallback((speedMultiplier = 1) => {
    setSpeed(speedMultiplier);
    setCurrentStep(0);
    setStepProgress(0);
    setCraftedIds(new Set());
    setIsPaused(false);
    setIsTourActive(true);
    setSelectorBox(null);
    smoothScrollToTop();
  }, [smoothScrollToTop]);

  // Skip straight to live completed state
  const skipToLive = useCallback(() => {
    setIsTourActive(false);
    setIsPaused(false);
    setSelectorBox(null);
    setCraftedIds(new Set(TOUR_STEPS.map(s => s.id)));
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const toggleSpeed = useCallback(() => {
    setSpeed(prev => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
  }, []);

  // Main step-by-step animation execution loop
  useEffect(() => {
    if (!isTourActive || isPaused) return;

    if (currentStep >= TOUR_STEPS.length) {
      const timer = setTimeout(() => {
        skipToLive();
      }, 700);
      return () => clearTimeout(timer);
    }

    const step = TOUR_STEPS[currentStep];
    const targetElement = elementsRef.current[step.id];

    if (!targetElement) {
      // Element not currently in DOM, advance
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Scroll element into view if needed
    const rect = targetElement.getBoundingClientRect();
    if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    let progress = 0;
    const duration = ((step.duration || 500) + 40) / speed;
    const startTime = performance.now();

    const frameStep = (now: number) => {
      const elapsed = now - startTime;
      progress = Math.min(1, elapsed / duration);
      setStepProgress(progress);

      const curRect = targetElement.getBoundingClientRect();
      const left = curRect.left;
      const top = curRect.top;
      const targetW = Math.max(40, curRect.width);
      const targetH = Math.max(40, curRect.height);

      const spanW = targetW * progress;
      const spanH = targetH * progress;
      const pointerX = left + spanW;
      const pointerY = top + spanH;
      const rotation = Math.atan2(spanH, spanW) * (180 / Math.PI) - 45;

      setSelectorBox({
        x: left,
        y: top,
        width: spanW,
        height: spanH,
        pointerX,
        pointerY,
        rotation,
        color: PALETTE[currentStep % PALETTE.length],
        title: step.id.toUpperCase()
      });

      if (progress < 1) {
        requestAnimationFrame(frameStep);
      } else {
        // Step complete!
        soundFX.playFrequency(step.sound || 600, 0.08);
        setCraftedIds(prev => new Set([...prev, step.id]));
        setSelectorBox(null);

        // Small interval before next step
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 80 / speed);
      }
    };

    const animId = requestAnimationFrame(frameStep);
    return () => cancelAnimationFrame(animId);
  }, [isTourActive, isPaused, currentStep, speed, skipToLive]);

  return (
    <CanvasCraftContext.Provider
      value={{
        isTourActive,
        isPaused,
        currentStep,
        totalSteps: TOUR_STEPS.length,
        speed,
        craftedIds,
        registerRef,
        rebuildCanvas,
        skipToLive,
        togglePause,
        toggleSpeed,
        isElementCrafted,
        manuallyCraft
      }}
    >
      {children}

      {/* Selector Box & Pointer Overlay */}
      {isTourActive && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {/* Ambient Drifting Cursors */}
          {ambientCursors.map(c => (
            <div
              key={c.id}
              className="absolute pointer-events-none transition-all duration-75"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`
              }}
            >
              <ArrowPointer color={c.color} rotation={c.rotation} isClicking={c.clicking} size={18} />
            </div>
          ))}

          {/* Active Crafting Selector Box - Exact Match to developeryug.vercel.app */}
          {selectorBox && (
            <>
              {/* Solid Orange Bounding Box */}
              <div
                className="absolute border-2 pointer-events-none transition-none shadow-[0_0_25px_rgba(249,115,22,0.4)]"
                style={{
                  left: `${selectorBox.x}px`,
                  top: `${selectorBox.y}px`,
                  width: `${selectorBox.width}px`,
                  height: `${selectorBox.height}px`,
                  borderColor: '#f97316',
                  backgroundColor: 'rgba(249, 115, 22, 0.12)'
                }}
              >
                {/* 4 Corner Square Handles (White with Orange Border) */}
                <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#f97316] pointer-events-none shadow" />
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#f97316] pointer-events-none shadow" />
                <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#f97316] pointer-events-none shadow" />
                <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#f97316] pointer-events-none shadow" />

                {/* Dimension Badge: 46 • 16 Centered Above */}
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono text-black font-extrabold rounded bg-[#f97316] shadow-md pointer-events-none whitespace-nowrap flex items-center gap-1"
                >
                  <span>{Math.round(selectorBox.width)}</span>
                  <span>•</span>
                  <span>{Math.round(selectorBox.height)}</span>
                </div>
              </div>

              {/* Active Crafting Cursor Arrow */}
              <div
                className="absolute transition-none pointer-events-none z-[110]"
                style={{
                  left: `${selectorBox.pointerX}px`,
                  top: `${selectorBox.pointerY}px`
                }}
              >
                <ArrowPointer
                  color="#f97316"
                  rotation={selectorBox.rotation}
                  isClicking={true}
                  size={22}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Bottom Player Dock */}
      {isTourActive && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[120] flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#111422]/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-[11px] sm:text-xs font-mono text-white transition-all hover:border-white/30 max-w-[calc(100vw-1.5rem)]">
          {/* Layer Counter with Pulsing Dot */}
          <div className="flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-3 border-r border-white/15 shrink-0">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-cyan-400" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="font-semibold text-cyan-400 text-[10px] sm:text-xs">Layer:</span>
            <span className="text-slate-200 text-[10px] sm:text-xs font-bold">
              {Math.min(currentStep + 1, TOUR_STEPS.length)} / {TOUR_STEPS.length}
            </span>
          </div>

          {/* Gradient Progress Bar */}
          <div className="w-16 sm:w-28 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden hidden md:block shrink-0">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-[#ff3b3b] transition-all duration-100"
              style={{
                width: `${Math.min(100, Math.round(((currentStep + stepProgress) / TOUR_STEPS.length) * 100))}%`
              }}
            />
          </div>

          {/* Pause / Resume */}
          <button
            onClick={togglePause}
            className="p-1 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title={isPaused ? "Resume Crafting Tour" : "Pause Crafting Tour"}
          >
            {isPaused ? <Play size={13} className="text-cyan-400" /> : <Pause size={13} />}
          </button>

          {/* Speed Toggle (1x, 2x, 4x) */}
          <button
            onClick={toggleSpeed}
            className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] sm:text-[11px] font-bold text-slate-200 transition-colors cursor-pointer shrink-0"
            title="Toggle Crafting Speed"
          >
            {speed}x
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => soundFX.toggleAmbientMusic()}
            className="p-1 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Toggle Ambient Audio"
          >
            <Volume2 size={13} className="text-emerald-400" />
          </button>

          {/* Replay */}
          <button
            onClick={() => rebuildCanvas(1)}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
            title="Restart Animated Selector Box Spanning"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Skip straight to live button */}
          <button
            type="button"
            onClick={skipToLive}
            className="px-2.5 sm:px-3 py-1 rounded-full bg-[#ff3b3b] hover:bg-[#e11d48] text-white font-semibold text-[10px] sm:text-[11px] shadow-md cursor-pointer transition-all active:scale-95 shrink-0 whitespace-nowrap"
            title="Skip directly to finished live interface"
          >
            Live
          </button>
        </div>
      )}
    </CanvasCraftContext.Provider>
  );
};
