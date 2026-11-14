import React from 'react';
import { soundFX } from '../../utils/audio';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onOpen }) => {
  return (
    <button
      onClick={() => {
        soundFX.playWindowOpen();
        onOpen();
      }}
      className="group flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/15 active:bg-blue-600/40 transition-all cursor-pointer w-24 text-center select-none"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/40 border border-white/15 group-hover:scale-110 transition-transform shadow-lg group-hover:border-white/30 backdrop-blur-sm">
        {icon}
      </div>
      <span className="mt-1.5 font-mono text-[11px] font-semibold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] leading-tight tracking-wide px-2 py-0.5 rounded bg-black/50 border border-white/10 group-hover:bg-blue-900/80 transition-colors">
        {label}
      </span>
    </button>
  );
};
