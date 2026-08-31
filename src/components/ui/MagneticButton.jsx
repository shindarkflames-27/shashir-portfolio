import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  onClick,
  href,
  target,
  rel,
  onHoverSound
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    if (onHoverSound) onHoverSound();
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-[#00FF66] text-black font-semibold hover:bg-[#00CC55] active:bg-[#00CC55] shadow-[0_0_20px_rgba(0,255,102,0.35)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] border border-[#00FF66]',
    secondary:
      'bg-transparent text-white font-medium hover:bg-white/5 active:bg-white/10 border border-[#00FF66]/40 hover:border-[#00FF66] hover:shadow-[0_0_20px_rgba(0,255,102,0.25)]',
    ghost:
      'bg-[#0D0D0D] text-white hover:bg-[#151515] active:bg-[#1f1f1f] border border-white/10 hover:border-[#00FF66]/40'
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={isTouchDevice ? {} : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 15, mass: 0.1 }}
      data-interactive="true"
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-space tracking-wide transition-colors duration-200 cursor-pointer select-none touch-manipulation ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}
