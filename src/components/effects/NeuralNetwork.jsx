import React, { useEffect, useRef } from 'react';

function createParticle(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
  };
}

const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Configuration
    const particleColor = 'rgba(34, 211, 238, 0.5)'; // cyan-400 with opacity
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = {
      x: null,
      y: null,
      radius: mouseDistance
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseLeave = () => {
        mouse.x = null;
        mouse.y = null;
    }

    const updateParticle = (particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      if (mouse.x == null) return;

      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= mouse.radius || distance === 0) return;

      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;

      particle.vx += forceDirectionX * force * 0.05;
      particle.vy += forceDirectionY * force * 0.05;
    };

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    };

    function initParticles() {
      particles = [];
      // Recalculate count on resize
      const count = Math.min(canvas.width * canvas.height / 15000, 100);
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(canvas));
      }
    }

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            let opacityValue = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacityValue * 0.2})`; // fluid cyan lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse
        if (mouse.x != null) {
            let dx = particles[a].x - mouse.x;
            let dy = particles[a].y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy); 
            if (distance < mouse.radius) {
                let opacityValue = 1 - (distance / mouse.radius);
                ctx.strokeStyle = `rgba(34, 211, 238, ${opacityValue * 0.4})`; // Stronger connection to user
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i]);
        drawParticle(particles[i]);
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    handleResize(); // Init
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{ opacity: 0.6 }} // Adjust overall opacity so it's subtle
    />
  );
};

export default NeuralNetwork;
