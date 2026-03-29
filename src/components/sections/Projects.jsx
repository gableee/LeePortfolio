import { Link } from 'react-router-dom';
import { Section, Carousel } from '../ui';
import { ProjectPlaceholder } from '../ui/Placeholder';
import { projectsData } from '../../data/portfolio';
import { ExternalLinkIcon, GitHubIcon } from '../icons';
import { useState } from 'react';

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
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="group relative h-full overflow-visible">
      {/* Card with shadow and hover effects - mobile-first sizing */}
      <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 dark:bg-navy-700 dark:shadow-navy-900/50 dark:hover:shadow-accent-light/10 sm:rounded-2xl lg:rounded-3xl">
        {/* Project Image - mobile-first aspect ratio */}
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
          {/* Image or Placeholder */}
          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <ProjectPlaceholder number={index + 1} className="h-full w-full" />
          )}
          
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent sm:h-24" />
          
          {/* Featured badge - smaller on mobile */}
          {project.featured && (
            <div className="absolute left-2 top-2 z-10 sm:left-4 sm:top-4">
              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-accent shadow-lg sm:px-3 sm:py-1.5 sm:text-xs">
                ★ Featured
              </span>
            </div>
          )}

          {/* Quick links - larger touch targets on mobile */}
          <div className="absolute right-2 top-2 z-10 flex gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:right-4 sm:top-4 sm:gap-2">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:h-10 sm:w-10"
                aria-label={`${project.title} source code`}
              >
                <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95 sm:h-10 sm:w-10"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Content - mobile-first padding */}
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Title - responsive sizing */}
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-light sm:text-lg lg:text-xl">
            {project.title}
          </h3>
          
          {/* Subtitle/Description */}
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2 dark:text-slate sm:mt-2 sm:text-sm">
            {project.subtitle}. {project.problem.slice(0, 80)}...
          </p>

          {/* Tags - smaller on mobile */}
          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-navy-600 dark:text-slate-light sm:px-3 sm:py-1 sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button - full width, responsive sizing */}
          <div className="mt-4 sm:mt-6">
            <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-violet-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-accent/30 dark:from-accent-light dark:to-violet-400 dark:text-navy-900 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm">
              View Case Study
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
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
      label="02. Projects"
      title="Selected Work"
      subtitle="Case studies from projects I've built and shipped. Hover to pause, click to explore."
    >
      {/* Full-width continuous carousel - mobile-first margins */}
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

      {/* Project count indicator - mobile-first sizing */}
      <div className="mt-6 text-center sm:mt-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm dark:bg-navy-700 dark:text-slate sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
          <span className="font-mono font-semibold text-accent dark:text-accent-light">
            {projectsData.length}
          </span>
          projects to explore
        </span>
      </div>
    </Section>
  );
}
