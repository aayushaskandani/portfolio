import React from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { FileText, Download, Mail, ExternalLink, Phone, Award, GraduationCap } from 'lucide-react';

export const RecruiterApp: React.FC = () => {
  const { personal, projects, arsenal, milestones } = portfolioConfig;

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

      <div className="p-4 bg-white border border-[#a0a0a0] shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-2.5">
          <div>
            <h2 className="font-anton text-2xl text-[#000080]">{personal.name.toUpperCase()}</h2>
            <p className="text-slate-700 font-semibold">{personal.title}</p>
          </div>
          <div className="text-right text-xs text-slate-600 font-mono mt-2 sm:mt-0 space-y-0.5">
            <div>📍 {personal.location}</div>
            <div>🌐 <a href={personal.portfolioUrl || "https://aayushaskandani.vercel.app"} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-semibold">aayushaskandani.vercel.app</a></div>
            <div>✉️ {personal.email}</div>
            <div>📞 {personal.phone}</div>
          </div>
        </div>

        {/* Education & Academic Snapshot */}
        <div className="p-2.5 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-[#000080]" size={18} />
            <div>
              <span className="font-bold text-slate-900">Poornima University, Jaipur</span>
              <span className="text-slate-600 ml-2">B.Tech in Computer Science & Engineering</span>
            </div>
          </div>
          <div className="font-mono text-xs font-bold text-[#000080]">
            CGPA: 7.7/10 (2024–2028)
          </div>
        </div>

        <div>
          <h3 className="font-pixel text-sm font-bold text-[#000080] mb-1">
            EXECUTIVE SUMMARY
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {personal.shortBio} Proven experience designing O(1) PostgreSQL indexing algorithms, sub-15ms Redis cache-aside layers, and offline-first Progressive Web Apps.
          </p>
        </div>

        <div>
          <h3 className="font-pixel text-sm font-bold text-[#000080] mb-1">
            TECHNICAL ARSENAL
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
                <div className="mt-1.5 flex items-center gap-3">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-mono text-[11px] flex items-center gap-1">
                      <ExternalLink size={10} /> Live App
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline font-mono text-[11px] flex items-center gap-1">
                      <ExternalLink size={10} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Leadership */}
        <div>
          <h3 className="font-pixel text-sm font-bold text-[#000080] mb-1 flex items-center gap-1">
            <Award size={14} /> CERTIFICATIONS & RECOGNITION
          </h3>
          <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
            <li><strong>Google Cloud Arcade Legend:</strong> 359 labs, 76 courses, 121 skill badges, 55,267 points</li>
            <li><strong>GDG on Campus:</strong> Community Coordinator & Training Lead (200+ students)</li>
            <li><strong>McKinsey.org:</strong> Forward Program Graduate (Leadership & Problem Solving)</li>
            <li><strong>Google Cloud:</strong> Career Launchpad – Data Analytics</li>
            <li><strong>IBM:</strong> Artificial Intelligence Fundamentals</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-200 gap-2">
          <span className="text-xs text-slate-500 font-mono">Status: Ready for SDE / Full-Stack Interviews</span>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${personal.email}`}
              className="bevel-btn px-3 py-1.5 text-xs font-semibold text-black flex items-center gap-1.5"
            >
              <Mail size={12} /> Contact Email
            </a>
            <a
              href={`tel:${personal.phone}`}
              className="bevel-btn px-3 py-1.5 text-xs font-semibold text-black flex items-center gap-1.5"
            >
              <Phone size={12} /> Call
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
