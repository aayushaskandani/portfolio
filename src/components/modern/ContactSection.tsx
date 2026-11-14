import React, { useState } from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { Mail, Copy, Check, Github, Linkedin, Twitter, FileText, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { personal } = portfolioConfig;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl">
        <div className="text-xs font-mono text-brand-red tracking-widest uppercase mb-1">
          05 / YOUR NEXT PROJECT
        </div>
        <h2 className="font-anton text-4xl sm:text-6xl text-white tracking-tight leading-[0.95]">
          LET'S BUILD <span className="text-brand-red">SOMETHING EXCEPTIONAL.</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-4 font-light leading-relaxed">
          Have an opening, an ambitious systems challenge, or a project in mind? Let's build software that stands out and doesn't break under pressure.
        </p>

        {/* Big Email Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              DIRECT INBOX
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="font-anton text-xl sm:text-2xl text-white hover:text-brand-red transition-colors mt-1 block"
            >
              {personal.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyEmail}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </button>

            <a
              href={`mailto:${personal.email}`}
              className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redHover text-white font-mono text-xs flex items-center gap-2 shadow-lg shadow-brand-red/20 transition-all cursor-pointer"
            >
              <Mail size={14} />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Social and Resume Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group"
          >
            <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
              <Github size={14} /> GitHub
            </span>
            <ArrowUpRight size={13} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group"
          >
            <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
              <Linkedin size={14} /> LinkedIn
            </span>
            <ArrowUpRight size={13} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={personal.twitter}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group"
          >
            <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
              <Twitter size={14} /> Twitter / X
            </span>
            <ArrowUpRight size={13} className="text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="p-3.5 rounded-xl bg-teal-950/20 hover:bg-teal-900/30 border border-teal-500/20 hover:border-teal-500/40 transition-all flex items-center justify-between group"
          >
            <span className="font-mono text-xs text-teal-300 flex items-center gap-2">
              <FileText size={14} /> Resume PDF
            </span>
            <ArrowUpRight size={13} className="text-teal-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

