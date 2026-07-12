export const validateFieldName = (name, value) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (!/^[a-zA-Z\s]{2,50}$/.test(value.trim())) {
        return 'Name must contain only alphabets and be 2-50 characters';
      }
      return '';

    case 'studentNumber':
      if (!value.trim()) return 'Student number is required';
      if (!/^\d{7}$/.test(value.trim())) {
        return 'Student number must be exactly 7 digits (e.g., 2312040)';
      }
      return '';

    case 'email':
      if (!value.trim()) return 'College Email ID is required';
      // Simple check for valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      // If we want to recommend/check college domain specifically:
      if (!value.toLowerCase().endsWith('@akgec.ac.in') && !value.toLowerCase().includes('.akgec.')) {
        // Optional warning indicator or standard validation, let's keep it advisory or allow all
        // to prevent lockouts, but we can do a softer warning or enforce. Let's make it advisory.
      }
      return '';

    case 'gender':
      if (!value) return 'Gender is required';
      return '';

    case 'branch':
      if (!value) return 'Branch is required';
      return '';

    case 'phoneNumber':
      if (!value.trim()) return 'Phone number is required';
      if (!/^\d{10}$/.test(value.trim())) {
        return 'Phone number must be exactly 10 digits';
      }
      return '';

    case 'unstopId':
      if (!value.trim()) return 'Unstop ID is required. (Enter NaN if not registered)';
      return '';

    case 'residence':
      if (!value) return 'Residence select is required';
      return '';

    default:
      return '';
  }
};

export const validateForm = (data) => {
  const errors = {};
  Object.keys(data).forEach((key) => {
    const err = validateFieldName(key, data[key]);
    if (err) {
      errors[key] = err;
    }
  });
  return errors;
};
