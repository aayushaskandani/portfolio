import React, { useState, useEffect, useRef } from 'react';
import { GhostCursor } from '../../types';

interface GhostCursorsProps {
  enabled: boolean;
}

export const GhostCursors: React.FC<GhostCursorsProps> = ({ enabled }) => {
  const [cursors, setCursors] = useState<GhostCursor[]>([
    {
      id: 'c1',
      name: 'Visitor #42',
      role: 'Recruiter (Google)',
      color: '#ff3b3b',
      x: 180,
      y: 220,
      targetX: 300,
      targetY: 450,
      isClicking: false
    },
    {
      id: 'c2',
      name: 'Elena',
      role: 'Staff Engineer (SF)',
      color: '#38bdf8',
      x: 650,
      y: 180,
      targetX: 500,
      targetY: 600,
      isClicking: false
    },
    {
      id: 'c3',
      name: 'Aayush Bot',
      role: 'Wispr Voice Dictation',
      color: '#34d399',
      x: 850,
      y: 350,
      targetX: 720,
      targetY: 280,
      isClicking: false
    },
    {
      id: 'c4',
      name: 'Kenji',
      role: 'Builder (Tokyo)',
      color: '#fbbf24',
      x: 420,
      y: 520,
      targetX: 600,
      targetY: 400,
      isClicking: false
    },
    {
      id: 'c5',
      name: 'Hiring Lead',
      role: 'Fintech (London)',
      color: '#c084fc',
      x: 320,
      y: 380,
      targetX: 450,
      targetY: 200,
      isClicking: false
    }
  ]);

  const requestRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      // Pick random new targets on the visible page
      setCursors(prev =>
        prev.map(c => {
          const docW = typeof window !== 'undefined' ? Math.max(800, window.innerWidth - 120) : 1000;
          const docH = typeof window !== 'undefined' ? Math.max(600, window.innerHeight - 100) : 800;

          const newTargetX = Math.floor(Math.random() * (docW - 80)) + 40;
          const newTargetY = Math.floor(Math.random() * (docH - 80)) + 40;
          const shouldClick = Math.random() > 0.6;

          return {
            ...c,
            targetX: newTargetX,
            targetY: newTargetY,
            isClicking: shouldClick
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [enabled]);

  // Smooth lerp frame loop
  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      setCursors(prev =>
        prev.map(c => {
          const dx = c.targetX - c.x;
          const dy = c.targetY - c.y;
          // Smooth glide
          const speed = 0.045;
          return {
            ...c,
            x: c.x + dx * speed,
            y: c.y + dy * speed
          };
        })
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {cursors.map(cursor => (
        <div
          key={cursor.id}
          className="absolute transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`
          }}
        >
          {/* Mouse pointer SVG */}
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={cursor.color}
              stroke="#000000"
              strokeWidth="1.5"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
            </svg>

            {/* Click ripple animation */}
            {cursor.isClicking && (
              <span
                className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 animate-ping"
                style={{ borderColor: cursor.color }}
              />
            )}

            {/* Name & Role tag */}
            <div
              className="absolute left-4 top-4 px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap text-white font-medium shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-white/20"
              style={{ backgroundColor: `${cursor.color}cc` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{cursor.name}</span>
              <span className="opacity-75 text-[9px]">({cursor.role})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

