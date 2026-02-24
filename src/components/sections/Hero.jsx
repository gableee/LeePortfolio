import { useEffect, useMemo, useState } from 'react';
import { personalInfo } from '../../data/portfolio';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import { AvatarPlaceholder } from '../ui/Placeholder';
import { ArrowRightIcon, GitHubIcon, LinkedInIcon } from '../icons';
import { useTextScramble, MagneticWrapper, TiltCard } from '../effects';

function Reveal({ children, delay = 0, isInView, direction = 'up' }) {
  const transforms = {
    up: 'translateY(0.75rem)',
    left: 'translateX(-0.75rem)',
    right: 'translateX(0.75rem)',
    none: 'none',
  };

  return (
    <div
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : transforms[direction],
        transition: `opacity 0.45s ease-out ${delay}ms, transform 0.45s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const [ref, isInView] = useInView({ threshold: 0.05, rootMargin: '0px' });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasPhotoError, setHasPhotoError] = useState(false);

  const initials = useMemo(() => {
    const parts = personalInfo.name.trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() || '').join('') || 'YN';
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);
    return () => mediaQuery.removeEventListener('change', syncPreference);
  }, []);

  const visible = prefersReducedMotion ? true : isInView;

  // Text scramble for name
  const { displayText: scrambledName } = useTextScramble(
    personalInfo.name,
    { duration: 650, delay: visible ? 250 : 99999, revealDirection: 'start' }
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      aria-label="Introduction"
    >
      {/* Creative background with floating elements - responsive sizes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Base gradient - responsive sizes */}
        <div className="absolute -top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl dark:bg-accent/[0.07] sm:h-[600px] sm:w-[600px] lg:-top-1/2 lg:h-[800px] lg:w-[800px]" />
        <div className="absolute -bottom-1/4 left-0 h-[300px] w-[300px] rounded-full bg-violet-500/5 blur-3xl dark:bg-violet-500/[0.05] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]" />
        
        {/* Floating geometric shapes - hidden on mobile, visible from md up to prevent overlap */}
        <div className="absolute left-[10%] top-[20%] hidden h-12 w-12 animate-pulse-slow rounded-xl border border-accent/15 bg-accent/[0.03] backdrop-blur-sm dark:border-accent-light/15 dark:bg-accent-light/[0.03] md:block lg:h-16 lg:w-16" style={{ animationDelay: '0s' }} />
        <div className="absolute right-[15%] top-[35%] hidden h-10 w-10 animate-pulse-slow rounded-full border border-violet-500/15 bg-violet-500/[0.03] backdrop-blur-sm md:block lg:h-12 lg:w-12" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[25%] left-[5%] hidden h-14 w-14 animate-pulse-slow rotate-45 rounded-xl border border-accent/10 bg-accent/[0.02] backdrop-blur-sm dark:border-accent-light/10 md:block lg:h-20 lg:w-20" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-[40%] right-[8%] hidden h-6 w-6 animate-pulse-slow rounded-lg border border-cyan-500/15 bg-cyan-500/[0.03] backdrop-blur-sm md:block lg:h-8 lg:w-8" style={{ animationDelay: '1s' }} />
        
        {/* Dotted grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Gradient line accent */}
        <div className="absolute left-0 top-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-accent/30 to-transparent dark:via-accent-light/20" />
        <div className="absolute bottom-1/4 right-0 h-px w-1/4 bg-gradient-to-l from-transparent via-violet-500/30 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Mobile-first: stack vertically, then side-by-side on lg */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Content - full width on mobile */}
          <div className="w-full lg:flex-1">
            {/* Greeting - smaller on mobile */}
            <Reveal isInView={visible} delay={0} direction="none">
              <p className="mb-3 font-mono text-xs text-accent dark:text-accent-light sm:mb-4 sm:text-sm">
                {personalInfo.title}
              </p>
            </Reveal>

            <Reveal isInView={visible} delay={50} direction="none">
              <p className="mb-4 font-mono text-xs text-accent dark:text-accent-light sm:mb-5 sm:text-sm">
              Hi, my name is
              </p>
            </Reveal>

            {/* Name with scramble effect - responsive sizing with proper wrapping */}
            <Reveal isInView={visible} delay={100}>
              <h1 className="break-words text-3xl font-bold text-slate-900 dark:text-slate-light sm:text-4xl md:text-5xl lg:text-display">
                <span className="font-mono">{visible ? scrambledName : personalInfo.name}</span>
                <span className="text-gradient">.</span>
              </h1>
            </Reveal>

            {/* Tagline - responsive sizing with wrapping */}
            <Reveal isInView={visible} delay={200}>
              <h2 className="mt-2 break-words text-xl text-slate-500 dark:text-slate sm:text-2xl md:text-3xl lg:text-4xl lg:leading-tight">
                {personalInfo.tagline}
              </h2>
            </Reveal>

            {/* Description - better mobile readability */}
            <Reveal isInView={visible} delay={300}>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate sm:mt-6 sm:text-base md:text-lg">
                {personalInfo.description}
              </p>
            </Reveal>

            {/* CTAs with magnetic effect - full width buttons on mobile */}
            <Reveal isInView={visible} delay={400}>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <MagneticWrapper strength={0.08} className="w-full sm:w-auto">
                  <Button href="#projects" size="lg" className="w-full rounded-full sm:w-auto">
                    View Case Studies
                    <ArrowRightIcon />
                  </Button>
                </MagneticWrapper>
                <MagneticWrapper strength={0.08} className="w-full sm:w-auto">
                  <Button href="#contact" variant="outline" size="lg" className="w-full rounded-full sm:w-auto">
                    Contact Me
                  </Button>
                </MagneticWrapper>
              </div>
            </Reveal>

            {/* Social links - larger touch targets on mobile */}
            <Reveal isInView={visible} delay={500} direction="none">
              <div className="mt-8 flex items-center gap-3 sm:mt-10 sm:gap-5">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-accent/10 hover:text-accent active:bg-accent/20 dark:text-slate-dark dark:hover:text-accent-light sm:h-10 sm:w-10"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-accent/10 hover:text-accent active:bg-accent/20 dark:text-slate-dark dark:hover:text-accent-light sm:h-10 sm:w-10"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Profile visual - hidden on very small screens, shown from sm up */}
          <Reveal isInView={visible} delay={250} direction="right">
            <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:w-80 lg:flex-shrink-0">
              <TiltCard tiltAmount={3} className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-4 shadow-xl shadow-slate-300/20 dark:border-navy-600/70 dark:bg-navy-700 dark:shadow-navy-900/40 sm:rounded-3xl sm:p-6">
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-accent/10 blur-2xl dark:bg-accent-light/10 sm:-right-16 sm:-top-16 sm:h-40 sm:w-40" />

                {/* Profile image with proper placeholder */}
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full sm:h-44 sm:w-44">
                  {personalInfo.photo && !hasPhotoError ? (
                    <img
                      src={personalInfo.photo}
                      alt={`${personalInfo.name} profile`}
                      className="h-full w-full object-cover"
                      loading="eager"
                      onError={() => setHasPhotoError(true)}
                    />
                  ) : (
                    <AvatarPlaceholder name={personalInfo.name} size="2xl" className="h-full w-full" />
                  )}
                </div>

                <div className="mt-4 text-center sm:mt-6">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-dark sm:text-sm">Based in {personalInfo.location}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate sm:text-sm">Open to AI engineering opportunities and impactful collaborations.</p>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
