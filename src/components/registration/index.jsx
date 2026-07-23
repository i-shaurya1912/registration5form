import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { validateField, validateForm } from '../../validations/formValidation';
import { sendOtp, verifyOtp } from '../../services/registrationApi';
import { BrandingSection } from './BrandingSection';
import { FormContainer } from './FormContainer';
import { SuccessBadge } from './SuccessBadge';
import BackgroundGrid from '../BackgroundGrid';
import { CustomCursor } from '../CustomCursor';
import SideRays from '../SideRays';

const RegistrationMain = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [showPoster, setShowPoster] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileView, setMobileView] = useState('branding'); // 'branding' or 'form'

  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    email: '',
    gender: '',
    branch: '',
    phoneNumber: '',
    unstopId: '',
    residence: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState({ id: '', name: '' });
  const [sessionToken, setSessionToken] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const recaptchaRef = useRef(null);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleClosePoster = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPoster(false);
      setIsClosing(false);
    }, 400);
  };

  useEffect(() => {
    const handleLock = () => {
      const isMobileViewport = window.innerWidth < 1024;
      if (isMobileViewport) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100dvh';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        document.documentElement.style.overscrollBehavior = 'none';
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.documentElement.style.overscrollBehavior = '';
      }
    };

    handleLock();
    window.addEventListener('resize', handleLock);

    return () => {
      window.removeEventListener('resize', handleLock);
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === 'name' || name === 'studentNumber') {
        const nameVal = name === 'name' ? value : prev.name;
        const stdVal = name === 'studentNumber' ? value : prev.studentNumber;
        const nameParts = nameVal.trim().split(/\s+/);
        const firstName = (nameParts[0] || '').toLowerCase().replace(/[^a-z]/g, '');
        const stdNo = stdVal.trim();

        if (firstName && stdNo) {
          updatedData.email = `${firstName}${stdNo}@akgec.ac.in`;
        }
      }

      const fieldErr = validateField(name, value, updatedData);
      const emailErr = (name === 'name' || name === 'studentNumber') && updatedData.email
        ? validateField('email', updatedData.email, updatedData)
        : null;

      setErrors((prevErr) => {
        const nextErr = { ...prevErr, [name]: fieldErr };
        if (emailErr !== null) {
          nextErr.email = emailErr;
        }
        return nextErr;
      });

      return updatedData;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value, formData);
    if (err) setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const navigateNext = () => {
    if (step < 2) {
      setDirection(1);
      setStep(2);
    }
  };

  const navigatePrev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 3) return;

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fill all fields correctly before submitting.');
      const page1Fields = ['name', 'studentNumber', 'email', 'gender'];
      if (page1Fields.some(field => validationErrors[field]) && step !== 1) {
        setDirection(-1);
        setStep(1);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      let captchaToken = turnstileToken;
      
      if (!captchaToken && recaptchaRef.current) {
        captchaToken = recaptchaRef.current.getValue();
      }

      if (!captchaToken && import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
        showToast('Please check the "I\'m not a robot" captcha box before submitting.');
        setIsSubmitting(false);
        return;
      }

      if (!captchaToken) {
        captchaToken = 'dev-bypass';
      }

      const payload = {
        studentId: formData.studentNumber,
        name: formData.name,
        branch: formData.branch,
        gender: formData.gender,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        residence: formData.residence,
        unstopId: formData.unstopId,
        cfTurnstileResponse: captchaToken,
        gRecaptchaResponse: captchaToken,
        recaptchaToken: captchaToken,
        captchaToken: captchaToken,
      };
      const data = await sendOtp(payload);
      setSessionToken(data.sessionToken);
      showToast('OTP sent to your email!');
      setDirection(1);
      setStep(3);
    } catch (err) {
      if (recaptchaRef.current && typeof recaptchaRef.current.reset === 'function') {
        recaptchaRef.current.reset();
      }
      if (err.errors) {
        setErrors(err.errors);
      }
      showToast(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    setIsSubmitting(true);
    try {
      const data = await verifyOtp(sessionToken, otpCode);
      setRegistrationData({ id: data.studentId, name: data.name });
      setIsRegistered(true);
      showToast('Registration Successful!');
    } catch (err) {
      showToast(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelOtp = () => {
    setDirection(-1);
    setStep(1);
  };

  const resetForm = () => {
    setFormData({
      name: '', studentNumber: '', email: '', gender: '',
      branch: '', phoneNumber: '', unstopId: '', residence: ''
    });
    setErrors({});
    setStep(1);
    setIsRegistered(false);
    setSessionToken('');
    setTurnstileToken('');
    setRegistrationData({ id: '', name: '' });
  };

  return (
    <div className="relative min-h-screen w-full antialiased overflow-x-hidden max-lg:overflow-y-hidden selection:bg-[#00d2ff]/30 cursor-none lg:cursor-none text-white">
      <CustomCursor />
      <BackgroundGrid />

      {/* Epic Volumetric Background Rays for the entire page */}
      <div className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen opacity-60">
        {/* Left Side Rays */}
        <div className="absolute inset-0">
          <SideRays
            speed={1.2}
            rayColor1="#0033ff"
            rayColor2="#ff00aa"
            intensity={1.2}
            spread={3}
            origin="top-left"
            tilt={-5}
            saturation={3.0}
            blend={0.5}
            falloff={1.5}
            opacity={0.6}
          />
        </div>
        
        {/* Right Side Rays */}
        <div className="absolute inset-0">
          <SideRays
            speed={1.4}
            rayColor1="#0033ff"
            rayColor2="#ff00aa"
            intensity={1.2}
            spread={2.5}
            origin="bottom-right"
            tilt={10}
            saturation={3.0}
            blend={0.5}
            falloff={1.5}
            opacity={0.6}
          />
        </div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center max-lg:h-[100dvh] max-lg:max-h-[100dvh]">
        <div className="w-full max-w-[420px] lg:max-w-[1200px] xl:max-w-[1320px] mx-auto px-6 md:px-8 lg:px-12 max-lg:px-3 max-lg:py-2 py-4 lg:py-0 flex flex-col items-center justify-center max-lg:h-[100dvh] max-lg:max-h-[100dvh] lg:h-screen overflow-hidden text-white relative z-10">
          {/* Toast Alert Banner */}
          {toast.show && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-indigo-900/90 border border-indigo-500/40 text-indigo-100 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-center shadow-2xl z-[100] animate-bounce">
              {toast.message}
            </div>
          )}

          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16 items-center justify-center transition-all duration-300">
            
            {/* Left Column: Branding (Always present on desktop, conditionally present on mobile) */}
            <div className={`lg:col-span-6 w-full h-full flex flex-col justify-center ${mobileView === 'branding' && !isRegistered ? 'flex' : 'hidden lg:flex'}`}>
              <BrandingSection
                key={`branding-${mobileView}`}
                showPoster={showPoster}
                setShowPoster={setShowPoster}
                handleClosePoster={handleClosePoster}
                isClosing={isClosing}
                onRegisterClick={() => {
                  setMobileView('form');
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
              />
            </div>

            {/* Right Column: Form or Success Badge */}
            <div className={`lg:col-span-6 w-full h-full flex flex-col justify-center ${(mobileView === 'form' || isRegistered) ? 'flex' : 'hidden lg:flex'}`}>
              <AnimatePresence mode="wait">
                {isRegistered ? (
                  <SuccessBadge 
                    key="success" 
                    formData={formData}
                    registrationData={registrationData}
                    resetForm={() => {
                      resetForm();
                      setMobileView('branding');
                    }} 
                  />
                ) : (
                  <FormContainer
                    key={`form-${mobileView}`}
                    step={step}
                    direction={direction}
                    formData={formData}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    turnstileToken={turnstileToken}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    handleVerifyOtp={handleVerifyOtp}
                    handleCancelOtp={handleCancelOtp}
                    navigateNext={navigateNext}
                    navigatePrev={navigatePrev}
                    onBackToBranding={() => setMobileView('branding')}
                    onTurnstileSuccess={(token) => setTurnstileToken(token)}
                    recaptchaRef={recaptchaRef}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationMain;
