import MernToast from '../utils/MernToast';

const env = typeof import.meta !== 'undefined' ? import.meta.env : {};
const BASE_URL = env.VITE_API_BASE_URL || env.VITE_API_URL || '';
const TIMEOUT = Number(env.VITE_API_TIMEOUT || 10000);

/**
 * Enhanced Fetch API wrapper for MERN Pro
 * Replacement for Axios with built-in security and interceptors
 */
const handleResponse = async (response, config) => {
  const isMetaRequest = config.url?.includes('/api/meta');
  
  if (!response.ok) {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'Unexpected response from server' };
    }

    const error = {
      response: {
        status: response.status,
        data,
      },
      config,
    };

    // Standard high-level error toasts
    if (response.status === 503) {
      MernToast(data.message || 'Database connection error.', 'error');
    } else if (response.status >= 500) {
      MernToast(data.message || 'Internal server error.', 'error');
    }

    // Advanced Authentication & Token Refresh logic
    if (response.status === 401 && !isMetaRequest && !config._retry) {
      if (data.message === 'Token expired') {
        config._retry = true;
        try {
          // Attempt refresh through a dedicated POST call
          const refreshRes = await api.post('/api/auth/refresh');
          if (refreshRes.success) {
            localStorage.setItem('token', refreshRes.data.token);
            // Re-execute original request with new token
            return api(config.url, { ...config, _retry: true });
          }
        } catch (refreshErr) {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      } else {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }

    throw error;
  }

  // Success: Return data in a format compatible with existing Axios calls (.data)
  const result = await response.json().catch(() => ({}));
  return { data: result, status: response.status, headers: response.headers };
};

const api = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || TIMEOUT);

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Basic CSRF protection hint
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    signal: controller.signal,
  };

  try {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, config);
    clearTimeout(timeoutId);
    return await handleResponse(response, { url, ...config });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      MernToast('Connection timed out. High security threshold reached.', 'error');
    } else if (!error.response) {
      MernToast('Cannot connect to backend server. Network security error.', 'error');
    }
    throw error;
  }
};

// Axios-like convenience methods
api.get = (url, options = {}) => api(url, { ...options, method: 'GET' });
api.post = (url, data, options = {}) => api(url, { ...options, method: 'POST', body: JSON.stringify(data) });
api.put = (url, data, options = {}) => api(url, { ...options, method: 'PUT', body: JSON.stringify(data) });
api.patch = (url, data, options = {}) => api(url, { ...options, method: 'PATCH', body: JSON.stringify(data) });
api.delete = (url, options = {}) => api(url, { ...options, method: 'DELETE' });

export default api;

