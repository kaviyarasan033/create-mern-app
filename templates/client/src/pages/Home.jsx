import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MernToast from '../utils/MernToast';
import api from '../api/apiClient';
import GoogleLoginButton from '../components/ui/GoogleLoginButton';
import { FaCopy, FaCheckCircle, FaRocket, FaShieldAlt, FaTerminal, FaLayerGroup, FaDatabase, FaLaptopCode, FaFileCode, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

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

  return (
    <div className="bg-background text-on-background min-h-screen font-body selection:bg-primary/30">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/90 dark:bg-surface/60 backdrop-blur-xl border-b border-outline">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-on-background">MERN Pro</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase border border-primary/20">v1.0</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="text-primary font-semibold border-b-2 border-primary pb-1" href="#features">Features</a>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/docs">Docs</Link>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#cli">CLI Reference</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#stack">Stack</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-bold text-sm active:scale-95 duration-150 ease-in-out glow-primary"
            >
              {isLoginView ? 'Back to Hero' : 'Get Started'}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <header className="relative pt-32 pb-20 overflow-hidden hero-glow">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              <span className="font-mono text-primary font-bold tracking-[0.2em] text-xs mb-6 block uppercase">PRODUCTIVE ARCHITECTURE</span>
              <h1 className="text-6xl md:text-7xl font-extrabold text-on-background tracking-tighter mb-6 leading-[1.1]">
                Build. Scale. <br/><span className="text-primary">Ship.</span>
              </h1>
              <p className="text-on-surface-variant text-lg max-w-lg mb-10 leading-relaxed">
                The enterprise-grade MERN starter kit designed for high-performance teams. Deploy professional architectures in seconds, not weeks.
              </p>
              
              {!isLoginView ? (
                <div className="flex flex-wrap gap-4 items-center">
                  <div 
                    onClick={() => copyCommand('npx create-mern-proapp')}
                    className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl px-5 py-3 font-mono text-sm text-primary group cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <span className="text-on-surface-variant">$</span>
                    <span>npx create-mern-proapp</span>
                    <FaCopy className="text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                  <Link className="text-white font-semibold hover:text-primary flex items-center gap-1 transition-colors" to="/docs">
                    View Docs <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="animate-border-card rounded-[2rem] shadow-2xl max-w-md overflow-hidden"
                >
                    <div className="animate-border-content p-8">
                      <h2 className="text-2xl font-bold text-on-background mb-4">Login to Dashboard</h2>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">Email Address</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                            placeholder="dev@mernpro.io"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">Password</label>
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold active:scale-95 transition-transform glow-primary">
                        Sign In
                      </button>
                    </form>
                      <div className="mt-6">
                        <div className="relative flex items-center gap-4 mb-6">
                          <div className="flex-1 h-px bg-outline-variant/20"></div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Or Login With</span>
                          <div className="flex-1 h-px bg-outline-variant/20"></div>
                        </div>
                        <GoogleLoginButton 
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                        />
                      </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group animate-border-card rounded-3xl shadow-2xl"
            >
              <div className="animate-border-content bg-slate-950 p-6 overflow-hidden">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="font-mono text-sm space-y-3">
                  <p className="text-slate-400"># Initializing MERN Pro Architecture</p>
                  <p className="text-green-500 flex items-center gap-2">
                    <FaCheckCircle className="text-sm" />
                    <span>Configuring MongoDB connection...</span>
                  </p>
                  <p className="text-blue-500 flex items-center gap-2">
                    <FaCheckCircle className="text-sm" />
                    <span>Injecting JWT Authentication...</span>
                  </p>
                  <p className="text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>
                    <span>Generating MVC scaffolding...</span>
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-blue-500">➜</span>
                    <span className="text-white">npm run dev</span>
                    <span className="w-2 h-5 bg-blue-500 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Features Strip */}
        <section id="features" className="py-20 bg-surface-container-low/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-between border-b border-outline-variant/20 mb-12 overflow-x-auto no-scrollbar">
              <button className="pb-4 px-4 text-primary border-b-2 border-primary font-bold transition-all flex items-center gap-2">
                <FaDatabase /> MongoDB
              </button>
              <button className="pb-4 px-4 text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">storage</span> MySQL
              </button>
              <button className="pb-4 px-4 text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">local_fire_department</span> Firebase
              </button>
              <button className="pb-4 px-4 text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-2">
                <FaShieldAlt /> JWT Auth
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center bg-surface-container-high/40 p-8 rounded-[2rem] border border-outline-variant/10 backdrop-blur-sm">
              <div>
                <h3 className="text-2xl font-bold text-on-background mb-4">NoSQL Mastery with MongoDB</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Built-in Mongoose schemas, automated migrations, and connection pooling that scales to millions of users without breaking a sweat.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <FaCheckCircle className="text-primary text-lg" />
                    Optimized Query Engine
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface">
                    <FaCheckCircle className="text-primary text-lg" />
                    Automated Indexing
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-inner bg-surface-container-lowest p-1 border border-outline-variant/20">
                <img 
                  className="w-full h-48 object-cover rounded-xl opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL14YXJTfyGy6XGItO0x_je5yA0Dd7JaKsexJYhiEx5DDOvYszUaCWtYf27ngcDKTykayK1SDcEU6QtdiQX19gVrvjroe9RUSLuTbQGa918eoUydhooYzGYpG6KHKJFwCfOu4mrzwJ0EtFVWOrDkaBrlkcAHMqnnHgn_L-pXaLexPIKm_yZVx6nDg_ACnHAZzcpsMlY11P-tL_Hp--aBtsiFlYBKT8Rv-Lv5-Vb-kCqZWUtHW0yOhpn0FHtq5-gCGUFokPMwugndA" 
                  alt="Architecture"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-on-background tracking-tight mb-4">Engineered for Reliability</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Every line of code in MERN Pro is optimized for production-ready performance and developer happiness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaTerminal />, title: "CLI Power", desc: "Scaffold entire CRUD modules, authentication flows, and database schemas with a single command." },
              { icon: <FaLayerGroup />, title: "MVC Architecture", desc: "Clean separation of concerns ensuring your business logic stays decoupled from your UI and Data layers." },
              { icon: <FaDatabase />, title: "Multi-Database", desc: "Swap between SQL and NoSQL with minimal config changes. One CLI to rule them all." },
              { icon: <FaShieldAlt />, title: "Security First", desc: "Built-in rate limiting, helmet protection, and XSS sanitization out of the box." },
              { icon: <FaLaptopCode />, title: "Adaptive Design", desc: "The frontend kit includes a fully responsive, Tailwind-based design system that adapts to any screen." },
              { icon: <FaFileCode />, title: "Self-Documenting", desc: "Auto-generated Swagger docs for your API routes so your team is always in sync." }
            ].map((feature, i) => (
              <div key={i} className="animate-border-card rounded-[2rem] group cursor-default">
                <div className="animate-border-content p-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-on-background mb-3">{feature.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLI Reference Preview */}
        <section id="cli" className="bg-surface-container-lowest py-24 overflow-hidden border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-extrabold text-on-background mb-6">CLI Mastery</h2>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                Stop writing boilerplate. Our command line interface generates standard-compliant code snippets that follow the best patterns of the MERN stack.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20 hover:border-primary/30 transition-colors cursor-pointer text-left">
                  <FaRocket className="text-primary mt-1" />
                  <div>
                    <h5 className="text-on-surface font-bold text-sm">Smart Scaffolding</h5>
                    <p className="text-on-surface-variant text-xs">Full app initialization with database preference.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20 hover:border-primary/30 transition-colors cursor-pointer text-left">
                  <span className="material-symbols-outlined text-primary mt-1">schema</span>
                  <div>
                    <h5 className="text-on-surface font-bold text-sm">Module Generation</h5>
                    <p className="text-on-surface-variant text-xs">Create Controller, Service, and Routes instantly.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-surface-container-low rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high border-b border-outline-variant/20">
                  <div className="flex gap-4">
                    <span className="text-primary text-xs font-mono font-bold border-b-2 border-primary pb-1">Scaffold</span>
                    <span className="text-on-surface-variant text-xs font-mono font-medium cursor-pointer hover:text-on-surface">Module</span>
                    <span className="text-on-surface-variant text-xs font-mono font-medium cursor-pointer hover:text-on-surface">Stack Sync</span>
                  </div>
                  <button onClick={() => copyCommand('mern init my-app')} className="text-on-surface-variant hover:text-white transition-colors">
                    <FaCopy />
                  </button>
                </div>
                <div className="p-8 font-mono text-sm overflow-x-auto text-left">
                  <div className="flex gap-4 mb-2">
                    <span className="text-slate-500">1</span>
                    <span className="text-primary">mern-pro</span>
                    <span className="text-on-background">init my-awesome-app</span>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <span className="text-outline">2</span>
                    <span className="text-on-surface-variant italic"># Selecting stack: MongoDB + Express + React + Node</span>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <span className="text-slate-500">3</span>
                    <span className="text-emerald-500">?</span>
                    <span className="text-white">Choose database: </span>
                    <span className="text-primary font-bold">MongoDB</span>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <span className="text-slate-500">4</span>
                    <span className="text-emerald-500">?</span>
                    <span className="text-white">Auth provider: </span>
                    <span className="text-primary font-bold">JWT (Built-in)</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-500">5</span>
                    <span className="text-green-400 font-bold">SUCCESS</span>
                    <span className="text-on-background">Project created in 1.4s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start CTA */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="cta-gradient rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Start in 30 seconds</h2>
              <div className="max-w-md mx-auto mb-10">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10 group">
                  <span className="font-mono text-emerald-400 text-sm">npx create-mern-proapp@latest</span>
                  <button onClick={() => copyCommand('npx create-mern-proapp@latest')} className="text-white/50 group-hover:text-emerald-400 transition-colors">
                    <FaCopy />
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => { setIsLoginView(true); window.scrollTo(0, 0); }}
                  className="bg-white text-secondary-container px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Get Started Free
                </button>
                <Link className="text-white font-bold flex items-center gap-2 group" to="/docs">
                  Read Full Docs <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="space-y-6">
            <span className="text-lg font-bold text-white tracking-tighter">MERN Pro</span>
            <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              The industrial-grade starter kit for professional full-stack engineers build with confidence.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Product</h5>
            <ul className="space-y-4">
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/docs">Getting Started</Link></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#cli">CLI Reference</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#stack">Architecture</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Resources</h5>
            <ul className="space-y-4">
              <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/docs">Docs</Link></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="https://github.com/kaviyarasan033/create-react-proapp" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal</h5>
            <ul className="space-y-4">
              <li><span className="text-on-surface-variant text-sm">MIT License</span></li>
              <li><span className="text-on-surface-variant text-sm">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-on-surface-variant">© 2024 MERN Pro. Built by Tech Greenhouse.</span>
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-primary uppercase tracking-tighter">v1.0.4-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
