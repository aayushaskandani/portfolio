import React from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { Monitor } from 'lucide-react';

interface FooterProps {
  onSwitchToOS: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSwitchToOS }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] py-8 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
        <span>
          © {currentYear} {portfolioConfig.personal.name.toUpperCase()} · ALL RIGHTS RESERVED
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span>BUILT WITH DETERMINISTIC STATE & ZERO BLOAT</span>
        <span>/</span>
        <button
          onClick={() => {
            soundFX.playWindowOpen();
            onSwitchToOS();
          }}
          className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Monitor size={12} />
          <span>Switch to OS Desktop</span>
        </button>
      </div>
    </footer>
  );
};

