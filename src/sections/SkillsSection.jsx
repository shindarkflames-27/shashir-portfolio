import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Sparkles, Activity, Binary, Palette, Box } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import TiltCard from '../components/ui/TiltCard';
import { skillsData } from '../data/skills';

const iconComponents = {
  Layout: Layout,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Activity: Activity,
  Binary: Binary,
  Palette: Palette,
  Box: Box,
};

export default function SkillsSection({ onSoundHover }) {
  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Ambient Grid */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CAPABILITIES // ARSENAL"
          title="WHAT I DO"
          subtitle="Interactive 3D skill modules engineered for intelligent web experiences."
          align="center"
        />

        {/* 3D Interactive Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => {
            const IconComp = iconComponents[skill.icon] || Sparkles;
            const isLarge = index === 0; // First item featured

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={isLarge ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <TiltCard
                  glowColor={skill.glowColor}
                  onHoverSound={onSoundHover}
                  className="p-6 sm:p-7 h-full flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    {/* Top Row: Index & Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-white/10 group-hover:border-[#00FF66] flex items-center justify-center text-white group-hover:text-[#00FF66] group-hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all duration-300">
                        <IconComp className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#00FF66] px-2.5 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30">
                          {skill.category}
                        </span>
                        <span className="text-xs font-mono text-white/30 font-bold">
                          {skill.index}
                        </span>
                      </div>
                    </div>

                    {/* Skill Info */}
                    <div>
                      <h3 className="text-xl font-bold font-space text-white group-hover:text-[#00FF66] transition-colors mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Tags List */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-white/70 group-hover:text-white/90 group-hover:border-white/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Micro Edge Highlight on Hover */}
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-[#00FF66] transition-colors">
                    <span>MODULE_ACTIVE</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      EXPLORE PARADIGM &rarr;
                    </span>
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
