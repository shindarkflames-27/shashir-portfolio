import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Mail } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import NeuralCoreScene from '../components/3d/NeuralCoreScene';
import ParticleCanvas from '../components/3d/ParticleCanvas';
import { personalInfo } from '../data/personal';
import { useIsMobile } from '../hooks/useIsMobile';

export default function HeroSection({ onSoundHover, onSoundClick }) {
  const { isMobile, isTouchDevice } = useIsMobile();

  const scrollToSection = (id) => {
    if (onSoundClick) onSoundClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]"
    >
      {/* Interactive Background Particle Layer */}
      <ParticleCanvas particleCount={35} />

      {/* Cyber Grid & Ambient Radial Lighting */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Identification Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0D] border border-[#00FF66]/30 text-xs font-mono text-white/90 shadow-[0_0_20px_rgba(0,255,102,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[#00FF66] font-semibold">{personalInfo.institution}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">{personalInfo.branch}</span>
            </motion.div>

            {/* Main Name Heading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-space leading-[1.05]">
                <span className="block text-white">SHASHIR</span>
                <span className="block text-gradient-green">MOULI</span>
              </h1>
            </motion.div>

            {/* Main Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-mono tracking-widest font-bold uppercase text-[#00FF66]"
            >
              <Terminal className="w-4 h-4 text-[#00FF66]" />
              <span>{personalInfo.tagline}</span>
            </motion.div>

            {/* Supporting Statements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                "{personalInfo.mainStatement}"
              </p>
              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                {personalInfo.supportingStatement}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <MagneticButton
                variant="primary"
                onClick={() => scrollToSection('projects')}
                onHoverSound={onSoundHover}
                className="group"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() => scrollToSection('contact')}
                onHoverSound={onSoundHover}
                className="group"
              >
                <Mail className="w-4 h-4 text-[#00FF66]" />
                <span>LET'S CONNECT</span>
              </MagneticButton>
            </motion.div>

            {/* Real Pillars Micro Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] font-mono text-[#A0A0A0]"
            >
              <span className="text-white/40">// FOCUS:</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/80">AI Models</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/80">3D Web</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/80">Vibe Coding</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/80">Motion Design</span>
            </motion.div>
          </div>

          {/* Right Column: 3D AI Neural Core Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 flex items-center justify-center relative"
          >
            {/* Outer Glow Halo */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,102,0.08) 0%, transparent 70%)' }}
            />

            {/* Premium Border Box Wrapper */}
            <div
              className="w-full aspect-square relative rounded-2xl"
              style={{
                maxWidth: isMobile ? '300px' : '540px',
                border: '1px solid rgba(0, 255, 102, 0.3)',
                boxShadow: '0 0 0 1px rgba(0,255,102,0.08), 0 0 30px rgba(0,255,102,0.12), inset 0 0 30px rgba(0,255,102,0.04)',
                background: 'rgba(5,5,5,0.6)',
              }}
            >
              {/* ── Corner Accents ─────────────────── */}
              <span className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" style={{ borderTop: '2px solid #00FF66', borderLeft: '2px solid #00FF66', borderRadius: '6px 0 0 0' }} />
              <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" style={{ borderTop: '2px solid #00FF66', borderRight: '2px solid #00FF66', borderRadius: '0 6px 0 0' }} />
              <span className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" style={{ borderBottom: '2px solid #00FF66', borderLeft: '2px solid #00FF66', borderRadius: '0 0 0 6px' }} />
              <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" style={{ borderBottom: '2px solid #00FF66', borderRight: '2px solid #00FF66', borderRadius: '0 0 6px 0' }} />

              {/* ── Top HUD Bar ────────────────────── */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,255,102,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" style={{ boxShadow: '0 0 6px #00FF66' }} />
                <span className="text-[8px] sm:text-[10px] font-mono text-white/70 tracking-widest whitespace-nowrap">
                  {isMobile ? 'NEURAL CORE' : 'NEURAL CORE // INTERACTIVE'}
                </span>
              </div>

              {/* ── Bottom HUD Bar ─────────────────── */}
              <div className="absolute bottom-2 left-3 right-3 z-20 pointer-events-none flex items-center justify-between">
                <span className="text-[8px] sm:text-[9px] font-mono text-[#00FF66]/60 tracking-wider">AI_SYS // v2.0</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-white/40 tracking-wider">
                  {isTouchDevice ? 'DRAG · PINCH' : 'DRAG TO ROTATE'}
                </span>
              </div>

              {/* ── Side Ruler Lines (desktop only) ─ */}
              {!isMobile && (
                <>
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-px rounded" style={{ width: i === 2 ? 10 : 5, background: 'rgba(0,255,102,0.4)' }} />
                    ))}
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-px rounded" style={{ width: i === 2 ? 10 : 5, background: 'rgba(0,255,102,0.4)' }} />
                    ))}
                  </div>
                </>
              )}

              {/* ── 3D Canvas ─────────────────────── */}
              <NeuralCoreScene />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[10px] font-mono tracking-widest text-[#A0A0A0] uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]"
          />
        </div>
      </motion.div>
    </section>
  );
}
