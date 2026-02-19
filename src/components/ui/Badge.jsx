import { cn } from '../../utils/cn';

const variants = {
  default: 'bg-accent/10 text-accent-dark dark:bg-accent/15 dark:text-accent-light',
  primary: 'bg-accent text-white dark:bg-accent-light dark:text-navy-900',
  outline: 'border border-accent/30 text-accent dark:border-accent-light/30 dark:text-accent-light bg-transparent',
  secondary: 'bg-slate-100 text-slate-600 dark:bg-navy-600 dark:text-slate',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
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
        'inline-block rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
