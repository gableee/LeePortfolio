import { Section } from '../ui';
import { experienceData } from '../../data/portfolio';

export default function Experience() {
  return (
    <Section
      id="experience"
      label="04. Experience"
      title="Where I've Worked"
      subtitle="A timeline of my professional journey."
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gray-200 dark:bg-navy-600 md:left-8 md:block" />

        <div className="space-y-12">
          {experienceData.map((job, index) => (
            <div key={index} className="relative md:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 hidden h-4 w-4 rounded-full border-2 border-accent bg-white dark:border-accent-light dark:bg-navy-800 md:left-[25px] md:block" />

              {/* Content */}
              <div className="rounded-xl border border-gray-200/60 bg-white p-6 dark:border-navy-600/60 dark:bg-navy-700">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-light">
                      {job.role}
                    </h3>
                    <p className="text-sm font-medium text-accent dark:text-accent-light">
                      {job.company}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-dark">
                    {job.period}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate">
                  {job.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent dark:bg-accent-light" />
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
