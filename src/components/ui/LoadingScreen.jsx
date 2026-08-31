import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 300);
          setTimeout(() => onLoadingComplete(), 800);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + diff, 100);
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white px-4 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cyber grid background */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#00FF66]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
            {/* System Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D0D] border border-[#00FF66]/20 text-[10px] font-mono text-[#00FF66] mb-6 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span>INITIALIZING SYSTEM CORE</span>
            </motion.div>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 font-space"
            >
              SHASHIR MOULI
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-[#A0A0A0] uppercase mb-8"
            >
              AI <span className="text-[#00FF66]">×</span> CODE <span className="text-[#00FF66]">×</span> DESIGN <span className="text-[#00FF66]">×</span> MOTION
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-xs space-y-2">
              <div className="h-1 w-full bg-[#1A1A1A] rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00CC55] to-[#00FF66] rounded-full shadow-[0_0_12px_#00FF66]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#A0A0A0]">
                <span>LOADING ASSETS</span>
                <span className="text-[#00FF66] font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
