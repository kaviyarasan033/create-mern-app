import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../services/apiService';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginPromise = api.post('/api/auth/login', { email, password });

    toast.promise(loginPromise, {
      loading: 'Authenticating...',
      success: (res) => {
        login(res.data.data.token, res.data.data.user);
        return 'Welcome back!';
      },
      error: (err) => err.response?.data?.message || 'Login failed'
    });
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="auth-card">
          <Card.Body>
            <h2 className="text-center mb-4 fw-bold">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 btn-lg mb-3">
                Sign In
              </Button>
            </Form>
            <div className="text-center mt-3 opacity-75">
              <span>New here? </span>
              <Link to="/register" className="text-white fw-bold">Create an account</Link>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
