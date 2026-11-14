import React, { useState } from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { soundFX } from '../../../utils/audio';
import { Chapter } from '../../../types';
import { BookOpen, ChevronRight, ChevronLeft, Terminal, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const StoryModeApp: React.FC = () => {
  const { chapters } = portfolioConfig;
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const chapter: Chapter = chapters[activeChapterIndex] || chapters[0];

  const handleSelectChapter = (index: number) => {
    soundFX.playFrequency(600 + index * 30, 0.05);
    setActiveChapterIndex(index);
  };

  const handleNext = () => {
    if (activeChapterIndex < chapters.length - 1) {
      handleSelectChapter(activeChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      handleSelectChapter(activeChapterIndex - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0c0d14] text-[#f1f5f9] select-none font-sans">
      {/* Left Sidebar: 9 Chapters Timeline */}
      <div className="w-full md:w-72 bg-[#121420] border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 overflow-y-auto shrink-0 space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-amber-400" />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              STORY_MODE // CH01 - CH09
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">9 CHAPTERS</span>
        </div>

        <div className="space-y-1.5 pt-1">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChapter(idx)}
              className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                activeChapterIndex === idx
                  ? 'bg-amber-500/15 border-amber-400/40 text-amber-300 font-semibold shadow-sm'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  activeChapterIndex === idx ? 'bg-amber-400 text-black' : 'bg-white/10 text-slate-400'
                }`}>
                  {ch.num}
                </span>
                <span className="truncate">{ch.title}</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 shrink-0">
                {ch.era.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Narrative Dossier */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0b12]">
        {/* Top Header Bar */}
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-[#121420]/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold">
              CHAPTER {chapter.num} OF 09
            </span>
            <span className="text-slate-600 font-mono">/</span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              {chapter.era}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handlePrev}
              disabled={activeChapterIndex === 0}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-slate-400 text-[11px]">
              {activeChapterIndex + 1}/9
            </span>
            <button
              onClick={handleNext}
              disabled={activeChapterIndex === chapters.length - 1}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Chapter Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Title Banner */}
          <div className="space-y-2 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase font-semibold">
                {chapter.tag}
              </span>
              <span className="text-xs font-mono text-slate-500">
                FILE: {chapter.fileCode}
              </span>
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl text-white tracking-wide">
              {chapter.title}
            </h2>
            <p className="text-sm font-light text-slate-400 italic">
              {chapter.subtitle}
            </p>
          </div>

          {/* Narrative Body */}
          <div className="p-6 rounded-2xl bg-[#121422] border border-white/[0.08] shadow-lg space-y-4">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              "{chapter.memory}"
            </p>

            {chapter.quote && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/[0.05] border-l-2 border-amber-400 flex items-start gap-3">
                <Quote size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-200 font-caveat text-xl sm:text-2xl leading-snug">
                  {chapter.quote}
                </p>
              </div>
            )}
          </div>

          {/* Key Learnings & Stack Shift */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>ARCHITECTURAL INSIGHTS</span>
              </div>
              <ul className="space-y-2">
                {chapter.learnings.map((l, i) => (
                  <li key={i} className="text-xs text-slate-300 font-light flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal size={13} className="text-cyan-400" />
                <span>TECHNICAL FOCUS</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {chapter.techFocus.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Step Button */}
        <div className="p-4 border-t border-white/10 bg-[#121420]/80 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeChapterIndex === 0}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs font-mono text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ChevronLeft size={14} />
            <span>Previous Chapter</span>
          </button>

          <button
            onClick={handleNext}
            disabled={activeChapterIndex === chapters.length - 1}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-black font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span>Next: {chapters[activeChapterIndex + 1]?.title || 'Finished'}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

