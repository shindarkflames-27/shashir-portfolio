import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(0, 255, 102, 0.4)',
  tiltIntensity = 12,
  onHoverSound
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const normalizedX = (x / width) - 0.5;
    const normalizedY = (y / height) - 0.5;

    setRotateX(-normalizedY * tiltIntensity);
    setRotateY(normalizedX * tiltIntensity);
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    if (onHoverSound) onHoverSound();
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-interactive="true"
      style={isTouchDevice ? {} : {
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={isTouchDevice ? {} : {
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
      className={`relative rounded-2xl bg-[#0D0D0D] border border-white/10 hover:border-[#00FF66]/50 transition-colors duration-300 overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Follow Glow (Desktop only) */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
          }}
        />
      )}

      {/* Cyber Grid Border Flare */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

      {/* Child Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
