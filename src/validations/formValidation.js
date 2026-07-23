const BRANCHES = ['CSE', 'CSE(AIML)', 'CSE(DS)', 'AIML', 'CS', 'CSE(H)', 'IT', 'CSIT', 'ECE', 'EN', 'Civil', 'ME'];
const GENDERS = ['Male', 'Female'];
const RESIDENCES = ['Hosteller', 'Day Scholar'];

const NAME_REGEX = /^[A-Za-z ]+$/;
const STUDENT_NO_REGEX = /^25[0-9]{5,6}$/;
const EMAIL_REGEX = /^[a-z.]{3,}[0-9]+@akgec\.ac\.in$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

export const validateField = (name, value, formData = {}) => {
  const v = typeof value === 'string' ? value.trim() : value;

  switch (name) {
    case 'name':
      if (!v) return 'Name is required';
      if (v.length < 3) return 'Min 3 characters';
      if (v.length > 50) return 'Invalid Name';
      if (!NAME_REGEX.test(v)) return 'Invalid Name';
      return '';

    case 'studentNumber':
      if (!v) return 'Student number is required';
      if (!STUDENT_NO_REGEX.test(v)) return 'Invalid Student Number';
      return '';

    case 'email': {
      if (!v) return 'Email is required';
      const lower = v.toLowerCase();
      if (!lower.endsWith('@akgec.ac.in')) return 'Invalid Email';
      if (!EMAIL_REGEX.test(lower)) return 'Invalid Email';
      const localPart = lower.split('@')[0];
      const numMatch = localPart.match(/(\d+)$/);
      if (numMatch && formData.studentNumber && numMatch[0] !== formData.studentNumber.trim()) {
        return 'Invalid Email';
      }
      return '';
    }

    case 'gender':
      if (!v) return 'Select gender';
      if (!GENDERS.includes(v)) return 'Select gender';
      return '';

    case 'branch':
      if (!v) return 'Select branch';
      if (!BRANCHES.includes(v)) return 'Select branch';
      return '';

    case 'phoneNumber':
      if (!v) return 'Phone number is required';
      if (!PHONE_REGEX.test(v)) return 'Invalid phone number (10 digits, starts with 6-9)';
      return '';

    case 'residence':
      if (!v) return 'Select residence';
      if (!RESIDENCES.includes(v)) return 'Select residence';
      return '';

    case 'unstopId':
      if (!v) return 'Unstop ID is required';
      return '';

    default:
      return '';
  }
};

export const validateForm = (data) => {
  const errors = {};
  const fields = ['name', 'studentNumber', 'email', 'gender', 'branch', 'phoneNumber', 'unstopId', 'residence'];
  fields.forEach((key) => {
    const err = validateField(key, data[key], data);
    if (err) errors[key] = err;
  });
  return errors;
};

export const validateFieldName = validateField;
