import { personalInfo } from '../../data/portfolio';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import { ArrowRightIcon, GitHubIcon, LinkedInIcon } from '../icons';

function Reveal({ children, delay = 0, isInView, direction = 'up' }) {
  const transforms = {
    up: 'translateY(2rem)',
    left: 'translateX(-2rem)',
    right: 'translateX(2rem)',
    none: 'none',
  };

  return (
    <div
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : transforms[direction],
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const [ref, isInView] = useInView({ threshold: 0.05, rootMargin: '0px' });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center pt-20"
      aria-label="Introduction"
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 h-[800px] w-[800px] rounded-full bg-accent/5 blur-3xl dark:bg-accent/[0.07]" />
        <div className="absolute -bottom-1/4 left-0 h-[600px] w-[600px] rounded-full bg-accent/3 blur-3xl dark:bg-accent/[0.04]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Greeting */}
          <Reveal isInView={isInView} delay={0} direction="none">
            <p className="mb-5 font-mono text-sm text-accent dark:text-accent-light md:text-base">
              Hi, my name is
            </p>
          </Reveal>

          {/* Name */}
          <Reveal isInView={isInView} delay={100}>
            <h1 className="text-display-sm font-bold text-slate-900 dark:text-slate-light sm:text-display">
              {personalInfo.name}
              <span className="text-gradient">.</span>
            </h1>
          </Reveal>

          {/* Tagline */}
          <Reveal isInView={isInView} delay={200}>
            <h2 className="mt-2 text-display-sm text-slate-500 dark:text-slate sm:text-[3.5rem] sm:leading-tight">
              {personalInfo.tagline}
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal isInView={isInView} delay={300}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate md:text-lg">
              {personalInfo.description}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal isInView={isInView} delay={400}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#projects" size="lg">
                View My Work
                <ArrowRightIcon />
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Get In Touch
              </Button>
            </div>
          </Reveal>

          {/* Social links */}
          <Reveal isInView={isInView} delay={500} direction="none">
            <div className="mt-12 flex items-center gap-5">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-accent dark:text-slate-dark dark:hover:text-accent-light"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="h-6 w-6" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-accent dark:text-slate-dark dark:hover:text-accent-light"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
