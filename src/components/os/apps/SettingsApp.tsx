import React from 'react';
import { soundFX } from '../../../utils/audio';
import { OSTheme } from '../../../types';
import { Settings, Image, Volume2, Monitor, Music, Sparkles } from 'lucide-react';

interface SettingsAppProps {
  currentWallpaper: string;
  onSelectWallpaper: (wp: string) => void;
  currentTheme: OSTheme;
  onSelectTheme: (theme: OSTheme) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  currentWallpaper,
  onSelectWallpaper,
  currentTheme,
  onSelectTheme,
  soundEnabled,
  onToggleSound,
  musicPlaying,
  onToggleMusic
}) => {
  const wallpapers = [
    { id: 'teal', label: 'Classic Windows 98 Teal', color: '#008080' },
    { id: 'bliss', label: 'Windows XP Bliss Gradient', gradient: 'linear-gradient(180deg, #1f64bd 0%, #3e8ced 60%, #5cb85c 60%, #439a43 100%)' },
    { id: 'dark', label: 'Dark Terminal Matrix', color: '#090a0f' },
    { id: 'indigo', label: 'Cyber Indigo Grid', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }
  ];

  const themes: { id: OSTheme; label: string; desc: string; badge: string }[] = [
    {
      id: 'win98',
      label: 'Windows 98 / Classic',
      desc: 'Authentic 90s beveled buttons, classic blue header gradients and pixel taskbar',
      badge: 'RETRO CLASSIC'
    },
    {
      id: 'win11',
      label: 'Windows 11 Modern Glass Dock',
      desc: 'Frosted glass floating centered dock, rounded 2xl windows & fluent styling',
      badge: 'MODERN FLUENT'
    },
    {
      id: 'ubuntu',
      label: 'Ubuntu GNOME Aubergine',
      desc: 'Canonical top bar, left orange window controls & dark theme',
      badge: 'LINUX GNOME'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0e1019] text-[#f1f5f9] space-y-5 select-none font-sans text-xs sm:text-sm">
      {/* Top Banner */}
      <div className="p-3.5 bg-gradient-to-r from-[#121626] to-[#1e2338] border border-white/10 rounded-xl text-white flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <Settings size={18} className="text-cyan-400" />
          <span className="font-mono text-sm sm:text-base font-bold tracking-wide">
            SYSTEM_SETTINGS.EXE // ENVIRONMENT CONTROL
          </span>
        </div>
        <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          CONFIGURATION
        </span>
      </div>

      {/* OS Theme Engine Selector */}
      <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/10 rounded-2xl shadow-sm space-y-3">
        <h3 className="font-mono text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider">
          <Monitor size={14} /> DESKTOP OPERATING SYSTEM FLAVOR
        </h3>
        <p className="text-xs text-slate-400 font-light">
          Switch the window frame chrome, taskbar layout, and desktop skin in real time:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {themes.map(th => (
            <button
              key={th.id}
              onClick={() => {
                soundFX.playClick();
                onSelectTheme(th.id);
              }}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                currentTheme === th.id
                  ? 'border-sky-400 bg-sky-500/15 shadow-md shadow-sky-500/10'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-xs text-white">{th.label}</span>
                  {currentTheme === th.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                  {th.desc}
                </p>
              </div>
              <div className="mt-3 text-[9px] font-mono text-sky-300 uppercase tracking-widest">
                {th.badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Wallpaper Selection */}
      <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/10 rounded-2xl shadow-sm space-y-3">
        <h3 className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
          <Image size={14} /> DESKTOP WALLPAPER SKIN
        </h3>
        <p className="text-xs text-slate-400 font-light">
          Select background skin for the desktop simulation:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {wallpapers.map(wp => (
            <button
              key={wp.id}
              onClick={() => {
                soundFX.playClick();
                onSelectWallpaper(wp.id);
              }}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col items-center gap-2 ${
                currentWallpaper === wp.id
                  ? 'border-emerald-400 bg-emerald-500/15 shadow-md'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              <div
                className="w-full h-12 rounded-lg border border-white/20 shadow-inner"
                style={{
                  backgroundColor: wp.color,
                  background: wp.gradient || wp.color
                }}
              />
              <span className="text-[11px] font-mono text-center truncate w-full text-slate-200">
                {wp.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Audio Engine Configuration */}
      <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/10 rounded-2xl shadow-sm space-y-3">
        <h3 className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
          <Volume2 size={14} /> SOUND EFFECTS & SYNTHESIZER
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Sound FX Toggle */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-white">Synthesized Click & Warp SFX</div>
              <div className="text-[11px] text-slate-400 font-light">Web Audio oscillator frequencies</div>
            </div>
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleSound();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-slate-400'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Ambient Music Toggle */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-white">Lo-Fi Ambient Chords</div>
              <div className="text-[11px] text-slate-400 font-light">Zero external MP3, continuous tape synth</div>
            </div>
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleMusic();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                musicPlaying
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/10 text-slate-400'
              }`}
            >
              {musicPlaying ? 'PLAYING' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
