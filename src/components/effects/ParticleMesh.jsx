import { useCallback, useMemo, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '../../hooks/useTheme';

export default function ParticleMesh() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = useCallback(() => {}, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const options = useMemo(() => {
    const isDark = theme === 'dark';
    const particleColor = isDark ? '#06b6d4' : '#0891b2';
    const linkColor = isDark ? '#06b6d4' : '#0891b2';

    return {
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: isMobile ? 30 : 70,
          density: { enable: true, area: 900 },
        },
        color: { value: particleColor },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.1, max: isDark ? 0.4 : 0.25 },
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.5,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: linkColor,
          opacity: isDark ? 0.12 : 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 0.8 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: !isMobile,
            mode: 'grab',
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: isDark ? 0.35 : 0.2,
              color: particleColor,
            },
          },
        },
      },
      detectRetina: true,
    };
  }, [theme, isMobile]);

  if (!init) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1]">
      <Particles
        id="particle-mesh"
        particlesLoaded={particlesLoaded}
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}
