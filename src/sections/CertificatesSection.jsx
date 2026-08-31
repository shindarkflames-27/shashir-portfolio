import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Eye, Calendar, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import TiltCard from '../components/ui/TiltCard';
import CertificateModal from '../components/ui/CertificateModal';
import { certificatesData } from '../data/certificates';

export default function CertificatesSection({ onSoundHover, onSoundClick }) {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpenModal = (cert) => {
    if (onSoundClick) onSoundClick();
    setSelectedCert(cert);
  };

  return (
    <section id="certificates" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Background Grid & Lighting */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-[#00FF66]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <SectionHeading
            badge="CREDENTIALS // AUDIT"
            title="CERTIFICATES & LEARNING"
            subtitle="Verified academic milestones, hackathons, and certified AI/ML learning programs."
            align="center"
          />

          {/* Dynamic Live Counter Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#0D0D0D] border border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.2)]"
          >
            <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
            <span className="text-xs font-mono text-white/80">
              CURRENT VERIFIED CREDENTIALS:
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#00FF66] text-black font-mono font-bold text-xs">
              {certificatesData.length} VERIFIED
            </span>
          </motion.div>
        </div>

        {/* Certificates 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard
                onHoverSound={onSoundHover}
                className="group flex flex-col justify-between h-full p-6"
              >
                <div className="space-y-4">
                  {/* Certificate Image Thumbnail */}
                  <div 
                    onClick={() => handleOpenModal(cert)}
                    className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#080808] border border-white/10 group-hover:border-[#00FF66]/40 transition-colors cursor-pointer"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#00FF66] border border-[#00FF66]/30">
                        {cert.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Calendar className="w-3 h-3 text-[#00FF66]" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-bold font-space text-white group-hover:text-[#00FF66] transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-[#00FF66] mt-1 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </p>
                  </div>

                  <p className="text-xs text-[#A0A0A0] line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Open Modal Button */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/50">
                    ID: {cert.credentialId.substring(0, 16)}
                  </span>

                  <button
                    onClick={() => handleOpenModal(cert)}
                    data-interactive="true"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00FF66]/10 group-hover:bg-[#00FF66] text-[#00FF66] group-hover:text-black border border-[#00FF66]/40 text-xs font-space font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW CREDENTIAL</span>
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        onActionSound={onSoundClick}
      />
    </section>
  );
}
