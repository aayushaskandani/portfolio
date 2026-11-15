import React, { useState } from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { Project } from '../../types';
import { soundFX } from '../../utils/audio';
import { useCanvasCraft } from './CanvasCraftTour';
import { useStarkHud } from './StarkJarvisHUD';
import { ExternalLink, Github, BookOpen, Layers, Sparkles, Cpu, Crosshair } from 'lucide-react';
import { LinkForgeSimulator, SyncBoardSimulator } from './ProjectSimulator';

interface WorkSectionProps {
  onOpenDossier: (projectId: string) => void;
  onOpenLightbox: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenDossier, onOpenLightbox }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'systems' | 'ai' | 'web'>('all');
  const { projects } = portfolioConfig;
  const { registerRef } = useCanvasCraft();
  const { isStarkHudActive } = useStarkHud();

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems & Cloud' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web', label: 'Web Platforms' }
  ];

  return (
    <section id="work" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div ref={(el) => registerRef('workHeader', el)} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-xs font-mono text-brand-red tracking-widest uppercase mb-1 flex items-center gap-2">
            <Cpu size={14} />
            <span>01 / SELECTED WORK</span>
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
            WORK THAT SPEAKS
            <span className="text-brand-red inline-block ml-1">.</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg font-light">
            Real systems solving hard technical bottlenecks: distributed simulations, low-latency AI pipelines, and high-throughput databases.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] self-start md:self-auto overflow-x-auto max-w-full">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setActiveFilter(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-mono whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-brand-red text-white font-semibold shadow-md shadow-brand-red/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Interactive 3D Glow Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => registerRef(`workCard${idx}`, el)}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -6;
              const rotateY = ((x - centerX) / centerX) * 6;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }}
            className="group relative rounded-2xl bg-gradient-to-b from-[#141624] to-[#0c0d16] border border-white/[0.08] hover:border-cyan-400/50 transition-all duration-200 flex flex-col justify-between overflow-hidden p-6 sm:p-7 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Stark Nanotech Corner Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Stark Tactical HUD Target Lock Overlay (When HUD is active) */}
            {isStarkHudActive && (
              <div className="absolute -top-1 left-4 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-400 text-[9px] font-mono text-cyan-300 font-bold tracking-widest flex items-center gap-1 shadow-[0_0_10px_#00f0ff] z-20 pointer-events-none animate-pulse">
                <Crosshair size={10} />
                <span>TARGET: 0x{project.id.toUpperCase()} // NOMINAL</span>
              </div>
            )}

            {/* Top Tag & Metric */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium">
                  {project.tag}
                </span>
                {project.metrics && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.metrics.split('·')[0]}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-anton text-2xl text-white group-hover:text-brand-red transition-colors tracking-wide">
                {project.name}
              </h3>

              {/* Problem / Architecture excerpt */}
              <p className="text-slate-300 text-xs sm:text-sm mt-3 font-light leading-relaxed line-clamp-3">
                {project.problem}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>

              {/* Interactive Live Micro-Simulator */}
              {project.id === 'linkforge' && <LinkForgeSimulator />}
              {project.id === 'syncboard' && <SyncBoardSimulator />}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  soundFX.playWindowOpen();
                  onOpenLightbox(project);
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
              >
                <Layers size={13} className="group-hover/btn:scale-125 transition-transform" />
                <span>Architecture Lightbox</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playClick()}
                    title="View GitHub Repository"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playClick()}
                    title="Visit Live Preview"
                    className="p-2 rounded-lg bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white transition-all cursor-pointer"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
