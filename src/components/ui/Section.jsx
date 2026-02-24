import { cn } from '../../utils/cn';
import { useInView } from '../../hooks/useInView';

export default function Section({
  id,
  children,
  className,
  label,
  title,
  subtitle,
  ...props
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id={id}
      ref={ref}
      className={cn('py-12 sm:py-16 md:py-20 lg:py-28', className)}
      {...props}
    >
      <div
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'none' : 'translateY(1.5rem)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        {(label || title) && (
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {label && (
              <span className="mb-2 block font-mono text-xs text-accent dark:text-accent-light sm:mb-3 sm:text-sm">
                {label}
              </span>
            )}
            {title && <h2 className="section-heading">{title}</h2>}
            {subtitle && <p className="section-subheading">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
