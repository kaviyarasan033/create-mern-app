import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/apiService';
import firebaseAuthService from '../services/firebaseAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
    
    // Listen for Firebase auth state changes
    const unsubscribe = firebaseAuthService.onAuthStateChange((firebaseUser) => {
      setFirebaseUser(firebaseUser);
    });
    
    return unsubscribe;
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setUser(res.data.data);
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await firebaseAuthService.signOut();
    } catch (error) {
      console.error('Firebase sign out error:', error);
    }
    localStorage.removeItem('token');
    setUser(null);
    setFirebaseUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      firebaseUser,
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
