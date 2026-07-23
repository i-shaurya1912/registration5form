import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FormField = ({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  options = [],
  readOnly = false,
}) => {
  const isSelect = type === 'select';
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isSelect) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSelect]);

  const handleSelect = (optValue) => {
    onChange({ target: { name, value: optValue } });
    setIsOpen(false);
  };

  const baseInputStyles = `
    w-full px-3.5 py-2.5 max-lg:py-2 md:px-5 md:py-4 lg:py-5 bg-transparent rounded-xl text-white font-bold placeholder-[#5b6e9c]
    transition-all duration-300 outline-none text-[11px] md:text-[15px] lg:text-[16px] tracking-wide relative z-10
    ${error 
      ? 'border-2 border-[#ff0055] shadow-[0_0_30px_rgba(255,0,85,0.6),inset_0_0_20px_rgba(255,0,85,0.2)] animate-shake' 
      : 'border-2 border-transparent ' + (isOpen || isFocused 
          ? 'shadow-[0_0_40px_rgba(0,210,255,0.6),inset_0_0_25px_rgba(0,210,255,0.25)]' 
          : 'animate-input-shadow hover:shadow-[0_0_30px_rgba(0,210,255,0.4),inset_0_0_20px_rgba(0,210,255,0.15)]')
    }
  `;

  const GradientBorder = ({ isActive }) => (
    <div 
      className={`absolute inset-0 pointer-events-none rounded-xl transition-all duration-300 z-0 ${!isActive ? 'animate-input-border' : ''}`}
      style={{
        padding: '2px', // Matches border-2
        background: 'linear-gradient(to bottom right, #ffffff, #00d2ff, #a855f7)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude'
      }}
    />
  );

  return (
    <div className={`w-full relative group transition-all duration-300 ${isOpen ? 'z-[100]' : 'z-30'}`}>
      <style>{`
        @media (min-width: 1024px) {
          @keyframes input-shadow-flicker {
            0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
              box-shadow: 0 0 30px rgba(0, 210, 255, 0.35), inset 0 0 15px rgba(0, 210, 255, 0.1);
            }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
              box-shadow: none;
            }
          }
          .animate-input-shadow {
            animation: input-shadow-flicker 8s infinite;
          }
          @keyframes input-border-flicker {
            0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 0.9; }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.15; }
          }
          .animate-input-border {
            animation: input-border-flicker 8s infinite;
          }
        }
      `}</style>

      {isSelect ? (
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            className={`${baseInputStyles} flex items-center justify-between cursor-pointer select-none ${
              !value ? 'text-[#5b6e9c]' : 'text-white'
            }`}
          >
            <span className="truncate">
              {value ? options.find(o => o.value === value)?.label : placeholder}
            </span>
            <motion.div 
              animate={{ rotate: isOpen ? 180 : 0 }} 
              transition={{ duration: 0.2 }} 
              className={`flex-shrink-0 ml-2 transition-colors duration-300 ${isOpen ? 'text-[#00d2ff]' : 'text-indigo-400 group-hover:text-indigo-300'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>
          {!error && <GradientBorder isActive={isOpen} />}

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -5, scale: 0.98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -5, scale: 0.98 }} 
                transition={{ duration: 0.15 }} 
                className="absolute top-full left-0 right-0 mt-2 z-[100]"
              >
                <div 
                  className="w-full relative p-1.5 bg-[#050b18]/95 backdrop-blur-xl rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-h-[220px] overflow-y-auto"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#00d2ff transparent' }}
                >
                  {options.map((opt) => (
                    <div 
                      key={opt.value} 
                      onClick={() => handleSelect(opt.value)} 
                      className={`
                        px-4 py-3 rounded-lg cursor-pointer text-[13px] md:text-[14px] font-medium transition-all duration-200
                        hover:bg-[#00d2ff]/10 hover:text-[#00d2ff] 
                        ${value === opt.value ? 'text-[#00d2ff] bg-[#00d2ff]/15 font-semibold' : 'text-white/80'}
                      `}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>

                {/* Gradient Border for Dropdown Popup (Placed after so it renders on top) */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-xl z-10"
                  style={{
                    padding: '1.5px', // slightly thicker to be visible over background
                    background: 'linear-gradient(to bottom right, #ffffff, #00d2ff, #a855f7)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative w-full">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            placeholder={placeholder}
            className={`${baseInputStyles} ${readOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
          />
          {!error && <GradientBorder isActive={isFocused} />}
        </div>
      )}

      {/* Field Level Error Message */}
      {error && (
        <div className="text-[10px] text-[#ff0055] font-semibold mt-1 ml-2 animate-fade-in pointer-events-none">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
export { FormField };
