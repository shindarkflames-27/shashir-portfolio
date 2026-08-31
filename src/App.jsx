import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import GlassNavbar from './components/ui/GlassNavbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import TechConstellationSection from './sections/TechConstellationSection';
import ImmersiveExperienceSection from './sections/ImmersiveExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import CertificatesSection from './sections/CertificatesSection';
import MotionShowcaseSection from './sections/MotionShowcaseSection';
import CreativeProcessSection from './sections/CreativeProcessSection';
import GithubSection from './sections/GithubSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import { useSoundEffects } from './hooks/useSoundEffects';

// Scroll progress bar at top of page
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[2px] bg-white/5 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#00CC55] to-[#00FF66] transition-none"
        style={{ width: `${progress}%`, boxShadow: '0 0 8px #00FF66' }}
      />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isMuted, toggleSound, playHover, playClick, playSuccess } = useSoundEffects();

  return (
    <>
      {/* Hide native cursor on desktop */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      <div
        className="relative min-h-screen text-white overflow-x-hidden"
        style={{ backgroundColor: '#050505' }}
      >
        {/* Cinematic Loading Intro */}
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

        {/* Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Futuristic Custom Cursor (desktop only) */}
        <CustomCursor />

        {/* Floating Glassmorphism Sticky Navbar */}
        <GlassNavbar
          isMuted={isMuted}
          onToggleSound={toggleSound}
          onNavSound={playClick}
        />

        {/* Main Content Layout */}
        <main>
          <HeroSection onSoundHover={playHover} onSoundClick={playClick} />
          <AboutSection onSoundHover={playHover} />
          <SkillsSection onSoundHover={playHover} />
          <TechConstellationSection />
          <ImmersiveExperienceSection />
          <ProjectsSection onSoundHover={playHover} onSoundClick={playClick} />
          <CertificatesSection onSoundHover={playHover} onSoundClick={playClick} />
          <MotionShowcaseSection onSoundHover={playHover} onSoundClick={playClick} />
          <CreativeProcessSection onSoundHover={playHover} />
          <GithubSection onSoundHover={playHover} onSoundClick={playClick} />
          <ContactSection
            onSoundHover={playHover}
            onSoundClick={playClick}
            onSoundSuccess={playSuccess}
          />
        </main>

        {/* Futuristic Footer */}
        <FooterSection onSoundClick={playClick} />
      </div>
    </>
  );
}
