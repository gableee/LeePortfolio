import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-accent hover:bg-accent-dark text-white shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
  outline:
    'border border-accent text-accent hover:bg-accent/10 dark:border-accent-light dark:text-accent-light',
  ghost:
    'text-slate-600 hover:text-accent hover:bg-accent/5 dark:text-slate dark:hover:text-accent-light',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'dark:focus-visible:ring-offset-navy-800',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
