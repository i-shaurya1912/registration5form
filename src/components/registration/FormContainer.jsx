import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import ReCAPTCHA from 'react-google-recaptcha';
import { GENDER_OPTIONS, BRANCH_OPTIONS, RESIDENCE_OPTIONS } from './constants';
import { FormField } from '../FormField';

export const FormContainer = ({
  step,
  direction,
  formData,
  errors,
  isSubmitting,
  turnstileToken,
  handleInputChange,
  handleBlur,
  handleSubmit,
  handleVerifyOtp,
  handleCancelOtp,
  navigateNext,
  navigatePrev,
  onBackToBranding,
  onTurnstileSuccess,
  recaptchaRef,
}) => {
  const isScrolling = useRef(false);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTargetScrollable = (target, currentTarget) => {
    let el = target;
    while (el && el !== currentTarget) {
      const style = window.getComputedStyle(el);
      if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  };

  const isInteractiveTarget = (target) => {
    if (!target || typeof target.closest !== 'function') return false;
    const interactiveSelectors = ['input', 'textarea', 'select', 'button', 'a'];
    return interactiveSelectors.some((selector) => target.closest(selector)) || target.isContentEditable;
  };

  const handleWheel = (e) => {
    return; // Disable scroll-jacking steps
  };

  const handleTouchStart = (e) => {
    return; // Disable swiping step transition
  };

  const handleTouchMove = (e) => {
    return; // Disable swiping step transition
  };

  const handleTouchEnd = () => {
    return; // Disable swiping step transition
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="lg:col-span-6 flex flex-col justify-center items-center gap-3 w-full transition-all duration-300 h-full py-2 lg:py-0 relative"
    >
      {/* Reused Mobile Header (Logo & SPOCC'26) */}
      <div className="lg:hidden flex flex-col items-center mt-2 mb-2 animate-fade-in w-full relative">
        {/* Mobile Go Back Button (Top Left) */}
        <button
          type="button"
          onClick={onBackToBranding}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] hover:text-white hover:bg-[#00d2ff]/20 border border-[#00d2ff]/30 transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.15)]"
        >
          <svg className="w-5 h-5 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <h1 className="text-[32px] font-extrabold tracking-widest text-[#00d2ff] drop-shadow-[0_0_15px_rgba(0,210,255,0.5)] leading-none mb-1">
          SPOCC&apos;26
        </h1>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-400/90">
          THE RECRUITMENT DRIVE
        </span>
      </div>

      {/* Desktop-only Logo above form */}
      <div className="hidden lg:flex w-full justify-center mb-4 mt-8 animate-fade-in">
        <span className="text-[14px] font-black uppercase tracking-[0.4em] text-white/90">
          CLOUD COMPUTING CELL
        </span>
      </div>

      <style>{`
        @keyframes form-flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            box-shadow: 0 15px 50px rgba(0,0,0,0.5), 0 0 50px rgba(0, 210, 255, 0.2), inset 0 0 20px rgba(0, 210, 255, 0.1);
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            box-shadow: 0 15px 50px rgba(0,0,0,0.5);
          }
        }
        @keyframes border-flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.15; }
        }
        @media (min-width: 1024px) {
          .animate-form-flicker {
            animation: form-flicker 8s infinite;
          }
          .animate-border-flicker {
            animation: border-flicker 8s infinite;
          }
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-[460px] lg:max-w-[520px] xl:max-w-[580px] mx-auto flex flex-col items-center justify-center relative max-lg:min-h-0 lg:min-h-[500px] lg:h-[660px] px-4 py-4 max-sm:px-3 max-sm:py-3 max-lg:rounded-2xl lg:rounded-[32px] max-lg:bg-[#001133]/55 lg:bg-[#001133]/60 max-lg:backdrop-blur-xl lg:backdrop-blur-2xl max-lg:border max-lg:border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] lg:shadow-[0_15px_50px_rgba(0,0,0,0.5)] lg:px-12 lg:py-10 animate-form-flicker max-lg:overflow-y-auto max-lg:max-h-[66dvh]"
      >
        {/* Gradient Border Mask (Desktop Only) */}
        <div 
          className="hidden lg:block absolute inset-0 pointer-events-none rounded-[32px] animate-border-flicker"
          style={{
            padding: '1.5px', // Border thickness
            background: 'linear-gradient(to bottom right, #ffffff, #00d2ff, #a855f7)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
        
        <div className="w-full relative flex-1 flex flex-col justify-start pt-2 max-lg:pt-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step === 3 ? 'otp' : 'form'}
              custom={direction}
              variants={{
                initial: (dir) => ({ x: dir === 1 ? "100%" : "-100%", opacity: 0, filter: 'blur(5px)' }),
                animate: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { type: "spring", stiffness: 70, damping: 20, mass: 1 } },
                exit: (dir) => ({ x: dir === 1 ? "-100%" : "100%", opacity: 0, filter: 'blur(5px)', transition: { duration: 0.5, ease: "easeInOut" } })
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full flex flex-col gap-2 max-lg:gap-1.5 pt-1 pb-4"
            >
              {(step === 1 || step === 2) ? (
                <div className="flex flex-col gap-2.5 max-lg:gap-2 w-full animate-fade-in">
                  <h2 className="text-2xl font-bold text-center text-white/95 uppercase tracking-wider mb-0.5 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] max-lg:text-[18px]">Register here</h2>

                  <FormField 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter Name"
                    error={errors.name}
                  />
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <FormField 
                      name="studentNumber" 
                      value={formData.studentNumber} 
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Student Number"
                      error={errors.studentNumber}
                    />
                    <FormField 
                      type="select" 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleInputChange}
                      placeholder="Select Gender"
                      options={GENDER_OPTIONS}
                      error={errors.gender}
                    />
                  </div>
                  <FormField 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter College Email Id"
                    error={errors.email}
                    readOnly={true}
                  />
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <FormField 
                      name="phoneNumber" 
                      value={formData.phoneNumber} 
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Phone Number"
                      error={errors.phoneNumber}
                    />
                    <FormField 
                      type="select" 
                      name="branch" 
                      value={formData.branch} 
                      onChange={handleInputChange} 
                      placeholder="Branch"
                      options={BRANCH_OPTIONS}
                      error={errors.branch}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <FormField 
                      name="unstopId" 
                      value={formData.unstopId} 
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter Unstop Id or (NaN)"
                      error={errors.unstopId}
                    />
                    <FormField 
                      type="select" 
                      name="residence" 
                      value={formData.residence} 
                      onChange={handleInputChange} 
                      placeholder="Select Residence"
                      options={RESIDENCE_OPTIONS}
                      error={errors.residence}
                    />
                  </div>

                  <div className="flex justify-center my-1.5 w-full relative z-20 pointer-events-auto">
                    {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        size="normal"
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => onTurnstileSuccess && onTurnstileSuccess(token)}
                        onExpired={() => onTurnstileSuccess && onTurnstileSuccess('')}
                        theme="dark"
                      />
                    ) : (
                      <div
                        className="cf-turnstile mx-auto mt-1"
                        data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                        data-callback="onTurnstileSuccess"
                        data-theme="dark"
                        data-size="flexible"
                        ref={(el) => {
                          if (el && onTurnstileSuccess) {
                            window.onTurnstileSuccess = onTurnstileSuccess;
                          }
                        }}
                      />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="w-full mt-1.5 py-3 max-lg:py-2.5 rounded-xl font-bold text-xs max-lg:text-[11px] lg:text-sm tracking-[0.25em] text-white bg-gradient-to-r from-[#00b0ff] to-[#bd22ff] border border-blue-400/25 hover:opacity-95 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] shadow-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              ) : (
                <StepThree onVerify={handleVerifyOtp} isSubmitting={isSubmitting} onCancel={handleCancelOtp} onResend={handleCancelOtp} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </form>

      {/* Reused Mobile Footer */}
      <div className="lg:hidden w-full flex flex-col items-center text-center mt-auto pt-4 pb-2 animate-fade-in">
        <span className="text-[11px] font-extrabold tracking-[0.35em] uppercase text-white/90 select-none drop-shadow-md">
          THINK.DEVELOP.DEPLOY
        </span>
      </div>
    </motion.div>
  );
};
