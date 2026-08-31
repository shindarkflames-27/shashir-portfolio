import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/common/SectionHeading';
import FloatingTechConstellation from '../components/3d/FloatingTechConstellation';
import { techStackData } from '../data/techStack';

export default function TechConstellationSection() {
  return (
    <section id="tech-constellation" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00FF66]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SYNAPSE // ORBITS"
          title="TECH I EXPLORE"
          subtitle="A live 3D orbital constellation of technologies, libraries, and AI workflows I build with."
          align="center"
        />

        {/* 3D Constellation Canvas Wrapper */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0D0D0D] border border-white/10 p-1 sm:p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="w-full aspect-[4/3] sm:aspect-[21/9] min-h-[320px] sm:min-h-[500px]">
            <FloatingTechConstellation />
          </div>

          {/* Interactive Instructions Overlay */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
            <div className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/70">
              <span className="text-[#00FF66]">●</span> <span className="hidden sm:inline">DRAG TO ROTATE // HOVER NODES FOR DETAILS</span><span className="sm:hidden">DRAG & TAP NODES</span>
            </div>
          </div>
        </div>

        {/* Tech Chips Grid Breakdown */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techStackData.map((tech) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-3 rounded-xl bg-[#0D0D0D] border border-white/5 hover:border-[#00FF66]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full group-hover:shadow-[0_0_8px_#00FF66] transition-shadow"
                  style={{ backgroundColor: tech.color || '#00FF66' }}
                />
                <span className="text-xs font-mono font-bold text-white group-hover:text-[#00FF66] transition-colors">
                  {tech.name}
                </span>
              </div>
              <p className="text-[10px] text-white/50">{tech.category}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
