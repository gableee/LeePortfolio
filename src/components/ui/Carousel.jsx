import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';

const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default function Carousel({
  children,
  className,
  autoPlay = true,
  autoPlayInterval = 4000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = Array.isArray(children) ? children : [children];
  const itemsCount = items.length;

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemsCount);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, itemsCount, isHovered]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
  }, [itemsCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemsCount);
  }, [itemsCount]);

  // Calculate position relative to active card
  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    
    // Handle wrapping for infinite effect
    let normalizedDiff = diff;
    if (diff > itemsCount / 2) normalizedDiff = diff - itemsCount;
    if (diff < -itemsCount / 2) normalizedDiff = diff + itemsCount;

    const isActive = normalizedDiff === 0;
    const isAdjacent = Math.abs(normalizedDiff) === 1;
    const isVisible = Math.abs(normalizedDiff) <= 2;

    // Base transforms
    let translateX = normalizedDiff * 75; // percentage offset
    let translateZ = isActive ? 0 : -150;
    let rotateY = normalizedDiff * -35; // rotation angle
    let scale = isActive ? 1 : isAdjacent ? 0.85 : 0.7;
    let opacity = isActive ? 1 : isAdjacent ? 0.6 : 0.3;
    let zIndex = isActive ? 30 : isAdjacent ? 20 : 10;

    if (!isVisible) {
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      pointerEvents: isActive ? 'auto' : 'none',
    };
  };

  return (
    <div 
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Carousel Container */}
      <div 
        className="relative mx-auto h-[520px] sm:h-[560px] lg:h-[600px]"
        style={{ perspective: '1200px' }}
      >
        {/* Cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          {items.map((child, index) => (
            <div
              key={index}
              className="absolute w-[300px] sm:w-[340px] lg:w-[380px]"
              style={getCardStyle(index)}
              onClick={() => goTo(index)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className={cn(
          'absolute left-4 sm:left-8 lg:left-16 top-1/2 z-40 -translate-y-1/2',
          'flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full',
          'bg-white/90 dark:bg-navy-700/90 shadow-2xl backdrop-blur-md',
          'border border-gray-200/80 dark:border-navy-500/80',
          'text-slate-700 dark:text-slate-light',
          'transition-all duration-300',
          'hover:scale-110 hover:bg-white hover:shadow-accent/20 dark:hover:bg-navy-600',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
        )}
        aria-label="Previous project"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className={cn(
          'absolute right-4 sm:right-8 lg:right-16 top-1/2 z-40 -translate-y-1/2',
          'flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full',
          'bg-white/90 dark:bg-navy-700/90 shadow-2xl backdrop-blur-md',
          'border border-gray-200/80 dark:border-navy-500/80',
          'text-slate-700 dark:text-slate-light',
          'transition-all duration-300',
          'hover:scale-110 hover:bg-white hover:shadow-accent/20 dark:hover:bg-navy-600',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
        )}
        aria-label="Next project"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              'relative h-3 rounded-full transition-all duration-500',
              activeIndex === index
                ? 'w-10 bg-gradient-to-r from-accent to-violet-500 dark:from-accent-light dark:to-violet-400'
                : 'w-3 bg-slate-300 hover:bg-slate-400 dark:bg-navy-500 dark:hover:bg-navy-400'
            )}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="mt-4 text-center">
        <span className="font-mono text-sm text-slate-500 dark:text-slate-dark">
          <span className="text-accent dark:text-accent-light font-semibold">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          {' / '}
          {String(itemsCount).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
