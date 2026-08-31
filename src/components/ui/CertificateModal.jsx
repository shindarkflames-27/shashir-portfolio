import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function CertificateModal({ certificate, isOpen, onClose, onActionSound }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-3xl rounded-3xl bg-[#0D0D0D] border border-[#00FF66]/30 shadow-[0_0_50px_rgba(0,255,102,0.25)] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00FF66]" />
              <span className="text-xs font-mono text-white/80 uppercase tracking-wider">
                CERTIFICATE VERIFICATION PORTAL
              </span>
            </div>
            <button
              onClick={() => {
                if (onActionSound) onActionSound();
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Certificate Preview Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-[#050505] group">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#00FF66]/20 border border-[#00FF66]/40 text-xs font-mono text-[#00FF66] backdrop-blur-md">
                  {certificate.category}
                </span>
                <span className="text-xs font-mono text-white/70">
                  {certificate.credentialId}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold font-space text-white mb-1">
                  {certificate.title}
                </h3>
                <p className="text-sm text-[#00FF66] font-mono flex items-center gap-2">
                  <Award className="w-4 h-4" /> {certificate.issuer}
                </p>
              </div>

              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                {certificate.description}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#080808] border border-white/5 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#00FF66]" />
                  <div>
                    <p className="text-[10px] font-mono text-white/50">ISSUED DATE</p>
                    <p className="text-xs font-semibold text-white">{certificate.issueDate}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#080808] border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                  <div>
                    <p className="text-[10px] font-mono text-white/50">STATUS</p>
                    <p className="text-xs font-semibold text-[#00FF66]">Active & Verified</p>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              {certificate.skillsLearned && (
                <div>
                  <p className="text-xs font-mono text-white/60 mb-2">VERIFIED COMPETENCIES:</p>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skillsLearned.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-space text-white/70 hover:text-white transition-colors"
              >
                Close Window
              </button>
              <MagneticButton
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                className="w-full sm:w-auto text-xs"
              >
                Verify Credential <ExternalLink className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
