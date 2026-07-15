import React from 'react';
import { motion } from 'framer-motion';

export const SuccessBadge = ({ formData, registrationId, resetForm }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-[420px] mx-auto my-auto flex flex-col items-center justify-center p-4 md:p-6 text-center"
    >
      {/* Cinematic Checkmark */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#00d2ff] rounded-full blur-[35px] opacity-40 animate-pulse" />
        <div className="relative w-20 h-20 bg-transparent border-2 border-[#00d2ff] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.4),inset_0_0_20px_rgba(0,210,255,0.2)]">
          <svg className="w-10 h-10 text-[#00d2ff] drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-black tracking-widest mb-2 text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]">
        VERIFIED
      </h3>
      <p className="text-xs md:text-sm text-blue-200/60 font-semibold tracking-widest uppercase mb-10">
        Access Badge Generated
      </p>
      
      {/* Digital Ticket / ID Card */}
      <div className="w-full bg-transparent border-2 border-[#00d2ff]/80 shadow-[0_0_30px_rgba(0,210,255,0.2),inset_0_0_20px_rgba(0,210,255,0.1)] rounded-2xl p-6 text-left mb-10 relative overflow-hidden group hover:border-[#00d2ff] hover:shadow-[0_0_40px_rgba(0,210,255,0.4),inset_0_0_25px_rgba(0,210,255,0.2)] transition-all duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d2ff]/10 rounded-full blur-3xl -z-1 transition-all duration-700 group-hover:bg-[#00d2ff]/20" />
        
        <div className="text-[10px] text-[#00d2ff]/70 tracking-[0.3em] font-bold uppercase mb-1">REGISTRATION ID</div>
        <div className="text-xl md:text-2xl font-black tracking-widest text-white drop-shadow-md mb-6 select-all">
          {registrationId}
        </div>
        
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
          <div>
            <span className="block text-[9px] text-[#00d2ff]/70 tracking-[0.2em] uppercase font-bold mb-1">NAME</span>
            <span className="font-bold text-white tracking-wider truncate block">{formData.name}</span>
          </div>
          <div>
            <span className="block text-[9px] text-[#00d2ff]/70 tracking-[0.2em] uppercase font-bold mb-1">STUDENT NO</span>
            <span className="font-bold text-white tracking-wider">{formData.studentNumber}</span>
          </div>
          <div>
            <span className="block text-[9px] text-[#00d2ff]/70 tracking-[0.2em] uppercase font-bold mb-1">BRANCH</span>
            <span className="font-bold text-white tracking-wider">{formData.branch}</span>
          </div>
          <div>
            <span className="block text-[9px] text-[#00d2ff]/70 tracking-[0.2em] uppercase font-bold mb-1">RESIDENCE</span>
            <span className="font-bold text-white tracking-wider">{formData.residence}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={resetForm}
        className="w-full py-4 rounded-xl font-black text-xs md:text-sm tracking-[0.25em] text-[#00d2ff] bg-transparent border-2 border-[#00d2ff] hover:bg-[#00d2ff] hover:text-[#020617] hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all duration-300 active:scale-95 select-none cursor-pointer"
      >
        REGISTER ANOTHER
      </button>
    </motion.div>
  );
};
