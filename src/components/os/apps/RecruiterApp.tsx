import React from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { FileText, Download, Mail, ExternalLink } from 'lucide-react';

export const RecruiterApp: React.FC = () => {
  const { personal, projects, arsenal } = portfolioConfig;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#ece8dc] text-[#1a1a1a] font-sans text-xs sm:text-sm space-y-4">
      <div className="p-3 bg-[#000080] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} />
          <span className="font-pixel text-base font-bold">RECRUITER.TXT — 60-SECOND VIEW</span>
        </div>
        <a
          href={personal.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="bevel-btn px-2.5 py-1 text-xs text-black font-semibold flex items-center gap-1.5"
        >
          <Download size={12} />
          <span>Resume PDF</span>
        </a>
      </div>

      <div className="p-4 bg-white border border-[#a0a0a0] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h2 className="font-anton text-2xl text-[#000080]">{personal.name.toUpperCase()}</h2>
            <p className="text-slate-600 font-medium">{personal.title}</p>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono mt-1 sm:mt-0">
            <div>{personal.location}</div>
            <div>{personal.email}</div>
          </div>
        </div>

        <div>
          <h3 className="font-pixel text-sm font-bold text-[#000080] mb-1">
            EXECUTIVE SUMMARY
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {personal.shortBio} Proven track record building high-concurrency microservices, state machines with zero unhandled edge states, and sub-100ms real-time telemetry streaming architectures.
          </p>
        </div>

        <div>
          <h3 className="font-pixel text-sm font-bold text-[#000080] mb-1">
            CORE TECHNICAL STACK
          </h3>
          <p className="text-slate-700 font-mono text-xs">
            {arsenal.map(a => a.name).join(' · ')}
          </p>
        </div>

        <div>
          <h3 className="font-pixel text-sm font-bold text-[#000080] mb-2">
            FEATURED PRODUCTION DELIVERABLES
          </h3>
          <div className="space-y-2">
            {projects.slice(0, 3).map(p => (
              <div key={p.id} className="p-2.5 bg-[#f8f9fa] border border-[#e2e8f0] rounded">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold">{p.metrics}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{p.problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-200">
          <span className="text-xs text-slate-500 font-mono">Ready to schedule interview</span>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${personal.email}`}
              className="bevel-btn px-3 py-1.5 text-xs font-semibold text-black flex items-center gap-1.5"
            >
              <Mail size={12} /> Contact Email
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bevel-btn px-3 py-1.5 text-xs font-semibold text-black flex items-center gap-1.5"
            >
              <ExternalLink size={12} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

