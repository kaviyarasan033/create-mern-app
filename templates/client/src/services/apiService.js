import axios from 'axios';

const env = typeof import.meta !== 'undefined' ? import.meta.env : {};

const api = axios.create({
  baseURL: env.VITE_API_URL || '',
  timeout: Number(env.VITE_API_TIMEOUT || 10000),
});

// Request interceptor for tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auto-logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
