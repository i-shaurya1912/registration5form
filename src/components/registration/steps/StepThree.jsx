import React, { useState, useEffect } from 'react';

const RESEND_COOLDOWN = 60;

export const StepThree = ({ onVerify, isSubmitting, onCancel, onResend }) => {
  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0 || !onResend) return;
    onResend();
    setCooldown(RESEND_COOLDOWN);
  };

  return (
    <div className="w-full flex flex-col gap-5 relative text-center py-4 px-2 md:px-4 animate-fade-in">
      <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-widest uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">ENTER OTP</h3>
      <p className="text-xs md:text-sm text-blue-200/90 -mt-2">A 6-digit OTP has been sent to your college email</p>

      <div className={`w-full p-[2px] rounded-xl transition-all duration-300 bg-gradient-to-r from-[#ffffff] via-[#00d2ff] to-[#a855f7] my-1 ${
        isFocused
          ? 'shadow-[0_0_35px_rgba(0,210,255,0.7)]'
          : 'shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)]'
      }`}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-[#030914] text-white text-center py-4 rounded-[10px] outline-none tracking-[0.5em] text-2xl md:text-3xl font-black"
          placeholder="------"
          maxLength={6}
          inputMode="numeric"
          autoComplete="one-time-code"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (otp.length === 6 && !isSubmitting) {
                onVerify(otp);
              }
            }
          }}
        />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={onCancel}
          type="button"
          className="flex-1 py-3.5 bg-[#1e293b]/60 hover:bg-[#1e293b]/90 border border-white/10 transition-all rounded-xl text-white text-sm font-bold tracking-widest"
        >
          BACK
        </button>
        <button
          onClick={() => onVerify(otp)}
          type="button"
          disabled={isSubmitting || otp.length < 6}
          className="flex-1 py-3.5 bg-gradient-to-r from-[#00b0ff] to-[#bd22ff] border border-blue-400/25 hover:opacity-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] shadow-md transition-all duration-300 rounded-xl text-white text-sm font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'VERIFYING...' : 'VERIFY'}
        </button>
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={cooldown > 0 || !onResend}
        className="text-xs text-[#5b6e9c] hover:text-[#00d2ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
      </button>
    </div>
  );
};
