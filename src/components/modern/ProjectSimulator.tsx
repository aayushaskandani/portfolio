import React, { useState } from 'react';
import { soundFX } from '../../utils/audio';
import { Zap, Activity, ArrowRight, Play, CheckCircle2, RefreshCw, Cpu, Layers } from 'lucide-react';

export const LinkForgeSimulator: React.FC = () => {
  const [url, setUrl] = useState('https://poornima.edu.in/research/distributed-systems');
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<{
    hash: string;
    cacheHitTime: number;
    cacheMissTime: number;
    speedup: string;
  } | null>(null);

  const runBenchmark = () => {
    soundFX.playClick();
    setIsSimulating(true);

    setTimeout(() => {
      // Deterministic Base62 simulation
      const sampleCodes = ['9xK2', '7mP4', '4vR9', '8nL1'];
      const hash = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
      const cacheHit = Number((10 + Math.random() * 4).toFixed(1)); // 10-14ms
      const cacheMiss = Number((130 + Math.random() * 25).toFixed(1)); // 130-155ms
      const speedup = (cacheMiss / cacheHit).toFixed(1);

      setResult({
        hash: `lnk.fg/${hash}`,
        cacheHitTime: cacheHit,
        cacheMissTime: cacheMiss,
        speedup: `${speedup}x`
      });
      setIsSimulating(false);
      soundFX.playVoiceChime();
    }, 450);
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-[#090b14] border border-cyan-500/30 text-xs font-mono space-y-3 shadow-inner">
      <div className="flex items-center justify-between text-[11px] text-cyan-400 font-bold border-b border-cyan-500/20 pb-2">
        <span className="flex items-center gap-1.5">
          <Zap size={13} className="text-amber-400" />
          <span>LIVE REDIS CACHE-ASIDE SIMULATOR</span>
        </span>
        <span className="text-[10px] bg-cyan-950/60 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">
          SLA: &lt;15ms
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400 truncate"
          placeholder="Enter long destination URL..."
        />
        <button
          onClick={runBenchmark}
          disabled={isSimulating}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-semibold text-xs transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
        >
          {isSimulating ? 'Benchmarking...' : 'Test Redis'}
        </button>
      </div>

      {result && (
        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-cyan-500/20 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Base62 Shortcode:</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
              {result.hash}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px] pt-1">
            <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30">
              <div className="text-slate-400">⚡ Redis Cache Hit</div>
              <div className="text-emerald-300 font-bold text-xs mt-0.5">{result.cacheHitTime}ms (RAM)</div>
            </div>
            <div className="p-2 rounded bg-red-950/20 border border-red-500/30">
              <div className="text-slate-400">💾 PostgreSQL Miss</div>
              <div className="text-rose-300 font-bold text-xs mt-0.5">{result.cacheMissTime}ms (Disk)</div>
            </div>
          </div>

          <div className="text-[10px] text-center text-amber-300 font-semibold pt-1">
            🚀 Redis Cache-Aside delivers {result.speedup} throughput gain under surge traffic
          </div>
        </div>
      )}
    </div>
  );
};

export const SyncBoardSimulator: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'DB Pool Tuning', rank: 1.0 },
    { id: '2', title: 'Cache Invalidation', rank: 2.0 }
  ]);
  const [inserted, setInserted] = useState(false);
  const [midpointRank, setMidpointRank] = useState<number | null>(null);

  const insertTask = () => {
    soundFX.playClick();
    const rank = Number(((tasks[0].rank + tasks[1].rank) / 2).toFixed(6));
    setMidpointRank(rank);
    setInserted(true);
    soundFX.playVoiceChime();
  };

  const reset = () => {
    soundFX.playClick();
    setInserted(false);
    setMidpointRank(null);
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-[#090b14] border border-emerald-500/30 text-xs font-mono space-y-3 shadow-inner">
      <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold border-b border-emerald-500/20 pb-2">
        <span className="flex items-center gap-1.5">
          <Layers size={13} className="text-emerald-400" />
          <span>O(1) FRACTIONAL INDEXING DEMO</span>
        </span>
        <span className="text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/30">
          PostgreSQL ACID
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="p-2 rounded bg-white/[0.04] border border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-slate-300">Task 1: {tasks[0].title}</span>
          <span className="text-slate-400 font-mono text-[10px]">rank: 1.000000</span>
        </div>

        {inserted && midpointRank !== null && (
          <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between text-[11px] animate-fadeIn">
            <span className="text-emerald-300 font-bold">✨ Task 3: Optimistic Redux UI</span>
            <span className="text-emerald-400 font-mono text-[10px] font-bold">rank: {midpointRank.toFixed(6)}</span>
          </div>
        )}

        <div className="p-2 rounded bg-white/[0.04] border border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-slate-300">Task 2: {tasks[1].title}</span>
          <span className="text-slate-400 font-mono text-[10px]">rank: 2.000000</span>
        </div>
      </div>

      {!inserted ? (
        <button
          onClick={insertTask}
          className="w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 font-semibold text-xs transition-all cursor-pointer text-center"
        >
          + Insert Task Between #1 and #2 (Calculate Midpoint)
        </button>
      ) : (
        <div className="space-y-2">
          <div className="p-2 rounded bg-black/60 border border-white/10 text-[10px] text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold">SQL Executed in 1.2ms:</div>
            <code className="text-amber-300 block truncate">
              UPDATE tasks SET rank = {midpointRank?.toFixed(6)} WHERE id = 'task_3'
            </code>
            <div className="text-slate-400">
              ⚡ Cost: <span className="text-emerald-400 font-bold">O(1)</span> · 0 neighboring rows modified!
            </div>
          </div>
          <button
            onClick={reset}
            className="w-full py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[10px] transition-colors cursor-pointer"
          >
            Reset Simulator
          </button>
        </div>
      )}
    </div>
  );
};
