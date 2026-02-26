import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export default function MagneticWrapper({ 
  children, 
  className,
  strength = 0.3,
  radius = 150,
  ...props 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canAnimate, setCanAnimate] = useState(true);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCapability = () => {
      setCanAnimate(!reducedMotionQuery.matches && finePointerQuery.matches);
      if (reducedMotionQuery.matches || !finePointerQuery.matches) {
        setPosition({ x: 0, y: 0 });
      }
    };

    syncCapability();
    reducedMotionQuery.addEventListener('change', syncCapability);
    finePointerQuery.addEventListener('change', syncCapability);

    return () => {
      reducedMotionQuery.removeEventListener('change', syncCapability);
      finePointerQuery.removeEventListener('change', syncCapability);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current || !canAnimate) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    if (distance < radius) {
      const factor = 1 - distance / radius;
      setPosition({
        x: distanceX * strength * factor,
        y: distanceY * strength * factor,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn('inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: canAnimate ? `translate(${position.x}px, ${position.y}px)` : 'none',
        transition: position.x === 0 && position.y === 0 
          ? 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)' 
          : 'transform 0.1s ease-out',
      }}
      data-magnetic
      {...props}
    >
      {children}
    </div>
  );
}
