import React, { useEffect, useRef } from 'react';

const FallingBlossoms: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let particles: Particle[] = [];

    const pinkColors = ['#ffb7c5', '#ff91a4', '#ffc0cb', '#f8bbd0'];
    const blueColors = ['#00d2ff', '#3a7bd5', '#4fc3f7', '#81d4fa'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      isBlue: boolean;

      constructor(canvasWidth: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * -100;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 0.8 - 0.4; // Slower horizontal
        this.speedY = Math.random() * 0.5 + 0.3; // Much slower vertical
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1 - 0.5;
        this.isBlue = Math.random() > 0.85;
        this.color = this.isBlue 
          ? blueColors[Math.floor(Math.random() * blueColors.length)]
          : pinkColors[Math.floor(Math.random() * pinkColors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX + Math.sin(this.y / 50);
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.y > canvasHeight) {
          this.y = -20;
          this.x = Math.random() * canvasWidth;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate((this.rotation * Math.PI) / 180);
        
        context.beginPath();
        context.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
        context.fillStyle = this.color;
        
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        
        context.fill();
        context.restore();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 25; i++) {
        particles.push(new Particle(canvas.width));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrame = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default FallingBlossoms;
