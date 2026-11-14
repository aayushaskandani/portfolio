import React, { useState, useEffect } from 'react';
import { soundFX } from '../../utils/audio';
import { WindowState, OSTheme } from '../../types';
import { DesktopIcon } from './DesktopIcon';
import { WindowFrame } from './WindowFrame';
import { Taskbar } from './Taskbar';
import { AboutApp } from './apps/AboutApp';
import { BuilderLabApp } from './apps/BuilderLabApp';
import { TerminalApp } from './apps/TerminalApp';
import { RecruiterApp } from './apps/RecruiterApp';
import { ProofGalleryApp } from './apps/ProofGalleryApp';
import { SettingsApp } from './apps/SettingsApp';
import { InterviewApp } from './apps/InterviewApp';
import { StoryModeApp } from './apps/StoryModeApp';
import { 
  User, 
  Terminal, 
  Layers, 
  FileText, 
  Award, 
  Settings, 
  ArrowLeft,
  Mic,
  BookOpen
} from 'lucide-react';

interface WindowManagerProps {
  onExitToModern: () => void;
  initialOpenApp?: string;
  theme?: OSTheme;
  onThemeChange?: (theme: OSTheme) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({ 
  onExitToModern, 
  initialOpenApp,
  theme = 'win98',
  onThemeChange 
}) => {
  const [wallpaper, setWallpaper] = useState<'teal' | 'bliss' | 'dark' | 'indigo'>('teal');
  const [currentTheme, setCurrentTheme] = useState<OSTheme>(theme);
  const [soundEnabled, setSoundEnabled] = useState(soundFX.enabled);
  const [musicPlaying, setMusicPlaying] = useState(soundFX.isMusicPlaying);
  const [topZ, setTopZ] = useState(15);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(initialOpenApp || 'terminal');

  useEffect(() => {
    const unsub = soundFX.subscribeMusicState(setMusicPlaying);
    return unsub;
  }, []);

  const handleThemeChange = (newTheme: OSTheme) => {
    setCurrentTheme(newTheme);
    if (onThemeChange) onThemeChange(newTheme);
  };

  // Compute nice responsive center coordinates
  const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const terminalX = Math.max(120, Math.floor((screenW - 800) / 2));
  const builderX = Math.max(100, Math.floor((screenW - 860) / 2));
  const interviewX = Math.max(110, Math.floor((screenW - 840) / 2));
  const storyX = Math.max(90, Math.floor((screenW - 820) / 2));

  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'terminal',
      title: 'TERMINAL.EXE — POWERSHELL 7 (ASK DEV)',
      isOpen: initialOpenApp === 'terminal' || !initialOpenApp,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      position: { x: terminalX, y: 50 },
      size: { width: 800, height: 500 },
      icon: 'terminal'
    },
    {
      id: 'interview',
      title: 'INTERVIEW_DEV.EXE — 3D MOCK INTERVIEWER & VOICE AI',
      isOpen: initialOpenApp === 'interview',
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      position: { x: interviewX, y: 45 },
      size: { width: 840, height: 540 },
      icon: 'mic'
    },
    {
      id: 'story',
      title: 'STORY_MODE.EXE — CH01 TO CH09 NARRATIVE',
      isOpen: initialOpenApp === 'story',
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      position: { x: storyX, y: 40 },
      size: { width: 820, height: 520 },
      icon: 'book'
    },
    {
      id: 'builder',
      title: 'BUILDER_LAB.EXE — ENGINEERING DOSSIERS',
      isOpen: initialOpenApp === 'builder',
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      position: { x: builderX, y: 35 },
      size: { width: 860, height: 540 },
      icon: 'layers'
    },
    {
      id: 'about',
      title: 'ABOUT_ME.TXT — IDENTITY DOSSIER',
      isOpen: initialOpenApp === 'about',
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 140, y: 60 },
      size: { width: 640, height: 460 },
      icon: 'user'
    },
    {
      id: 'recruiter',
      title: 'RECRUITER.TXT — 60-SEC VIEW',
      isOpen: initialOpenApp === 'recruiter',
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 160, y: 80 },
      size: { width: 680, height: 500 },
      icon: 'file'
    },
    {
      id: 'proof',
      title: 'SPOTTED_IN_THE_WILD.EXE — REAL-WORLD PROOF',
      isOpen: initialOpenApp === 'proof',
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 130, y: 55 },
      size: { width: 800, height: 520 },
      icon: 'award'
    },
    {
      id: 'settings',
      title: 'SYSTEM_SETTINGS.EXE',
      isOpen: initialOpenApp === 'settings',
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 200, y: 90 },
      size: { width: 680, height: 480 },
      icon: 'settings'
    }
  ]);

  const bringToTop = (id: string) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
    );
  };

  const openWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isOpen: true, isMinimized: false } : w))
    );
    bringToTop(id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: false } : w)));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const toggleMaximizeWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const toggleSound = () => {
    soundFX.enabled = !soundFX.enabled;
    setSoundEnabled(soundFX.enabled);
  };

  const toggleMusic = () => {
    const playing = soundFX.toggleAmbientMusic();
    setMusicPlaying(playing);
  };

  const desktopIcons = [
    { id: 'interview', label: 'AI Interview', icon: <Mic size={22} className="text-emerald-300" /> },
    { id: 'terminal', label: 'Terminal', icon: <Terminal size={22} className="text-teal-300" /> },
    { id: 'builder', label: 'Builder Lab', icon: <Layers size={22} className="text-amber-300" /> },
    { id: 'story', label: 'Story Mode', icon: <BookOpen size={22} className="text-cyan-300" /> },
    { id: 'recruiter', label: 'Recruiter Dossier', icon: <FileText size={22} className="text-sky-300" /> },
    { id: 'proof', label: 'Spotted in Wild', icon: <Award size={22} className="text-yellow-300" /> },
    { id: 'about', label: 'About Aayush', icon: <User size={22} className="text-purple-300" /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={22} className="text-slate-200" /> },
  ];

  const getWallpaperBackground = () => {
    switch (wallpaper) {
      case 'teal':
        return '#008080';
      case 'bliss':
        return 'linear-gradient(180deg, #1f64bd 0%, #3e8ced 60%, #5cb85c 60%, #439a43 100%)';
      case 'dark':
        return '#090a0f';
      case 'indigo':
        return 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)';
    }
  };

  const renderAppContent = (id: string) => {
    switch (id) {
      case 'interview': return <InterviewApp />;
      case 'story': return <StoryModeApp />;
      case 'about': return <AboutApp />;
      case 'builder': return <BuilderLabApp />;
      case 'terminal': return <TerminalApp />;
      case 'recruiter': return <RecruiterApp />;
      case 'proof': return <ProofGalleryApp />;
      case 'settings':
        return (
          <SettingsApp
            currentWallpaper={wallpaper}
            onSelectWallpaper={wp => setWallpaper(wp as typeof wallpaper)}
            currentTheme={currentTheme}
            onSelectTheme={handleThemeChange}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            musicPlaying={musicPlaying}
            onToggleMusic={toggleMusic}
          />
        );
      default: return null;
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none font-sans"
      style={{ background: getWallpaperBackground() }}
    >
      {/* Desktop Icons Area */}
      <div className={`absolute left-4 flex flex-col gap-3.5 z-0 ${currentTheme === 'ubuntu' ? 'top-10' : 'top-4'}`}>
        {/* Switch back to Modern Web icon */}
        <button
          onClick={onExitToModern}
          className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/15 active:bg-blue-600/40 transition-all cursor-pointer w-24 text-center select-none"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-red text-white group-hover:scale-110 transition-transform shadow-lg border border-red-400/40">
            <ArrowLeft size={22} strokeWidth={2.5} />
          </div>
          <span className="mt-1.5 font-mono text-[11px] font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] leading-tight tracking-wide px-2 py-0.5 rounded bg-black/60 border border-white/10 group-hover:bg-brand-red transition-colors">
            Exit to Web
          </span>
        </button>

        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            onOpen={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Render Open Windows */}
      {windows.map(win => {
        if (!win.isOpen || win.isMinimized) return null;
        return (
          <WindowFrame
            key={win.id}
            id={win.id}
            title={win.title}
            isActive={activeWindowId === win.id}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            initialPos={win.position}
            initialSize={win.size}
            theme={currentTheme}
            onFocus={() => bringToTop(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => toggleMaximizeWindow(win.id)}
            onClose={() => closeWindow(win.id)}
          >
            {renderAppContent(win.id)}
          </WindowFrame>
        );
      })}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        theme={currentTheme}
        onSelectWindow={id => {
          const target = windows.find(w => w.id === id);
          if (target?.isMinimized) {
            bringToTop(id);
          } else if (activeWindowId === id) {
            minimizeWindow(id);
          } else {
            bringToTop(id);
          }
        }}
        onExitToModern={onExitToModern}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />
    </div>
  );
};
