import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { voiceGuide } from '../services/voiceService';

export const FloatingAudioBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = voiceGuide.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleStop = () => {
    voiceGuide.stop();
  };

  // Only display the floating bar when an audio is actively playing for minimal clutter, or show subtle floating control
  if (!isPlaying) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md transition-all animate-fade-in">
      <div className="bg-[#111c2d]/95 backdrop-blur-md text-white rounded-full p-2.5 sm:p-3 shadow-2xl border border-white/20 flex items-center justify-between gap-3">
        {/* Left: Wave animation & title */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#ac2356] text-white flex items-center justify-center animate-pulse">
              <Volume2 className="w-4 h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>

          <div className="text-left">
            <div className="text-xs font-extrabold flex items-center gap-1.5">
              <span>Lecture vocale en français</span>
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-1 h-3 bg-pink-400 rounded-full animate-pulse"></span>
                <span className="w-1 h-2 bg-pink-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-3.5 bg-pink-400 rounded-full animate-pulse"></span>
              </span>
            </div>
            <p className="text-[10px] text-gray-300 leading-tight">
              Explication audio en cours
            </p>
          </div>
        </div>

        {/* Right: Stop button */}
        <button
          onClick={handleStop}
          className="px-4 py-1.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <VolumeX className="w-3.5 h-3.5" />
          <span>Arrêter</span>
        </button>
      </div>
    </div>
  );
};
