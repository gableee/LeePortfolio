import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { personalInfo } from '../../data/portfolio';
import { MailIcon, ArrowRightIcon } from '../icons';

export default function FloatingMessageBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendState, setSendState] = useState('idle');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 140);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mailToHref = useMemo(() => {
    const subject = encodeURIComponent('Internship Opportunity Inquiry');
    const body = encodeURIComponent(
      `Hi ${personalInfo.name},\n\nI saw your portfolio and wanted to connect regarding an internship opportunity.\n\nBest regards,`
    );

    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  }, []);

  const getNavHref = (href) => (isHomePage ? href : `/${href}`);

  const sendDirectMessage = async () => {
    if (isSending) return;

    setIsSending(true);
    setSendState('idle');

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourcePath: location.pathname,
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        window.location.href = mailToHref;
        return;
      }

      setSendState('success');
    } catch {
      window.location.href = mailToHref;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="fixed bottom-4 right-12 z-[70] sm:bottom-6 sm:right-14"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {isOpen && (
        <div className="mb-3 w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-navy-600/70 dark:bg-navy-700/95">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-light">
            Let’s connect 👋
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate">
            Want to talk internships, collaborations, or AI projects? Send a quick message.
          </p>

          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={sendDirectMessage}
              disabled={isSending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-violet-500 px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <MailIcon className="h-4 w-4" />
              {isSending ? 'Sending...' : 'Send message via email'}
            </button>

            {sendState === 'success' && (
              <p className="rounded-lg bg-emerald-500/10 px-2.5 py-2 text-[11px] text-emerald-700 dark:text-emerald-300">
                Message sent successfully. I will get it directly via email.
              </p>
            )}

            <a
              href={getNavHref('#projects')}
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200/70 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-accent/40 hover:text-accent dark:border-navy-600/70 dark:text-slate-light dark:hover:border-accent-light/40 dark:hover:text-accent-light"
            >
              View AI-focused projects
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href={getNavHref('#contact')}
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200/70 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-accent/40 hover:text-accent dark:border-navy-600/70 dark:text-slate-light dark:hover:border-accent-light/40 dark:hover:text-accent-light"
            >
              Internship availability
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur-md transition-all dark:border-navy-600/70 dark:bg-navy-700/95 dark:text-slate-light ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
        }`}
        aria-label={isOpen ? 'Close message options' : 'Open message options'}
        aria-expanded={isOpen}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent dark:bg-accent-light/15 dark:text-accent-light">
          <MailIcon className="h-4 w-4" />
        </span>
        <span>Message me</span>
      </button>
    </div>
  );
}
