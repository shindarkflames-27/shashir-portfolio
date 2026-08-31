import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, ExternalLink, Code2, RefreshCw } from 'lucide-react';
import GithubIcon from '../components/common/GithubIcon';
import { SectionHeading } from '../components/common/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import TiltCard from '../components/ui/TiltCard';
import { personalInfo } from '../data/personal';

export default function GithubSection({ onSoundHover, onSoundClick }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        setIsLoading(true);
        // Fetch User Info
        const userRes = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}`);
        if (!userRes.ok) throw new Error('GitHub API rate limited or unavailable');
        const userData = await userRes.json();

        // Fetch Repositories
        const reposRes = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}/repos?sort=updated&per_page=6`);
        if (!reposRes.ok) throw new Error('Repos unavailable');
        const reposData = await reposRes.json();

        if (isMounted) {
          setProfile(userData);
          setRepos(Array.isArray(reposData) ? reposData : []);
          setFetchError(false);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OPEN SOURCE // TERMINAL"
          title="CODE & EXPERIMENTS"
          subtitle="Explore public repositories, code commits, and open-source contributions directly on GitHub."
          align="center"
        />

        {/* GitHub Terminal Showcase Box */}
        <div className="rounded-3xl bg-[#0D0D0D] border border-white/10 p-6 sm:p-8 space-y-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#050505] border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.2)]">
                <GithubIcon className="w-8 h-8 text-[#00FF66]" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-space text-white flex items-center gap-2">
                  @{personalInfo.githubUsername}
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                </h3>
                <p className="text-xs font-mono text-[#A0A0A0]">
                  Official GitHub Repository & Workspace
                </p>
              </div>
            </div>

            <MagneticButton
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              onHoverSound={onSoundHover}
              className="text-xs py-2.5"
            >
              <span>VIEW MY GITHUB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Repositories Display */}
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-[#00FF66] animate-spin" />
              <p className="text-xs font-mono text-white/60">CONNECTING TO GITHUB API...</p>
            </div>
          ) : fetchError || repos.length === 0 ? (
            /* Clean Authentic Fallback State (No fabricated stats) */
            <div className="p-8 rounded-2xl bg-[#050505] border border-white/5 text-center space-y-4">
              <BookOpen className="w-8 h-8 mx-auto text-[#00FF66]" />
              <h4 className="text-base font-bold text-white font-space">
                Repositories Available on GitHub
              </h4>
              <p className="text-xs text-[#A0A0A0] max-w-md mx-auto leading-relaxed">
                Connect directly to explore repositories, active commits, and experimental AI branches on GitHub.
              </p>
              <div className="pt-2">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive="true"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 text-xs font-mono font-bold hover:bg-[#00FF66] hover:text-black transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>https://github.com/{personalInfo.githubUsername}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Live Real Repositories Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive="true"
                  className="p-5 rounded-2xl bg-[#050505] border border-white/10 hover:border-[#00FF66]/60 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <BookOpen className="w-4 h-4 text-[#00FF66]" />
                      <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00FF66] transition-colors" />
                    </div>
                    <h5 className="text-sm font-bold font-space text-white group-hover:text-[#00FF66] transition-colors line-clamp-1">
                      {repo.name}
                    </h5>
                    <p className="text-xs text-[#A0A0A0] line-clamp-2 leading-relaxed">
                      {repo.description || "Public exploration repository."}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span className="text-[#00FF66]">{repo.language || "Code"}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#00FF66]" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
