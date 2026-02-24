import { Section } from '../ui';
import { experienceData } from '../../data/portfolio';

export default function Experience() {
  return (
    <Section
      id="experience"
      label="05. Experience"
      title="Where I've Worked"
      subtitle="A timeline of my professional journey."
    >
      <div className="relative">
        {/* Timeline line - hidden on mobile */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gray-200 dark:bg-navy-600 md:left-8 md:block" />

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {experienceData.map((job, index) => (
            <div key={index} className="relative md:pl-20">
              {/* Timeline dot - hidden on mobile */}
              <div className="absolute left-0 top-1.5 hidden h-4 w-4 rounded-full border-2 border-accent bg-white dark:border-accent-light dark:bg-navy-800 md:left-[25px] md:block" />

              {/* Content - mobile-first padding */}
              <div className="rounded-lg border border-gray-200/60 bg-white p-4 dark:border-navy-600/60 dark:bg-navy-700 sm:rounded-xl sm:p-5 md:p-6">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-1">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-light sm:text-base">
                      {job.role}
                    </h3>
                    <p className="text-xs font-medium text-accent dark:text-accent-light sm:text-sm">
                      {job.company}
                    </p>
                  </div>
                  <span className="mt-1 font-mono text-[10px] text-slate-500 dark:text-slate-dark sm:mt-0 sm:text-xs">
                    {job.period}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate sm:mt-3 sm:text-sm">
                  {job.description}
                </p>

                <ul className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate sm:text-sm"
                    >
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-accent dark:bg-accent-light sm:mt-1.5 sm:h-1.5 sm:w-1.5" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
