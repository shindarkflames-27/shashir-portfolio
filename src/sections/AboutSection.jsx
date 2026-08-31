import React from 'react';
import { motion } from 'framer-motion';
import { Binary, Layout, Cpu, Globe, Sparkles, GraduationCap, ShieldAlert } from 'lucide-react';
import { SectionHeading, GlowingBadge } from '../components/common/SectionHeading';
import TiltCard from '../components/ui/TiltCard';
import { personalInfo } from '../data/personal';
import { aboutStats } from '../data/stats';

const iconMap = {
  Binary: Binary,
  Layout: Layout,
  Cpu: Cpu,
  Globe: Globe,
};

export default function AboutSection({ onSoundHover }) {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="IDENTITY // MATRIX"
          title="WHO AM I?"
          subtitle="Combining machine intelligence with creative frontend craft."
          align="center"
        />

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Digital Lab Visualization / Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#00FF66]/40 via-white/5 to-transparent shadow-[0_0_40px_rgba(0,255,102,0.1)]">
              <div className="rounded-[22px] bg-[#0D0D0D] p-6 sm:p-8 space-y-6 relative overflow-hidden">
                
                {/* Visualizer header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-ping" />
                    <span className="text-xs font-mono text-white/90 font-bold uppercase tracking-wider">
                      STUDENT RESEARCH NODE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded">
                    ACADEMIC
                  </span>
                </div>

                {/* Academic Profile Snapshot */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#050505] border border-white/5 space-y-2">
                    <div className="flex items-center gap-2 text-[#00FF66]">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-xs font-mono font-semibold">EDUCATION</span>
                    </div>
                    <p className="text-sm font-bold text-white">{personalInfo.education}</p>
                    <p className="text-xs text-white/70">{personalInfo.institution}</p>
                    <p className="text-xs text-[#00FF66] font-mono">{personalInfo.branch}</p>
                  </div>
                </div>

                {/* Digital scan radar simulation */}
                <div className="relative h-28 rounded-xl bg-black/60 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-[#00FF66] shadow-[0_0_10px_#00FF66] scanline opacity-75" />
                  <div className="flex justify-between text-[10px] font-mono text-white/50">
                    <span>SYS.AI_EXPLORATION</span>
                    <span className="text-[#00FF66]">ACTIVE</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="text-white/80 flex justify-between">
                      <span>Neural Prototyping</span>
                      <span className="text-[#00FF66]">Continuous</span>
                    </div>
                    <div className="text-white/80 flex justify-between">
                      <span>Creative Motion</span>
                      <span className="text-[#00FF66]">60 FPS</span>
                    </div>
                  </div>
                </div>

                {/* Highlight Quote Pill */}
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 text-center">
                    <span className="text-xs font-mono font-bold text-[#00FF66] tracking-widest">
                      {personalInfo.highlightBadge}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Statements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-base sm:text-lg text-[#E0E0E0] leading-relaxed">
              <p className="text-xl sm:text-2xl font-bold font-space text-white">
                "I'm <span className="text-[#00FF66]">Shashir Mouli</span>, an AI & ML student at GIOE, Secunderabad. I enjoy turning ideas into interactive digital experiences by combining AI, design, code, and motion."
              </p>
              
              <p className="text-sm sm:text-base text-[#A0A0A0]">
                I'm constantly experimenting with AI-assisted development, prompt engineering, UI/UX, vibe coding, creative coding, and immersive web experiences.
              </p>

              <p className="text-sm sm:text-base text-[#A0A0A0]">
                Rather than treating web development as static code, I see the browser as a canvas for motion design and intelligent interaction. Every interface is an opportunity to explore how algorithms and aesthetics can harmonize.
              </p>
            </div>

            {/* Core Pillars Mini List */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Prompt Crafting",
                "Neural Models",
                "3D Interaction",
                "Vibe Coding",
                "UI/UX Design",
                "Motion Physics"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0D0D0D] border border-white/5 text-xs font-mono text-white/80 hover:border-[#00FF66]/40 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Authentic Academic & Exploration Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {aboutStats.map((stat, idx) => {
            const IconComponent = iconMap[stat.icon] || Sparkles;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard onHoverSound={onSoundHover} className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-black border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-[#00FF66] uppercase px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                        {stat.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-space text-white mb-1">
                        {stat.title}
                      </h3>
                      <p className="text-xs font-mono text-[#00FF66] mb-2">
                        {stat.subtitle}
                      </p>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
