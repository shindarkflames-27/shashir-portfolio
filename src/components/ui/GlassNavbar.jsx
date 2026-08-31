import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import SoundToggle from './SoundToggle';
import { personalInfo } from '../../data/personal';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CERTIFICATES', href: '#certificates' },
  { label: 'GITHUB', href: '#github' },
  { label: 'CONTACT', href: '#contact' },
];

export default function GlassNavbar({ isMuted, onToggleSound, onNavSound }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section Spy
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    if (onNavSound) onNavSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Live Status */}
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0D0D0D] border border-[#00FF66]/30 flex items-center justify-center group-hover:border-[#00FF66] group-hover:shadow-[0_0_15px_rgba(0,255,102,0.4)] transition-all">
                <span className="font-mono font-bold text-xs text-[#00FF66]">SM</span>
              </div>
              <span className="font-space font-bold tracking-tight text-white group-hover:text-[#00FF66] transition-colors text-sm sm:text-base">
                SHASHIR MOULI
              </span>
            </a>

            {/* Status Pulse Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0D0D0D] border border-white/5 text-[11px] font-mono text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]" />
              <span className="text-[#00FF66] font-medium tracking-wide">AVAILABLE TO BUILD</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#0D0D0D]/70 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  data-interactive="true"
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-space tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-black font-semibold bg-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.5)]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Utilities: Sound Toggle & CTA */}
          <div className="flex items-center gap-3">
            <SoundToggle isMuted={isMuted} onToggle={onToggleSound} />

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              data-interactive="true"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00FF66]/10 hover:bg-[#00FF66] text-[#00FF66] hover:text-black border border-[#00FF66]/40 hover:border-[#00FF66] text-xs font-space font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0D0D0D] border border-white/10 md:hidden text-white hover:border-[#00FF66]/50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-3xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-[#00FF66]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] md:hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                <span className="text-xs font-mono text-[#00FF66]">AVAILABLE TO BUILD</span>
              </div>

              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-space font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'bg-[#00FF66] text-black font-semibold'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-center text-xs font-mono text-white/60">
                <span>{personalInfo.institution}</span>
                <span>{personalInfo.branch}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
