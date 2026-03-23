import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    console.log('Login attempt:', email);
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your Pro App account</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        <div className="docs-links">
          <h3>Resources</h3>
          <ul>
            <li><a href="https://react.dev" target="_blank" rel="noreferrer">React Documentation</a></li>
            <li><a href="https://expressjs.com" target="_blank" rel="noreferrer">Express Documentation</a></li>
            <li><a href="https://mongoosejs.com" target="_blank" rel="noreferrer">Mongoose (ORM) Guide</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
