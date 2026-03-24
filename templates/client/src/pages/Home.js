import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../services/apiService';
import { FaArrowRight, FaCodeBranch, FaKey, FaLock, FaTerminal, FaUserShield } from 'react-icons/fa6';

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
          <div className="hero-visual-backdrop">
            <div className="hero-glow hero-glow-one" />
            <div className="hero-glow hero-glow-two" />
            <svg className="hero-wireframe" viewBox="0 0 620 420" aria-hidden="true">
              <defs>
                <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffb86c" />
                  <stop offset="100%" stopColor="#58c6a9" />
                </linearGradient>
              </defs>
              <rect x="20" y="24" width="250" height="142" rx="20" fill="rgba(255,255,255,0.5)" stroke="url(#heroLine)" strokeWidth="2" />
              <rect x="302" y="70" width="286" height="166" rx="24" fill="rgba(255,255,255,0.38)" stroke="url(#heroLine)" strokeWidth="2" />
              <rect x="90" y="214" width="240" height="150" rx="22" fill="rgba(255,255,255,0.34)" stroke="url(#heroLine)" strokeWidth="2" />
              <path d="M270 92C326 92 326 126 382 126" fill="none" stroke="url(#heroLine)" strokeWidth="2.5" strokeDasharray="8 10" />
              <path d="M210 214C210 186 252 176 288 176C344 176 344 204 404 204" fill="none" stroke="url(#heroLine)" strokeWidth="2.5" strokeDasharray="8 10" />
              <circle cx="120" cy="95" r="10" fill="#123524" />
              <circle cx="382" cy="126" r="12" fill="#d98324" />
              <circle cx="210" cy="214" r="12" fill="#1f5c43" />
            </svg>
          </div>
          <span className="eyebrow">Open source developer products</span>
          <h1>Ship docs, commands, onboarding, and MERN product pages without changing login.</h1>
          <p>
            Build API workbenches, code review tools, docs copilots, or internal engineering portals with a frontend that already explains how to install, use, and extend the product.
          </p>
          <div className="feature-list">
            <span><FaUserShield /> JWT auth flow</span>
            <span><FaKey /> Demo login seed</span>
            <span><FaArrowRight /> Built-in migration commands</span>
            <span><FaTerminal /> Copy-ready command docs</span>
            <span><FaCodeBranch /> Open source friendly structure</span>
          </div>
          <div className="product-preview-grid">
            <div className="product-preview-card">
              <strong>AI Review Assistant</strong>
              <p>PR summaries, risk highlights, and contributor-friendly reporting.</p>
            </div>
            <div className="product-preview-card">
              <strong>API Testing Workbench</strong>
              <p>Collections, saved environments, and integration-ready commands.</p>
            </div>
            <div className="product-preview-card">
              <strong>Docs Copilot Portal</strong>
              <p>Usage, setup, implementation, and examples in one frontend surface.</p>
            </div>
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
