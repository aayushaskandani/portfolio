import React, { useState, useRef, useEffect } from 'react';
import { portfolioConfig } from '../../../data/portfolioData';
import { soundFX } from '../../../utils/audio';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export const TerminalApp: React.FC = () => {
  const { terminal, personal } = portfolioConfig;
  const username = personal.name.split(' ')[0] || 'User';

  const [history, setHistory] = useState<TerminalLine[]>([
    { 
      id: '1', 
      type: 'system', 
      text: "Windows PowerShell v7.4.2 [Ask Developer Console]\nCopyright (C) Microsoft Corporation. All rights reserved." 
    },
    { 
      id: '2', 
      type: 'system', 
      text: "\n⚡ RUNNING IN HIGH CONTRAST MODE · Type 'help' to inspect commands.\n" 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    soundFX.playClick();

    if (!cleanCmd) return;

    setCmdHistory(prev => [...prev, cmd]);
    setCmdHistoryIdx(-1);

    if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    }

    const newLines: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `PS C:\\Users\\${username}> ${cmd}` }
    ];

    if (cleanCmd in terminal.commands) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: terminal.commands[cleanCmd as keyof typeof terminal.commands]
      });
    } else if (cleanCmd.includes('hire') || cleanCmd.includes('job') || cleanCmd.includes('salary')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `[PRIORITY PIPELINE UNLOCKED]\nStatus: Actively evaluating high-impact software engineering roles.\nSend formal proposal directly to: ${personal.email}`
      });
    } else if (cleanCmd.includes('project') || cleanCmd.includes('portfolio')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: terminal.commands.projects
      });
    } else {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `Command '${cleanCmd}' is not recognized as a cmdlet, function, or executable program.\nType 'help' to review supported commands.`
      });
    }

    setHistory(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
      setCmdHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIdx === -1) return;
      const nextIdx = cmdHistoryIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setCmdHistoryIdx(-1);
        setInputVal('');
      } else {
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 bg-[#0c0d14] text-[#f1f5f9] font-mono text-sm sm:text-[15px] p-5 overflow-y-auto flex flex-col justify-between select-text"
      style={{ backgroundColor: '#0c0d14' }}
    >
      <div className="space-y-2 whitespace-pre-wrap leading-relaxed">
        {history.map(line => (
          <div
            key={line.id}
            className={
              line.type === 'input'
                ? 'text-white font-bold'
                : line.type === 'system'
                ? 'text-sky-300 font-medium'
                : line.type === 'error'
                ? 'text-red-400 font-medium'
                : 'text-emerald-300 font-normal pl-2 border-l-2 border-emerald-500/40'
            }
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt line with sharp contrast */}
      <div className="flex items-center gap-2 pt-4 mt-3 border-t border-white/15 shrink-0 bg-[#0c0d14]">
        <span className="text-sky-400 font-bold shrink-0 tracking-wide">
          PS C:\Users\{username}&gt;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm sm:text-[15px] font-bold caret-sky-400"
          placeholder="type 'help' and press Enter..."
        />
      </div>
    </div>
  );
};
