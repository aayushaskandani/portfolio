import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../../utils/audio';
import { OSTheme } from '../../types';
import { Minus, Square, X, Copy } from 'lucide-react';

interface WindowFrameProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isActive: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialPos?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  theme?: OSTheme;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  icon,
  isActive,
  isMaximized,
  zIndex,
  initialPos = { x: 50, y: 50 },
  initialSize = { width: 700, height: 480 },
  theme = 'win98',
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  children
}) => {
  const [pos, setPos] = useState(initialPos);
  const isDragging = useRef(false);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    // Only drag from the header, not buttons
    if ((e.target as HTMLElement).closest('button')) return;
    if (isMaximized) return;

    isDragging.current = true;
    dragStartOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 200, e.clientX - dragStartOffset.current.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 100, e.clientY - dragStartOffset.current.y));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const bottomOffset = theme === 'win11' ? '56px' : '40px';

  const style: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: bottomOffset,
        zIndex,
        width: '100%',
        height: `calc(100vh - ${bottomOffset})`,
      }
    : {
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${initialSize.width}px`,
        height: `${initialSize.height}px`,
        maxWidth: 'calc(100vw - 20px)',
        maxHeight: `calc(100vh - 60px)`,
        zIndex,
      };

  // Render OS Header according to theme
  const renderHeader = () => {
    if (theme === 'ubuntu') {
      return (
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between px-3 py-2 bg-[#2c001e] border-b border-black/50 select-none shrink-0 rounded-t-xl cursor-move"
        >
          {/* Left: Ubuntu Circular Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playWindowClose();
                onClose();
              }}
              aria-label="close"
              className="w-3.5 h-3.5 rounded-full bg-[#e95420] hover:brightness-110 active:brightness-90 flex items-center justify-center text-white/90 cursor-pointer transition-all group"
              title="Close"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playClick();
                onMinimize();
              }}
              aria-label="minimize"
              className="w-3.5 h-3.5 rounded-full bg-[#4c4c4c] hover:brightness-125 flex items-center justify-center text-white/90 cursor-pointer group"
              title="Minimize"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playClick();
                onMaximize();
              }}
              aria-label="maximize"
              className="w-3.5 h-3.5 rounded-full bg-[#4c4c4c] hover:brightness-125 flex items-center justify-center text-white/90 cursor-pointer group"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Square size={7} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <div className="flex items-center gap-2 truncate px-4">
            {icon && <span className="text-[#e95420] shrink-0">{icon}</span>}
            <span className="font-sans font-medium text-xs text-[#f2f2f2] truncate">
              {title}
            </span>
          </div>

          <div className="w-12" />
        </div>
      );
    }

    if (theme === 'win11') {
      return (
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between px-3.5 py-2 bg-white/5 border-b border-white/10 select-none shrink-0 rounded-t-2xl cursor-move backdrop-blur-md"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            {icon && <span className="text-sky-400 shrink-0">{icon}</span>}
            <span className="font-sans font-medium text-xs text-white/90 tracking-normal truncate">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playClick();
                onMinimize();
              }}
              className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center text-white/80 cursor-pointer transition-colors"
              title="Minimize"
            >
              <Minus size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playClick();
                onMaximize();
              }}
              className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center text-white/80 cursor-pointer transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Copy size={11} /> : <Square size={11} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playWindowClose();
                onClose();
              }}
              className="w-7 h-7 rounded-md hover:bg-red-500 hover:text-white flex items-center justify-center text-white/80 cursor-pointer transition-colors"
              title="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      );
    }

    // Default: Windows 98 / Classic
    return (
      <div
        onMouseDown={handleMouseDown}
        className={`px-2 py-1 flex items-center justify-between cursor-move shrink-0 ${
          isActive
            ? 'bg-gradient-to-r from-[#000080] via-[#083594] to-[#1084d0] text-white'
            : 'bg-[#808080] text-[#c0c0c0]'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-hidden pr-2">
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="font-pixel text-base font-bold tracking-wide truncate">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              onMinimize();
            }}
            className="bevel-btn w-5 h-5 flex items-center justify-center cursor-pointer active:translate-y-0.5"
            title="Minimize"
          >
            <Minus size={10} strokeWidth={3} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              onMaximize();
            }}
            className="bevel-btn w-5 h-5 flex items-center justify-center cursor-pointer active:translate-y-0.5"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Copy size={9} /> : <Square size={9} strokeWidth={2.5} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playWindowClose();
              onClose();
            }}
            className="bevel-btn w-5 h-5 flex items-center justify-center cursor-pointer active:translate-y-0.5 hover:bg-red-400 font-bold"
            title="Close"
          >
            <X size={11} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  };

  const containerClasses = theme === 'win11'
    ? 'rounded-2xl border border-white/15 bg-[#11131c]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden text-white'
    : theme === 'ubuntu'
    ? 'rounded-t-xl border border-black/50 bg-[#161616] shadow-2xl flex flex-col overflow-hidden text-white'
    : 'bevel-window bg-[#c0c0c0] text-black flex flex-col rounded-none shadow-2xl select-none';

  return (
    <div
      style={style}
      onMouseDown={onFocus}
      className={containerClasses}
    >
      {renderHeader()}
      {/* Window Body Container */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-[#0c0d14]">
        {children}
      </div>
    </div>
  );
};
