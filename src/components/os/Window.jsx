import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';
import { useTheme } from '../../hooks/useTheme';

/**
 * OS Window chrome wrapper for sections.
 * Adds a sci-fi title bar with status LEDs, section label, and a glowing border.
 * Animates in with a border-trace effect when scrolled into view.
 */
export default function Window({
  id,
  children,
  className,
  label,
  title,
  subtitle,
  sysId,
  ...props
}) {
  const [ref, isInView] = useInView({ threshold: 0.08 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const systemLabel = sysId
    ? `SYS://${sysId}`
    : label
      ? `SYS://${label.replace(/^\d+\.\s*/, '').toUpperCase().replace(/\s+/g, '_')}`
      : 'SYS://MODULE';

  return (
    <section
      id={id}
      ref={ref}
      className={cn('py-8 sm:py-10 md:py-14 lg:py-16', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Window container with animated reveal */}
        <div
          className={cn(
            'relative overflow-hidden rounded-lg transition-all duration-700',
            isDark ? 'os-window' : 'os-window os-window-light',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {/* Animated border trace on reveal */}
          <div
            className={cn(
              'pointer-events-none absolute inset-0 rounded-lg border transition-all duration-1000',
              isInView
                ? 'border-accent/30 opacity-100'
                : 'border-transparent opacity-0',
              isDark ? 'shadow-[inset_0_0_20px_rgba(6,182,212,0.03)]' : ''
            )}
            style={{
              clipPath: isInView
                ? 'inset(0 0 0 0)'
                : 'inset(0 100% 100% 0)',
              transition: 'clip-path 1.2s ease-out, border-color 0.5s ease-out, opacity 0.5s ease-out',
            }}
          />

          {/* Scan-line overlay */}
          <div className={cn(
            'pointer-events-none absolute inset-0 z-[1]',
            isDark ? 'scan-lines' : 'scan-lines scan-lines-light'
          )} />

          {/* Title bar */}
          <div className={cn(
            'os-titlebar relative z-10',
            !isDark && 'os-titlebar-light'
          )}>
            {/* Status LEDs */}
            <div className="flex items-center gap-1.5">
              <div className="os-led os-led-red" />
              <div className="os-led os-led-yellow" />
              <div className="os-led os-led-green" />
            </div>

            {/* System label */}
            <span className="flex-1 text-center opacity-70">{systemLabel}</span>

            {/* Window ID badge */}
            {label && (
              <span className="rounded border border-accent/20 px-2 py-0.5 text-[9px] text-accent/50">
                {label.split('.')[0]?.trim() || '00'}
              </span>
            )}
          </div>

          {/* Window content */}
          <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
            {/* Section header inside window */}
            {(label || title) && (
              <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                {label && (
                  <span className="section-eyebrow mb-3 sm:mb-4">
                    {label}
                  </span>
                )}
                {title && <h2 className="section-heading max-w-3xl">{title}</h2>}
                {subtitle && <p className="section-subheading">{subtitle}</p>}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
