import { useState } from 'react';
import { Section, Modal } from '../ui';
import { certificationsData, hackathonsData } from '../../data/portfolio';
import { ExternalLinkIcon } from '../icons';

const STATUS_RANK = {
  Completed: 0,
  'In Progress': 1,
  Planned: 2,
};

const CATEGORY_ICONS = {
  'AI / ML': '🤖',
  'Software Development': '💻',
  'Security': '🔒',
  'Foundational IT': '📚',
  Other: '📄',
};

function StatusBadge({ status }) {
  const styles = {
    'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Planned: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  };

  const badgeStyle = styles[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200';

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle}`}>
      {status}
    </span>
  );
}

function normalizeCertificateItems(cert) {
  if (cert.certificates?.length) {
    return cert.certificates;
  }

  return [
    {
      title: cert.name,
      image: cert.image,
      credentialUrl: cert.credentialUrl,
      status: cert.status,
    },
  ];
}

// Compact certification card for grid
function CompactCertificationCard({ cert, onClick }) {
  const certificateItems = normalizeCertificateItems(cert);
  const categoryIcon = CATEGORY_ICONS[cert.category] || CATEGORY_ICONS.Other;
  
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-gray-200/60 bg-white p-5 transition-all hover:border-accent/40 hover:shadow-lg dark:border-navy-600/60 dark:bg-navy-700 dark:hover:border-accent-light/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-3xl">{categoryIcon}</div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-navy-600 dark:text-slate-light">
            {certificateItems.length} cert{certificateItems.length > 1 ? 's' : ''}
          </span>
          <StatusBadge status={cert.status} />
        </div>
      </div>

      <h4 className="mt-3 font-semibold text-slate-900 transition-colors group-hover:text-accent dark:text-slate-light dark:group-hover:text-accent-light">
        {cert.name}
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate">{cert.issuer}</p>

      {cert.category && (
        <span className="mt-3 inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-navy-600 dark:text-slate-light">
          {cert.category}
        </span>
      )}

      <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate">
        {cert.notes}
      </p>

      <div className="mt-4 text-sm font-medium text-accent transition-colors group-hover:text-accent/80 dark:text-accent-light dark:group-hover:text-accent-light/80">
        View Details →
      </div>
    </article>
  );
}

// Modal content for certification details
function CertificationModalContent({ cert }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const certificateItems = normalizeCertificateItems(cert);
  const activeItem = certificateItems[activeIndex] || certificateItems[0];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={cert.status} />
          {cert.category && (
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-navy-700 dark:text-slate-light">
              {cert.category}
            </span>
          )}
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-navy-700 dark:text-slate-light">
            {certificateItems.length} certificate{certificateItems.length > 1 ? 's' : ''}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate">
          <span className="font-medium">Issuer:</span> {cert.issuer}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-light">
          {cert.notes}
        </p>
      </div>

      {/* Certificate Selection & Preview */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
        {/* Certificate List */}
        <div className="space-y-2">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-dark">
            Course Modules
          </p>
          {certificateItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                  isActive
                    ? 'border-accent bg-accent/5 text-accent dark:border-accent-light dark:bg-accent-light/10 dark:text-accent-light'
                    : 'border-gray-200/60 bg-slate-50 text-slate-700 hover:border-accent/40 hover:bg-accent/5 dark:border-navy-600/60 dark:bg-navy-800/60 dark:text-slate-light dark:hover:border-accent-light/40 dark:hover:bg-accent-light/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{item.title}</span>
                  {item.status && (
                    <span
                      className={`text-xs ${
                        item.status === 'Completed'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : item.status === 'In Progress'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-sky-600 dark:text-sky-400'
                      }`}
                    >
                      {item.status === 'Completed' ? '✓' : item.status === 'In Progress' ? '⟳' : '○'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Certificate Preview */}
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-dark">
            Preview
          </p>
          <div className="group overflow-hidden rounded-lg border border-gray-200/60 bg-slate-50 dark:border-navy-600/60 dark:bg-navy-800/70">
            {activeItem?.image ? (
              activeItem.credentialUrl && activeItem.credentialUrl !== '#' ? (
                <a
                  href={activeItem.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Open ${activeItem.title} certificate`}
                >
                  <img
                    src={activeItem.image}
                    alt={`${activeItem.title} certificate preview`}
                    className="h-48 w-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </a>
              ) : (
                <img
                  src={activeItem.image}
                  alt={`${activeItem.title} certificate preview`}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )
            ) : (
              <div className="flex h-48 items-center justify-center px-3 text-center text-xs text-slate-500 dark:text-slate-dark">
                Certificate preview not available
              </div>
            )}

            <div className="p-3">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-light">
                {activeItem?.title}
              </p>

              {activeItem?.credentialUrl && activeItem.credentialUrl !== '#' && (
                <a
                  href={activeItem.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80 dark:text-accent-light dark:hover:text-accent-light/80"
                >
                  View Certificate
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryCounts = certificationsData.reduce((acc, cert) => {
    const category = cert.category || 'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categories = ['All', ...Object.keys(categoryCounts)];

  const filteredCerts = certificationsData
    .filter((cert) => activeCategory === 'All' || cert.category === activeCategory)
    .sort((a, b) => {
      const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDelta !== 0) return featuredDelta;

      const statusDelta = (STATUS_RANK[a.status] ?? 99) - (STATUS_RANK[b.status] ?? 99);
      if (statusDelta !== 0) return statusDelta;

      return a.name.localeCompare(b.name);
    });

  return (
    <>
      <Section
        id="achievements"
        label="05. Certifications & Hackathons"
        title="Continuous Learning & Community"
        subtitle="Credentials and competitions that reflect my growth as an aspiring AI/ML engineer."
      >
        <div className="space-y-12">
          {/* Certifications Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-light">
              Certifications
            </h3>

            {/* Category Filters */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                const count =
                  category === 'All' ? certificationsData.length : categoryCounts[category] || 0;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'border-accent bg-accent/10 text-accent dark:border-accent-light dark:bg-accent-light/10 dark:text-accent-light'
                        : 'border-gray-200/70 bg-white text-slate-600 hover:border-accent/30 dark:border-navy-600 dark:bg-navy-700 dark:text-slate-light dark:hover:border-accent-light/30'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            {/* Horizontal Scrollable Certification Cards */}
            {filteredCerts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300/80 bg-white p-5 text-center text-sm text-slate-600 dark:border-navy-600/80 dark:bg-navy-700 dark:text-slate">
                No certifications found for this category yet.
              </div>
            ) : (
              <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {filteredCerts.map((cert) => (
                    <div key={cert.name} className="w-80 flex-shrink-0">
                      <CompactCertificationCard cert={cert} onClick={() => setSelectedCert(cert)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hackathons Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-light">
              Hackathons
            </h3>

            {/* Horizontal Scrollable Hackathon Cards */}
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {hackathonsData.map((hackathon) => (
                  <article
                    key={`${hackathon.event}-${hackathon.year}`}
                    className="w-80 flex-shrink-0 rounded-xl border border-gray-200/60 bg-white p-5 dark:border-navy-600/60 dark:bg-navy-700"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-light">
                          {hackathon.event}
                        </h4>
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-dark">
                          {hackathon.year}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate">{hackathon.organizer}</p>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-light">
                      <span className="font-medium">Role:</span> {hackathon.role}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-light">
                      <span className="font-medium">Project:</span> {hackathon.project}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {hackathon.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent dark:bg-accent-light" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {hackathon.projectUrl && hackathon.projectUrl !== '#' && (
                      <a
                        href={hackathon.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 dark:text-accent-light dark:hover:text-accent-light/80"
                      >
                        View Project
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Certification Details Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.name || ''}
      >
        {selectedCert && <CertificationModalContent cert={selectedCert} />}
      </Modal>
    </>
  );
}
