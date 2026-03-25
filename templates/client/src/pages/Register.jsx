import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Button, Card } from 'react-bootstrap';
import MernToast from '../utils/MernToast';
import api from '../services/apiService';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { FaCircleCheck, FaGoogle, FaIdCard, FaUserPlus } from 'react-icons/fa6';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return MernToast('Passwords do not match', 'error');

    try {
      MernToast('Creating your account...', 'success');
      await api.post('/api/auth/register', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      navigate('/');
      MernToast('Account created! Please login.');
    } catch (err) {
      MernToast(err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  const handleGoogleSuccess = (result) => {
    MernToast('Account created with Google!');
    navigate('/dashboard');
  };

  const handleGoogleError = (error) => {
    MernToast('Google authentication failed', 'error');
  };

  return (
    <div className="auth-shell register-shell">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-grid"
      >
        <div className="auth-copy auth-copy-compact">
          <div className="hero-announcement">
            <span className="hero-announcement-badge">Register</span>
            <span>Create a new account for MERN_Solution without changing your existing backend auth flow.</span>
          </div>
          <span className="eyebrow">Secure onboarding</span>
          <h1>Create a developer account in a simple, clean starter interface.</h1>
          <p>
            Keep your current API and token logic while giving MERN_Solution a more professional registration experience.
          </p>
          <div className="feature-list feature-list-compact">
            <span><FaCircleCheck /> JWT-ready sign up</span>
            <span><FaCircleCheck /> Mongo-backed account creation</span>
            <span><FaCircleCheck /> Responsive UI for all devices</span>
          </div>
          <div className="product-preview-grid product-preview-grid-single">
            <div className="product-preview-card">
              <strong>Why this flow works</strong>
              <p>Clear forms, better spacing, and a documentation-friendly UI without changing auth implementation.</p>
            </div>
          </div>
        </div>
        <Card className="auth-card">
          <Card.Body>
            <div className="card-icon"><FaUserPlus /></div>
            <h2 className="mb-3 fw-bold">Create account</h2>
            <p className="auth-subtitle">Start with a secure JWT flow and a Mongo-ready backend.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="John Doe"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </Form.Group>
               <Button variant="primary" type="submit" className="w-100 btn-lg mb-3">
                 Create Account
               </Button>
             </Form>
             
             <div className="auth-divider">
               <span>Or sign up with</span>
             </div>
             
             <GoogleLoginButton 
               onSuccess={handleGoogleSuccess}
               onError={handleGoogleError}
               className="mb-3"
             />
             
             <div className="auth-links">
               <span>Already have an account? <Link to="/">Login</Link></span>
               <span><FaIdCard /> MVC auth ready</span>
             </div>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
