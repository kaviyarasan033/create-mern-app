import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../services/apiService';
import { FaArrowRight, FaKey, FaLock, FaUserShield } from 'react-icons/fa6';

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
    <div className="auth-shell">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-grid"
      >
        <div className="auth-copy">
          <span className="eyebrow">Built-in MERN starter</span>
          <h1>Ship login, routes, controllers, and docs from day one.</h1>
          <p>
            This starter includes JWT auth, MVC folders, a docs endpoint, and generator commands for rapid MERN development.
          </p>
          <div className="feature-list">
            <span><FaUserShield /> JWT auth flow</span>
            <span><FaKey /> Demo login seed</span>
            <span><FaArrowRight /> Built-in migration commands</span>
          </div>
          <div className="demo-credentials">
            <strong>Default demo login</strong>
            <span>`demo@mernkit.dev`</span>
            <span>`Password123!`</span>
            <small>Run `cd server && npm run seed:demo` first.</small>
          </div>
        </div>

        <Card className="auth-card">
          <Card.Body>
            <div className="card-icon"><FaLock /></div>
            <h2 className="mb-3 fw-bold">Login</h2>
            <p className="auth-subtitle">Sign in to manage your starter data and test protected routes.</p>
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
            <div className="auth-links">
              <span>New here? <Link to="/register">Create an account</Link></span>
              <Link to="/docs">Read starter docs</Link>
            </div>
          </Card.Body>
        </Card>
      </motion.section>
    </div>
  );
};

export default Home;
