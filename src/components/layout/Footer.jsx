import { personalInfo } from '../../data/portfolio';
import { GitHubIcon, LinkedInIcon } from '../icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/50 py-8 dark:border-navy-600/50">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-accent dark:text-slate-dark dark:hover:text-accent-light"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-accent dark:text-slate-dark dark:hover:text-accent-light"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
        <p className="text-center font-mono text-xs text-slate-500 dark:text-slate-dark">
          Designed & Built by {personalInfo.name} &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
}
