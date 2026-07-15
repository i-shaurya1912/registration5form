import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';

export const FormContainer = ({
  step,
  direction,
  formData,
  errors,
  isSubmitting,
  handleInputChange,
  handleSubmit,
  handleVerifyOtp,
  handleCancelOtp,
  navigateNext,
  navigatePrev,
  onBackToBranding
}) => {
  const isScrolling = useRef(false);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

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

  const handleWheel = (e) => {
    if (step === 3) return; // Disable scrolling on OTP step
    if (isTargetScrollable(e.target, e.currentTarget)) return;
    if (isScrolling.current) return;

    if (e.deltaY > 5) {
      isScrolling.current = true;
      navigateNext();
      setTimeout(() => { isScrolling.current = false; }, 600);
    } else if (e.deltaY < -5) {
      isScrolling.current = true;
      navigatePrev();
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  };

  const handleTouchStart = (e) => {
    if (step === 3) return; // Disable swiping on OTP step
    if (isTargetScrollable(e.target, e.currentTarget)) {
      touchStartY.current = null;
      return;
    }
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (step === 3 || touchStartY.current === null) return;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (step === 3 || touchStartY.current === null) return;
    if (isScrolling.current) return;
    const swipeDistance = touchStartY.current - touchEndY.current;

    if (swipeDistance > 50) {
      isScrolling.current = true;
      navigateNext();
      setTimeout(() => { isScrolling.current = false; }, 600);
    } else if (swipeDistance < -50) {
      isScrolling.current = true;
      navigatePrev();
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="lg:col-span-6 flex flex-col justify-between lg:justify-center items-center w-full transition-all duration-300 h-full py-6 lg:py-0 relative"
    >
      {/* Reused Mobile Header (Logo & SPOCC'26) */}
      <div className="lg:hidden flex flex-col items-center mt-2 mb-2 animate-fade-in w-full relative">
        {/* Mobile Go Back Button (Top Left) */}
        <button
          type="button"
          onClick={onBackToBranding}
          className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] hover:text-white hover:bg-[#00d2ff]/20 border border-[#00d2ff]/30 transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.15)]"
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
            border-color: rgba(0, 210, 255, 0.4);
            box-shadow: 0 15px 50px rgba(0,0,0,0.5), 0 0 50px rgba(0, 210, 255, 0.2), inset 0 0 20px rgba(0, 210, 255, 0.1);
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 15px 50px rgba(0,0,0,0.5);
          }
        }
        @media (min-width: 1024px) {
          .animate-form-flicker {
            animation: form-flicker 8s infinite;
          }
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-[460px] lg:max-w-[520px] xl:max-w-[580px] mx-auto flex flex-col items-center justify-center relative min-h-[480px] lg:min-h-[500px] px-2 md:px-0 py-4 lg:border lg:border-white/10 lg:rounded-[32px] lg:bg-[#001133]/60 lg:backdrop-blur-2xl lg:shadow-[0_15px_50px_rgba(0,0,0,0.5)] lg:px-12 lg:py-10 animate-form-flicker"
      >
        <div className="w-full relative flex-1 flex flex-col justify-start pt-4 min-h-[420px] md:min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={{
                initial: (dir) => ({ x: dir === 1 ? "100%" : "-100%", opacity: 0, filter: 'blur(5px)' }),
                animate: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { type: "spring", stiffness: 70, damping: 20, mass: 1 } },
                exit: (dir) => ({ x: dir === 1 ? "-100%" : "100%", opacity: 0, filter: 'blur(5px)', transition: { duration: 0.5, ease: "easeInOut" } })
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex flex-col gap-5 md:gap-6 w-full justify-start pt-2 pb-12"
            >
              {step === 1 && (
                <StepOne formData={formData} errors={errors} handleInputChange={handleInputChange} />
              )}
              {step === 2 && (
                <StepTwo formData={formData} errors={errors} handleInputChange={handleInputChange} isSubmitting={isSubmitting} />
              )}
              {step === 3 && (
                <StepThree onVerify={handleVerifyOtp} isSubmitting={isSubmitting} onCancel={handleCancelOtp} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots (Only show on steps 1 and 2) */}
        {step < 3 && (
          <div className="absolute -bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            <div className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${step === 1 ? 'bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.8)]' : 'bg-white/20'}`} />
            <div className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${step === 2 ? 'bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.8)]' : 'bg-white/20'}`} />
          </div>
        )}
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
