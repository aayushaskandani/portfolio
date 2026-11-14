import React from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { User, Terminal, BookOpen, Mail, GraduationCap, Award, Phone } from 'lucide-react';

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
      <div className="p-4 bg-white border border-[#a0a0a0] shadow-inner space-y-3 font-sans">
        <h2 className="text-xl font-bold text-[#000080] border-b border-[#c0c0c0] pb-1 font-anton tracking-wide">
          {personal.name} — {personal.title}
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
          <GraduationCap size={15} className="text-[#000080]" />
          <span>Poornima University, Jaipur · B.Tech CSE (2024–2028) · CGPA 7.7/10</span>
        </div>
        <p className="text-slate-800 leading-relaxed text-sm">
          {personal.shortBio}
        </p>
        <p className="text-slate-800 leading-relaxed text-sm italic border-l-2 border-[#000080] pl-3">
          "{personal.philosophy}"
        </p>
      </div>

      {/* Fast Specs Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-white border border-[#a0a0a0]">
          <h3 className="text-sm font-bold text-[#000080] mb-2 flex items-center gap-1.5 font-pixel">
            <Terminal size={14} /> CORE ATTRIBUTES
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-700">
            <li>• <strong>Focus:</strong> High-throughput APIs & real-time collaboration</li>
            <li>• <strong>Frontend:</strong> React 19, Tailwind CSS, Leaflet.js, PWA</li>
            <li>• <strong>Backend:</strong> Node.js, Express, FastAPI, Python, Java</li>
            <li>• <strong>Databases & Cache:</strong> PostgreSQL, Redis, Supabase, Docker</li>
          </ul>
        </div>

        <div className="p-3 bg-white border border-[#a0a0a0]">
          <h3 className="text-sm font-bold text-[#000080] mb-2 flex items-center gap-1.5 font-pixel">
            <Award size={14} /> RECOGNITION & LEADERSHIP
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-700">
            <li>• <strong>Cloud Legend:</strong> 359 Google Cloud Labs & 55k+ points</li>
            <li>• <strong>GDG Community Lead:</strong> 200+ students coordinated & mentored</li>
            <li>• <strong>McKinsey.org:</strong> Forward Program Graduate</li>
            <li>• <strong>Competitive Code:</strong> LeetCode Java & Python DSA solver</li>
          </ul>
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="p-3 bg-[#dfdfdf] border border-[#808080] flex flex-wrap items-center justify-between text-xs font-sans gap-2">
        <span className="text-slate-700">📍 {personal.location}</span>
        <div className="flex items-center gap-3">
          <a 
            href={`tel:${personal.phone}`}
            className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
          >
            <Phone size={12} /> {personal.phone}
          </a>
          <a 
            href={`mailto:${personal.email}`}
            className="text-[#000080] font-bold hover:underline flex items-center gap-1"
          >
            <Mail size={12} /> {personal.email}
          </a>
        </div>
      </div>
    </div>
  );
};
