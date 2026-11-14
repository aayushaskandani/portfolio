import React, { useState } from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { soundFX } from '../../../utils/audio';
import { Milestone } from '../../../types';
import { Award, CheckCircle, Trophy, Users, Shield } from 'lucide-react';

export const ProofGalleryApp: React.FC = () => {
  const { milestones } = portfolioConfig;
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? milestones
    : milestones.filter(m => m.category.toLowerCase() === filter.toLowerCase());

  const getCategoryIcon = (category: Milestone['category']) => {
    switch (category) {
      case 'Hackathons': return <Trophy size={14} className="text-amber-600" />;
      case 'Leadership': return <Users size={14} className="text-teal-600" />;
      case 'Certifications': return <Award size={14} className="text-cyan-600" />;
      case 'Work': return <Shield size={14} className="text-emerald-600" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#ece8dc] text-[#1a1a1a] space-y-4">
      {/* Top Banner */}
      <div className="p-3 bg-[#000080] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={16} />
          <span className="font-pixel text-base font-bold">SPOTTED_IN_THE_WILD.EXE — REAL-WORLD PROOF</span>
        </div>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">
          {milestones.length} VERIFIED ENTRIES
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['all', 'Hackathons', 'Leadership', 'Work', 'Certifications'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              soundFX.playClick();
              setFilter(cat);
            }}
            className={`bevel-btn px-2.5 py-1 text-xs font-mono capitalize cursor-pointer ${
              filter.toLowerCase() === cat.toLowerCase()
                ? 'bg-[#000080] text-white font-bold'
                : 'text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Milestones Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(item => (
          <div key={item.id} className="p-3.5 bg-white border border-[#a0a0a0] shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span className="font-mono text-[10px] text-slate-500 uppercase">{item.date}</span>
              <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle size={10} /> {item.badge}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                {getCategoryIcon(item.category)}
                <h4 className="font-bold text-sm text-[#000080]">{item.organization}</h4>
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">
                {item.roleOrAchievement}
              </div>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {item.description}
            </p>

            {item.verifiedStats && (
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{item.location || 'Verified'}</span>
                <span className="font-bold text-slate-800">{item.verifiedStats}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

