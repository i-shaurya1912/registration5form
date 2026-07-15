import React from 'react';
import { FormField } from '../../FormField';
import { BRANCH_OPTIONS, RESIDENCE_OPTIONS } from '../constants';

export const StepTwo = ({ formData, errors, handleInputChange, isSubmitting }) => {
  return (
    <>
      <div className="w-full flex flex-col gap-6 relative">
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

      <div className="w-full flex flex-col gap-6 relative">
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
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 rounded-xl font-bold text-sm tracking-[0.25em] text-white bg-gradient-to-r from-[#00b0ff] to-[#bd22ff] border border-blue-400/25 hover:opacity-95 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] shadow-md transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
        >
          {isSubmitting ? 'SENDING OTP...' : 'SEND OTP'}
        </button>
      </div>
    </>
  );
};
