import React, { useState } from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { soundFX } from '../../../utils/audio';
import { Project } from '../../../types';
import { Layers, AlertTriangle, CheckCircle, ExternalLink, Github } from 'lucide-react';

interface BuilderLabAppProps {
  initialProjectId?: string;
}

export const BuilderLabApp: React.FC<BuilderLabAppProps> = ({ initialProjectId }) => {
  const { projects } = portfolioConfig;
  const [selectedId, setSelectedId] = useState<string>(
    initialProjectId || projects[0]?.id || 'resilience-os'
  );

  const selectedProject = projects.find(p => p.id === selectedId) || projects[0];

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#ece8dc] text-[#1a1a1a]">
      {/* Left Sidebar: Projects List */}
      <div className="w-full md:w-56 bg-[#dcd7cb] border-b md:border-b-0 md:border-r border-[#a0a0a0] p-2 overflow-y-auto shrink-0 space-y-1">
        <div className="p-1.5 font-pixel text-xs font-bold text-[#000080] uppercase tracking-wider mb-1">
          📁 PROJECT DOSSIERS
        </div>
        {projects.map((project: Project) => (
          <button
            key={project.id}
            onClick={() => {
              soundFX.playClick();
              setSelectedId(project.id);
            }}
            className={`w-full text-left p-2 rounded text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
              selectedId === project.id
                ? 'bg-[#000080] text-white font-semibold shadow-sm'
                : 'hover:bg-white/40 text-slate-800'
            }`}
          >
            <span className="truncate mr-1">{project.name.split('·')[0].trim()}</span>
            <span className="text-[10px] font-mono opacity-70 uppercase">{project.category}</span>
          </button>
        ))}
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {/* Header */}
        <div className="border-b border-[#a0a0a0] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase bg-[#000080] text-white px-2 py-0.5 rounded">
              {selectedProject.tag}
            </span>
            {selectedProject.metrics && (
              <span className="text-xs font-mono text-emerald-800 font-semibold">
                [{selectedProject.metrics}]
              </span>
            )}
          </div>
          <h2 className="font-anton text-2xl sm:text-3xl text-[#000080] tracking-wide">
            {selectedProject.name}
          </h2>
        </div>

        {/* Problem Statement */}
        <div className="p-3 bg-white border border-[#a0a0a0] shadow-sm">
          <h4 className="font-pixel text-sm font-bold text-[#800000] uppercase mb-1">
            PROBLEM STATEMENT
          </h4>
          <p className="font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
            {selectedProject.problem}
          </p>
        </div>

        {/* Architecture Breakdown */}
        <div className="p-3 bg-white border border-[#a0a0a0] shadow-sm space-y-2">
          <h4 className="font-pixel text-sm font-bold text-[#000080] uppercase flex items-center gap-1.5">
            <Layers size={14} /> SYSTEM ARCHITECTURE
          </h4>
          <p className="font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
            {selectedProject.architecture}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
            {selectedProject.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 bg-[#dfdfdf] border border-[#a0a0a0] rounded text-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Decisions */}
        <div className="p-3 bg-white border border-[#a0a0a0] shadow-sm">
          <h4 className="font-pixel text-sm font-bold text-[#006000] uppercase mb-2 flex items-center gap-1.5">
            <CheckCircle size={14} /> KEY ARCHITECTURAL DECISIONS
          </h4>
          <ul className="space-y-1.5 font-sans text-xs text-slate-700">
            {selectedProject.keyDecisions.map((decision, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#006000] font-bold">✔</span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT BROKE & HOW IT WAS FIXED (Authentic Field Notes) */}
        <div className="p-3 bg-[#fff8e6] border-2 border-[#d97706] shadow-sm">
          <h4 className="font-pixel text-sm font-bold text-[#b45309] uppercase mb-2 flex items-center gap-1.5">
            <AlertTriangle size={15} /> WHAT BROKE & HOW IT WAS SOLVED (FIELD NOTES)
          </h4>
          <ul className="space-y-2 font-sans text-xs text-slate-800">
            {selectedProject.whatBrokeAndFix.map((item, idx) => (
              <li key={idx} className="p-2 bg-white/70 border border-[#fde68a] rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome and Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#a0a0a0]">
          <div className="font-sans text-xs text-slate-700">
            <strong>Outcome:</strong> {selectedProject.outcome[0]}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bevel-btn px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 text-slate-900"
              >
                <Github size={13} />
                <span>GitHub</span>
              </a>
            )}
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bevel-btn px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 bg-[#000080] text-white"
              >
                <ExternalLink size={13} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

