import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { navLinks } from '../../data/portfolio';
import ThemeToggle from './ThemeToggle';
import { MenuIcon, CloseIcon } from '../icons';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // For non-home pages, navigation should go to home with hash
  const getNavHref = (href) => {
    return isHomePage ? href : `/${href}`;
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass py-2 shadow-sm sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - larger touch target on mobile */}
        <Link
          to="/"
          className="flex h-10 items-center font-mono text-base font-bold text-slate-900 transition-colors hover:text-accent dark:text-slate-light dark:hover:text-accent-light sm:text-lg"
          aria-label="Home"
        >
          &lt;/&gt;
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getNavHref(link.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-accent dark:text-slate dark:hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-2 border-l border-gray-200 pl-2 dark:border-navy-600">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls - larger touch targets */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:text-slate dark:hover:bg-navy-700 dark:active:bg-navy-600"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - proper full height and safe spacing */}
      <div
        className={cn(
          'fixed inset-x-0 top-[calc(100%)] bottom-0 z-40 md:hidden',
          'transition-all duration-300',
          isMobileMenuOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none'
        )}
      >
        <div className="h-full bg-white/95 backdrop-blur-lg dark:bg-navy-800/95">
          <div className="flex flex-col gap-0.5 px-4 py-4 sm:gap-1 sm:px-6 sm:py-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={getNavHref(link.href)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'rounded-lg px-4 py-3.5 text-base font-medium text-slate-600 transition-all hover:bg-accent/5 hover:text-accent active:bg-accent/10 dark:text-slate dark:hover:text-accent-light sm:py-3 sm:text-lg',
                  isMobileMenuOpen && 'animate-slide-up',
                )}
                style={{ animationDelay: `${i * 75}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
