import { useState } from 'react';
import { Section } from '../ui';
import { skillsData } from '../../data/portfolio';
import {
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  NextJsIcon,
  TailwindIcon,
  HTML5Icon,
  CSS3Icon,
  GitIcon,
  FigmaIcon,
  ViteIcon,
  NodeJsIcon,
  JestIcon,
} from '../icons';

// Map technology names to their icon components
const techIcons = {
  'React / Next.js': { icon: ReactIcon, color: 'text-[#61DAFB]', gradient: 'from-[#61DAFB]/20 to-[#61DAFB]/5' },
  'TypeScript': { icon: TypeScriptIcon, color: 'text-[#3178C6]', gradient: 'from-[#3178C6]/20 to-[#3178C6]/5' },
  'JavaScript (ES2024)': { icon: JavaScriptIcon, color: 'text-[#F7DF1E]', gradient: 'from-[#F7DF1E]/20 to-[#F7DF1E]/5' },
  'HTML5 / CSS3': { icon: HTML5Icon, color: 'text-[#E34F26]', gradient: 'from-[#E34F26]/20 to-[#E34F26]/5' },
  'Tailwind CSS': { icon: TailwindIcon, color: 'text-[#06B6D4]', gradient: 'from-[#06B6D4]/20 to-[#06B6D4]/5' },
  'CSS Architecture': { icon: CSS3Icon, color: 'text-[#1572B6]', gradient: 'from-[#1572B6]/20 to-[#1572B6]/5' },
  'Figma / Design Tools': { icon: FigmaIcon, color: 'text-[#F24E1E]', gradient: 'from-[#F24E1E]/20 to-[#F24E1E]/5' },
  'Responsive Design': { icon: HTML5Icon, color: 'text-[#E34F26]', gradient: 'from-[#E34F26]/20 to-[#E34F26]/5' },
  'Git / GitHub': { icon: GitIcon, color: 'text-[#F05032]', gradient: 'from-[#F05032]/20 to-[#F05032]/5' },
  'Vite / Webpack': { icon: ViteIcon, color: 'text-[#646CFF]', gradient: 'from-[#646CFF]/20 to-[#646CFF]/5' },
  'Testing (Jest/Vitest)': { icon: JestIcon, color: 'text-[#C21325]', gradient: 'from-[#C21325]/20 to-[#C21325]/5' },
  'CI/CD Pipelines': { icon: NodeJsIcon, color: 'text-[#339933]', gradient: 'from-[#339933]/20 to-[#339933]/5' },
  'Component Design': { icon: ReactIcon, color: 'text-[#61DAFB]', gradient: 'from-[#61DAFB]/20 to-[#61DAFB]/5' },
  'State Management': { icon: ReactIcon, color: 'text-[#61DAFB]', gradient: 'from-[#61DAFB]/20 to-[#61DAFB]/5' },
  'Performance Optimization': { icon: ViteIcon, color: 'text-[#646CFF]', gradient: 'from-[#646CFF]/20 to-[#646CFF]/5' },
  'Accessibility (a11y)': { icon: HTML5Icon, color: 'text-[#E34F26]', gradient: 'from-[#E34F26]/20 to-[#E34F26]/5' },
};

export default function Skills() {
  // Flatten all skills into a single array with their categories
  const allSkills = skillsData.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.category,
      ...techIcons[skill.name],
    }))
  );

  const [selectedSkill, setSelectedSkill] = useState(allSkills[0]);

  return (
    <Section
      id="skills"
      label="03. Skills"
      title="Technical Skills"
      subtitle="Technologies and tools I work with daily."
    >
      <div className="mx-auto max-w-6xl">
        {/* Main Display Area - mobile-first responsive */}
        <div className="relative mb-8 overflow-hidden rounded-xl border border-gray-200/60 bg-white dark:border-navy-600/60 dark:bg-navy-700 sm:mb-12 sm:rounded-2xl">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedSkill.gradient} transition-all duration-700`} />
          
          {/* Large Background Icon - hidden on very small, scales up */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-[0.04] transition-opacity duration-700 dark:opacity-[0.08] sm:translate-x-1/3 sm:opacity-[0.06] dark:sm:opacity-[0.12] md:opacity-[0.08] dark:md:opacity-[0.15]">
            {selectedSkill.icon && <selectedSkill.icon className="h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-[400px] xl:w-[400px]" />}
          </div>

          {/* Content - mobile-first padding */}
          <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-20">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              {/* Icon - smaller on mobile */}
              <div className={`flex-shrink-0 ${selectedSkill.color} transition-colors duration-500`}>
                {selectedSkill.icon && <selectedSkill.icon className="h-14 w-14 drop-shadow-2xl sm:h-20 sm:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28" />}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-dark sm:mb-2 sm:text-xs">
                  {selectedSkill.category}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-slate-light sm:mb-3 sm:text-2xl lg:text-4xl xl:text-5xl">
                  {selectedSkill.name}
                </h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-gray-200/60 dark:bg-navy-600/60 sm:h-1.5 sm:max-w-xs">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${selectedSkill.color} shadow-lg transition-all duration-700 ease-out`}
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-dark sm:text-sm">
                    {selectedSkill.level}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Tabs/Buttons Grid - mobile-first */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
          {allSkills.map((skill) => {
            const isActive = selectedSkill.name === skill.name;
            const Icon = skill.icon;
            
            return (
              <button
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`group relative overflow-hidden rounded-lg border p-2.5 transition-all duration-300 active:scale-95 sm:rounded-xl sm:p-4 ${
                  isActive
                    ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg shadow-accent/20 dark:border-accent-light dark:from-accent-light/10 dark:to-accent-light/5'
                    : 'border-gray-200/60 bg-white hover:border-accent/50 hover:shadow-md dark:border-navy-600/60 dark:bg-navy-700 dark:hover:border-accent-light/50'
                }`}
              >
                {/* Icon - smaller on mobile */}
                <div className={`mb-1.5 flex justify-center transition-all duration-300 sm:mb-2 ${
                  isActive 
                    ? `${skill.color} scale-110` 
                    : 'text-slate-400 group-hover:scale-105 group-hover:text-slate-600 dark:text-slate-dark dark:group-hover:text-slate-light'
                }`}>
                  {Icon && <Icon className="h-5 w-5 sm:h-8 sm:w-8" />}
                </div>

                {/* Name - smaller on mobile */}
                <div className={`text-center text-[9px] font-medium transition-colors duration-300 sm:text-xs ${
                  isActive
                    ? 'text-accent dark:text-accent-light'
                    : 'text-slate-600 group-hover:text-slate-800 dark:text-slate-dark dark:group-hover:text-slate-light'
                }`}>
                  <div className="line-clamp-2">{skill.name.split(' ')[0]}</div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-violet-500 dark:from-accent-light dark:to-violet-400 sm:h-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Categories Legend - mobile-first with horizontal scroll on small screens */}
        <div className="mt-6 flex justify-start gap-2 overflow-x-auto pb-2 text-[10px] sm:mt-8 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:pb-0 sm:text-xs">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-gray-200/60 bg-white px-2.5 py-1.5 dark:border-navy-600/60 dark:bg-navy-700 sm:gap-2 sm:px-4 sm:py-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-violet-500 dark:from-accent-light dark:to-violet-400 sm:h-2 sm:w-2" />
              <span className="font-mono font-medium text-slate-600 dark:text-slate-dark">
                {category.category}
              </span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-500 dark:bg-navy-600 dark:text-slate-dark sm:px-2 sm:text-xs">
                {category.skills.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
