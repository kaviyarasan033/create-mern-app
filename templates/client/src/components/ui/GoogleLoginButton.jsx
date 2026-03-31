import React from 'react';
import { Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa6';
import firebaseAuthService from '../../services/firebaseAuth';

const GoogleLoginButton = ({ onSuccess, onError, variant = 'outline-primary', size = 'lg', className = '' }) => {
  
  const handleGoogleSignIn = async () => {
    try {
      const result = await firebaseAuthService.signInWithGoogle();
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };
  
  return (
    <button 
      type="button"
      className={`w-100 btn text-white ${className}`}
      style={{ backgroundColor: '#4285F4', padding: '0.8rem', borderRadius: '8px', fontWeight: '500', border: 'none' }}
      onClick={handleGoogleSignIn}
    >
      <FaGoogle className="me-2" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
