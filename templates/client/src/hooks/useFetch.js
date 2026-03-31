import { useState, useCallback } from 'react';
import api from '../services/api';
import { logError } from '../utils/debug';

/**
 * Generic hook for API calls with loading/error states
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, { params });
      setData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      logError(err, 'useFetch');
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetchData, setData };
};

export default useFetch;
