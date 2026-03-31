import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

/**
 * Global Redux Store Configuration
 */
const store = configureStore({
  reducer: {
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== 'production' // Enabled in development
});

export default store;
