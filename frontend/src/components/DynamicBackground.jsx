import React, { useEffect, useRef } from 'react';

const DynamicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 3 + 1;
        this.size = this.baseSize;
        this.baseSpeedX = (Math.random() - 0.5) * 0.8;
        this.baseSpeedY = (Math.random() - 0.5) * 0.8;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.hue = Math.random() * 60 + 200; // Blue to purple range
        this.density = Math.random() * 30 + 1;
      }

      update() {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.speedX -= force * Math.cos(angle) * 0.1;
            this.speedY -= force * Math.sin(angle) * 0.1;
            this.size = this.baseSize * (1 + force);
          } else {
            if (this.size > this.baseSize) {
              this.size -= 0.1;
            }
            this.speedX = this.speedX * 0.98 + this.baseSpeedX * 0.02;
            this.speedY = this.speedY * 0.98 + this.baseSpeedY * 0.02;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width) {
          this.x = canvas.width;
          this.speedX *= -1;
        }
        if (this.x < 0) {
          this.x = 0;
          this.speedX *= -1;
        }
        if (this.y > canvas.height) {
          this.y = canvas.height;
          this.speedY *= -1;
        }
        if (this.y < 0) {
          this.y = 0;
          this.speedY *= -1;
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, 0.8)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 70%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleDensity = window.innerWidth < 768 ? 20000 : 15000; // Adjust for mobile
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / particleDensity);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 31, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      mouse.x = event.touches[0].clientX;
      mouse.y = event.touches[0].clientY;
    };

    const handleLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resizeCanvas();
    init();
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('mouseleave', handleLeave);
    canvas.addEventListener('touchend', handleLeave);
    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleLeave);
      canvas.removeEventListener('touchend', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'linear-gradient(to bottom, #0A0A1F, #1A1A3F)',
        touchAction: 'none'
      }}
    />
  );
};

export default DynamicBackground;