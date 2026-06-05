import React, { useEffect, useRef } from 'react';

const SakuraTree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pinkBlossoms = ['#ffb7c5', '#ff91a4', '#ffc0cb'];
    const blueBlossoms = ['#00d2ff', '#4fc3f7', '#81d4fa'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

      const drawBranch = (
      startX: number,
      startY: number,
      targetLen: number,
      angle: number,
      branchWidth: number,
      depth: number
    ) => {
      if (depth < 0) return;

      let currentLen = 0;
      
      const animateGrowth = () => {
        if (currentLen >= targetLen) {
          // Calculate end point of the branch
          const endX = startX + Math.sin(angle * Math.PI / 180) * -targetLen;
          const endY = startY + Math.cos(angle * Math.PI / 180) * -targetLen;

          // Minimal blossoms at the tips
          if (depth < 3) {
            const numSprouts = depth === 0 ? 3 : 1; // REDUCED
            for (let i = 0; i < numSprouts; i++) {
              const petalX = Math.random() * 15 - 7.5;
              const petalY = (Math.random() * 15 - 7.5);
              const size = Math.random() * 2 + 1.5;
              const isBlue = Math.random() > 0.85; 
              
              ctx.beginPath();
              ctx.save();
              ctx.translate(endX, endY);
              ctx.arc(petalX, petalY, size, 0, Math.PI * 2);
              const color = isBlue 
                ? blueBlossoms[Math.floor(Math.random() * blueBlossoms.length)]
                : pinkBlossoms[Math.floor(Math.random() * pinkBlossoms.length)];
              
              ctx.fillStyle = color;
              ctx.shadowBlur = 8;
              ctx.shadowColor = color;
              ctx.fill();
              ctx.restore();
            }
          }

          if (depth > 0) {
            // Calculate angles for natural "upward" growth (spread out, not random)
            // Angle 0 is straight up. We want branches to mostly spread left and right and up.
            const spreadRange = depth > 6 ? 30 : 60; 
            const subBranches = depth > 6 ? 2 : 2;
            
            for (let i = 0; i < subBranches; i++) {
              // Bias: positive spread to the right, negative to the left
              const bias = i === 0 ? -1 : 1;
              const naturalAngle = angle + (bias * (Math.random() * spreadRange + 10));
              const nextLen = targetLen * (0.7 + Math.random() * 0.2);
              
              setTimeout(() => {
                drawBranch(
                  endX,
                  endY,
                  nextLen,
                  naturalAngle,
                  branchWidth * 0.75,
                  depth - 1
                );
              }, 100 + depth * 20);
            }
          }
          return;
        }

        const step = 3;
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = '#1a0f08';
        ctx.lineWidth = branchWidth;
        ctx.lineCap = 'round';
        
        const segmentStartX = startX + Math.sin(angle * Math.PI / 180) * -currentLen;
        const segmentStartY = startY + Math.cos(angle * Math.PI / 180) * -currentLen;
        
        currentLen += step;
        
        const segmentEndX = startX + Math.sin(angle * Math.PI / 180) * -currentLen;
        const segmentEndY = startY + Math.cos(angle * Math.PI / 180) * -currentLen;

        ctx.moveTo(segmentStartX, segmentStartY);
        ctx.lineTo(segmentEndX, segmentEndY);
        ctx.stroke();
        ctx.restore();

        requestAnimationFrame(animateGrowth);
      };

      animateGrowth();
    };

    const startTree = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = canvas.width / 2;
      const startY = canvas.height - 20;
      const heightFactor = canvas.height < 600 ? 0.6 : 0.9;
      
      // Main Trunk going straight up
      drawBranch(startX, startY, 180 * heightFactor, 0, 20, 10);
      
      // A smaller branch from the lower part of the trunk (like the reference image)
      setTimeout(() => {
        drawBranch(startX, startY - (100 * heightFactor), 60 * heightFactor, -45, 8, 5);
      }, 1000);
    };

    const timeoutId = setTimeout(startTree, 1000);

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};

export default SakuraTree;
