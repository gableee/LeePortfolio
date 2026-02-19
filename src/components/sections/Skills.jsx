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
      label="02. Skills"
      title="Technical Skills"
      subtitle="Technologies and tools I work with daily."
    >
      <div className="mx-auto max-w-6xl">
        {/* Main Display Area */}
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-gray-200/60 bg-white dark:border-navy-600/60 dark:bg-navy-700">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedSkill.gradient} transition-all duration-700`} />
          
          {/* Large Background Icon */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.08] dark:opacity-[0.15] transition-opacity duration-700">
            {selectedSkill.icon && <selectedSkill.icon className="h-[400px] w-[400px]" />}
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20">
            <div className="flex items-center gap-6">
              {/* Icon */}
              <div className={`flex-shrink-0 ${selectedSkill.color} transition-colors duration-500`}>
                {selectedSkill.icon && <selectedSkill.icon className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 drop-shadow-2xl" />}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-dark">
                  {selectedSkill.category}
                </div>
                <h3 className="mb-3 text-3xl font-bold text-slate-800 dark:text-slate-light sm:text-4xl lg:text-5xl">
                  {selectedSkill.name}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-200/60 dark:bg-navy-600/60">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${selectedSkill.color} transition-all duration-700 ease-out shadow-lg`}
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                  <span className="font-mono text-sm font-semibold text-slate-600 dark:text-slate-dark">
                    {selectedSkill.level}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Tabs/Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {allSkills.map((skill) => {
            const isActive = selectedSkill.name === skill.name;
            const Icon = skill.icon;
            
            return (
              <button
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                  isActive
                    ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg shadow-accent/20 dark:border-accent-light dark:from-accent-light/10 dark:to-accent-light/5'
                    : 'border-gray-200/60 bg-white hover:border-accent/50 hover:shadow-md dark:border-navy-600/60 dark:bg-navy-700 dark:hover:border-accent-light/50'
                }`}
              >
                {/* Icon */}
                <div className={`mb-2 flex justify-center transition-all duration-300 ${
                  isActive 
                    ? `${skill.color} scale-110` 
                    : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-dark dark:group-hover:text-slate-light group-hover:scale-105'
                }`}>
                  {Icon && <Icon className="h-8 w-8" />}
                </div>

                {/* Name */}
                <div className={`text-center text-xs font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-accent dark:text-accent-light'
                    : 'text-slate-600 group-hover:text-slate-800 dark:text-slate-dark dark:group-hover:text-slate-light'
                }`}>
                  <div className="line-clamp-2">{skill.name}</div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-violet-500 dark:from-accent-light dark:to-violet-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Categories Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="flex items-center gap-2 rounded-full border border-gray-200/60 bg-white px-4 py-2 dark:border-navy-600/60 dark:bg-navy-700"
            >
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-violet-500 dark:from-accent-light dark:to-violet-400" />
              <span className="font-mono font-medium text-slate-600 dark:text-slate-dark">
                {category.category}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500 dark:bg-navy-600 dark:text-slate-dark">
                {category.skills.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
