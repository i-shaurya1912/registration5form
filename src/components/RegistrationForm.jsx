import React, { useState, useRef } from 'react';
import { FormField } from './FormField';
import { validateFieldName, validateForm } from '../validations/formValidation';
import PosterCard from './PosterCard';
import logoImg from './elements/LOGO CCC 6.png';

const BRANCH_OPTIONS = [
  { value: 'CSE', label: 'Computer Science & Engineering (CSE)' },
  { value: 'CS', label: 'Computer Science (CS)' },
  { value: 'CSE_AIML', label: 'CSE (AI & ML)' },
  { value: 'CSE_DS', label: 'CSE (Data Science)' },
  { value: 'AIML', label: 'Artificial Intelligence & Machine Learning' },
  { value: 'IT', label: 'Information Technology (IT)' },
  { value: 'ECE', label: 'Electronics & Communication (ECE)' },
  { value: 'EN', label: 'Electrical & Electronics (EN)' },
  { value: 'ME', label: 'Mechanical Engineering (ME)' },
  { value: 'CE', label: 'Civil Engineering (CE)' }
];

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Prefer not to say' }
];

const RESIDENCE_OPTIONS = [
  { value: 'Hosteler', label: 'Hosteler' },
  { value: 'DayScholar', label: 'Day Scholar' }
];

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [showPoster, setShowPoster] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClosePoster = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPoster(false);
      setIsClosing(false);
    }, 400);
  };
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error on change
    const err = validateFieldName(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleNextStep = () => {
    const page1Fields = ['name', 'studentNumber', 'email', 'gender'];
    const newErrors = {};
    let hasError = false;

    page1Fields.forEach((field) => {
      const err = validateFieldName(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      showToast('Please fix validation errors on page 1.');
      return false;
    }

    setStep(2);
    return true;
  };

  const handlePrevStep = () => {
    setStep(1);
    return true;
  };

  const transitionStep = (direction) => {
    if (direction === 'next' && step < 2) {
      setStep(2);
      return true;
    }

    if (direction === 'prev' && step > 1) {
      setStep(1);
      return true;
    }

    return false;
  };

  const isScrolling = useRef(false);

  const isMobileViewport = () => typeof window !== 'undefined' && window.innerWidth < 1024;

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
    if (!isMobileViewport()) return;
    if (isTargetScrollable(e.target, e.currentTarget)) return;
    if (isScrolling.current) return;

    if (e.deltaY > 5) {
      navigateNext();
    } else if (e.deltaY < -5) {
      navigatePrev();
    }
  };

  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  const handleTouchStart = (e) => {
    if (!isMobileViewport()) return;
    if (isTargetScrollable(e.target, e.currentTarget)) {
      touchStartY.current = null;
      return;
    }
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!isMobileViewport()) return;
    if (touchStartY.current === null) return;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isMobileViewport()) return;
    if (touchStartY.current === null) return;
    if (isScrolling.current) return;
    const swipeDistance = touchStartY.current - touchEndY.current;
    
    if (swipeDistance > 50) {
      navigateNext();
    } else if (swipeDistance < -50) {
      navigatePrev();
    }
  };

  const navigateNext = () => {
    if (step < 2) {
      isScrolling.current = true;
      transitionStep('next');
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  };

  const navigatePrev = () => {
    if (step > 1) {
      isScrolling.current = true;
      transitionStep('prev');
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fill all fields correctly before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      setRegistrationId(`CCC-SP26-${Math.floor(10000 + Math.random() * 90000)}`);
      showToast('Registration Successful!');
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      studentNumber: '',
      email: '',
      gender: '',
      branch: '',
      phoneNumber: '',
      unstopId: '',
      residence: ''
    });
    setErrors({});
    setStep(1);
    setIsRegistered(false);
  };

  return (
    <div className="w-full max-w-[420px] lg:max-w-[1240px] mx-auto px-4 md:px-6 py-4 lg:py-8 flex flex-col items-center justify-between min-h-screen md:min-h-0 md:h-full text-white relative z-10 overflow-visible">
      
      {/* Toast Alert Banner */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-indigo-900/90 border border-indigo-500/40 text-indigo-100 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-center shadow-2xl z-55 animate-bounce">
          {toast.message}
        </div>
      )}

      {isRegistered ? (
        /* Receipt ticket badge on success (Desktop & Mobile) */
        <div className="w-full max-w-[420px] mx-auto my-auto bg-[#050b18]/90 border border-[#00d2ff]/40 shadow-[0_0_35px_rgba(0,210,255,0.2)] rounded-[24px] p-6 md:p-8 text-center animate-scale-up backdrop-blur-md">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#00d2ff] to-[#a855f7] rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(0,210,255,0.4)] animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-wider mb-1 text-white">SUCCESSFULLY REGISTERED</h3>
          <p className="text-xs text-[#5b6e9c] mb-6">Your entry badge has been generated</p>
          
          <div className="bg-[#020617]/80 rounded-2xl border border-white/5 p-4 md:p-5 text-left mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d2ff]/5 rounded-full blur-2xl -z-1" />
            <div className="text-[9px] text-[#5b6e9c] tracking-widest font-semibold uppercase mb-1">REGISTRATION ID</div>
            <div className="text-base font-extrabold tracking-wider text-[#00d2ff] mb-4 select-all">{registrationId}</div>
            
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-3 text-xs md:text-sm">
              <div>
                <span className="block text-[9px] text-[#5b6e9c] uppercase font-semibold">NAME</span>
                <span className="font-semibold text-white/90 truncate block">{formData.name}</span>
              </div>
              <div>
                <span className="block text-[9px] text-[#5b6e9c] uppercase font-semibold">STUDENT NO</span>
                <span className="font-semibold text-white/90">{formData.studentNumber}</span>
              </div>
              <div>
                <span className="block text-[9px] text-[#5b6e9c] uppercase font-semibold">BRANCH</span>
                <span className="font-semibold text-white/90">{formData.branch}</span>
              </div>
              <div>
                <span className="block text-[9px] text-[#5b6e9c] uppercase font-semibold">RESIDENCE</span>
                <span className="font-semibold text-white/90">{formData.residence}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={resetForm}
            className="w-full py-4 rounded-xl font-bold bg-[#1e293b]/60 border border-white/10 text-xs tracking-[0.2em] hover:bg-[#1e293b]/90 hover:border-white/30 transition-all duration-300"
          >
            REGISTER ANOTHER STUDENT
          </button>
        </div>
      ) : (
        /* Layout Grid */
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center justify-center my-auto transition-all duration-300">
          
          {/* ================= LEFT COLUMN (Branding or Poster) ================= */}
          <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left h-full justify-center w-full transition-all duration-300">
            {showPoster ? (
              <div className="w-full max-w-[480px] mx-auto">
                <PosterCard onClose={handleClosePoster} isClosing={isClosing} />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center lg:items-start animate-fade-in">
                {/* Logo and Group Title */}
                <div className="flex items-center gap-1.5 mb-2 hover:scale-102 transition-transform duration-300">
                  <img src={logoImg} alt="CCC Logo" className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] object-contain animate-spin-slow" />
                  <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.25em] text-white/95">
                    CLOUD COMPUTING CELL
                  </span>
                </div>
                <span className="text-[10px] md:text-[11px] text-[#5b6e9c] font-semibold tracking-[0.2em] lowercase italic mb-2 ml-1">
                  presents
                </span>
                
                {/* Glow SPOCC'26 headings */}
                <h1 className="text-[28px] md:text-[34px] lg:text-[40px] font-extrabold tracking-widest text-[#00d2ff] drop-shadow-[0_0_12px_rgba(0,210,255,0.45)] mb-1 select-none leading-none">
                  SPOCC&apos;26
                </h1>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-blue-400/90 mb-5 ml-1">
                  THE RECRUITMENT DRIVE
                </span>

                {/* View Poster button */}
                <button 
                  onClick={() => setShowPoster(true)}
                  className="px-6 py-2 rounded-full border border-white/20 text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/90 bg-[#1e293b]/60 hover:bg-[#1e293b]/90 hover:border-white/40 hover:scale-105 transition-all duration-300 mb-8 lg:mb-12 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.2)] cursor-pointer"
                >
                  View Poster
                </button>

                {/* THINK.DEVELOP.DEPLOY branding block */}
                <div className="hidden lg:flex flex-col gap-1.5 mb-10 w-full">
                  <span className="text-[14px] md:text-[15px] font-bold tracking-[0.3em] uppercase text-white/95 hover:text-[#00d2ff] transition-colors duration-300">
                    THINK.DEVELOP.DEPLOY
                  </span>
                  <span className="text-[10px] text-[#5b6e9c] font-semibold leading-relaxed">
                    Every expert was once a beginner.
                    <span className="block mt-0.5">Take your first step with us.</span>
                  </span>
                </div>

                {/* Coordinator buttons (Side by Side in Desktop/Mobile) */}
                <div className="flex gap-4 w-full mb-6 max-w-[360px] lg:max-w-none">
                  <button 
                    onClick={() => copyToClipboard('+919546252112', 'Coordinator 1 Contact')}
                    className="flex-1 py-2 px-3 border border-white/10 rounded-md text-[10px] md:text-[11px] text-white/90 bg-[#1e293b]/40 hover:bg-[#1e293b]/70 transition-all duration-300 hover:scale-101 active:scale-99 select-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Coordinator 1 📞
                  </button>
                  <button 
                    onClick={() => copyToClipboard('+918887654321', 'Coordinator 2 Contact')}
                    className="flex-1 py-2 px-3 border border-white/10 rounded-md text-[10px] md:text-[11px] text-white/90 bg-[#1e293b]/40 hover:bg-[#1e293b]/70 transition-all duration-300 hover:scale-101 active:scale-99 select-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Coordinator 2 📞
                  </button>
                </div>

                {/* Social media icons links container */}
                <div className="flex gap-6 max-w-[360px] lg:max-w-none lg:ml-1 mb-8 lg:mb-0">
                  <a 
                    href="https://www.facebook.com/ccc.akgec" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-7.5 h-7.5 flex items-center justify-center bg-[#0d59b2] hover:bg-[#1070e0] border border-blue-400/10 rounded-md shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Facebook Link"
                  >
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2.8V1.5c-.8-.1-2.2-.2-3.6-.2-3.7 0-5.2 2-5.2 5.5V8z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/cloud-computing-cell-akgec/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-7.5 h-7.5 flex items-center justify-center bg-[#006097] hover:bg-[#0074b6] border border-blue-400/10 rounded-md shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="LinkedIn Link"
                  >
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/ccc_akgec/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7.5 h-7.5 flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:brightness-110 border border-pink-400/10 rounded-md shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Instagram Link"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>



          {/* ================= RIGHT COLUMN (Forms Card Wrapper) ================= */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center w-full transition-all duration-300">
            {/* Desktop form layout (Shown on lg sizes and above) */}
            <div className="hidden lg:flex w-full max-w-[500px] mx-auto">
              <form 
                onSubmit={handleSubmit}
                className="w-full rounded-[24px] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.08)] p-8 bg-[#040815]/65 backdrop-blur-md flex flex-col relative overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              >
                <h2 className="text-[20px] md:text-[23px] font-bold tracking-wider text-center mb-6 text-white/95">
                  Register here
                </h2>

                <div className="flex flex-col gap-5.5 relative pb-6 min-h-[385px]">
                  {step === 1 && (
                    <div className="flex flex-col gap-5.5 animate-slide-right w-full">
                      <FormField 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Enter Name"
                        error={errors.name}
                      />
                      <FormField 
                        name="studentNumber" 
                        value={formData.studentNumber} 
                        onChange={handleInputChange} 
                        placeholder="Enter Student Number"
                        error={errors.studentNumber}
                      />
                      <FormField 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Enter College Email Id"
                        error={errors.email}
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
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-5.5 animate-slide-left w-full">
                      <FormField 
                        type="select" 
                        name="branch" 
                        value={formData.branch} 
                        onChange={handleInputChange} 
                        placeholder="Branch"
                        options={BRANCH_OPTIONS}
                        error={errors.branch}
                      />
                      <FormField 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleInputChange} 
                        placeholder="Enter Phone Number"
                        error={errors.phoneNumber}
                      />
                      <FormField 
                        name="unstopId" 
                        value={formData.unstopId} 
                        onChange={handleInputChange} 
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

                      {/* Gradient blueprint submit button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-3 py-4 rounded-xl font-bold text-sm tracking-[0.25em] text-white bg-gradient-to-r from-[#00b0ff] to-[#bd22ff] border border-blue-400/25 hover:opacity-95 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] shadow-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
                      >
                        {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination Dots for Desktop */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  <div className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${step === 1 ? 'bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.8)]' : 'bg-white/20'}`} />
                  <div className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${step === 2 ? 'bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.8)]' : 'bg-white/20'}`} />
                </div>
              </form>
            </div>
            
            {/* Mobile form layout (Shown on screens < lg) */}
            <div 
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full lg:hidden flex flex-col gap-6 relative pb-8"
            >
              <h2 className="text-[18px] md:text-[22px] font-bold tracking-wider text-center mb-1 text-white/90">
                Register here
              </h2>
              
              {step === 1 && (
                <div className="w-full flex flex-col gap-5 animate-slide-right">
                  <div 
                    className="w-full rounded-[24px] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.08)] p-6 bg-[#040815]/65 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  >
                    <FormField 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Enter Name"
                      error={errors.name}
                    />
                    <FormField 
                      name="studentNumber" 
                      value={formData.studentNumber} 
                      onChange={handleInputChange} 
                      placeholder="Enter Student Number"
                      error={errors.studentNumber}
                    />
                  </div>

                  <div 
                    className="w-full rounded-[24px] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.08)] p-6 bg-[#040815]/65 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  >
                    <FormField 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Enter College Email Id"
                      error={errors.email}
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

                  {/* Mobile Right Chevron Navigation Button */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-indigo-600/40 border border-indigo-500/30 rounded-full hover:bg-indigo-600/80 transition-all duration-300 hover:scale-105 select-none active:scale-95 shadow-md z-20 cursor-pointer"
                    aria-label="Next Step"
                  >
                    <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="w-full flex flex-col gap-5 animate-slide-left">
                  <div 
                    className="w-full rounded-[24px] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.08)] p-6 bg-[#040815]/65 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  >
                    <FormField 
                      type="select" 
                      name="branch" 
                      value={formData.branch} 
                      onChange={handleInputChange} 
                      placeholder="Branch"
                      options={BRANCH_OPTIONS}
                      error={errors.branch}
                    />
                    <FormField 
                      name="phoneNumber" 
                      value={formData.phoneNumber} 
                      onChange={handleInputChange} 
                      placeholder="Enter Phone Number"
                      error={errors.phoneNumber}
                    />
                  </div>

                  <div 
                    className="w-full rounded-[24px] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.08)] p-6 bg-[#040815]/65 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  >
                    <FormField 
                      name="unstopId" 
                      value={formData.unstopId} 
                      onChange={handleInputChange} 
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

                  {/* Mobile Left Chevron Navigation Button */}
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-indigo-600/40 border border-indigo-500/30 rounded-full hover:bg-indigo-600/80 transition-all duration-300 hover:scale-105 select-none active:scale-95 shadow-md z-20 cursor-pointer"
                    aria-label="Previous Step"
                  >
                    <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-xl font-bold text-sm tracking-[0.25em] text-white bg-gradient-to-r from-[#00b0ff] to-[#bd22ff] border border-blue-400/25 hover:opacity-95 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] shadow-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              )}

              {/* Pagination Dots for Mobile */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 flex gap-3 z-30">
                <div className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${step === 1 ? 'bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.8)]' : 'bg-white/20'}`} />
                <div className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${step === 2 ? 'bg-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.8)]' : 'bg-white/20'}`} />
              </div>
            </div>

          </div>

        </div>
      )}
      
      {/* Mobile-Only Mobile Footer Subtext (Header items occupy footer on mobile sizing) */}
      <footer className="w-full flex lg:hidden flex-col items-center mt-3 text-center">
        <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-white/95 mb-1.5 select-none">
          THINK.DEVELOP.DEPLOY
        </span>
        <span className="text-[8px] text-[#5b6e9c] font-semibold leading-relaxed">
          Every expert was once a beginner.
          <span className="block mt-0.5">Take your first step with us.</span>
        </span>
      </footer>

    </div>
  );
};

export default RegistrationForm;
export { RegistrationForm };
