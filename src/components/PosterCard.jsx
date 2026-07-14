import React from 'react';
import posterImg from './elements/Main_Poster_Optimized.jpg';

const PosterCard = ({ onClose, isClosing }) => {
  return (
    <div 
      className={`relative w-full overflow-hidden rounded-[24px] border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.15)] bg-[#040815]/90 backdrop-blur-md cursor-pointer group transition-all duration-400 ${
        isClosing 
          ? 'opacity-0 scale-95 translate-y-4 pointer-events-none' 
          : 'animate-scale-up'
      }`}
      onClick={onClose}
      style={{
        aspectRatio: '1000/1414',
      }}
    >
      {/* Full Poster Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={posterImg} 
          alt="SPOCC'26 Poster"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
        />
      </div>

      {/* Tap to Close overlay bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 py-2.5 text-center border-t border-white/5 backdrop-blur-sm transition-colors duration-300 group-hover:bg-black">
        <span className="text-[11px] font-semibold tracking-[0.25em] text-white opacity-80 animate-pulse">
          TAP TO CLOSE
        </span>
      </div>

      {/* Subtle glowing corner overlays */}
      <div className="absolute inset-0 pointer-events-none rounded-[24px] border border-white/5" />
    </div>
  );
};

export default PosterCard;
