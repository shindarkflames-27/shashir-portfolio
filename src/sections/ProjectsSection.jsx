import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Sparkles, FolderGit2 } from 'lucide-react';
import GithubIcon from '../components/common/GithubIcon';
import { SectionHeading } from '../components/common/SectionHeading';
import TiltCard from '../components/ui/TiltCard';
import { projectsData, projectFilterCategories } from '../data/projects';
import { personalInfo } from '../data/personal';

export default function ProjectsSection({ onSoundHover, onSoundClick }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PORTFOLIO // LAB"
          title="THINGS I'VE BUILT"
          subtitle="Explore live deployed web applications, AI workflows, and interactive software experiments."
          align="center"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {projectFilterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (onSoundClick) onSoundClick();
                setActiveFilter(cat);
              }}
              data-interactive="true"
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#00FF66] text-black font-bold shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                  : 'bg-[#0D0D0D] text-white/70 hover:text-white border border-white/10 hover:border-[#00FF66]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TiltCard
                  glowColor={project.glowAccent}
                  onHoverSound={onSoundHover}
                  className="group flex flex-col justify-between h-full p-6 sm:p-7"
                >
                  <div className="space-y-5">
                    {/* Project Preview Image */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-interactive="true"
                      className="block relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#050505] border border-white/10 group-hover:border-[#00FF66]/40 transition-colors cursor-pointer"
                    >
                      <img
                        src={project.previewImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#00FF66]/40 text-[10px] font-mono text-[#00FF66]">
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-md bg-black/90 text-[10px] font-mono text-[#00FF66] border border-[#00FF66]/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                          {project.status}
                        </span>
                      </div>
                    </a>

                    {/* Content */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl font-bold font-space text-white group-hover:text-[#00FF66] transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs font-mono text-[#00FF66] mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-[#050505] border border-white/10 text-[11px] font-mono text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <a
                      href={project.githubUrl || personalInfo.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-interactive="true"
                      className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[#00FF66] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4 text-[#00FF66]" />
                      <span>SOURCE</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-interactive="true"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00FF66]/10 hover:bg-[#00FF66] text-[#00FF66] hover:text-black border border-[#00FF66]/30 text-xs font-space font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    >
                      <span>LIVE PREVIEW</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
