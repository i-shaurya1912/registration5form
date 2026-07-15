import React from 'react';
import posterImg from './elements/Main_Poster_Optimized.jpg';

const PosterCard = ({ onClose, isClosing }) => {
  return (
    <div 
      className={`relative max-h-[90vh] h-full max-w-full mx-auto cursor-pointer flex items-center justify-center transition-all duration-400 ${
        isClosing 
          ? 'opacity-0 scale-95 translate-y-4 pointer-events-none' 
          : 'animate-scale-up'
      }`}
      onClick={onClose}
    >
      <img 
        src={posterImg} 
        alt="SPOCC'26 Poster"
        className="max-h-full w-auto h-full object-contain drop-shadow-[0_0_30px_rgba(0,210,255,0.15)]"
      />
    </div>
  );
};

export default PosterCard;
