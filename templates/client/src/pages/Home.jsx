import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import MernToast from '../utils/MernToast';
import api from '../services/apiService';
import GoogleLoginButton from '../components/GoogleLoginButton';
import {
  FaArrowRight,
  FaCodeBranch,
  FaCopy,
  FaGoogle,
  FaKey,
  FaLayerGroup,
  FaLock,
  FaServer,
  FaTerminal,
  FaUserShield,
  FaWrench
} from 'react-icons/fa6';

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
    
    try {
      MernToast('Authenticating...', 'success');
      const res = await api.post('/api/auth/login', { email, password });
      login(res.data.data.token, res.data.data.user);
      MernToast('Welcome back!');
    } catch (err) {
      MernToast(err.response?.data?.message || 'Login failed', 'error');
    }
  };

  const handleGoogleSuccess = (result) => {
    login(result.token, result.user);
    MernToast('Google authentication successful!');
  };

  const handleGoogleError = (error) => {
    MernToast('Google authentication failed', 'error');
  };

  const copyCommand = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      MernToast('Copied to clipboard');
    } catch (error) {
      MernToast('Copy failed', 'error');
    }
  };

  const starterCommands = [
    'cd server && npm run dev',
    'cd client && npm run dev',
    'cd server && npm run seed:demo'
  ];

  const productHighlights = [
    {
      title: 'Clear setup flow',
      detail: 'Show install, run, build, and seed steps in a simple developer-friendly landing page.'
    },
    {
      title: 'Built-in MVC structure',
      detail: 'Keep controllers, models, routes, middleware, and services organized from the start.'
    },
    {
      title: 'Ready docs surface',
      detail: 'Present commands, modules, and route references in a clean responsive docs layout.'
    }
  ];

  const launchStats = [
    { value: 'MongoDB', label: 'database layer' },
    { value: 'Express', label: 'api routes' },
    { value: 'React', label: 'developer ui' },
    { value: 'Node', label: 'tooling flow' }
  ];

  return (
    <div className="auth-shell">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-grid"
      >
        <div className="auth-copy">
          <div className="hero-announcement">
            <span className="hero-announcement-badge">MERN_Solution</span>
            <span>Clean documentation-first UI for your built-in MERN MVC starter.</span>
          </div>
          <span className="eyebrow">MERN MVC solution</span>
          <h1>Built for developers who need a clear starter, docs, and working auth.</h1>
          <p>
            MERN_Solution gives you a simple frontend, protected login, starter CRUD, documentation flow, and developer commands without changing your existing backend logic.
          </p>
          <div className="feature-list">
            <span><FaUserShield /> JWT auth flow</span>
            <span><FaKey /> Demo login seed</span>
            <span><FaCodeBranch /> MVC folder structure</span>
            <span><FaTerminal /> Command-based setup</span>
            <span><FaArrowRight /> Responsive docs flow</span>
          </div>
          <div className="hero-surface">
            <div className="hero-surface-grid" aria-hidden="true" />
            <div className="hero-surface-content">
              <div className="hero-architecture-card">
                <div className="hero-architecture-topline">
                  <strong>Developer workflow</strong>
                  <small>clean and production-oriented</small>
                </div>
                <div className="hero-architecture-grid">
                  <div className="hero-architecture-node">
                    <span className="hero-node-icon"><FaServer /></span>
                    <strong>Backend</strong>
                    <p>Express routes, controllers, middleware, and Mongo models.</p>
                  </div>
                  <div className="hero-architecture-node">
                    <span className="hero-node-icon"><FaLayerGroup /></span>
                    <strong>Frontend</strong>
                    <p>Docs page, login, register, dashboard, and command surfaces.</p>
                  </div>
                  <div className="hero-architecture-node hero-architecture-node-wide">
                    <span className="hero-node-icon"><FaWrench /></span>
                    <strong>Built-in tools</strong>
                    <p>Seed demo data, generate resources, run build, and scale the starter cleanly.</p>
                  </div>
                </div>
              </div>
              <div className="hero-stat-grid">
                {launchStats.map((item) => (
                  <div key={item.label} className="hero-stat-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="product-preview-grid">
            {productHighlights.map((item) => (
              <div key={item.title} className="product-preview-card">
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="hero-command-strip">
            {starterCommands.map((command) => (
              <button key={command} type="button" className="hero-command-chip" onClick={() => copyCommand(command)}>
                <code>{command}</code>
                <FaCopy />
              </button>
            ))}
          </div>
          <div className="demo-credentials">
            <strong>MERN_Solution demo login</strong>
            <span>`demo@mernkit.dev`</span>
            <span>`Password123!`</span>
            <small>Run `cd server && npm run seed:demo` first.</small>
          </div>
        </div>

        <Card className="auth-card">
          <Card.Body>
            <div className="card-icon"><FaLock /></div>
            <h2 className="mb-3 fw-bold">Login</h2>
            <p className="auth-subtitle">Sign in to access the MERN_Solution dashboard and protected routes.</p>
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
             
             <div className="auth-divider">
               <span>Or continue with</span>
             </div>
             
             <GoogleLoginButton 
               onSuccess={handleGoogleSuccess}
               onError={handleGoogleError}
               className="mb-3"
             />
             
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
