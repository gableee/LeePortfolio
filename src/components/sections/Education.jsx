import { Section } from '../ui';
import { educationData } from '../../data/portfolio';

export default function Education() {
  return (
    <Section
      id="education"
      label="04. Education"
      title="Education"
      subtitle="My academic foundation."
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {educationData.map((edu, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-navy-600/70 dark:bg-navy-700/60 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              {edu.logo && (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200/60 bg-white dark:border-navy-500/60 dark:bg-navy-800 sm:h-16 sm:w-16">
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML =
                        '<span class="text-2xl">🎓</span>';
                    }}
                  />
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-light sm:text-lg">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-accent dark:text-accent-light">
                  {edu.school}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate">
                  <span>{edu.period}</span>
                  {edu.location && <span>{edu.location}</span>}
                  {edu.gpa && (
                    <span className="font-medium text-slate-700 dark:text-slate-light">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>

                {edu.highlights?.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {edu.highlights.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate sm:text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60 dark:bg-accent-light/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
