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

            {/* Visual System Architecture Data-Flow */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2">
                DATA-PIPELINE TOPOLOGY FLOW:
              </div>

              {project.id === 'linkforge' ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                    <div className="text-[9px] text-slate-400">01. INGRESS</div>
                    <div className="font-bold mt-0.5">Cloudflare Edge</div>
                    <div className="text-[9px] text-slate-400 mt-1">WAF &amp; Geo-Routing</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300">
                    <div className="text-[9px] text-slate-400">02. GATEWAY</div>
                    <div className="font-bold mt-0.5">FastAPI &amp; Rate Limiter</div>
                    <div className="text-[9px] text-slate-400 mt-1">Sliding-Window Algo</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <div className="text-[9px] text-slate-400">03. CACHE-ASIDE</div>
                    <div className="font-bold mt-0.5">Redis Cluster</div>
                    <div className="text-[9px] text-emerald-400 mt-1">&lt;15ms Redirects (RAM)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                    <div className="text-[9px] text-slate-400">04. PERSISTENCE</div>
                    <div className="font-bold mt-0.5">PostgreSQL Pool</div>
                    <div className="text-[9px] text-slate-400 mt-1">ACID &amp; Click Telemetry</div>
                  </div>
                </div>
              ) : project.id === 'syncboard' ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                    <div className="text-[9px] text-slate-400">01. CLIENT UI</div>
                    <div className="font-bold mt-0.5">React 19 Optimistic</div>
                    <div className="text-[9px] text-slate-400 mt-1">Instant Local State</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300">
                    <div className="text-[9px] text-slate-400">02. REALTIME</div>
                    <div className="font-bold mt-0.5">Socket.IO Rooms</div>
                    <div className="text-[9px] text-slate-400 mt-1">Board-Scoped Broadcast</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <div className="text-[9px] text-slate-400">03. INDEXING</div>
                    <div className="font-bold mt-0.5">O(1) Fractional Index</div>
                    <div className="text-[9px] text-emerald-400 mt-1">Zero Mass-Shift</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                    <div className="text-[9px] text-slate-400">04. DATABASE</div>
                    <div className="font-bold mt-0.5">PostgreSQL Master</div>
                    <div className="text-[9px] text-slate-400 mt-1">Row-Level Locks</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                    <div className="text-[9px] text-slate-400">01. CLIENT OFFLINE</div>
                    <div className="font-bold mt-0.5">PWA Service Worker</div>
                    <div className="text-[9px] text-slate-400 mt-1">CacheStorage API</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300">
                    <div className="text-[9px] text-slate-400">02. SPATIAL MAPS</div>
                    <div className="font-bold mt-0.5">Leaflet.js Engine</div>
                    <div className="text-[9px] text-slate-400 mt-1">GeoJSON Vector Trails</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <div className="text-[9px] text-slate-400">03. AI INTELLIGENCE</div>
                    <div className="font-bold mt-0.5">Claude NLP Routing</div>
                    <div className="text-[9px] text-emerald-400 mt-1">Natural-Language Search</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                    <div className="text-[9px] text-slate-400">04. EXPEDITIONS</div>
                    <div className="font-bold mt-0.5">210+ Himalayan Treks</div>
                    <div className="text-[9px] text-slate-400 mt-1">Full Offline Readiness</div>
                  </div>
                </div>
              )}
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

