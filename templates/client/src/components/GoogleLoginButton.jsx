import React from 'react';
import { Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa6';
import firebaseAuthService from '../services/firebaseAuth';

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
    <Button 
      variant={variant}
      size={size}
      className={`w-100 google-login-btn ${className}`}
      onClick={handleGoogleSignIn}
    >
      <FaGoogle className="me-2" />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;