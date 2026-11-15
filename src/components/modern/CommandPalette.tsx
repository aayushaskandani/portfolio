import React, { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { OSTheme } from '../../types';
import { 
  Search, 
  Terminal, 
  Layers, 
  BookOpen, 
  Mic, 
  FileText, 
  Award, 
  Settings, 
  Monitor, 
  ExternalLink, 
  Music, 
  Users, 
  Mail, 
  CornerDownLeft,
  Crosshair,
  X,
  Share2
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOSApp: (appId: string) => void;
  onSwitchOSTheme: (theme: OSTheme) => void;
  onToggleMusic: () => void;
  onToggleStarkHud?: () => void;
}

interface CommandItem {
  id: string;
  category: 'Apps' | 'Projects' | 'Sections' | 'Themes' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenOSApp,
  onSwitchOSTheme,
  onToggleMusic,
  onToggleStarkHud
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundFX.playWindowOpen();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Command registry
  const commands: CommandItem[] = [
    // Apps
    {
      id: 'app-terminal',
      category: 'Apps',
      title: 'PowerShell 7 Terminal (Ask Dev)',
      subtitle: 'Interactive CLI with whoami, projects, contact & sudo hire',
      icon: <Terminal size={15} className="text-cyan-400" />,
      action: () => onOpenOSApp('terminal')
    },
    {
      id: 'app-interview',
      category: 'Apps',
      title: '3D Mock Interviewer & Voice AI',
      subtitle: 'Voice synthesis, mic input, and architectural Q&A',
      icon: <Mic size={15} className="text-emerald-400" />,
      action: () => onOpenOSApp('interview')
    },
    {
      id: 'app-story',
      category: 'Apps',
      title: 'Story Mode (CH01 – CH09)',
      subtitle: '9-chapter narrative from Old Laptop to System Builder',
      icon: <BookOpen size={15} className="text-amber-400" />,
      action: () => onOpenOSApp('story')
    },
    {
      id: 'app-builder',
      category: 'Apps',
      title: 'Builder Lab (Engineering Dossiers)',
      subtitle: 'Architecture diagrams, trade-offs & what broke in production',
      icon: <Layers size={15} className="text-purple-400" />,
      action: () => onOpenOSApp('builder')
    },
    {
      id: 'app-recruiter',
      category: 'Apps',
      title: 'Recruiter Profile (60-Second Speed Run)',
      subtitle: 'Fast summary, skills, verified stats & resume PDF',
      icon: <FileText size={15} className="text-blue-400" />,
      action: () => onOpenOSApp('recruiter')
    },
    {
      id: 'app-proof',
      category: 'Apps',
      title: 'Real Proof & Credentials',
      subtitle: 'Google Cloud Arcade Legend, GDG leadership & certifications',
      icon: <Award size={15} className="text-yellow-400" />,
      action: () => onOpenOSApp('proof')
    },
    {
      id: 'app-settings',
      category: 'Apps',
      title: 'System Settings (Wallpapers & Audio)',
      subtitle: 'Custom wallpapers, audio synthesis toggles & themes',
      icon: <Settings size={15} className="text-slate-400" />,
      action: () => onOpenOSApp('settings')
    },

    // Projects
    ...portfolioConfig.projects.map(p => ({
      id: `proj-${p.id}`,
      category: 'Projects' as const,
      title: p.name,
      subtitle: `${p.tag} · ${p.techStack.slice(0, 3).join(', ')}`,
      icon: <Layers size={15} className="text-brand-red" />,
      action: () => onOpenOSApp('builder')
    })),

    // Modern Sections
    {
      id: 'sec-work',
      category: 'Sections',
      title: 'Jump to 01 / Selected Work',
      subtitle: 'Filterable engineering cards',
      icon: <Layers size={15} className="text-white/70" />,
      action: () => {
        window.location.hash = '#work';
        onClose();
      }
    },
    {
      id: 'sec-process',
      category: 'Sections',
      title: 'Jump to 02 / Process Revealed (Wireframe Slider)',
      subtitle: 'Interactive split-divider wireframe comparison',
      icon: <Monitor size={15} className="text-white/70" />,
      action: () => {
        window.location.hash = '#wireframe';
        onClose();
      }
    },
    {
      id: 'sec-craft',
      category: 'Sections',
      title: 'Jump to 03 / Behind the Craft (12 Tech Boxes)',
      subtitle: 'Click-to-craft synthesized audio frequencies',
      icon: <Award size={15} className="text-white/70" />,
      action: () => {
        window.location.hash = '#craft';
        onClose();
      }
    },
    {
      id: 'sec-story',
      category: 'Sections',
      title: 'Jump to Story Mode Timeline',
      subtitle: '9-chapter narrative journey',
      icon: <BookOpen size={15} className="text-white/70" />,
      action: () => {
        window.location.hash = '#story';
        onClose();
      }
    },
    {
      id: 'sec-contact',
      category: 'Sections',
      title: 'Jump to 05 / Contact & Socials',
      subtitle: 'Direct inbox & fast-track collaboration',
      icon: <Mail size={15} className="text-white/70" />,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      }
    },

    // Themes
    {
      id: 'theme-win98',
      category: 'Themes',
      title: 'Switch to Windows 98 Classic Teal',
      subtitle: 'Authentic retro grey bevels & teal wallpaper (#008080)',
      icon: <Monitor size={15} className="text-teal-400" />,
      action: () => {
        onSwitchOSTheme('win98');
        onOpenOSApp('builder');
      }
    },
    {
      id: 'theme-win11',
      category: 'Themes',
      title: 'Switch to Windows 11 Modern Glass Dock',
      subtitle: 'Frosted blur taskbar dock, rounded windows & fluent styling',
      icon: <Monitor size={15} className="text-sky-400" />,
      action: () => {
        onSwitchOSTheme('win11');
        onOpenOSApp('builder');
      }
    },
    {
      id: 'theme-ubuntu',
      category: 'Themes',
      title: 'Switch to Ubuntu GNOME Aubergine',
      subtitle: 'Canonical top bar, vertical orange dock & left close buttons',
      icon: <Monitor size={15} className="text-orange-400" />,
      action: () => {
        onSwitchOSTheme('ubuntu');
        onOpenOSApp('builder');
      }
    },

    // Quick Actions
    {
      id: 'act-music',
      category: 'Actions',
      title: soundFX.isMusicPlaying ? 'Mute Lo-Fi Ambient Synthesizer' : 'Play Lo-Fi Ambient Synthesizer',
      subtitle: 'Real-time Web Audio API ambient chords (zero external mp3)',
      icon: <Music size={15} className="text-emerald-400" />,
      action: () => {
        onToggleMusic();
        onClose();
      }
    },
    {
      id: 'act-stark-hud',
      category: 'Actions',
      title: 'Toggle Stark Tactical HUD & Scanner',
      subtitle: 'Activate holographic diagnostics & project target locks',
      icon: <Crosshair size={15} className="text-cyan-400" />,
      action: () => {
        onToggleStarkHud?.();
        onClose();
      }
    },
    {
      id: 'act-share-portfolio',
      category: 'Actions',
      title: 'Copy Portfolio URL to Clipboard',
      subtitle: portfolioConfig.personal.portfolioUrl || 'https://aayushaskandani.vercel.app',
      icon: <Share2 size={15} className="text-teal-400" />,
      action: () => {
        navigator.clipboard.writeText(portfolioConfig.personal.portfolioUrl || 'https://aayushaskandani.vercel.app');
        soundFX.playClick();
        onClose();
      }
    },
    {
      id: 'act-email',
      category: 'Actions',
      title: 'Copy Email to Clipboard',
      subtitle: portfolioConfig.personal.email,
      icon: <Mail size={15} className="text-brand-red" />,
      action: () => {
        navigator.clipboard.writeText(portfolioConfig.personal.email);
        soundFX.playClick();
        onClose();
      }
    }
  ];

  // Filter based on search query
  const filtered = search.trim() === ''
    ? commands
    : commands.filter(cmd =>
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase()) ||
        (cmd.subtitle && cmd.subtitle.toLowerCase().includes(search.toLowerCase()))
      );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
        soundFX.playFrequency(600, 0.02);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
        soundFX.playFrequency(600, 0.02);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md transition-all">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-[#11131c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center gap-3 bg-[#161825]">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or section... (e.g. 'terminal', 'story', 'resilience', 'theme')"
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No matching commands or projects found for "{search}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-brand-red text-white shadow-md'
                    : 'hover:bg-white/5 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    selectedIndex === idx ? 'bg-white/20 text-white' : 'bg-white/5'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-xs sm:text-sm truncate">
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className={`text-[11px] truncate font-light ${
                        selectedIndex === idx ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                    selectedIndex === idx ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                  }`}>
                    {item.category}
                  </span>
                  {selectedIndex === idx && (
                    <CornerDownLeft size={14} className="text-white/80" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-[#0d0e17] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Antigravity Command Palette</span>
        </div>
      </div>
    </div>
  );
};

