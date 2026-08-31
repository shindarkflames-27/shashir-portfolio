import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function CustomCursor() {
  const { x, y, isHoveringInteractive, isHovering3D } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#00FF66] shadow-[0_0_10px_#00FF66] -translate-x-1/2 -translate-y-1/2"
        animate={{
          x,
          y,
          scale: isHoveringInteractive ? 0.4 : isHovering3D ? 0 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.2 }}
      />

      {/* Trailing Ring / Reticle */}
      <motion.div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200 ${
          isHovering3D
            ? 'w-10 h-10 border border-dashed border-[#00FF66] rounded-full'
            : isHoveringInteractive
            ? 'w-12 h-12 border-2 border-[#00FF66] bg-[#00FF66]/10 rounded-full shadow-[0_0_20px_rgba(0,255,102,0.3)]'
            : 'w-8 h-8 border border-white/30 rounded-full'
        }`}
        animate={{
          x,
          y,
          rotate: isHovering3D ? 90 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        {isHovering3D && (
          <div className="w-2 h-2 text-[#00FF66] flex items-center justify-center text-[10px] font-mono">
            +
          </div>
        )}
      </motion.div>
    </div>
  );
}
