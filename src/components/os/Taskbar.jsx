import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { navLinks, personalInfo } from '../../data/portfolio';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../layout/ThemeToggle';
import IconButton from '../ui/IconButton';
import {
  MenuIcon,
  CloseIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '../icons';

// Sci-fi icons for each nav section
const NAV_ICONS = {
  '#about': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
    </svg>
  ),
  '#frontend': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <path d="M2 4l6-2 6 2v6l-6 4-6-4V4z" />
      <path d="M8 2v12M2 4l6 4 6-4" />
    </svg>
  ),
  '#skills': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <circle cx="8" cy="8" r="3" />
      <circle cx="3" cy="4" r="1.5" />
      <circle cx="13" cy="4" r="1.5" />
      <circle cx="3" cy="12" r="1.5" />
      <circle cx="13" cy="12" r="1.5" />
      <line x1="5.5" y1="6.5" x2="4.2" y2="5.2" />
      <line x1="10.5" y1="6.5" x2="11.8" y2="5.2" />
      <line x1="5.5" y1="9.5" x2="4.2" y2="10.8" />
      <line x1="10.5" y1="9.5" x2="11.8" y2="10.8" />
    </svg>
  ),
  '#projects': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <line x1="1" y1="6" x2="15" y2="6" />
      <circle cx="3.5" cy="4.5" r="0.5" fill="currentColor" />
      <circle cx="5.5" cy="4.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  '#experience': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <line x1="4" y1="2" x2="4" y2="14" />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
      <circle cx="4" cy="8" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <line x1="7" y1="4" x2="14" y2="4" />
      <line x1="7" y1="8" x2="12" y2="8" />
      <line x1="7" y1="12" x2="13" y2="12" />
    </svg>
  ),
  '#achievements': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" />
    </svg>
  ),
  '#contact': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-4 w-4">
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <path d="M1 4l7 5 7-5" />
    </svg>
  ),
};

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mono-label-xs tabular-nums text-slate dark:text-slate-dark">
      {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

export default function Taskbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollPercent, setScrollPercent] = useState(0);
  const { theme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isDark = theme === 'dark';

  // Track active section + scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0);

      // Find active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const getNavHref = (href) => (isHomePage ? href : `/${href}`);

  return (
    <>
      {/* Desktop Taskbar — bottom anchored */}
      <nav
        className={cn(
          'os-taskbar hidden md:block',
          !isDark && 'os-taskbar-light'
        )}
        aria-label="Main navigation"
      >
        {/* Glow line at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 lg:px-6">
          {/* Left: Logo + status */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 font-mono text-sm font-bold text-accent transition-colors hover:text-accent-light"
              aria-label="Home"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/30 bg-accent/10 text-xs">
                &lt;/&gt;
              </span>
            </Link>
            {/* Status dot */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="mono-label-xs text-emerald-400/80">
                Available
              </span>
            </div>
          </div>

          {/* Center: Nav items */}
          <div className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={getNavHref(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group relative flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-all duration-200',
                    isActive
                      ? 'text-accent'
                      : isDark
                        ? 'text-slate-dark hover:text-slate-light'
                        : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {/* Icon */}
                  <span className={cn(
                    'transition-all duration-200',
                    isActive && 'drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]'
                  )}>
                    {NAV_ICONS[link.href] || NAV_ICONS['#about']}
                  </span>
                  {/* Label */}
                  <span className="mono-label-2xs">
                    {link.label}
                  </span>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: System tray */}
          <div className="flex items-center gap-3">
            {/* Scroll progress */}
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-12 overflow-hidden rounded-full border border-accent/20 bg-navy-700">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent-light transition-all duration-300"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
              <span className="mono-label-xs tabular-nums text-accent/60">{scrollPercent}%</span>
            </div>

            <div className="h-4 w-px bg-navy-600 dark:bg-navy-500" />

            <LiveClock />

            <div className="h-4 w-px bg-navy-600 dark:bg-navy-500" />

            <ThemeToggle />

            {/* Social quick links */}
            <div className="flex items-center gap-1">
              <IconButton
                as="a"
                size="sm"
                variant="ghost"
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={isDark ? 'text-slate-dark hover:text-accent-light' : 'text-slate-500 hover:text-accent'}
                aria-label="GitHub"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton
                as="a"
                size="sm"
                variant="ghost"
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={isDark ? 'text-slate-dark hover:text-accent-light' : 'text-slate-500 hover:text-accent'}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Taskbar — bottom anchored, simplified */}
      <nav
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-xl md:hidden',
          isDark
            ? 'border-accent/20 bg-navy-900/95'
            : 'border-accent/10 bg-white/95'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-2 py-1.5">
          {/* Show first 5 nav items + menu */}
          {navLinks.slice(0, 5).map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={getNavHref(link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors',
                  isActive
                    ? 'text-accent'
                    : isDark ? 'text-slate-dark' : 'text-slate-500'
                )}
              >
                <span className={isActive ? 'drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]' : ''}>
                  {NAV_ICONS[link.href] || NAV_ICONS['#about']}
                </span>
                <span className="mono-label-2xs text-[8px]">
                  {link.label.slice(0, 5)}
                </span>
              </a>
            );
          })}

          {/* More/Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors',
              isDark ? 'text-slate-dark' : 'text-slate-500'
            )}
            aria-label="More navigation"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-taskbar-menu"
          >
            {isMobileMenuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            <span className="mono-label-2xs text-[8px]">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile expanded menu */}
      <div
        id="mobile-taskbar-menu"
        className={cn(
          'fixed inset-x-0 bottom-[52px] z-40 md:hidden transition-all duration-300',
          isMobileMenuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible translate-y-4 opacity-0 pointer-events-none'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="region"
        aria-label="Mobile taskbar menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={cn(
          'mx-4 mb-2 rounded-xl border p-4 backdrop-blur-xl',
          isDark
            ? 'border-accent/20 bg-navy-800/95'
            : 'border-accent/10 bg-white/95'
        )}>
          <div className="mb-3 flex items-center justify-between">
            <span className="mono-label-xs text-accent/60">
              SYS://NAVIGATION
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LiveClock />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={getNavHref(link.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border px-3 py-2.5 font-mono text-xs transition-all',
                    isActive
                      ? 'border-accent/30 bg-accent/10 text-accent'
                      : isDark
                        ? 'border-navy-600/60 text-slate hover:border-accent/20 hover:text-accent-light'
                        : 'border-gray-200/60 text-slate-600 hover:border-accent/20 hover:text-accent',
                    isMobileMenuOpen && 'animate-slide-up'
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {NAV_ICONS[link.href] || NAV_ICONS['#about']}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Quick social links */}
          <div className="mt-3 flex items-center gap-2 border-t border-accent/10 pt-3">
            <IconButton
              as="a"
              size="md"
              variant="outlined"
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
              as="a"
              size="md"
              variant="outlined"
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
              as="a"
              size="md"
              variant="outlined"
              href={`mailto:${personalInfo.email}`}
              className="rounded-lg"
              aria-label="Email"
            >
              <MailIcon className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
