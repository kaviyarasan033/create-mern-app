import axios from 'axios';

const env = typeof import.meta !== 'undefined' ? import.meta.env : {};

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL || env.VITE_API_URL || '',
  timeout: Number(env.VITE_API_TIMEOUT || 10000),
});

// Request interceptor for tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isMetaRequest = error.config?.url?.includes('/api/meta');
    const originalRequest = error.config;

    if (error.response?.status === 401 && !isMetaRequest && !originalRequest._retry) {
      // Try to refresh token if expired
      if (error.response.data?.message === 'Token expired') {
        originalRequest._retry = true;
        
        try {
          const refreshResponse = await api.post('/api/auth/refresh');
          if (refreshResponse.data.success) {
            localStorage.setItem('token', refreshResponse.data.data.token);
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      } else {
        // Other 401 errors - logout user
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
