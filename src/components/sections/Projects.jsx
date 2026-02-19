import { Link } from 'react-router-dom';
import { Section, Carousel } from '../ui';
import { projectsData } from '../../data/portfolio';
import { ExternalLinkIcon, GitHubIcon } from '../icons';

const ArrowRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

function ProjectCarouselCard({ project, index }) {
  return (
    <div className="group relative h-full overflow-visible">
      {/* Card with shadow and hover effects */}
      <div className="relative h-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 dark:bg-navy-700 dark:shadow-navy-900/50 dark:hover:shadow-accent-light/10">
        {/* Project Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Gradient background as fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-accent to-cyan-400 dark:from-violet-600 dark:via-accent dark:to-cyan-500" />
          
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            /* Decorative placeholder with project number */
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC0xOC04LjA1OS0xOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30" />
              <span className="font-mono text-8xl font-black text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:text-white/30">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
          
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute left-4 top-4 z-10">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-accent shadow-lg">
                ★ Featured
              </span>
            </div>
          )}

          {/* Quick links - visible on hover */}
          <div className="absolute right-4 top-4 z-10 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg transition-all hover:scale-110 hover:bg-white"
                aria-label={`${project.title} source code`}
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg transition-all hover:scale-110 hover:bg-white"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLinkIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-light">
            {project.title}
          </h3>
          
          {/* Subtitle/Description */}
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate line-clamp-2">
            {project.subtitle}. {project.problem.slice(0, 80)}...
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-navy-600 dark:text-slate-light"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-accent/30 group-hover:scale-[1.02] dark:from-accent-light dark:to-violet-400 dark:text-navy-900">
              View Case Study
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Click overlay for the whole card */}
      <Link
        to={`/project/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${project.title} case study`}
      >
        <span className="sr-only">View {project.title} case study</span>
      </Link>
    </div>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      label="03. Projects"
      title="Selected Work"
      subtitle="Case studies from projects I've built and shipped. Hover to pause, click to explore."
    >
      {/* Full-width continuous carousel */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <Carousel autoPlay={true} pauseOnHover={true}>
          {projectsData.map((project, index) => (
            <ProjectCarouselCard 
              key={project.slug} 
              project={project} 
              index={index}
            />
          ))}
        </Carousel>
      </div>

      {/* Project count indicator */}
      <div className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm dark:bg-navy-700 dark:text-slate">
          <span className="font-mono font-semibold text-accent dark:text-accent-light">
            {projectsData.length}
          </span>
          projects to explore
        </span>
      </div>
    </Section>
  );
}
