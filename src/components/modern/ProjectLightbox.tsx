import React from 'react';
import { Project } from '../../types';
import { soundFX } from '../../utils/audio';
import { X, Layers, AlertTriangle, CheckCircle, ExternalLink, Github, Cpu, Database, GitBranch } from 'lucide-react';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn select-none font-sans">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#11131c] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#161926]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red shrink-0">
              <Layers size={20} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-brand-red tracking-widest uppercase">
                {project.tag}
              </div>
              <h2 className="font-anton text-2xl sm:text-3xl text-white tracking-wide">
                {project.name}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playWindowClose();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300">
                {project.metrics || 'Verified Engineering Architecture'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Github size={13} />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="px-3 py-1.5 rounded-lg bg-brand-red hover:bg-brand-redHover text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <ExternalLink size={13} />
                  <span>Live System</span>
                </a>
              )}
            </div>
          </div>

          {/* Problem & Solution Statement */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu size={14} className="text-brand-red" />
              THE BOTTLENECK & PROBLEM STATEMENT
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              {project.problem}
            </p>
          </div>

          {/* System Architecture Blueprint */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database size={14} className="text-cyan-400" />
              MICROSERVICES & ARCHITECTURAL TOPOLOGY
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {project.architecture}
            </p>

            {/* Architecture Node Flowchart */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px] font-medium">
                1. Client Interactive Topology UI
              </div>
              <span className="text-slate-600 font-mono">→</span>
              <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[11px] font-medium">
                2. Asynchronous Ingestion & SWR
              </div>
              <span className="text-slate-600 font-mono">→</span>
              <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px] font-medium">
                3. Redis Event Queue & PgBouncer
              </div>
              <span className="text-slate-600 font-mono">→</span>
              <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px] font-medium">
                4. Simulation & Telemetry Store
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">
              TECHNOLOGY ARSENAL
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Architectural Decisions */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <GitBranch size={14} className="text-purple-400" />
              KEY ARCHITECTURAL TRADE-OFFS & DECISIONS
            </h3>
            <ul className="space-y-2">
              {project.keyDecisions.map((decision, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 font-light flex items-start gap-2.5">
                  <span className="text-purple-400 mt-0.5">▶</span>
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Broke in Production & How It Was Solved */}
          <div className="p-4 sm:p-5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-red-400" />
              WHAT BROKE & PRODUCTION FIXES (POST-MORTEM)
            </h3>
            <ul className="space-y-2.5">
              {project.whatBrokeAndFix.map((broke, i) => (
                <li key={i} className="text-xs sm:text-sm text-red-200/90 font-light flex items-start gap-2.5 leading-relaxed">
                  <span className="text-red-400 font-mono font-bold mt-0.5">⚠</span>
                  <span>{broke}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Outcomes */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-400" />
              VERIFIED IMPACT & OUTCOMES
            </h3>
            <ul className="space-y-2">
              {project.outcome.map((out, i) => (
                <li key={i} className="text-xs sm:text-sm text-emerald-200 font-light flex items-start gap-2.5">
                  <span className="text-emerald-400 mt-0.5">✔</span>
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

