import { useState, useEffect, useCallback } from 'react';

const BOOT_LINES = [
  { text: 'NEURAL_OS v2.7.1 — INITIALIZING...', delay: 0 },
  { text: '> Loading kernel modules...', delay: 100 },
  { text: '> Establishing neural interface...', delay: 200 },
  { text: '> Scanning portfolio modules... [7 found]', delay: 300 },
  { text: '> Mounting skill graph engine...', delay: 400 },
  { text: '> Particle mesh renderer... OK', delay: 500 },
  { text: '> Circuit trace network... OK', delay: 600 },
  { text: '> Connection established.', delay: 700 },
  { text: '', delay: 800 },
  { text: 'SYSTEM READY. WELCOME.', delay: 900, accent: true },
];

export default function BootSequence({ onComplete }) {
  const alreadyBooted = (() => {
    try {
      return window.sessionStorage.getItem('boot-complete') === 'true';
    } catch {
      return false;
    }
  })();
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skipBoot = alreadyBooted || prefersReduced;

  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(!skipBoot);

  // Skip if already seen this session or reduced motion
  useEffect(() => {
    if (skipBoot) {
      onComplete?.();
      return;
    }

    // Lock scrolling during boot
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [skipBoot, onComplete]);

  const finishBoot = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      try {
        window.sessionStorage.setItem('boot-complete', 'true');
      } catch {
        // Ignore storage access issues
      }
      document.body.style.overflow = '';
      onComplete?.();
      setShouldRender(false);
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    if (!shouldRender) return;

    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay)
    );

    // Auto-complete after all lines
    const completeTimer = setTimeout(finishBoot, 1200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [shouldRender, finishBoot]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-navy-900 transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Scan line overlay */}
      <div className="scan-lines pointer-events-none absolute inset-0" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute inset-4 sm:inset-8">
        <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-accent/30" />
        <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-accent/30" />
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-accent/30" />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-accent/30" />
      </div>

      {/* Boot content */}
      <div className="w-full max-w-lg px-6">
        {/* System header */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <span className="font-mono text-xs tracking-wider text-accent/60">
            SYS://BOOT
          </span>
        </div>

        {/* Terminal lines */}
        <div className="mb-8 space-y-1 font-mono text-xs leading-relaxed sm:text-sm">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={`animate-boot-text ${
                line.accent
                  ? 'font-bold text-accent'
                  : 'text-slate-light/80'
              }`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {line.text}
              {i === visibleLines.length - 1 && !line.accent && (
                <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-accent/80" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-px w-full bg-navy-600">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-light transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-slate-dark">
            <span>LOADING MODULES</span>
            <span className="text-accent">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={finishBoot}
        className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-wider text-slate-dark transition-colors hover:text-accent"
      >
        SKIP [ESC]
      </button>
    </div>
  );
}
