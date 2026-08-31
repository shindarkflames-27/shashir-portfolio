import React from 'react';
import { motion } from 'framer-motion';

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center', // 'left' | 'center'
  className = ''
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignClass} mb-12 sm:mb-16 ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D0D] border border-[#00FF66]/30 text-[11px] font-mono text-[#00FF66] mb-4 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-space tracking-tight text-white uppercase"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-[#A0A0A0] max-w-2xl font-sans"
        >
          {subtitle}
        </motion.p>
      )}

      <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent" />
    </div>
  );
}

export function GlowingBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-xs font-mono font-semibold text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.2)] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
      {children}
    </span>
  );
}
