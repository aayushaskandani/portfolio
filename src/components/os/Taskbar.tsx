import React, { useState, useEffect } from 'react';
import { soundFX } from '../../utils/audio';
import { WindowState, OSTheme } from '../../types';
import { Volume2, VolumeX, Monitor, ArrowLeft, Search, Layers, Terminal, Mic, BookOpen, FileText, Award, Settings } from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  theme?: OSTheme;
  onSelectWindow: (id: string) => void;
  onExitToModern: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  theme = 'win98',
  onSelectWindow,
  onExitToModern,
  soundEnabled,
  onToggleSound
}) => {
  const [time, setTime] = useState('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Icon mapper helper
  const getAppIcon = (id: string) => {
    switch (id) {
      case 'terminal': return <Terminal size={14} className="text-cyan-400" />;
      case 'interview': return <Mic size={14} className="text-emerald-400" />;
      case 'story': return <BookOpen size={14} className="text-amber-400" />;
      case 'builder': return <Layers size={14} className="text-purple-400" />;
      case 'recruiter': return <FileText size={14} className="text-blue-400" />;
      case 'proof': return <Award size={14} className="text-yellow-400" />;
      case 'settings': return <Settings size={14} className="text-slate-400" />;
      default: return <Layers size={14} />;
    }
  };

  // --- Windows 11 Modern Glass Dock Theme ---
  if (theme === 'win11') {
    return (
      <div className="fixed bottom-2 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none select-none font-sans">
        <div className="pointer-events-auto h-12 px-3 bg-[#161826]/85 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl flex items-center gap-2">
          {/* Windows 11 Logo Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className="w-9 h-9 rounded-xl hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            title="Start"
          >
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <span className="bg-[#00a4ef] rounded-[1px]" />
              <span className="bg-[#00a4ef] rounded-[1px]" />
              <span className="bg-[#00a4ef] rounded-[1px]" />
              <span className="bg-[#00a4ef] rounded-[1px]" />
            </div>
          </button>

          {/* Windows 11 Start Menu Popup */}
          {startMenuOpen && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 bg-[#161826]/95 backdrop-blur-3xl border border-white/15 p-4 rounded-2xl shadow-2xl space-y-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-semibold text-xs text-white">PINNED APPLICATIONS</span>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                  WINDOWS 11
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {windows.map(w => (
                  <button
                    key={w.id}
                    onClick={() => {
                      soundFX.playWindowOpen();
                      onSelectWindow(w.id);
                      setStartMenuOpen(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-white/10 text-center flex flex-col items-center justify-center cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-1">
                      {getAppIcon(w.id)}
                    </div>
                    <span className="text-[10px] text-slate-200 truncate w-full">
                      {w.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setStartMenuOpen(false);
                    onExitToModern();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Exit to Modern Portfolio</span>
                </button>
              </div>
            </div>
          )}

          {/* App Icons Dock */}
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-2">
            {windows.map(w => {
              const isOpen = w.isOpen;
              const isActive = activeWindowId === w.id && !w.isMinimized;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectWindow(w.id);
                  }}
                  title={w.title}
                  className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/15 scale-105 border border-white/20'
                      : isOpen
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'hover:bg-white/5 opacity-80'
                  }`}
                >
                  {getAppIcon(w.id)}
                  {isOpen && (
                    <span className={`absolute -bottom-1 w-1.5 h-1 rounded-full ${
                      isActive ? 'bg-sky-400 w-3' : 'bg-white/40'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tray Clock & Exit */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-2 text-xs font-mono text-slate-300">
            <button
              onClick={onToggleSound}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              title={soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
            <button
              onClick={onExitToModern}
              className="p-1 rounded-lg hover:bg-white/10 text-teal-300 transition-colors flex items-center gap-1 text-[11px]"
              title="Exit to Modern Web"
            >
              <Monitor size={12} />
            </button>
            <span className="text-[11px] font-medium pl-1">{time}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- Ubuntu GNOME Aubergine Theme ---
  if (theme === 'ubuntu') {
    return (
      <div className="fixed top-0 left-0 right-0 h-7 bg-[#2c001e] border-b border-black/40 z-50 flex items-center justify-between px-3 text-[#f2f2f2] text-xs font-sans select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className="font-medium hover:text-[#e95420] transition-colors cursor-pointer"
          >
            Activities
          </button>

          <div className="flex items-center gap-2">
            {windows.filter(w => w.isOpen).map(w => (
              <button
                key={w.id}
                onClick={() => {
                  soundFX.playClick();
                  onSelectWindow(w.id);
                }}
                className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                  activeWindowId === w.id
                    ? 'bg-[#e95420] text-white font-semibold'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {w.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <span className="font-semibold text-xs">{time}</span>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button onClick={onToggleSound} className="cursor-pointer">
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          </button>
          <button
            onClick={onExitToModern}
            className="text-[#e95420] hover:underline cursor-pointer flex items-center gap-1"
          >
            <Monitor size={12} />
            <span>Modern</span>
          </button>
        </div>
      </div>
    );
  }

  // --- Default: Windows 98 / Classic Retro Bevels ---
  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-1.5 z-50 select-none font-pixel text-sm">
      {/* Start Button & Menu */}
      <div className="relative flex items-center gap-1.5">
        <button
          onClick={() => {
            soundFX.playClick();
            setStartMenuOpen(!startMenuOpen);
          }}
          className={`bevel-btn h-7 px-2.5 flex items-center gap-1.5 font-bold cursor-pointer text-black ${
            startMenuOpen ? 'border-t-[#404040] border-l-[#404040] border-b-white border-r-white' : ''
          }`}
        >
          <span className="w-3.5 h-3.5 bg-gradient-to-br from-red-600 via-yellow-500 via-green-600 to-blue-600 rounded-sm inline-block" />
          <span>Start</span>
        </button>

        {/* Start Menu Popup */}
        {startMenuOpen && (
          <div className="absolute bottom-9 left-0 w-64 bg-[#c0c0c0] bevel-window p-1 shadow-2xl flex flex-col space-y-1 z-50">
            <div className="bg-[#000080] text-white p-2 font-bold flex items-center justify-between">
              <span>DEVELOPER OS</span>
              <span className="text-xs bg-white/20 px-1 rounded">v98.4</span>
            </div>

            <div className="p-1 space-y-0.5 font-sans text-xs">
              {windows.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    soundFX.playWindowOpen();
                    onSelectWindow(w.id);
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left p-1.5 hover:bg-[#000080] hover:text-white rounded flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span className="truncate">{w.title}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-[#808080] pt-1">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setStartMenuOpen(false);
                  onExitToModern();
                }}
                className="w-full text-left p-1.5 hover:bg-red-700 hover:text-white rounded flex items-center gap-2 font-sans text-xs font-semibold cursor-pointer text-red-900"
              >
                <ArrowLeft size={13} />
                <span>Shutdown / Back to Modern Web</span>
              </button>
            </div>
          </div>
        )}

        {/* Taskbar Window Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw]">
          {windows.filter(w => w.isOpen).map((w) => {
            const isActive = activeWindowId === w.id && !w.isMinimized;
            return (
              <button
                key={w.id}
                onClick={() => {
                  soundFX.playClick();
                  onSelectWindow(w.id);
                }}
                className={`bevel-btn h-7 px-2.5 max-w-[150px] truncate text-xs flex items-center gap-1.5 cursor-pointer ${
                  isActive ? 'bg-[#dfdfdf] font-bold border-t-[#404040] border-l-[#404040] border-b-white border-r-white' : ''
                }`}
              >
                <span className="truncate">{w.title.split('—')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Tray */}
      <div className="bevel-inset h-7 px-2 flex items-center gap-3 text-xs font-mono text-black">
        <button
          onClick={onToggleSound}
          title={soundEnabled ? "Mute sound" : "Unmute sound"}
          className="cursor-pointer hover:opacity-75"
        >
          {soundEnabled ? <Volume2 size={13} className="text-blue-900" /> : <VolumeX size={13} />}
        </button>

        <button
          onClick={onExitToModern}
          title="Exit to Modern Portfolio view"
          className="cursor-pointer hover:text-blue-900 flex items-center gap-1 text-[11px]"
        >
          <Monitor size={12} />
          <span className="hidden sm:inline">Modern</span>
        </button>

        <span className="border-l border-[#808080] pl-2 font-bold">{time}</span>
      </div>
    </div>
  );
};
