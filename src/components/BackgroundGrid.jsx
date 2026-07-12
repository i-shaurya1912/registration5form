import React, { useEffect, useState } from 'react';
import bgDbz from './elements/background_dbz.png';

const BackgroundGrid = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate some random background glow particles/stars
    const generatedStars = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.2,
      opacity: Math.random() * 0.75 + 0.25,
      delay: Math.random() * 6,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020512] overflow-hidden -z-50 pointer-events-none">
      {/* High-Resolution DBZ Starry Grid Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: `url(${bgDbz})`,
        }}
      />

      {/* Subtle vignette gradient overlays to keep form readable but show the grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020512] via-transparent to-[#020512]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020512]/70 via-transparent to-[#020512]/70" />

      {/* Large Glowing Nebulas (Cyan and Purple/Magenta Globs on the screen) */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[130px] animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] rounded-full bg-fuchsia-600/10 blur-[160px] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Floating Sparkles/Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[#00d2ff]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse-star 4s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: star.size > 2 ? '0 0 10px rgba(0, 210, 255, 0.9)' : 'none',
          }}
        />
      ))}

      {/* Embedded Style for Star Animation */}
      <style>{`
        @keyframes pulse-star {
          0%, 100% { opacity: 0.15; transform: scale(0.75); }
          50% { opacity: 0.95; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundGrid;

