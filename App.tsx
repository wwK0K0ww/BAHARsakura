import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import SakuraTree from './components/SakuraTree';
import FallingBlossoms from './components/FallingBlossoms';
import MagicCursor from './components/MagicCursor';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPopup) {
      const autoClose = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(autoClose);
    }
  }, [showPopup]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Subtle Glow behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Simple Stars background */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `1px`,
              height: `1px`,
            }}
          />
        ))}
      </div>

      {/* Falling petals at the very back */}
      <FallingBlossoms />

      {/* The Tree */}
      <SakuraTree />
      
      {/* Interactive Magic Cursor */}
      <MagicCursor />

      {/* The Pop-up */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-black/60 backdrop-blur-md border border-pink-500/30 rounded-2xl px-12 py-8 shadow-[0_0_50px_rgba(255,105,180,0.3)] relative pointer-events-auto"
              style={{ boxShadow: '0 0 40px rgba(255, 105, 180, 0.3), 0 0 20px rgba(0, 210, 255, 0.2)' }}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-pink-500/50 hover:text-pink-500 transition-colors"
              >
                <X size={18} />
              </button>
              
              <motion.h1
                className="text-4xl md:text-5xl font-['Great_Vibes'] text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-300 to-blue-400"
                initial={{ filter: 'blur(10px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{ textShadow: '0 0 30px rgba(255, 182, 197, 0.4)' }}
              >
                save your smile
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-3 text-[10px] tracking-[0.3em] uppercase text-pink-300/60 font-['Montserrat']"
              >
                just for you
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Re-grow button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8, duration: 2 }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-4"
      >
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-1.5 rounded-full border border-pink-500/10 text-pink-500/20 text-[10px] uppercase tracking-[0.3em] hover:text-pink-500/50 hover:border-pink-500/30 transition-all duration-700"
        >
          Re-grow
        </button>
        <Heart className="w-3 h-3 text-pink-500/20" />
      </motion.div>
    </div>
  );
}

export default App;
