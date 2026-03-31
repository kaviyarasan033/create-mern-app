import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6 hero-glow">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-surface-container-high p-12 rounded-[3rem] border border-outline-variant/20 shadow-2xl max-w-md w-full"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
          <FaExclamationTriangle size={40} />
        </div>
        <h1 className="text-6xl font-black text-white mb-4 tracking-tighter">404</h1>
        <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
          The requested system node could not be found in the current architecture.
        </p>
        <Link to="/" className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold glow-primary hover:scale-105 active:scale-95 transition-all">
          <FaHome /> Return to Command Center
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
