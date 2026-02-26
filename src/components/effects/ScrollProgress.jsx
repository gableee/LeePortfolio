import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setProgress(scrollPercent);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div 
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-gray-200/30 dark:bg-navy-600/30"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div
          className="h-full bg-gradient-to-r from-accent via-violet-500 to-accent-light transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Side progress indicator - only on larger screens with proper spacing */}
      <div
        className="fixed bottom-6 right-4 z-50 hidden sm:block"
        style={{ 
          opacity: isVisible ? 1 : 0, 
          transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'all 0.3s ease-out' 
        }}
      >
        <div className="flex flex-col items-center">
          <div className="relative h-20 w-1 overflow-hidden rounded-full bg-gray-200/50 shadow-lg dark:bg-navy-600/50">
            <div
              className="absolute bottom-0 left-0 w-full rounded-full bg-gradient-to-t from-accent to-violet-500 transition-all duration-150"
              style={{ height: `${progress}%` }}
            />
          </div>
          <span className="mt-1.5 font-mono text-[9px] tabular-nums text-slate-500 dark:text-slate-dark">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </>
  );
}
