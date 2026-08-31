import React from 'react';
import { Mail, ArrowUp, Terminal } from 'lucide-react';
import GithubIcon from '../components/common/GithubIcon';
import { personalInfo } from '../data/personal';

export default function FooterSection({ onSoundClick }) {
  const scrollToTop = () => {
    if (onSoundClick) onSoundClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0D0D0D] border border-[#00FF66]/30 flex items-center justify-center">
                <span className="font-mono font-bold text-xs text-[#00FF66]">SM</span>
              </div>
              <h4 className="text-xl font-bold font-space text-white">
                {personalInfo.name}
              </h4>
            </div>

            <p className="text-xs font-mono text-[#00FF66] tracking-wider uppercase">
              AI & ML • UI/UX • PROMPT ENGINEERING • VIBE CODING • MOTION WEB
            </p>

            <p className="text-xs text-[#A0A0A0] max-w-md leading-relaxed">
              {personalInfo.mainStatement}
            </p>
          </div>

          {/* Direct Verified Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono text-white/50 tracking-wider">VERIFIED CHANNELS</p>
            <div className="space-y-2">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-interactive="true"
                className="flex items-center gap-2 text-xs font-mono text-white/80 hover:text-[#00FF66] transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[#00FF66]" />
                <span>github.com/{personalInfo.githubUsername}</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                data-interactive="true"
                className="flex items-center gap-2 text-xs font-mono text-white/80 hover:text-[#00FF66] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00FF66]" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Back to Top */}
          <div className="md:col-span-3 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              data-interactive="true"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D0D0D] border border-white/10 hover:border-[#00FF66] text-xs font-mono text-white/80 hover:text-[#00FF66] transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <p>
            "{personalInfo.footerPhrase}"
          </p>
          <p>
            &copy; {personalInfo.copyrightYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
