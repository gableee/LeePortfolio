import { cn } from '../../utils/cn';

const variants = {
  solid: 'bg-white/95 text-slate-700 shadow-lg hover:bg-white',
  ghost: 'text-slate-500 hover:text-accent dark:text-slate-dark dark:hover:text-accent-light',
  outlined:
    'border border-navy-600/60 text-slate-dark hover:text-accent',
};

const sizes = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-9 w-9 sm:h-10 sm:w-10',
};

export default function IconButton({
  as = 'button',
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...props
}) {
  const Comp = as;

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all',
        variant === 'solid' && 'hover:scale-110 active:scale-95',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
