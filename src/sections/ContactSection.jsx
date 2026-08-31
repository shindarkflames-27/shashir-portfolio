import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Copy, Check, Sparkles, ExternalLink, ArrowUpRight, MessageSquare } from 'lucide-react';
import GithubIcon from '../components/common/GithubIcon';
import { SectionHeading } from '../components/common/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import ParticleCanvas from '../components/3d/ParticleCanvas';
import { personalInfo } from '../data/personal';

export default function ContactSection({ onSoundHover, onSoundClick, onSoundSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleCopyEmail = () => {
    if (onSoundClick) onSoundClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Collaboration Inquiry from ${formData.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hi Shashir,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent via your portfolio website.`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const generateGmailUrl = () => {
    const subject = encodeURIComponent(`Collaboration Inquiry from ${formData.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hi Shashir,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent via your portfolio website.`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (onSoundClick) onSoundClick();
    setStatus('submitting');

    // Trigger user's mail client with pre-filled transmission
    const mailtoUrl = generateMailtoUrl();
    window.open(mailtoUrl, '_blank');

    setTimeout(() => {
      setStatus('success');
      if (onSoundSuccess) onSoundSuccess();
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Interactive Background Particle Canvas */}
      <ParticleCanvas particleCount={40} />

      {/* Cyber Grid & Ambient Lighting */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF66]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="TRANSMISSION // DIRECT"
          title="LET'S BUILD SOMETHING."
          subtitle="Have a project idea, AI experiment, or collaboration in mind? Reach out directly below."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Verified Channels */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div>
                <span className="text-[10px] font-mono text-[#00FF66] uppercase px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                  DIRECT CONTACT CHANNELS
                </span>
                <h3 className="text-xl font-bold font-space text-white mt-3 mb-2">
                  Drop a transmission
                </h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">
                  Whether you are discussing an AI prototype, WebGL/motion project, creative development sprint, or general inquiry — I'm active and open to connect.
                </p>
              </div>

              {/* Direct Primary Email Card */}
              <div className="p-4 rounded-2xl bg-[#050505] border border-[#00FF66]/30 space-y-3 shadow-[0_0_20px_rgba(0,255,102,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/50">PRIMARY EMAIL</span>
                  <button
                    onClick={handleCopyEmail}
                    data-interactive="true"
                    className="flex items-center gap-1 text-[11px] font-mono text-[#00FF66] hover:underline"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                        <span className="text-[#00FF66]">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  data-interactive="true"
                  className="block text-sm sm:text-base font-bold font-mono text-white hover:text-[#00FF66] transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Quick Connect Options */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-mono text-white/50 tracking-wider">INSTANT LINKS</p>
                
                {/* Gmail Web Quick Link */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=Project%20Collaboration`}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive="true"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-[#00FF66]/10 border border-white/5 hover:border-[#00FF66]/30 text-xs font-mono text-white/80 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#00FF66]" />
                    <span>Open in Gmail Web</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00FF66] transition-colors" />
                </a>

                {/* GitHub Quick Link */}
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive="true"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-[#00FF66]/10 border border-white/5 hover:border-[#00FF66]/30 text-xs font-mono text-white/80 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-[#00FF66]" />
                    <span>github.com/{personalInfo.githubUsername}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00FF66] transition-colors" />
                </a>
              </div>

              {/* Status Note */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-white/70">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                <span>Response time: ~24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Terminal Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00FF66]/20 border border-[#00FF66] flex items-center justify-center text-[#00FF66] shadow-[0_0_30px_rgba(0,255,102,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-space text-white">
                      TRANSMISSION READY
                    </h4>
                    <p className="text-xs text-[#A0A0A0] max-w-sm mx-auto leading-relaxed">
                      Your email message was prepared for <span className="text-[#00FF66] font-mono">{personalInfo.email}</span>. Click below if you want to dispatch via Gmail web or default mail app:
                    </p>
                  </div>

                  {/* Dispatch Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
                    <a
                      href={generateGmailUrl()}
                      target="_blank"
                      rel="noreferrer"
                      data-interactive="true"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00FF66] text-black font-space font-bold text-xs shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:bg-[#33ff85] transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>DISPATCH VIA GMAIL</span>
                    </a>
                    
                    <a
                      href={generateMailtoUrl()}
                      data-interactive="true"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FF66] text-xs font-mono text-white transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span>DEFAULT APP</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="pt-2 text-xs font-mono text-white/50 hover:text-white underline transition-colors"
                  >
                    Send another transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-xs font-mono text-[#00FF66] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>COMPOSE MESSAGE</span>
                    </span>
                    <span className="text-[10px] font-mono text-white/40">DIRECT DISPATCH</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/80 mb-2">
                      YOUR NAME / ORGANIZATION <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex / Tech Innovator"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#00FF66] focus:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/80 mb-2">
                      YOUR EMAIL ADDRESS <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#00FF66] focus:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/80 mb-2">
                      TRANSMISSION MESSAGE <span className="text-[#00FF66]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project, idea, or collaboration..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#00FF66] focus:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] font-mono text-white/40">
                      Dispatches direct transmission to inbox
                    </p>
                    <MagneticButton
                      variant="primary"
                      onHoverSound={onSoundHover}
                      className="w-full sm:w-auto"
                    >
                      <span>{status === 'submitting' ? 'PREPARING...' : 'SEND TRANSMISSION'}</span>
                      <Send className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
