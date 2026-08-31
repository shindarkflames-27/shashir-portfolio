import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
      data-interactive="true"
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D0D0D] border border-white/10 hover:border-[#00FF66]/50 transition-all duration-300 text-xs font-mono text-white/80 hover:text-white"
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-[#A0A0A0] group-hover:text-[#00FF66] transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[#00FF66] animate-pulse" />
      )}
      <span className="text-[11px] hidden sm:inline-block">
        {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
      </span>
      {!isMuted && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
      )}
    </button>
  );
}
