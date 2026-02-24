import { cn } from '../../utils/cn';

const variants = {
  default: 'bg-accent/10 text-accent-dark ring-1 ring-accent/20 dark:bg-accent/15 dark:text-accent-light dark:ring-accent-light/20',
  primary: 'bg-accent text-white dark:bg-accent-light dark:text-navy-900',
  outline: 'border border-accent/30 text-accent dark:border-accent-light/30 dark:text-accent-light bg-transparent',
  secondary: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-navy-600 dark:text-slate-light dark:ring-navy-500',
};

const sizes = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export default function Badge({ 
  children, 
  className, 
  variant = 'default', 
  size = 'md' 
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
