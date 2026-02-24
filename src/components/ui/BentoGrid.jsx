import { cn } from '../../utils/cn';
import TiltCard from '../effects/TiltCard';

export default function BentoGrid({ children, className }) {
  return (
    <div 
      className={cn(
        'grid gap-4 md:grid-cols-6 lg:grid-cols-12',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoItem({ 
  children, 
  className, 
  colSpan = 6,
  rowSpan = 1,
  variant = 'default',
  tilt = true,
  ...props 
}) {
  const colSpanClasses = {
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    6: 'md:col-span-6',
    8: 'md:col-span-8',
    12: 'md:col-span-12',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
  };

  const variantClasses = {
    default: 'bg-white dark:bg-navy-700 border border-gray-200/60 dark:border-navy-600/60',
    accent: 'bg-gradient-to-br from-accent/10 to-violet-500/10 border border-accent/20 dark:border-accent-light/20',
    dark: 'bg-navy-800 dark:bg-navy-900 border border-navy-700',
    glass: 'bg-white/50 dark:bg-navy-700/50 backdrop-blur-lg border border-white/20 dark:border-navy-600/20',
  };

  const content = (
    <div
      className={cn(
        'h-full rounded-2xl p-6 transition-all duration-300',
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  if (tilt) {
    return (
      <TiltCard className={cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan])}>
        {content}
      </TiltCard>
    );
  }

  return content;
}
