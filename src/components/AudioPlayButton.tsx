import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { voiceGuide } from '../services/voiceService';

interface AudioPlayButtonProps {
  id: string;
  textFr: string;
  textFon?: string; // Optional legacy parameter, voice now runs exclusively in French
  variant?: 'pill' | 'compact' | 'card-banner' | 'icon-only';
  customLabel?: string;
  className?: string;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  id,
  textFr,
  variant = 'pill',
  customLabel,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = voiceGuide.subscribe((state) => {
      setIsPlaying(state.isPlaying && state.currentId === id);
    });
    return unsubscribe;
  }, [id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    voiceGuide.speak(id, textFr);
  };

  const defaultLabel = isPlaying ? 'Arrêter la voix' : 'Écouter la note vocale';
  const label = customLabel || defaultLabel;

  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleClick}
        title={label}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#ac2356] text-white shadow-md shadow-[#ac2356]/30 ring-4 ring-[#ffd9e0] scale-105'
            : 'bg-[#f0f3ff] text-[#ac2356] hover:bg-[#ffd9e0] border border-[#dee8ff]'
        } ${className}`}
      >
        {isPlaying ? (
          <VolumeX className="w-4 h-4 animate-pulse" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#ac2356] text-white shadow-md ring-2 ring-[#ffd9e0]'
            : 'bg-[#ffd9e0] text-[#8f0341] hover:bg-[#ffb1c2]'
        } ${className}`}
      >
        {isPlaying ? (
          <>
            <span className="flex gap-0.5 items-center">
              <span className="w-1 h-3 bg-white rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-white rounded-full animate-bounce"></span>
              <span className="w-1 h-2 bg-white rounded-full animate-pulse"></span>
            </span>
            <span>Arrêter</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 shrink-0" />
            <span>Écouter</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'card-banner') {
    return (
      <div
        onClick={handleClick}
        className={`w-full p-2.5 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#ac2356] text-white shadow-md ring-2 ring-[#ffd9e0]'
            : 'bg-[#fef7f9] border border-[#ffd9e0] text-[#8f0341] hover:bg-[#ffd9e0]/60'
        } ${className}`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isPlaying ? 'bg-white text-[#ac2356]' : 'bg-[#ffd9e0] text-[#8f0341]'}`}>
            <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
          <span className="text-xs font-bold">
            {isPlaying ? 'Lecture en cours... Cliquez pour arrêter' : "Écouter l'explication vocale"}
          </span>
        </div>
        {isPlaying && (
          <span className="flex gap-1 items-end h-4 pr-1">
            <span className="w-1 h-4 bg-white rounded-full animate-pulse"></span>
            <span className="w-1 h-3 bg-white rounded-full animate-bounce"></span>
            <span className="w-1 h-4 bg-white rounded-full animate-pulse"></span>
          </span>
        )}
      </div>
    );
  }

  // Default 'pill' variant
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
        isPlaying
          ? 'bg-[#ac2356] text-white shadow-md shadow-[#ac2356]/25 ring-2 ring-[#ffd9e0] scale-102'
          : 'bg-[#ffd9e0] hover:bg-[#ffb1c2] text-[#8f0341] shadow-xs'
      } ${className}`}
    >
      <div className="relative">
        <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        )}
      </div>
      <span>{label}</span>
      {isPlaying && (
        <span className="flex gap-0.5 items-end h-3 ml-0.5">
          <span className="w-0.5 h-3 bg-white rounded-full animate-pulse"></span>
          <span className="w-0.5 h-2 bg-white rounded-full animate-bounce"></span>
          <span className="w-0.5 h-3.5 bg-white rounded-full animate-pulse"></span>
        </span>
      )}
    </button>
  );
};
