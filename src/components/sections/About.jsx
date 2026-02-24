import { Section } from '../ui';
import { aboutData, skillsData } from '../../data/portfolio';
import { TiltCard } from '../effects';

// Icons for the bento items
const CodeIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

export default function About() {
  // Get top skills for the mini display
  const topSkills = skillsData
    .flatMap(cat => cat.skills)
    .sort((a, b) => b.level - a.level)
    .slice(0, 6);

  return (
    <Section
      id="about"
      label="01. About"
      title="About Me"
      subtitle="A quick overview of who I am and what drives me."
    >
      {/* Bento Grid Layout - Mobile-first with min-height to prevent collapse */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(180px,auto)]">
        {/* Main intro - Large card */}
        <TiltCard 
          tiltAmount={2}
          className="overflow-hidden rounded-xl border border-gray-200/60 bg-white p-4 dark:border-navy-600/60 dark:bg-navy-700 sm:col-span-2 sm:rounded-2xl sm:p-6 lg:col-span-7 lg:row-span-2"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent dark:bg-accent-light/10 dark:text-accent-light sm:mb-4 sm:px-3 sm:py-1.5 sm:text-xs">
                <SparkleIcon />
                Who I am
              </div>
              <div className="space-y-3 sm:space-y-4">
                {aboutData.summary.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-xs leading-relaxed text-slate-600 dark:text-slate sm:text-sm lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Stats cards - Mobile: side by side, Desktop: stacked right */}
        {aboutData.highlights.map((item, index) => (
          <TiltCard
            key={item.label}
            tiltAmount={3}
            className="group overflow-hidden rounded-xl border border-gray-200/60 bg-gradient-to-br from-white to-slate-50 p-3.5 dark:border-navy-600/60 dark:from-navy-700 dark:to-navy-800 sm:rounded-2xl sm:p-5 lg:col-span-5"
          >
            <div className="flex h-full flex-col justify-between gap-3 sm:gap-0">
              <div className="flex items-start justify-between">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110 dark:bg-accent-light/10 dark:text-accent-light sm:h-10 sm:w-10 sm:rounded-xl"
                >
                  {index === 0 && <RocketIcon />}
                  {index === 1 && <CodeIcon />}
                  {index === 2 && <SparkleIcon />}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-dark">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-light sm:text-3xl lg:text-4xl">
                  {item.value}
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-dark sm:mt-1 sm:text-sm">
                  {item.label}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}

        {/* Skills preview - Wide card */}
        <TiltCard
          tiltAmount={2}
          className="overflow-hidden rounded-xl border border-gray-200/60 bg-white p-3.5 dark:border-navy-600/60 dark:bg-navy-700 sm:col-span-2 sm:rounded-2xl sm:p-5 lg:col-span-7"
        >
          <div className="flex h-full flex-col">
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-dark sm:text-xs">
                Top Skills
              </span>
              <a 
                href="#skills" 
                className="text-[10px] font-medium text-accent transition-colors hover:text-accent-dark dark:text-accent-light sm:text-xs"
              >
                View all →
              </a>
            </div>
            <div className="flex flex-1 flex-wrap content-center gap-1.5 sm:gap-2">
              {topSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative overflow-hidden rounded-md bg-slate-100 px-2 py-1.5 dark:bg-navy-800 sm:rounded-lg sm:px-3 sm:py-2"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/20 to-transparent transition-all duration-500 group-hover:w-full"
                    style={{ width: `${skill.level}%` }}
                  />
                  <span className="relative text-[10px] font-medium text-slate-700 dark:text-slate-light sm:text-xs">
                    {skill.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Interactive element - Accent card */}
        <TiltCard
          tiltAmount={3}
          className="group overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 via-violet-500/5 to-accent-light/5 p-3.5 dark:border-accent-light/20 sm:col-span-2 sm:rounded-2xl sm:p-5 lg:col-span-5"
        >
          <div className="flex h-full flex-col justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 sm:text-xs">
                Available for work
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate sm:text-sm">
                Currently open to AI engineering opportunities and exciting collaborations.
              </p>
              <a
                href="#contact"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent transition-all hover:gap-2 dark:text-accent-light sm:mt-3 sm:text-sm"
              >
                Let's connect
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </TiltCard>
      </div>
    </Section>
  );
}
