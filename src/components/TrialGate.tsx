'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, KeyRound } from 'lucide-react';
import { TRIAL_CODES, TRIAL_STORAGE_KEY } from '@/config/trial';

export function TrialGate({ children }: { children: React.ReactNode }) {
  const [storedCode, setStoredCode] = useState('');
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState('');
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const unlocked = ready && TRIAL_CODES.includes(storedCode);

  useEffect(() => {
    try {
      setStoredCode(window.localStorage.getItem(TRIAL_STORAGE_KEY) ?? '');
    } catch {
      setStoredCode('');
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || unlocked) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
    return () => window.clearTimeout(timer);
  }, [ready, unlocked]);

  const normalize = (s: string) => s.trim().toUpperCase();

  const handleSubmit = () => {
    const input = normalize(code);
    if (TRIAL_CODES.includes(input)) {
      try {
        localStorage.setItem(TRIAL_STORAGE_KEY, input);
      } catch {
        // Ignore storage failures and still unlock for current session.
      }
      setStoredCode(input);
    } else {
      setWrong(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  if (unlocked) return <>{children}</>;

  return (
    <>
      <div className="fixed inset-0 z-[9999] min-h-[100dvh] overflow-y-auto bg-[#080b12] text-white">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(115deg,rgba(37,99,235,0.18),rgba(15,23,42,0.36)_38%,rgba(8,11,18,0.96)_72%)]" />

        <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center px-5 py-10">
          <div className={`w-full rounded-2xl border border-white/12 bg-slate-950/70 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl ${shake ? 'animate-shake' : ''}`}>
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                <KeyRound className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">输入试用码进入</h2>
                <p className="text-xs text-slate-400">6 位短码，按回车即可</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <input
                ref={inputRef}
                type="text"
                value={code}
                onChange={(e) => { setWrong(false); setCode(e.target.value); }}
                onKeyDown={handleKeyDown}
                maxLength={32}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                aria-invalid={wrong}
                placeholder=""
                className={`w-full rounded-xl px-4 py-3 text-center font-mono text-lg tracking-[0.2em] transition focus:outline-none
                  ${wrong
                    ? 'border border-red-400 bg-red-950/35 text-red-100 placeholder:text-red-200/45 focus:ring-2 focus:ring-red-300/40'
                    : 'border border-white/12 bg-white/[0.055] text-white placeholder:text-slate-500 focus:border-blue-300/70 focus:ring-2 focus:ring-blue-300/30'
                  }`}
              />
              {wrong && (
                <p className="text-sm text-red-200 text-center">试用码不正确。</p>
              )}
              <button
                onClick={handleSubmit}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(37,99,235,0.28)] transition hover:bg-blue-400 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-200/70"
              >
                进入 YYGsee
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            试用码会保存在本机浏览器
          </p>
        </main>
      </div>

      {/* Children rendered but invisible to keep layout and SSR intact. */}
      <div className="invisible pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
    </>
  );
}
