import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import PosterCard from '../PosterCard';
import posterImg from '../elements/Main Poster.svg';
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
    <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-[320px] lg:max-w-[280px]">
      <button
        onClick={() => copyToClipboard('+919546252112', 'coord1')}
        className={`group w-full py-2 sm:py-2.5 px-4 rounded-xl text-[10.5px] sm:text-[11px] font-bold tracking-widest bg-white/5 border hover:bg-white/10 transition-all duration-300 hover:scale-102 active:scale-95 backdrop-blur-sm flex items-center justify-between ${copiedId === 'coord1' ? 'border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)]' : 'border-white/10 text-white/80 hover:border-[#00d2ff]/50 hover:text-white'}`}
      >
        <span>{copiedId === 'coord1' ? 'COPIED!' : 'COORDINATOR 1'}</span>
        <span className={`opacity-50 group-hover:opacity-100 transition-all ${copiedId === 'coord1' ? 'text-[#00d2ff] opacity-100' : 'group-hover:text-[#00d2ff]'}`}>
          {copiedId === 'coord1' ? '✓' : '📞'}
        </span>
      </button>
      <button
        onClick={() => copyToClipboard('+918887654321', 'coord2')}
        className={`group w-full py-2 sm:py-2.5 px-4 rounded-xl text-[10.5px] sm:text-[11px] font-bold tracking-widest bg-white/5 border hover:bg-white/10 transition-all duration-300 hover:scale-102 active:scale-95 backdrop-blur-sm flex items-center justify-between ${copiedId === 'coord2' ? 'border-[#a855f7] text-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-white/10 text-white/80 hover:border-[#a855f7]/50 hover:text-white'}`}
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
    <div className="w-full h-full flex flex-col items-center lg:items-start justify-between lg:justify-center animate-fade-in py-2 lg:py-0 relative">

      {/* 1. TOP SECTION (Branding & Titles) */}
      <div className="flex flex-col items-center lg:items-start w-full relative z-10">
        <div className="hidden lg:block absolute -left-[40px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00d2ff]/50 to-transparent"></div>

        <div className="flex items-center gap-2 mb-1 lg:mb-4 hover:scale-102 transition-transform duration-300 bg-white/5 pr-3 pl-2 py-1 rounded-full border border-white/10 backdrop-blur-md max-lg:scale-90">
          <motion.img
            src="/cccLogo.png"
            alt="CCC Logo"
            className="w-[22px] h-[22px] lg:w-[28px] lg:h-[28px] object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.3em] text-white/90">
            CLOUD COMPUTING CELL
          </span>
        </div>

        <span className="text-[10px] lg:text-[12px] text-[#00d2ff] font-medium tracking-[0.4em] uppercase mb-0.5 lg:mb-4 ml-1 opacity-80">
          presents
        </span>

        {/* Glow SPOCC'26 headings */}
        <h1 className="text-[clamp(34px,8.5vh,52px)] lg:text-[80px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#00d2ff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,210,255,0.4)] mb-0 lg:mb-2 select-none leading-none">
          SPOCC&apos;26
        </h1>
        <span className="text-[9.5px] lg:text-[14px] font-bold tracking-[0.4em] uppercase text-white/70 lg:mb-8 ml-1 text-center lg:text-left w-full lg:w-auto">
          THE RECRUITMENT DRIVE
        </span>
      </div>

      {/* 2. MIDDLE SECTION (Poster + Desktop Details) */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full justify-center relative z-10">
        {/* Poster Wrapper */}
        <div className="flex relative items-center justify-center">
          <div
            className="relative shrink-0 rounded-xl overflow-hidden border border-white/10 drop-shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:border-[#00d2ff]/50 hover:scale-[1.02] transition-all duration-500 cursor-pointer group"
            style={{ width: 'clamp(105px, 20vh, 155px)' }}
            onClick={() => setShowPoster(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent z-40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2 lg:pb-4">
              <span className="text-white text-[7px] sm:text-[7.5px] lg:text-[10px] font-black tracking-[0.12em] lg:tracking-[0.2em] bg-[#001133]/90 border border-white/10 px-2 py-0.5 lg:px-3 lg:py-1.5 rounded-full backdrop-blur-md">CLICK TO ENLARGE</span>
            </div>
            <img src={posterImg} alt="SPOCC'26 Poster" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity relative z-10" />
          </div>
        </div>

        {/* Desktop-Only Details (Right side of poster) */}
        <div className="hidden lg:flex flex-col gap-6 w-full py-2">
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[15px] xl:text-[17px] font-black tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              THINK.DEVELOP.DEPLOY
            </span>
            <span className="text-[11px] text-white/50 font-medium leading-relaxed tracking-wider border-l-2 border-[#00d2ff]/40 pl-3 mt-1">
              Every expert was once a beginner.
              <span className="block mt-0.5">Take your first step with us.</span>
            </span>
          </div>
          {renderCoordinators()}
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

      {/* 3. MOBILE ONLY: REGISTER BUTTON + COORDINATORS */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center px-4 gap-2 sm:gap-2.5">
        <button
          onClick={onRegisterClick}
          className="w-full max-w-[320px] py-3 sm:py-3.5 rounded-xl font-black bg-gradient-to-r from-[#00d2ff] to-[#bd22ff] border border-[#00d2ff]/40 text-[13px] sm:text-[14px] tracking-[0.25em] text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          REGISTER NOW
        </button>
        {renderCoordinators()}
      </div>

      {/* 4. MOBILE-ONLY FOOTER SUBTEXT */}
      <div className="lg:hidden w-full flex flex-col items-center text-center">
        <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.35em] uppercase text-white mb-0.5 select-none drop-shadow-md">
          THINK.DEVELOP.DEPLOY
        </span>
        <span className="text-[9px] sm:text-[9.5px] text-[#5b6e9c] font-semibold leading-tight">
          Every expert was once a beginner.
          <span className="block">Take your first step with us.</span>
        </span>
      </div>

    </div>
  );
};

