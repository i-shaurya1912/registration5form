import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import PosterCard from '../PosterCard';
import posterImg from '../elements/Main_Poster_Optimized.jpg';
import SideRays from '../SideRays';

export const BrandingSection = ({ showPoster, setShowPoster, handleClosePoster, isClosing, onRegisterClick }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    const handleSuccess = () => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(handleSuccess).catch(err => console.error(err));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        handleSuccess();
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  };

  const renderCoordinators = () => (
    <div className="flex flex-col gap-3 w-full max-w-[280px]">
      <button
        onClick={() => copyToClipboard('+919546252112', 'coord1')}
        className={`group w-full py-2.5 px-4 rounded-xl text-[11px] font-bold tracking-widest bg-white/5 border hover:bg-white/10 transition-all duration-300 hover:scale-102 active:scale-95 backdrop-blur-sm flex items-center justify-between ${copiedId === 'coord1' ? 'border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)]' : 'border-white/10 text-white/80 hover:border-[#00d2ff]/50 hover:text-white'}`}
      >
        <span>{copiedId === 'coord1' ? 'COPIED!' : 'COORDINATOR 1'}</span>
        <span className={`opacity-50 group-hover:opacity-100 transition-all ${copiedId === 'coord1' ? 'text-[#00d2ff] opacity-100' : 'group-hover:text-[#00d2ff]'}`}>
          {copiedId === 'coord1' ? '✓' : '📞'}
        </span>
      </button>
      <button
        onClick={() => copyToClipboard('+918887654321', 'coord2')}
        className={`group w-full py-2.5 px-4 rounded-xl text-[11px] font-bold tracking-widest bg-white/5 border hover:bg-white/10 transition-all duration-300 hover:scale-102 active:scale-95 backdrop-blur-sm flex items-center justify-between ${copiedId === 'coord2' ? 'border-[#a855f7] text-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-white/10 text-white/80 hover:border-[#a855f7]/50 hover:text-white'}`}
      >
        <span>{copiedId === 'coord2' ? 'COPIED!' : 'COORDINATOR 2'}</span>
        <span className={`opacity-50 group-hover:opacity-100 transition-all ${copiedId === 'coord2' ? 'text-[#a855f7] opacity-100' : 'group-hover:text-[#a855f7]'}`}>
          {copiedId === 'coord2' ? '✓' : '📞'}
        </span>
      </button>
    </div>
  );

  if (showPoster) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4 py-8 lg:py-4 relative">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
          <SideRays speed={2.5} rayColor1="#EAB308" rayColor2="#96c8ff" intensity={2} spread={2} origin="top-right" />
        </div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <PosterCard onClose={handleClosePoster} isClosing={isClosing} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center lg:items-start justify-between lg:justify-center animate-fade-in py-6 lg:py-0 relative">

      {/* 1. TOP SECTION (Branding & Titles) */}
      <div className="flex flex-col items-center lg:items-start w-full mt-4 lg:mt-0 relative z-10">
        <div className="hidden lg:block absolute -left-[40px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00d2ff]/50 to-transparent"></div>

        <div className="flex items-center gap-3 mb-4 hover:scale-102 transition-transform duration-300 bg-white/5 pr-4 pl-2 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <motion.img 
            src="/cccLogo.png" 
            alt="CCC Logo" 
            className="w-[28px] h-[28px] object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/90">
            CLOUD COMPUTING CELL
          </span>
        </div>

        <span className="text-[12px] text-[#00d2ff] font-medium tracking-[0.4em] uppercase mb-4 ml-2 opacity-80">
          presents
        </span>

        {/* Glow SPOCC'26 headings */}
        <h1 className="text-[52px] lg:text-[80px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#00d2ff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,210,255,0.4)] mb-2 select-none leading-none">
          SPOCC&apos;26
        </h1>
        <span className="text-[11px] lg:text-[14px] font-bold tracking-[0.4em] uppercase text-white/70 mb-6 lg:mb-8 ml-2 text-center lg:text-left w-full lg:w-auto">
          THE RECRUITMENT DRIVE
        </span>
      </div>

      {/* 2. MIDDLE SECTION (Poster Button & Desktop Details) */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full gap-8 relative z-10">

        {/* View Poster button (MOBILE ONLY) */}
        <button
          onClick={() => setShowPoster(true)}
          className="lg:hidden group relative px-10 py-3.5 rounded-full bg-transparent overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d2ff]/20 to-[#a855f7]/20 border border-white/20 rounded-full group-hover:border-[#00d2ff]/60 transition-colors duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#00d2ff]/40 to-[#a855f7]/40 blur-md transition-opacity duration-300" />
          <span className="relative z-10 text-[13px] font-black tracking-[0.25em] text-white drop-shadow-md">
            VIEW POSTER
          </span>
        </button>

        {/* Desktop Poster Wrapper (Rays placed here) */}
        <div className="hidden lg:flex relative">
          {/* Embedded Poster (DESKTOP ONLY) */}
          <div className="relative w-[220px] xl:w-[260px] shrink-0 rounded-xl overflow-hidden border border-white/10 drop-shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:border-[#00d2ff]/50 hover:scale-[1.02] transition-all duration-500 cursor-pointer group" onClick={() => setShowPoster(true)}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <span className="text-white text-[10px] font-bold tracking-[0.2em] bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">CLICK TO ENLARGE</span>
            </div>
            <img src={posterImg} alt="SPOCC'26 Poster" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity relative z-10" />
          </div>
        </div>

        {/* Desktop-Only Details (Right side of poster) */}
        <div className="hidden lg:flex flex-col gap-6 w-full py-2">
          {/* THINK.DEVELOP.DEPLOY */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[15px] xl:text-[17px] font-black tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              THINK.DEVELOP.DEPLOY
            </span>
            <span className="text-[11px] text-white/50 font-medium leading-relaxed tracking-wider border-l-2 border-[#00d2ff]/40 pl-3 mt-1">
              Every expert was once a beginner.
              <span className="block mt-0.5">Take your first step with us.</span>
            </span>
          </div>

          {/* Coordinators Container */}
          {renderCoordinators()}

          {/* Social media icons */}
          <div className="flex gap-5 mt-1">
            <a href="https://www.facebook.com/ccc.akgec" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00d2ff] transition-all duration-300 hover:scale-125 active:scale-95 hover:drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/company/cloud-computing-cell-akgec/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00d2ff] transition-all duration-300 hover:scale-125 active:scale-95 hover:drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/ccc_akgec/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#a855f7] transition-all duration-300 hover:scale-125 active:scale-95 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. MOBILE ONLY: MASSIVE REGISTER BUTTON */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center mt-12 mb-auto flex-1 px-4 gap-6">
        <button
          onClick={onRegisterClick}
          className="w-full max-w-[400px] py-5 rounded-2xl font-black bg-gradient-to-r from-[#00d2ff] to-[#bd22ff] border border-[#00d2ff]/40 text-[16px] tracking-[0.25em] text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          REGISTER NOW
        </button>
        
        {/* Mobile Coordinators */}
        {renderCoordinators()}
      </div>

      {/* 4. MOBILE-ONLY FOOTER SUBTEXT (Pushed to bottom) */}
      <div className="lg:hidden w-full flex flex-col items-center text-center mt-8 pb-2">
        <span className="text-[13px] font-extrabold tracking-[0.35em] uppercase text-white mb-2 select-none drop-shadow-md">
          THINK.DEVELOP.DEPLOY
        </span>
        <span className="text-[10px] text-[#5b6e9c] font-semibold leading-relaxed">
          Every expert was once a beginner.
          <span className="block mt-0.5">Take your first step with us.</span>
        </span>
      </div>

    </div>
  );
};
