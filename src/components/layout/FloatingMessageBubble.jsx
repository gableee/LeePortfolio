import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { personalInfo } from '../../data/portfolio';
import { MailIcon, ArrowRightIcon } from '../icons';

export default function FloatingMessageBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendState, setSendState] = useState('idle');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', body: '' });
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 140);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(formData.subject || 'Internship Opportunity Inquiry');
    const body = encodeURIComponent(
      formData.body
        ? `${formData.body}\n\n— ${formData.name || 'Anonymous'}`
        : `Hi ${personalInfo.name},\n\nI saw your portfolio and wanted to connect regarding an internship opportunity.\n\nBest regards,`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const getNavHref = (href) => (isHomePage ? href : `/${href}`);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending || !formData.name.trim() || !formData.body.trim()) return;

    setIsSending(true);
    setSendState('idle');

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Contact',
          body: formData.body.trim(),
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        window.location.href = buildMailtoHref();
        return;
      }

      setSendState('success');
      setFormData({ name: '', email: '', subject: '', body: '' });
    } catch {
      window.location.href = buildMailtoHref();
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowForm(false);
    setSendState('idle');
  };

  return (
    <div
      className="fixed bottom-4 right-12 z-[70] sm:bottom-6 sm:right-14"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {isOpen && (
        <div className="mb-3 w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-navy-600/70 dark:bg-navy-700/95">
          {showForm ? (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setSendState('idle'); }}
                  className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-light"
                  aria-label="Back"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-light">
                  Send me a message
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-3 space-y-2">
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-200/70 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 dark:border-navy-500/70 dark:bg-navy-800 dark:text-slate-light dark:placeholder:text-slate-500 dark:focus:border-accent-light dark:focus:ring-accent-light/40"
                  maxLength={100}
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Your email"
                  className="w-full rounded-lg border border-gray-200/70 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 dark:border-navy-500/70 dark:bg-navy-800 dark:text-slate-light dark:placeholder:text-slate-500 dark:focus:border-accent-light dark:focus:ring-accent-light/40"
                  maxLength={200}
                />
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleFormChange}
                  placeholder="Subject (optional)"
                  className="w-full rounded-lg border border-gray-200/70 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 dark:border-navy-500/70 dark:bg-navy-800 dark:text-slate-light dark:placeholder:text-slate-500 dark:focus:border-accent-light dark:focus:ring-accent-light/40"
                  maxLength={200}
                />
                <textarea
                  name="body"
                  required
                  value={formData.body}
                  onChange={handleFormChange}
                  placeholder="Your message..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200/70 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 dark:border-navy-500/70 dark:bg-navy-800 dark:text-slate-light dark:placeholder:text-slate-500 dark:focus:border-accent-light dark:focus:ring-accent-light/40"
                  maxLength={2000}
                />
                <button
                  type="submit"
                  disabled={isSending || !formData.name.trim() || !formData.body.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-violet-500 px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
                >
                  <MailIcon className="h-4 w-4" />
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </form>

              {sendState === 'success' && (
                <p className="mt-2 rounded-lg bg-emerald-500/10 px-2.5 py-2 text-[11px] text-emerald-700 dark:text-emerald-300">
                  Message sent to <span className="font-semibold">{personalInfo.email}</span>! I'll get back to you soon.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-light">
                Let's connect 👋
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate">
                Want to talk internships, collaborations, or AI projects? Send a quick message.
              </p>

              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(true); setSendState('idle'); }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-violet-500 px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MailIcon className="h-4 w-4" />
                  Send message via email
                </button>

                <a
                  href={getNavHref('#projects')}
                  onClick={handleClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200/70 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-accent/40 hover:text-accent dark:border-navy-600/70 dark:text-slate-light dark:hover:border-accent-light/40 dark:hover:text-accent-light"
                >
                  View AI-focused projects
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>

                <a
                  href={getNavHref('#contact')}
                  onClick={handleClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200/70 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-accent/40 hover:text-accent dark:border-navy-600/70 dark:text-slate-light dark:hover:border-accent-light/40 dark:hover:text-accent-light"
                >
                  Internship availability
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </>
          )}
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
