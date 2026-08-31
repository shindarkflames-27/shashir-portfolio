import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Layers, Zap } from 'lucide-react';
import ImmersivePortalScene from '../components/3d/ImmersivePortalScene';

export default function ImmersiveExperienceSection() {
  return (
    <section className="relative min-h-screen py-24 sm:py-32 bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <ImmersivePortalScene />
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-dots opacity-15 pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        
        {/* Floating Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00FF66]/40 text-xs font-mono text-[#00FF66] mb-6 shadow-[0_0_25px_rgba(0,255,102,0.3)]"
        >
          <Zap className="w-3.5 h-3.5 text-[#00FF66] animate-pulse" />
          <span>IMMERSIVE DIGITAL MANIFESTO</span>
        </motion.div>

        {/* Cinematic Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold font-space tracking-tight text-white uppercase leading-tight"
        >
          THE WEB SHOULD <br />
          <span className="text-gradient-green text-electric-glow">FEEL ALIVE.</span>
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-[#A0A0A0] max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Static pages belong to the past. The future of the web is spatial, intelligent, and driven by fluid kinetic energy where every pixel responds to human curiosity.
        </motion.p>

        {/* Floating Holographic Snippet Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left pointer-events-auto">
          <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 hover:border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all">
            <div className="flex items-center gap-2 text-[#00FF66] mb-1 font-mono text-xs">
              <Terminal className="w-3.5 h-3.5" /> 01 // INTELLIGENCE
            </div>
            <p className="text-xs text-white/80">AI models & prompt workflows driving dynamic content generation.</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 hover:border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all">
            <div className="flex items-center gap-2 text-[#00FF66] mb-1 font-mono text-xs">
              <Layers className="w-3.5 h-3.5" /> 02 // SPATIAL DEPTH
            </div>
            <p className="text-xs text-white/80">Three.js WebGL geometry transforming 2D screens into 3D spaces.</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 hover:border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all">
            <div className="flex items-center gap-2 text-[#00FF66] mb-1 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" /> 03 // MOTION DESIGN
            </div>
            <p className="text-xs text-white/80">Physics-based kinetic animations crafting organic responsiveness.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
