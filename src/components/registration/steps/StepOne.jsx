import React from 'react';
import { FormField } from '../../FormField';
import { GENDER_OPTIONS } from '../constants';

export const StepOne = ({ formData, errors, handleInputChange, handleBlur }) => {
  return (
    <>
      <div className="w-full flex flex-col gap-6 lg:gap-8 relative">
        <FormField 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Enter Name"
          error={errors.name}
        />
        <FormField 
          name="studentNumber" 
          value={formData.studentNumber} 
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Enter Student Number"
          error={errors.studentNumber}
        />
      </div>

      <div className="w-full flex flex-col gap-6 lg:gap-8 relative">
        <FormField 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Enter College Email (@akgec.ac.in)"
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
    </>
  );
};
