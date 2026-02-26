import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolio';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../icons';

export default function SocialRail() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 280);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className={`fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:flex-col md:items-center md:gap-3 lg:left-6 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'
      } transition-all duration-300`}
      aria-label="Social links"
    >
      <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-navy-500" />

      <a
        href={personalInfo.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-colors hover:text-accent dark:border-navy-600/70 dark:bg-navy-700/90 dark:text-slate dark:hover:text-accent-light"
        aria-label="GitHub profile"
      >
        <GitHubIcon className="h-5 w-5" />
      </a>

      <a
        href={personalInfo.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-colors hover:text-accent dark:border-navy-600/70 dark:bg-navy-700/90 dark:text-slate dark:hover:text-accent-light"
        aria-label="LinkedIn profile"
      >
        <LinkedInIcon className="h-5 w-5" />
      </a>

      <a
        href={`mailto:${personalInfo.email}`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/70 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-colors hover:text-accent dark:border-navy-600/70 dark:bg-navy-700/90 dark:text-slate dark:hover:text-accent-light"
        aria-label="Send email"
      >
        <MailIcon className="h-4.5 w-4.5" />
      </a>

      <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-navy-500" />
    </aside>
  );
}
