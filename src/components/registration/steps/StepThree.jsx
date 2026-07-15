import React, { useState } from 'react';

export const StepThree = ({ onVerify, isSubmitting, onCancel }) => {
  const [otp, setOtp] = useState('');

  return (
    <div className="w-full flex flex-col gap-6 relative text-center my-auto px-4">
      <h3 className="text-xl font-bold text-white tracking-wider">ENTER OTP</h3>
      <p className="text-xs text-[#5b6e9c] mb-2">Check your college email for the OTP</p>
      
      <input 
        type="text" 
        value={otp}
        onChange={e => setOtp(e.target.value)}
        className="w-full bg-transparent text-white text-center py-4 rounded-xl border border-white/20 focus:border-[#00d2ff] focus:shadow-[0_0_20px_rgba(0,210,255,0.3)] focus:outline-none transition-all tracking-[0.5em] text-2xl font-bold"
        placeholder="1234"
        maxLength={6}
      />
      
      <div className="flex gap-4 mt-4">
        <button 
          onClick={onCancel}
          type="button"
          className="flex-1 py-3.5 bg-[#1e293b]/60 hover:bg-[#1e293b]/90 border border-white/10 transition-all rounded-xl text-white text-sm font-bold tracking-widest"
        >
          CANCEL
        </button>
        <button 
          onClick={() => onVerify(otp)} 
          type="button"
          disabled={isSubmitting || otp.length < 4} 
          className="flex-1 py-3.5 bg-gradient-to-r from-[#00b0ff] to-[#bd22ff] border border-blue-400/25 hover:opacity-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] shadow-md transition-all duration-300 rounded-xl text-white text-sm font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'WAIT...' : 'VERIFY'}
        </button>
      </div>
    </div>
  );
};
