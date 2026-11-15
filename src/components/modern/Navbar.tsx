import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { Monitor, Volume2, VolumeX, Music, Search, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onSwitchToOS: () => void;
  onOpenCommandPalette: () => void;
  onRebuildCanvas: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSwitchToOS,
  onOpenCommandPalette,
  onRebuildCanvas
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundFX.enabled);
  const [musicPlaying, setMusicPlaying] = useState(soundFX.isMusicPlaying);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = soundFX.subscribeMusicState((playing) => {
      setMusicPlaying(playing);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    soundFX.enabled = !soundFX.enabled;
    setSoundEnabled(soundFX.enabled);
    if (soundFX.enabled) {
      soundFX.playClick();
    }
  };

  const toggleMusic = () => {
    const isNowPlaying = soundFX.toggleAmbientMusic();
    setMusicPlaying(isNowPlaying);
  };

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#wireframe" },
    { label: "Arsenal", href: "#craft" },
    { label: "Story", href: "#story" },
    { label: "Milestones", href: "#journey" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#08090d]/85 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3.5 transition-all select-none font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={() => soundFX.playClick()}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-brand-red group-hover:scale-125 transition-transform animate-pulse" />
          <span className="font-anton text-xl tracking-wider text-white group-hover:text-brand-red transition-colors uppercase">
            {portfolioConfig.personal.name}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full hidden sm:inline-block">
            PORTFOLIO.EXE
          </span>
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-mono text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundFX.playClick()}
              className="hover:text-white transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search size={13} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-white/10 px-1 rounded text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Rebuild Canvas Tour Button */}
          <button
            onClick={() => {
              soundFX.playWarp();
              onRebuildCanvas();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff3b3b] to-[#dc2626] hover:from-[#ff5252] hover:to-[#ef4444] text-white text-xs font-semibold shadow-lg shadow-red-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Watch mouse pointers span selector boxes to craft the site"
          >
            <Sparkles size={13} className="animate-spin" style={{ animationDuration: "3s" }} />
            <span className="hidden sm:inline">✨ Rebuild Canvas</span>
            <span className="sm:hidden">Canvas</span>
          </button>

          {/* Lo-Fi Ambient Synthesizer & Equalizer */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-mono cursor-pointer ${
              musicPlaying
                ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 shadow-sm'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
            title={musicPlaying ? "Mute Lo-Fi Synthesizer" : "Play Ambient Lo-Fi Synthesizer (Zero MP3s)"}
          >
            <Music size={13} className={musicPlaying ? 'animate-bounce text-emerald-400' : ''} />
            {/* Live Equalizer 4 Bars */}
            <div className="flex items-end gap-0.5 h-3 w-3">
              {[musicPlaying ? 'h-3 animate-pulse' : 'h-1', musicPlaying ? 'h-2 animate-bounce' : 'h-1', musicPlaying ? 'h-3.5 animate-pulse' : 'h-1', musicPlaying ? 'h-2.5 animate-bounce' : 'h-1'].map((cls, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full ${musicPlaying ? 'bg-emerald-400' : 'bg-slate-500'} ${cls}`}
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-white/[0.04] text-white border-white/10'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}
            title={soundEnabled ? "Mute SFX" : "Unmute SFX"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Launch OS Desktop Button */}
          <button
            onClick={() => {
              soundFX.playWindowOpen();
              onSwitchToOS();
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-300 font-mono text-xs font-semibold shadow-md shadow-teal-500/10 hover:shadow-teal-500/20 transition-all cursor-pointer group"
          >
            <Monitor size={14} className="group-hover:rotate-12 transition-transform text-teal-400" />
            <span className="hidden sm:inline">Launch OS Desktop</span>
            <span className="sm:hidden">OS Mode</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(prev => !prev);
            }}
            className="lg:hidden p-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/[0.08] grid grid-cols-3 gap-2 text-center text-xs font-mono uppercase tracking-wider text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
