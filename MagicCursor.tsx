import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
}

const MagicCursor: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-2 h-2 bg-pink-400 rounded-full blur-[1px]"
            style={{
              left: p.x,
              top: p.y,
              boxShadow: '0 0 10px #ff00de, 0 0 20px #ff00de',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MagicCursor;
