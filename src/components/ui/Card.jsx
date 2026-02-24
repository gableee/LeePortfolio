import { cn } from '../../utils/cn';

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'bg-white dark:bg-navy-700',
        'border border-gray-200/60 dark:border-navy-600/60',
        'transition-all duration-300 focus-within:ring-2 focus-within:ring-accent/40 dark:focus-within:ring-accent-light/40 focus-within:ring-offset-2 dark:focus-within:ring-offset-navy-800',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
