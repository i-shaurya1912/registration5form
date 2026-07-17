import axios from 'axios';

const api = axios.create({
  baseURL: 'https://registration-api-izun.onrender.com',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      return Promise.reject(response.data);
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject({ success: false, message: 'Request cancelled.' });
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ success: false, message: 'Request timed out. Please try again.' });
    }
    if (!error.response) {
      return Promise.reject({ success: false, message: 'Network error. Please check your connection.' });
    }
    return Promise.reject(error.response.data || { success: false, message: 'Something went wrong.' });
  }
);

export const sendOtp = (payload) =>
  api.post('/api/auth/send-otp', payload).then((res) => res.data);

export const verifyOtp = (sessionToken, otp) =>
  api.post('/api/auth/verify-otp', { sessionToken, otp }).then((res) => res.data);
