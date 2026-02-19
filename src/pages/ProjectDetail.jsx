import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { projectsData } from '../data/portfolio';
import { Container, Badge } from '../components/ui';
import { cn } from '../utils/cn';
import { ExternalLinkIcon, GitHubIcon } from '../components/icons';
import ThemeToggle from '../components/layout/ThemeToggle';

const ArrowLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const tabs = ['Problem', 'Process', 'Solution', 'Impact'];

// Inner component that handles the actual content and animation
function ProjectDetailContent({ project, currentIndex, prevProject, nextProject }) {
  const [activeTab, setActiveTab] = useState('Problem');
  const [isLoaded, setIsLoaded] = useState(false);
  const mountedRef = useRef(false);

  // Trigger animation on mount (runs once per key change)
  useEffect(() => {
    window.scrollTo(0, 0);
    // Use RAF to ensure we're past the initial render
    const timer = requestAnimationFrame(() => {
      mountedRef.current = true;
      setIsLoaded(true);
    });
    return () => {
      cancelAnimationFrame(timer);
      mountedRef.current = false;
    };
  }, []);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-navy-900">
        <header className="glass sticky top-0 z-50 py-4">
          <Container>
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-accent dark:text-slate dark:hover:text-accent-light"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Portfolio
              </Link>
              <ThemeToggle />
            </div>
          </Container>
        </header>
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-light">
              Project Not Found
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate">
              The project you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Go Back Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
      {/* Header */}
      <header className="glass sticky top-0 z-50 py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              to="/#projects"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-accent dark:text-slate dark:hover:text-accent-light"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Projects
            </Link>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section
        className={cn(
          'relative overflow-hidden py-16 sm:py-24 transition-all duration-700',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl dark:bg-accent-light/5" />
          <div className="absolute -left-1/4 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/5" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-4xl">
            {/* Project Number */}
            <span className="mb-4 inline-block font-mono text-sm text-accent dark:text-accent-light">
              Project {String(currentIndex + 1).padStart(2, '0')}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-light sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate sm:text-xl">
              {project.subtitle}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-accent hover:text-accent dark:border-navy-600 dark:bg-navy-700 dark:text-slate-light dark:hover:border-accent-light dark:hover:text-accent-light"
                >
                  <GitHubIcon className="h-5 w-5" />
                  View Source
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent/90 dark:bg-accent-light dark:text-navy-900 dark:hover:bg-accent-light/90"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Project Image Placeholder */}
      <section
        className={cn(
          'pb-16 transition-all duration-700 delay-150',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="aspect-video overflow-hidden rounded-2xl border border-gray-200/60 bg-gradient-to-br from-slate-100 to-slate-200 dark:border-navy-600/60 dark:from-navy-700 dark:to-navy-800">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={cn(
                  'flex h-full w-full items-center justify-center',
                  project.image ? 'hidden' : 'flex'
                )}
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 dark:bg-accent-light/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-8 w-8 text-accent dark:text-accent-light"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-dark">
                    Project Screenshot
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Study Section */}
      <section
        className={cn(
          'pb-16 transition-all duration-700 delay-300',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-mono text-sm uppercase tracking-wider text-accent dark:text-accent-light">
              Case Study
            </h2>

            {/* Tabs */}
            <div className="mb-8 overflow-hidden rounded-xl border border-gray-200/60 bg-white dark:border-navy-600/60 dark:bg-navy-700">
              <div className="flex border-b border-gray-100 dark:border-navy-600/50">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'relative flex-1 px-4 py-4 text-sm font-medium uppercase tracking-wider transition-colors',
                      activeTab === tab
                        ? 'text-accent dark:text-accent-light'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-dark dark:hover:text-slate'
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent dark:bg-accent-light" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                <div
                  key={activeTab}
                  className="animate-fade-in"
                >
                  {activeTab === 'Problem' && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-light">
                        The Challenge
                      </h3>
                      <p className="leading-relaxed text-slate-600 dark:text-slate">
                        {project.problem}
                      </p>
                    </div>
                  )}
                  {activeTab === 'Process' && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-light">
                        The Approach
                      </h3>
                      <p className="leading-relaxed text-slate-600 dark:text-slate">
                        {project.process}
                      </p>
                    </div>
                  )}
                  {activeTab === 'Solution' && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-light">
                        The Implementation
                      </h3>
                      <p className="leading-relaxed text-slate-600 dark:text-slate">
                        {project.solution}
                      </p>
                    </div>
                  )}
                  {activeTab === 'Impact' && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-light">
                        The Results
                      </h3>
                      <ul className="space-y-3">
                        {project.impact.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-slate-600 dark:text-slate"
                          >
                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent dark:bg-accent-light" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Navigation to other projects */}
      <section
        className={cn(
          'border-t border-gray-200/60 py-12 dark:border-navy-700 transition-all duration-700 delay-500',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prevProject ? (
                <Link
                  to={`/project/${prevProject.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200/60 bg-white px-6 py-4 transition-all hover:border-accent hover:shadow-lg dark:border-navy-600/60 dark:bg-navy-700 dark:hover:border-accent-light"
                >
                  <ArrowLeftIcon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-accent dark:group-hover:text-accent-light" />
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-dark">
                      Previous
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-light">
                      {prevProject.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextProject ? (
                <Link
                  to={`/project/${nextProject.slug}`}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-gray-200/60 bg-white px-6 py-4 text-right transition-all hover:border-accent hover:shadow-lg dark:border-navy-600/60 dark:bg-navy-700 dark:hover:border-accent-light"
                >
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-dark">
                      Next
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-light">
                      {nextProject.title}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5 text-slate-400 transition-colors group-hover:text-accent dark:group-hover:text-accent-light"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 py-8 dark:border-navy-700">
        <Container>
          <div className="text-center text-sm text-slate-500 dark:text-slate-dark">
            <Link
              to="/"
              className="transition-colors hover:text-accent dark:hover:text-accent-light"
            >
              © {new Date().getFullYear()} — Back to Portfolio
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// Outer wrapper that handles routing and uses key to reset inner component state
export default function ProjectDetail() {
  const { slug } = useParams();
  
  const project = useMemo(() => projectsData.find((p) => p.slug === slug), [slug]);
  const currentIndex = useMemo(() => projectsData.findIndex((p) => p.slug === slug), [slug]);
  const prevProject = projectsData[currentIndex - 1];
  const nextProject = projectsData[currentIndex + 1];

  // Using key={slug} ensures the inner component remounts when slug changes,
  // which naturally resets all its state (activeTab, isLoaded)
  return (
    <ProjectDetailContent
      key={slug}
      project={project}
      currentIndex={currentIndex}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
