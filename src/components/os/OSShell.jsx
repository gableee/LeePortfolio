import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { CursorGlow } from '../effects';
import Taskbar from './Taskbar';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

const ParticleMesh = lazy(() => import('../effects/ParticleMesh'));
const BootSequence = lazy(() => import('./BootSequence'));

/**
 * OSShell replaces the original Layout.jsx as the top-level wrapper.
 * It composes: particle background, boot sequence, HUD overlays, taskbar, and content.
 */
export default function OSShell({ children }) {
  const [bootComplete, setBootComplete] = useState(() => {
    try {
      return window.sessionStorage.getItem('boot-complete') === 'true';
    } catch {
      return false;
    }
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleBootComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem('boot-complete', 'true');
    } catch {
      // Ignore storage access issues
    }
    setBootComplete(true);
  }, []);

  // Failsafe: never leave content hidden if boot overlay gets stuck
  useEffect(() => {
    if (bootComplete) return;

    const timer = setTimeout(() => {
      setBootComplete(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, [bootComplete]);

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      {/* Particle mesh background */}
      <Suspense fallback={null}>
        <ParticleMesh />
      </Suspense>

      {/* Cursor glow */}
      <CursorGlow />

      {/* Boot sequence overlay */}
      {!bootComplete && (
        <Suspense fallback={null}>
          <BootSequence onComplete={handleBootComplete} />
        </Suspense>
      )}

      {/* Scan-line overlay (subtle, always present) */}
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-[55]',
          isDark ? 'scan-lines' : 'scan-lines scan-lines-light'
        )}
      />

      {/* HUD corner brackets */}
      <div className="pointer-events-none fixed inset-0 z-[55] hidden md:block">
        <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-accent/20" />
        <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-accent/20" />
        <div className="absolute bottom-16 left-4 h-5 w-5 border-b border-l border-accent/20" />
        <div className="absolute bottom-16 right-4 h-5 w-5 border-b border-r border-accent/20" />
      </div>

      {/* Main content */}
      <main
        className={cn(
          'relative z-10 flex-1 pb-16 md:pb-14', // Bottom padding for taskbar
          'transition-opacity duration-500 opacity-100'
        )}
      >
        {children}
      </main>

      {/* Taskbar (replaces Header + Footer) */}
      <Taskbar />
    </div>
  );
}
