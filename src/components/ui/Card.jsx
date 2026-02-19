import { cn } from '../../utils/cn';

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        'bg-white dark:bg-navy-700',
        'border border-gray-200/60 dark:border-navy-600/60',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
