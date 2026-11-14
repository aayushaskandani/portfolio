import React from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { User, Terminal, BookOpen, Mail } from 'lucide-react';

export const AboutApp: React.FC = () => {
  const { personal } = portfolioConfig;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#ece8dc] text-[#1a1a1a] font-pixel text-base space-y-4">
      {/* Header Banner */}
      <div className="p-3 bg-[#000080] text-white flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span className="font-bold text-lg">IDENTITY DOSSIER // {personal.name.toUpperCase()}</span>
        </div>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded">STATUS: ACTIVE</span>
      </div>

      {/* Main Bio Card */}
      <div className="p-4 bg-white border border-[#a0a0a0] shadow-inner space-y-3">
        <h2 className="text-xl font-bold text-[#000080] border-b border-[#c0c0c0] pb-1">
          {personal.name} — {personal.title}
        </h2>
        <p className="text-slate-800 leading-relaxed font-sans text-sm">
          {personal.shortBio}
        </p>
        <p className="text-slate-800 leading-relaxed font-sans text-sm italic">
          "{personal.philosophy}"
        </p>
      </div>

      {/* Fast Specs Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-white border border-[#a0a0a0]">
          <h3 className="text-sm font-bold text-[#000080] mb-2 flex items-center gap-1.5">
            <Terminal size={14} /> CORE ATTRIBUTES
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-700">
            <li>• <strong>Focus:</strong> Deterministic distributed systems</li>
            <li>• <strong>Frontend:</strong> React, Next.js, Tailwind, Framer Motion</li>
            <li>• <strong>Backend:</strong> Python (FastAPI), Node.js, Express</li>
            <li>• <strong>Databases:</strong> PostgreSQL, Redis, TimescaleDB</li>
          </ul>
        </div>

        <div className="p-3 bg-white border border-[#a0a0a0]">
          <h3 className="text-sm font-bold text-[#000080] mb-2 flex items-center gap-1.5">
            <BookOpen size={14} /> ORIGIN & MINDSET
          </h3>
          <p className="font-sans text-xs text-slate-700 leading-relaxed">
            "Built by speaking, refined by breaking." Thinking aloud into voice dictation and architecting before typing creates a 3x faster feedback loop for rapid systems iteration.
          </p>
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="p-3 bg-[#dfdfdf] border border-[#808080] flex items-center justify-between text-xs font-sans">
        <span className="text-slate-700">Location: {personal.location}</span>
        <a 
          href={`mailto:${personal.email}`}
          className="text-[#000080] font-bold hover:underline flex items-center gap-1"
        >
          <Mail size={12} /> {personal.email}
        </a>
      </div>
    </div>
  );
};

