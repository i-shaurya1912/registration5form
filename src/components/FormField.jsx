import React from 'react';

const FormField = ({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  error,
  options = [],
}) => {
  const isSelect = type === 'select';

  const baseInputStyles = `
    w-full px-4 py-3.5 bg-[#030712]/40 rounded-xl text-white font-medium placeholder-[#5b6e9c]
    border transition-all duration-300 outline-none text-[13px] md:text-[14px]
    ${error 
      ? 'border-[#ff0055] focus:border-[#ff3366] shadow-[0_0_10px_rgba(255,0,85,0.15)] animate-shake' 
      : 'border-indigo-500/25 focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.25)]'
    }
  `;

  return (
    <div className="w-full relative group">
      {isSelect ? (
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`${baseInputStyles} appearance-none cursor-pointer ${
              !value ? 'text-[#5b6e9c]' : 'text-white'
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0b0f19] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron Indicator */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 group-focus-within:text-indigo-300">
            <svg
              className="w-4 h-4 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseInputStyles}
        />
      )}

      {/* Field Level Error Message */}
      {error && (
        <div className="absolute -bottom-4.5 left-2 text-[10px] text-[#ff0055] font-semibold animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
export { FormField };
