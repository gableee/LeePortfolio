import { useState, useRef, useEffect } from 'react';
import { useSound } from '../../hooks/useSound';
import { VolumeOnIcon, VolumeOffIcon } from '../icons';
import { cn } from '../../utils/cn';

const VISUALIZER_BASE = [22, 38, 28, 46, 32, 58, 36, 64, 42, 56, 34, 48, 30, 44, 26, 40];

export default function SoundToggle() {
  const { isMuted, volume, setVolume, toggleMute, playClick } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleOpen = () => {
    playClick();
    setIsOpen((prev) => !prev);
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    playClick();
    toggleMute();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (isMuted && newVolume > 0) {
      toggleMute();
    }

    if (!isMuted && newVolume === 0) {
      toggleMute();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleToggleOpen}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
          'border-transparent hover:border-slate-200 dark:hover:border-navy-600',
          'hover:bg-slate-100 dark:hover:bg-navy-800',
          'text-slate-500 dark:text-slate-400',
          isOpen && 'border-slate-200 bg-slate-100 text-accent dark:border-navy-600 dark:bg-navy-800 dark:text-accent-light'
        )}
        aria-label="Sound settings"
        aria-expanded={isOpen}
      >
        {isMuted || volume === 0 ? <VolumeOffIcon className="h-5 w-5" /> : <VolumeOnIcon className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full z-50 mt-3 w-72 origin-top-right rounded-xl border p-4 shadow-2xl backdrop-blur-xl',
            'border-slate-200 bg-white/90 dark:border-navy-600 dark:bg-navy-900/90',
            'animate-in fade-in zoom-in-95 duration-200',
            'before:absolute before:-z-10 before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:p-[1px]',
            'dark:shadow-accent/5'
          )}
        >
          <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-slate-200 bg-white dark:border-navy-600 dark:bg-navy-900" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-navy-700">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Audio System
                </span>
              </div>

              <button
                onClick={handleMuteToggle}
                className={cn(
                  'flex items-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-xs font-medium transition-all',
                  isMuted
                    ? 'border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20'
                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                )}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <>
                    <span>OFFLINE</span>
                    <VolumeOffIcon className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    <span>ONLINE</span>
                    <VolumeOnIcon className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">gain_level</span>
                <span className="rounded bg-accent/10 px-1.5 font-mono text-accent dark:text-accent-light">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>

              <div className="relative flex h-6 items-center">
                <div className="absolute h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-navy-800">
                  <div
                    className="h-full bg-accent transition-all duration-100 dark:bg-accent-light"
                    style={{ width: isMuted ? '0%' : `${volume * 100}%` }}
                  />
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="absolute h-full w-full cursor-pointer opacity-0"
                />

                <div
                  className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-accent bg-white shadow-sm transition-all duration-100 dark:border-accent-light dark:bg-navy-900"
                  style={{ left: `calc(${isMuted ? '0%' : `${volume * 100}%`} - 8px)` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex h-8 items-end justify-between gap-0.5 rounded border border-slate-100 bg-slate-50 p-2 dark:border-navy-800 dark:bg-navy-950/50">
                {Array.from({ length: 16 }).map((_, i) => {
                  const isActive = !isMuted && i / 16 < Math.max(0.2, volume);
                  const height = isActive ? Math.max(18, VISUALIZER_BASE[i] * volume) : 15;

                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 rounded-[1px] transition-all duration-300 ease-out',
                        isActive
                          ? 'bg-accent shadow-[0_0_5px_rgba(34,211,238,0.5)] dark:bg-accent-light'
                          : 'bg-slate-200 dark:bg-navy-800'
                      )}
                      style={{
                        height: isActive ? `${height * volume}%` : '15%',
                        opacity: isActive ? 0.68 + (i % 4) * 0.07 : 0.3,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>20Hz</span>
                <span>20kHz</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
