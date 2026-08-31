import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, LayoutGrid, Terminal, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import TiltCard from '../components/ui/TiltCard';
import { processSteps } from '../data/process';

const iconMap = {
  Lightbulb: Lightbulb,
  LayoutGrid: LayoutGrid,
  Terminal: Terminal,
  Sparkles: Sparkles
};

export default function CreativeProcessSection({ onSoundHover }) {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="METHODOLOGY // LIFECYCLE"
          title="HOW I BUILD"
          subtitle="From mental concept to intelligent 3D interactive deployment."
          align="center"
        />

        {/* 4-Step Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => {
            const IconComp = iconMap[step.icon] || Sparkles;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="relative"
              >
                <TiltCard
                  onHoverSound={onSoundHover}
                  className="p-6 sm:p-7 h-full flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Step Number & Badge */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-3xl font-extrabold font-space text-[#00FF66] tracking-tighter shadow-[0_0_15px_rgba(0,255,102,0.3)]">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#080808] border border-white/10 group-hover:border-[#00FF66] flex items-center justify-center text-white group-hover:text-[#00FF66] transition-all">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-space text-white group-hover:text-[#00FF66] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs font-mono text-[#00FF66] mt-0.5 mb-2">
                        {step.subtitle}
                      </p>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step Tag */}
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                    <span>STAGE {step.step}</span>
                    <span className="text-[#00FF66]">{step.tag}</span>
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
