import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { navLinks, personalInfo } from '../../data/portfolio';
import { cn } from '../../utils/cn';
import { SunIcon, MoonIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../icons';

// Simple search icon since it wasn't in icons.jsx and I want to keep changes localized
function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const resultsId = 'command-palette-results';
  const headingId = 'command-palette-heading';

  const getOptionId = (index) => `command-option-${index}`;

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Define commands
  const commands = useMemo(() => {
    const navs = navLinks.map(link => ({
      id: `nav-${link.label}`,
      label: link.label,
      category: 'Navigation',
      action: () => {
        if (location.pathname !== '/') {
          navigate(`/${link.href}`);
        } else {
          const element = document.querySelector(link.href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
        closePalette();
      },
      icon: <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-accent dark:group-hover:text-accent-light" />
    }));

    const socials = [
      {
        id: 'social-github',
        label: 'GitHub',
        category: 'Social',
        action: () => {
          window.open(personalInfo.social.github, '_blank');
          closePalette();
        },
        icon: <GitHubIcon className="w-5 h-5 text-slate-400 group-hover:text-accent dark:group-hover:text-accent-light" />
      },
      {
        id: 'social-linkedin',
        label: 'LinkedIn',
        category: 'Social',
        action: () => {
          window.open(personalInfo.social.linkedin, '_blank');
          closePalette();
        },
        icon: <LinkedInIcon className="w-5 h-5 text-slate-400 group-hover:text-accent dark:group-hover:text-accent-light" />
      },
       {
        id: 'social-email',
        label: 'Email',
        category: 'Social',
        action: () => {
          window.location.href = `mailto:${personalInfo.email}`;
          closePalette();
        },
        icon: <MailIcon className="w-5 h-5 text-slate-400 group-hover:text-accent dark:group-hover:text-accent-light" />
      }
    ];

    const themes = [
      {
        id: 'theme-toggle',
        label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        category: 'Theme',
        action: () => {
          toggleTheme();
          closePalette();
        },
        icon: theme === 'dark' 
          ? <SunIcon className="w-5 h-5 text-slate-400 group-hover:text-yellow-400" />
          : <MoonIcon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
      }
    ];

    return [...navs, ...themes, ...socials];
  }, [closePalette, navigate, location.pathname, theme, toggleTheme]);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(cmd => 
      cmd.label.toLowerCase().includes(lowerQuery) || 
      cmd.category.toLowerCase().includes(lowerQuery)
    );
  }, [query, commands]);

  const liveAnnouncement = useMemo(() => {
    if (!isOpen) return '';
    if (!filteredCommands.length) {
      return query ? `No results found for ${query}.` : 'No commands available.';
    }

    const selectedCommand = filteredCommands[selectedIndex];
    if (!selectedCommand) {
      return `${filteredCommands.length} commands available.`;
    }

    return `${filteredCommands.length} commands available. Selected ${selectedCommand.label}, ${selectedCommand.category}.`;
  }, [filteredCommands, isOpen, query, selectedIndex]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      const target = e.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isTypingTarget)) {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          setIsOpen(true);
        }
      } else if (e.key === 'Escape') {
        closePalette();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closePalette, isOpen]);

  // Handle list navigation
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
        return;
      }

      if (!filteredCommands.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setSelectedIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setSelectedIndex(filteredCommands.length - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closePalette, isOpen, filteredCommands, selectedIndex]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const previousFocus = previousFocusRef.current;
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    const activeOption = listRef.current?.querySelector(`[data-option-index="${selectedIndex}"]`);
    if (activeOption) {
      activeOption.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" role="presentation">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closePalette}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-slate-200 transition-all dark:bg-slate-900 dark:ring-slate-700"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
      >
        <h2 id={headingId} className="sr-only">Command palette</h2>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {liveAnnouncement}
        </p>
        
        {/* Input */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4">
          <SearchIcon className="h-5 w-5 text-slate-500" />
          <input
            ref={inputRef}
            className="h-14 w-full bg-transparent px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 outline-none font-mono text-sm"
            placeholder="Type a command or search..."
            value={query}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={resultsId}
            aria-activedescendant={filteredCommands.length ? getOptionId(selectedIndex) : undefined}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="hidden sm:flex text-xs text-slate-500 font-mono gap-1">
            <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

        {/* Results */}
        <div 
          ref={listRef}
          id={resultsId}
          role="listbox"
          className="max-h-[60vh] overflow-y-auto overflow-x-hidden py-2"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-14 text-center text-sm text-slate-500">
              No results found.
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                type="button"
                key={command.id}
                id={getOptionId(index)}
                role="option"
                aria-selected={index === selectedIndex}
                data-option-index={index}
                className={cn(
                  "group mx-2 flex w-[calc(100%-1rem)] cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors",
                  index === selectedIndex 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
                onClick={() => command.action()}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-3">
                  {command.icon}
                  <span className="font-medium">{command.label}</span>
                </div>
                {command.category && (
                  <span className="text-xs text-slate-400 font-mono opacity-50 capitalize">
                    {command.category}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
        
        {/* Footer */}
        <div className="hidden sm:flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2 text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="font-sans px-1 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-sans px-1 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">↑↓</kbd>
              navigate
            </span>
          </div>
          <div className="font-mono opacity-70">
            Portfolio Command
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
