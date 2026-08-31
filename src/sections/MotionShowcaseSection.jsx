import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Move3d, MousePointer2, RefreshCw, Zap } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import TiltCard from '../components/ui/TiltCard';

const textPhrases = [
  "AI × CODE × DESIGN × MOTION",
  "THE BROWSER IS A 3D CANVAS",
  "EXPERIMENTING WITH VIBE CODING",
  "PHYSICS-DRIVEN KINETIC EXPERIENCES",
  "CURIOUS. CREATIVE. ALWAYS BUILDING."
];

export default function MotionShowcaseSection({ onSoundHover, onSoundClick }) {
  const [currentTextIdx, setCurrentTextIdx] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [displayText, setDisplayText] = useState(textPhrases[0]);

  const triggerTextScramble = () => {
    if (isScrambling) return;
    if (onSoundClick) onSoundClick();
    setIsScrambling(true);

    const nextIdx = (currentTextIdx + 1) % textPhrases.length;
    setCurrentTextIdx(nextIdx);
    const target = textPhrases[nextIdx];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]";
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, 25);
  };

  const triggerGreenBurst = (e) => {
    if (onSoundClick) onSoundClick();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#00FF66', '#00CC55', '#FFFFFF', '#050505'],
      shapes: ['circle', 'square'],
      scalar: 0.9,
    });
  };

  return (
    <section id="motion" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="KINETIC // PLAYGROUND"
          title="I LIKE MAKING THE WEB MOVE."
          subtitle="Don't just observe motion design — interact with the physics, springs, and kinetic generators below."
          align="center"
        />

        {/* Interactive Motion Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Module 1: Kinetic Text Decryptor */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#00FF66] font-mono text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>01 // AI TEXT DECRYPTION MATRIX</span>
                </div>
                <span className="text-[10px] font-mono text-white/40">INTERACTIVE</span>
              </div>
              <p className="text-xs text-[#A0A0A0] mb-4">
                Click the trigger to cycle procedural decryption algorithms with kinetic letter morphing.
              </p>
              
              <div className="p-5 rounded-2xl bg-[#050505] border border-[#00FF66]/30 min-h-[90px] flex items-center justify-center text-center shadow-[0_0_20px_rgba(0,255,102,0.1)]">
                <p className="font-space font-extrabold text-sm sm:text-base md:text-lg tracking-wider text-[#00FF66]">
                  {displayText}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <MagneticButton
                variant="primary"
                onClick={triggerTextScramble}
                onHoverSound={onSoundHover}
                className="text-xs py-2.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScrambling ? 'animate-spin' : ''}`} />
                <span>SCRAMBLE & REVEAL</span>
              </MagneticButton>
            </div>
          </div>

          {/* Module 2: Particle Energy Shockwave */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#00FF66] font-mono text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>02 // PARTICLE SHOCKWAVE DISPERSION</span>
                </div>
                <span className="text-[10px] font-mono text-white/40">PHYSICS BURST</span>
              </div>
              <p className="text-xs text-[#A0A0A0] mb-4">
                Synthesize real-time physics particle collisions and electric green photon dispersion.
              </p>

              <div className="p-5 rounded-2xl bg-[#050505] border border-white/10 min-h-[90px] flex flex-col items-center justify-center text-center">
                <p className="text-xs font-mono text-white/70">
                  Target coordinate: pointer velocity × dispersion density
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <MagneticButton
                variant="secondary"
                onClick={triggerGreenBurst}
                onHoverSound={onSoundHover}
                className="text-xs py-2.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>TRIGGER ENERGY BURST</span>
              </MagneticButton>
            </div>
          </div>

          {/* Module 3: 3D Spatial Gyro Card */}
          <div className="md:col-span-2">
            <TiltCard
              tiltIntensity={16}
              onHoverSound={onSoundHover}
              className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-lg">
                <div className="flex items-center gap-2 text-[#00FF66] font-mono text-xs font-bold">
                  <Move3d className="w-4 h-4" />
                  <span>03 // MULTI-LAYER 3D PARALLAX COORDINATES</span>
                </div>
                <h3 className="text-2xl font-bold font-space text-white">
                  Cursor-tracked perspective depth
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  Move your mouse across this module to experience smooth mathematical 3D quaternion rotation, custom dynamic lighting, and depth layering.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#050505] border border-[#00FF66]/40 text-center font-mono text-xs text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.2)]">
                <MousePointer2 className="w-6 h-6 mx-auto mb-2 text-[#00FF66] animate-bounce" />
                <span>SPATIAL GYRO: ACTIVE</span>
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
