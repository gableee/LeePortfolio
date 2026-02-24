import { cn } from '../../utils/cn';

// Reusable placeholder for images/avatars that maintains aspect ratio
export function ImagePlaceholder({ 
  className,
  aspectRatio = '1/1',
  variant = 'default',
  icon = 'user',
  text,
  size = 'md',
}) {
  const variants = {
    default: 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-600 dark:to-navy-700',
    accent: 'bg-gradient-to-br from-accent/10 via-violet-500/10 to-accent-light/10',
    gradient: 'bg-gradient-to-br from-accent via-violet-500 to-cyan-400 dark:from-accent-light dark:via-violet-400 dark:to-cyan-300',
    subtle: 'bg-slate-100 dark:bg-navy-700',
  };

  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };

  const icons = {
    user: (
      <svg className="h-1/3 w-1/3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    image: (
      <svg className="h-1/3 w-1/3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    code: (
      <svg className="h-1/3 w-1/3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    project: (
      <svg className="h-1/3 w-1/3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        variants[variant],
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Decorative pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      {text ? (
        <span className={cn('font-bold text-slate-400 dark:text-slate-dark', sizes[size])}>
          {text}
        </span>
      ) : (
        <div className="text-slate-400 dark:text-slate-dark">
          {icons[icon]}
        </div>
      )}
    </div>
  );
}

// Avatar placeholder with initials
export function AvatarPlaceholder({ 
  name = '',
  className,
  size = 'md',
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('') || '?';

  const sizes = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-16 w-16 text-xl',
    lg: 'h-24 w-24 text-3xl',
    xl: 'h-32 w-32 text-4xl',
    '2xl': 'h-44 w-44 text-5xl',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-full',
        'bg-gradient-to-br from-accent/20 via-violet-500/15 to-accent-light/20',
        'border-2 border-white/50 dark:border-navy-500/50',
        sizes[size],
        className
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-accent/10 via-violet-500/10 to-accent-light/10 bg-[length:200%_100%]" />
      
      {/* Inner ring */}
      <div className="absolute inset-2 rounded-full border border-accent/20 dark:border-accent-light/20" />
      
      {/* Initials */}
      <span className="relative font-bold text-accent dark:text-accent-light">
        {initials}
      </span>
    </div>
  );
}

// Project card placeholder
export function ProjectPlaceholder({
  index = 0,
  className,
}) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-accent via-violet-500 to-cyan-400',
        'dark:from-accent-light dark:via-violet-400 dark:to-cyan-300',
        className
      )}
    >
      {/* Decorative circles */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-black/10" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Project number */}
      <span className="relative font-mono text-7xl font-black text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:text-white/30 sm:text-8xl">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}
