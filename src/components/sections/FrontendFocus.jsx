import { Badge, Card, Section } from '../ui';
import { frontendFocusData } from '../../data/portfolio';

export default function FrontendFocus() {
  return (
    <Section
      id="frontend"
      label="02. Frontend Focus"
      title="What to Showcase First"
      subtitle="A practical frontend-first blueprint with sample content you can replace as your portfolio grows."
    >
      <div className="space-y-8">
        <div className="grid gap-5 md:grid-cols-3">
          {frontendFocusData.pillars.map((pillar) => (
            <Card key={pillar.title} className="h-full">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-light">
                  {pillar.title}
                </h3>
                <Badge variant="outline" size="sm">
                  Sample
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate">
                {pillar.whyItMatters}
              </p>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-navy-800/70">
                <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-dark">
                  Sample Proof
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-light">
                  {pillar.sampleProof}
                </p>
              </div>

              <p className="mt-3 text-xs font-medium text-accent dark:text-accent-light">
                {pillar.status}
              </p>
            </Card>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200/60 bg-white p-6 dark:border-navy-600/60 dark:bg-navy-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-light">
            Suggested Sections You Can Add Later
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate">
            These are optional, but they are high-signal for engineers and hiring teams.
          </p>

          <div className="mt-5 space-y-4">
            {frontendFocusData.sectionsToAddLater.map((item, index) => (
              <div
                key={item.name}
                className="rounded-lg border border-gray-200/70 bg-slate-50 p-4 dark:border-navy-600/70 dark:bg-navy-800/70"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-dark">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-medium text-slate-900 dark:text-slate-light">{item.name}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate">{item.purpose}</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-light">
                  <span className="font-semibold">Sample:</span> {item.sample}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
