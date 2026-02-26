import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export default function TiltCard({ 
  children, 
  className, 
  glareEnabled = true,
  tiltAmount = 10,
  perspective = 1000,
  ...props 
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCapability = () => {
      setCanAnimate(!reducedMotionQuery.matches && finePointerQuery.matches);
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
    if (!cardRef.current || !canAnimate) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;
    
    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
    
    // Glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    if (!canAnimate) return;
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-transform duration-200 ease-out',
        className
      )}
      style={{ transform: canAnimate ? transform : 'none', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      
      {/* Glare effect */}
      {glareEnabled && canAnimate && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
      
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered && canAnimate ? 1 : 0,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      />
    </div>
  );
}
