import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Form, Button, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import api from '../services/apiService';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');

    const registerPromise = api.post('/api/auth/register', { 
      name: formData.name, 
      email: formData.email, 
      password: formData.password 
    });

    toast.promise(registerPromise, {
      loading: 'Creating your account...',
      success: () => {
        navigate('/');
        return 'Account created! Please login.';
      },
      error: (err) => err.response?.data?.message || 'Registration failed'
    });
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="auth-card">
          <Card.Body>
            <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
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
            <div className="text-center mt-3 opacity-75">
              <span>Already have an account? </span>
              <Link to="/" className="text-white fw-bold">Login</Link>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
