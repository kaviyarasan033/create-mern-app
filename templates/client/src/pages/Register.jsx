import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MernToast from '../utils/MernToast';
import api from '../api/apiClient';
import GoogleLoginButton from '../components/ui/GoogleLoginButton';
import { FaUserPlus, FaShieldAlt, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

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
    <div className="bg-background text-on-background min-h-screen font-body selection:bg-primary/30 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Side Copy */}
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold mb-8 hover:translate-x-[-4px] transition-transform">
            <FaArrowLeft /> Back to Home
          </Link>
          <span className="font-mono text-primary font-bold tracking-[0.2em] text-xs mb-6 block uppercase">SECURE ONBOARDING</span>
          <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-6 leading-tight">
            Create your <br/><span className="gradient-text">Developer Profile</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-md mb-10 leading-relaxed">
            Join the MERN Pro ecosystem. Get access to industrial-grade scaffolding and professional documentation immediately.
          </p>
          <div className="space-y-4">
            {[
              { icon: <FaShieldAlt />, text: 'JWT-ready secure authentication' },
              { icon: <FaCheckCircle />, text: 'Mongo-backed account storage' },
              { icon: <FaUserPlus />, text: 'Instant access to MERN CLI' }
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-medium">
                <span className="text-primary">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-surface-container-high p-8 lg:p-12 rounded-[2.5rem] border border-outline-variant/20 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Registration</h2>
            <p className="text-on-surface-variant text-sm">Start your professional full-stack journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-mono text-outline uppercase block mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Developer Name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-outline uppercase block mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="dev@mernpro.io"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono text-outline uppercase block mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-outline uppercase block mb-2">Confirm</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold shadow-lg glow-primary active:scale-95 transition-transform">
              Complete Registration
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-outline-variant/20"></div>
              <span className="text-[10px] font-mono text-outline uppercase">Or Social Sign Up</span>
              <div className="flex-1 h-px bg-outline-variant/20"></div>
            </div>
            <GoogleLoginButton 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-xs">
              Already a member? <Link to="/" className="text-primary font-bold hover:underline">Sign in here</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
