import React, { useEffect, useRef } from 'react';

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
    const lineColor = 'rgba(6, 182, 212, 0.15)'; // cyan-500 with low opacity
    const particleCount = Math.min(window.innerWidth * window.innerHeight / 15000, 100); // Responsive count
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

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                // Gently attract to mouse or push away? Let's connect primarily.
                // But maybe a slight push to create "swirl" or "avoidance" is cool.
                // Let's doing a slight attraction for "networking".
                 const forceDirectionX = dx / distance;
                 const forceDirectionY = dy / distance;
                 const force = (mouse.radius - distance) / mouse.radius;
                 const directionX = forceDirectionX * force * 0.05;
                 const directionY = forceDirectionY * force * 0.05;
                 
                 this.vx += directionX;
                 this.vy += directionY;
            }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      // Recalculate count on resize
      const count = Math.min(canvas.width * canvas.height / 15000, 100);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
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
        particles[i].update();
        particles[i].draw();
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
