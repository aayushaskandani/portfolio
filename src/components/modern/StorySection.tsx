import React, { useState } from 'react';
import { portfolioConfig } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';
import { Chapter } from '../../types';
import { useCanvasCraft } from './CanvasCraftTour';
import { BookOpen, ChevronRight, ChevronLeft, Quote, Sparkles, Terminal } from 'lucide-react';

interface StorySectionProps {
  onOpenStoryApp: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenStoryApp }) => {
  const { chapters } = portfolioConfig;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const chapter: Chapter = chapters[activeIdx] || chapters[0];
  const { registerRef } = useCanvasCraft();

  const selectChapter = (idx: number) => {
    soundFX.playFrequency(580 + idx * 35, 0.05);
    setActiveIdx(idx);
  };

  return (
    <section
      ref={(el) => registerRef('storySection', el)}
      id="story"
      className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-1 flex items-center gap-2">
            <BookOpen size={14} />
            <span>NARRATIVE TIMELINE // 9 CHAPTERS</span>
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl text-white tracking-tight">
            THE SYSTEM BUILDER'S <span className="text-amber-400">JOURNEY.</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-light">
            From dial-up Windows XP boot sounds to building deterministic distributed simulations and speaking code with Wispr Flow.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playWindowOpen();
            onOpenStoryApp();
          }}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
        >
          <Terminal size={14} />
          <span>Launch STORY_MODE.EXE</span>
        </button>
      </div>

      {/* Interactive Horizontal Chapter Stepper */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-8">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => selectChapter(idx)}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              activeIdx === idx
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md scale-105'
                : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-anton text-lg leading-tight">{ch.num}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider truncate w-full mt-1">
              {ch.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Chapter Featured Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#121422] to-[#0a0b12] border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>CHAPTER {chapter.num} · {chapter.era}</span>
            </div>
            <h3 className="font-anton text-2xl sm:text-4xl text-white tracking-wide mt-1">
              {chapter.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 italic mt-0.5">
              {chapter.subtitle}
            </p>
          </div>

          <span className="text-xs font-mono text-slate-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg self-start sm:self-auto">
            {chapter.fileCode}
          </span>
        </div>

        <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-light">
          "{chapter.memory}"
        </p>

        {chapter.quote && (
          <div className="p-4 sm:p-5 rounded-xl bg-amber-500/[0.04] border-l-2 border-amber-400 flex items-start gap-3">
            <Quote size={20} className="text-amber-400 shrink-0 mt-1" />
            <p className="text-amber-200 font-caveat text-2xl sm:text-3xl leading-snug">
              {chapter.quote}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 gap-4">
          <div className="flex flex-wrap gap-2">
            {chapter.techFocus.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeIdx > 0) selectChapter(activeIdx - 1);
              }}
              disabled={activeIdx === 0}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-slate-400 px-2">
              {activeIdx + 1} / {chapters.length}
            </span>
            <button
              onClick={() => {
                if (activeIdx < chapters.length - 1) selectChapter(activeIdx + 1);
              }}
              disabled={activeIdx === chapters.length - 1}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

