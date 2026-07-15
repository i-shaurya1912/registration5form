import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { validateFieldName, validateForm } from '../../validations/formValidation';
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
  const [registrationId, setRegistrationId] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const err = validateFieldName(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fill all fields correctly before submitting.');

      const page1Fields = ['name', 'studentNumber', 'email', 'gender'];
      if (page1Fields.some(field => validationErrors[field])) {
        if (step !== 1) {
          setDirection(-1);
          setStep(1);
        }
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to send OTP, then slide to Step 3
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('OTP sent to your email!');
      setDirection(1);
      setStep(3); // Slide to OTP Step
    }, 1200);
  };

  const handleVerifyOtp = (otpCode) => {
    setIsSubmitting(true);
    // Simulate API call to verify OTP and register
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      setRegistrationId(`CCC-SP26-${Math.floor(10000 + Math.random() * 90000)}`);
      showToast('Registration Successful!');
    }, 1500);
  };

  const handleCancelOtp = () => {
    // Go back to form step 2
    setDirection(-1);
    setStep(2);
  };

  const resetForm = () => {
    setFormData({
      name: '', studentNumber: '', email: '', gender: '',
      branch: '', phoneNumber: '', unstopId: '', residence: ''
    });
    setErrors({});
    setStep(1);
    setIsRegistered(false);
  };

  return (
    <div className="relative min-h-screen w-full antialiased overflow-x-hidden selection:bg-[#00d2ff]/30 cursor-none lg:cursor-none text-white">
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

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[420px] lg:max-w-[1240px] mx-auto px-4 md:px-6 py-4 lg:py-8 flex flex-col items-center justify-between h-screen overflow-hidden text-white relative z-10">
          {/* Toast Alert Banner */}
          {toast.show && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-indigo-900/90 border border-indigo-500/40 text-indigo-100 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-center shadow-2xl z-[100] animate-bounce">
              {toast.message}
            </div>
          )}

          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center justify-center transition-all duration-300">
            
            {/* Left Column: Branding (Always present on desktop, conditionally present on mobile) */}
            <div className={`lg:col-span-6 w-full h-full flex flex-col justify-center ${mobileView === 'branding' && !isRegistered ? 'flex' : 'hidden lg:flex'}`}>
              <BrandingSection
                key={`branding-${mobileView}`}
                showPoster={showPoster}
                setShowPoster={setShowPoster}
                handleClosePoster={handleClosePoster}
                isClosing={isClosing}
                onRegisterClick={() => setMobileView('form')}
              />
            </div>

            {/* Right Column: Form or Success Badge */}
            <div className={`lg:col-span-6 w-full h-full flex flex-col justify-center ${(mobileView === 'form' || isRegistered) ? 'flex' : 'hidden lg:flex'}`}>
              <AnimatePresence mode="wait">
                {isRegistered ? (
                  <SuccessBadge 
                    key="success" 
                    formData={formData} 
                    registrationId={registrationId} 
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
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleVerifyOtp={handleVerifyOtp}
                    handleCancelOtp={handleCancelOtp}
                    navigateNext={navigateNext}
                    navigatePrev={navigatePrev}
                    onBackToBranding={() => setMobileView('branding')}
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
