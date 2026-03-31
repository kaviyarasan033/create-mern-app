import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setError, setLoading } from '../redux/slices/authSlice';
import api from '../services/api';

/**
 * Hook for managing authentication state and actions
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const loginUser = async (credentials) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      dispatch(login({ user, token }));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    loginUser,
    logoutUser
  };
};

export default useAuth;
