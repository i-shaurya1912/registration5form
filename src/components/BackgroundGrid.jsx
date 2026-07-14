import React, { useEffect, useState } from 'react';
import bgDbz from './elements/background_dbz.png';

const BackgroundGrid = () => {
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate randomized space stars with varied colors and sizes
    const colors = ['#00d2ff', '#a855f7', '#ffffff', '#3b82f6'];
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 4 + 3,
    }));
    setStars(generatedStars);

    // Mouse movement parallax handler (throttled conceptually via smooth transition)
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#02040f] overflow-hidden -z-50 pointer-events-none">
      {/* High-Resolution DBZ Starry Grid Background with Parallax */}
      <div 
        className="absolute bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out"
        style={{
          backgroundImage: `url(${bgDbz})`,
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px) scale(1.06)`,
          filter: 'brightness(1.15) contrast(1.1) saturate(1.25)',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
        }}
      />

      {/* Subtle vignette gradient overlays to protect content contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02040f] via-transparent to-[#02040f]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02040f]/60 via-transparent to-[#02040f]/60" />

      {/* Dynamic Nebulas (Slowly pulsing colored halos) */}
      <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[170px] animate-pulse-slow" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-[40%] left-[45%] w-[450px] h-[450px] rounded-full bg-blue-600/5 blur-[150px] animate-pulse-slow" style={{ animationDelay: '-4s' }} />

      {/* Shooting Stars / Meteors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="meteor meteor-1" />
        <div className="meteor meteor-2" />
        <div className="meteor meteor-3" />
      </div>

      {/* Floating Sparkles/Twinkly Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            animation: `pulse-star ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: star.size > 2 ? `0 0 10px ${star.color}` : 'none',
          }}
        />
      ))}

      {/* Custom Styles for Space Environment */}
      <style>{`
        @keyframes pulse-star {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1.25); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        /* Scientific shooting star effect */
        .meteor {
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, rgba(0, 210, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
          opacity: 0;
          transform: rotate(-45deg);
        }

        .meteor-1 {
          top: 10%;
          left: 60%;
          animation: shoot 12s linear infinite;
          animation-delay: 1s;
        }

        .meteor-2 {
          top: 25%;
          left: 80%;
          animation: shoot 15s linear infinite;
          animation-delay: 5s;
        }

        .meteor-3 {
          top: 5%;
          left: 30%;
          animation: shoot 18s linear infinite;
          animation-delay: 9s;
        }

        @keyframes shoot {
          0% {
            transform: translate(0, 0) rotate(-45deg) scale(0);
            opacity: 0;
          }
          1% {
            opacity: 0.8;
            transform: translate(-100px, 100px) rotate(-45deg) scale(1);
          }
          6% {
            transform: translate(-400px, 400px) rotate(-45deg) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-400px, 400px) rotate(-45deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundGrid;

