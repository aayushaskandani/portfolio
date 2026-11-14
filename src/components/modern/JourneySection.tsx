import React from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { Milestone } from '../../types';
import { useCanvasCraft } from './CanvasCraftTour';
import { Trophy, Users, Shield, Award, CheckCircle } from 'lucide-react';

interface JourneySectionProps {
  onOpenProofGallery: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onOpenProofGallery }) => {
  const { milestones } = portfolioConfig;
  const { registerRef } = useCanvasCraft();

  const getCategoryIcon = (category: Milestone['category']) => {
    switch (category) {
      case 'Hackathons': return <Trophy size={14} className="text-amber-400" />;
      case 'Leadership': return <Users size={14} className="text-teal-400" />;
      case 'Certifications': return <Award size={14} className="text-cyan-400" />;
      case 'Work': return <Shield size={14} className="text-emerald-400" />;
    }
  };

  return (
    <section
      ref={(el) => registerRef('journeySection', el)}
      id="journey"
      className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="mb-12">
        <div className="text-xs font-mono text-brand-red tracking-widest uppercase mb-1">
          04 / THE JOURNEY
        </div>
        <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
          KEEP BUILDING. <span className="text-brand-red">KEEP SHIPPING.</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-light">
          Real-world milestones: hackathon war rooms, keynote stages, community leadership, and production software deliveries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Milestone Cards */}
        <div className="lg:col-span-8 space-y-4">
          {milestones.map((milestone: Milestone) => (
            <div
              key={milestone.id}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 shrink-0">
                    {getCategoryIcon(milestone.category)}
                  </span>
                  <span className="font-anton text-lg sm:text-xl text-white tracking-wide group-hover:text-brand-red transition-colors">
                    {milestone.organization}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 ml-1">
                    {milestone.date}
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-200">
                  {milestone.roleOrAchievement}
                </div>

                <p className="text-xs text-slate-400 font-light leading-relaxed max-w-2xl">
                  {milestone.description}
                </p>
              </div>

              {/* Right pill */}
              <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 self-start sm:self-auto">
                <span className="text-[10px] font-mono text-brand-red px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 whitespace-nowrap flex items-center gap-1">
                  <CheckCircle size={10} />
                  VERIFIED MILESTONE
                </span>
                {milestone.verifiedStats && (
                  <span className="text-[11px] font-mono text-slate-400">
                    {milestone.verifiedStats}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: "SHIPPED. LIVE. USED." Bento Card */}
        <div ref={(el) => registerRef('journeyPhoto', el)} className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#181a24] to-[#0c0d14] border border-white/10 flex flex-col justify-between space-y-6 shadow-2xl">
          <div>
            <div className="font-anton text-3xl sm:text-4xl text-brand-red tracking-wide leading-none">
              SHIPPED.<br />
              LIVE. USED.
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed font-light">
              From competitive hackathon arenas with 72-hour deadlines to auditorium keynotes with 200+ developers, I believe engineering proves itself only when systems run in the real world.
            </p>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Hackathon Finalist</span>
                <span className="text-emerald-400 font-semibold">Top 5</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Community Growth</span>
                <span className="text-cyan-400 font-semibold">+1,200 Members</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Code Uptime</span>
                <span className="text-teal-400 font-semibold">99.9%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playWindowOpen();
              onOpenProofGallery();
            }}
            className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-brand-red hover:text-white border border-white/10 font-mono text-xs text-slate-200 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Award size={14} />
            <span>Open Proof Gallery in OS Mode</span>
          </button>
        </div>
      </div>
    </section>
  );
};

