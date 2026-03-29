import { Section } from '../ui';
import { testimonialsData } from '../../data/portfolio';

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      label="07. Testimonials"
      title="What People Say"
      subtitle="Feedback from mentors, teammates, and collaborators."
    >
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((t, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-navy-600/70 dark:bg-navy-700/60"
          >
            <svg
              className="mb-3 h-6 w-6 shrink-0 text-accent/30 dark:text-accent-light/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
            </svg>
            <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate">
              "{t.quote}"
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-navy-600/50">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent dark:bg-accent-light/10 dark:text-accent-light">
                  {t.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-light">
                  {t.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
