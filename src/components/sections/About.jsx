import { Section } from '../ui';
import { aboutData } from '../../data/portfolio';

export default function About() {
  return (
    <Section
      id="about"
      label="01. About"
      title="About Me"
      subtitle="A quick overview of who I am and what drives me."
    >
      <div className="grid gap-12 md:grid-cols-5">
        {/* Text Content */}
        <div className="space-y-4 md:col-span-3">
          {aboutData.summary.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-slate-600 dark:text-slate"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-row gap-6 md:col-span-2 md:flex-col md:items-end md:justify-center">
          {aboutData.highlights.map((item) => (
            <div
              key={item.label}
              className="text-center md:text-right"
            >
              <div className="text-3xl font-bold text-accent dark:text-accent-light md:text-4xl">
                {item.value}
              </div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-dark">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
