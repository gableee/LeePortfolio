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
      className={cn('py-20 md:py-28', className)}
      {...props}
    >
      <div
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'none' : 'translateY(2rem)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        {(label || title) && (
          <div className="mb-12 md:mb-16">
            {label && (
              <span className="mb-3 block font-mono text-sm text-accent dark:text-accent-light">
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
