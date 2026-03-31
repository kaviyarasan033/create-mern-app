import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaTerminal, FaDatabase, FaHubspot, FaThLarge, FaSlidersH, FaArrowLeft, FaArrowRight, FaInfoCircle, FaExclamationTriangle, FaSearch, FaLightbulb, FaRocket, FaShieldAlt } from 'react-icons/fa';
import MernToast from '../utils/MernToast';
import api from '../api/apiClient';
import docsFallback from '../data/docsFallback';
import { Link } from 'react-router-dom';

const iconMap = {
  overview: <FaRocket />,
  architecture: <FaDatabase />,
  products: <FaHubspot />,
  gettingStarted: <FaTerminal />,
  commands: <FaTerminal />,
  frontend: <FaThLarge />,
  backend: <FaSlidersH />,
  routes: <FaHubspot />,
  implementation: <FaSlidersH />,
  sample: <FaTerminal />,
  login: <FaShieldAlt />
};

function Docs() {
  const [meta, setMeta] = useState(docsFallback);
  const [activeSection, setActiveSection] = useState('overview');
  const sectionBodyRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    api.get('/api/meta')
      .then((res) => {
        if (mounted && res?.data?.data) {
          setMeta({ ...docsFallback, ...res.data.data });
        }
      })
      .catch(() => {
        if (mounted) setMeta(docsFallback);
      });
    return () => { mounted = false; };
  }, []);

  const sections = [
    { id: 'overview', label: 'Overview', icon: <FaRocket /> },
    { id: 'architecture', label: 'Architecture', icon: <FaDatabase /> },
    { id: 'gettingStarted', label: 'Get Started', icon: <FaTerminal /> },
    { id: 'commands', label: 'CLI Reference', icon: <FaTerminal /> },
    { id: 'frontend', label: 'Frontend', icon: <FaThLarge /> },
    { id: 'backend', label: 'Backend', icon: <FaSlidersH /> },
    { id: 'routes', label: 'API Routes', icon: <FaHubspot /> },
    { id: 'implementation', label: 'Implementation', icon: <FaSlidersH /> },
    { id: 'login', label: 'Demo Login', icon: <FaShieldAlt /> }
  ];

  const activeMeta = sections.find((s) => s.id === activeSection) || sections[0];

  const copyCommand = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      MernToast('Copied to clipboard');
    } catch (error) {
      MernToast('Copy failed', 'error');
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'architecture':
        return (
          <article className="doc-content">
            <h1>Architecture</h1>
            <p>Folders, flow, and generated files structure for your MERN Pro app.</p>
            <div className="flex gap-4 p-5 rounded-2xl bg-primary/5 border-l-4 border-primary mb-8">
              <FaInfoCircle className="text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-primary mb-1">STRUCTURE TIP</h4>
                <p className="text-sm text-on-surface-variant m-0">The MERN Pro CLI follows the MVC pattern strictly to ensure code reusability and clean separation of concerns.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl bg-surface-container-lowest p-6">
              <pre className="font-mono text-xs leading-relaxed text-on-surface-variant"><code>{meta?.sampleArchitecture}</code></pre>
            </div>
            <div className="space-y-6">
              {(meta.architectureFlow || []).map((item) => (
                <div key={item.title} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant m-0">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>
        );
      case 'gettingStarted':
        return (
          <article className="doc-content">
            <h1>Getting Started</h1>
            <p>Follow these steps to initialize and run your MERN Pro application.</p>
            <div className="space-y-8 mt-8">
              {(meta.gettingStarted || []).map((step, i) => (
                <div key={i} className="relative pl-12 border-l-2 border-outline-variant/20 pb-8 last:pb-0">
                  <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-on-primary">
                    {i + 1}
                  </div>
                  <h3 className="mt-0 text-white !mb-2">{step.title}</h3>
                  <p className="mb-4">{step.description}</p>
                  <div className="rounded-xl overflow-hidden shadow-lg border border-outline-variant/10">
                    <div className="bg-surface-container-high px-4 py-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-outline uppercase tracking-widest">shell</span>
                      <button onClick={() => copyCommand(step.command)} className="flex items-center gap-1.5 text-outline hover:text-white transition-colors">
                        <FaCopy className="text-xs" /> <span className="text-[10px] font-bold">COPY</span>
                      </button>
                    </div>
                    <div className="bg-surface-container-lowest p-4 font-mono text-sm text-primary">
                      {step.command}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        );
      case 'commands':
        return (
          <article className="doc-content">
            <h1>CLI Reference</h1>
            <p>The MERN Pro CLI tool for managing your development workflow.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {(meta.commands || []).map((cmd, i) => (
                <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="mt-0 !mb-0 text-white text-lg">{cmd.title}</h3>
                    <button onClick={() => copyCommand(cmd.command)} className="text-outline group-hover:text-primary transition-colors">
                      <FaCopy />
                    </button>
                  </div>
                  <pre className="text-xs font-mono bg-surface-container-lowest p-3 rounded-lg mb-4 text-emerald-400"><code>{cmd.command}</code></pre>
                  <p className="text-xs text-on-surface-variant">{cmd.description}</p>
                </div>
              ))}
            </div>
          </article>
        );
      case 'routes':
        return (
          <article className="doc-content">
            <h1>API Routes</h1>
            <p>Unified API integration surface and available endpoints.</p>
            <div className="space-y-4 mt-8">
              {(meta.routes || []).map((route, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${route.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {route.method}
                    </span>
                    <code className="text-primary text-sm font-bold">{route.path}</code>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-on-surface-variant m-0">{route.description}</p>
                    <small className="text-[10px] text-outline font-mono">{route.controller}</small>
                  </div>
                </div>
              ))}
            </div>
          </article>
        );
      case 'login':
        return (
          <article className="doc-content">
            <h1>Demo Credentials</h1>
            <p>Access the pre-configured demo account to explore the dashboard features.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="p-8 rounded-3xl bg-surface-container-high border-l-4 border-primary">
                <h4 className="text-white font-bold mb-6">Standard Login</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-outline uppercase block mb-1">Email</label>
                    <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10">
                      <code className="text-primary">{meta?.defaultLogin?.email || 'demo@mernkit.dev'}</code>
                      <button onClick={() => copyCommand(meta?.defaultLogin?.email || 'demo@mernkit.dev')} className="text-outline hover:text-white"><FaCopy size={12} /></button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-outline uppercase block mb-1">Password</label>
                    <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10">
                      <code className="text-primary">{meta?.defaultLogin?.password || 'Password123!'}</code>
                      <button onClick={() => copyCommand(meta?.defaultLogin?.password || 'Password123!')} className="text-outline hover:text-white"><FaCopy size={12} /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="p-5 rounded-2xl bg-secondary-container/10 border border-secondary/20">
                  <FaExclamationTriangle className="text-secondary mb-2" />
                  <p className="text-sm text-on-surface-variant m-0">
                    {meta?.defaultLogin?.note || 'Run the demo seed command before signing in to populate the database.'}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
                  <p className="text-xs font-mono text-primary m-0">cd server && npm run seed:demo</p>
                </div>
              </div>
            </div>
          </article>
        );
      default:
        return (
          <article className="doc-content">
            <h1>CLI Reference</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              The MERN Pro Command Line Interface (CLI) is the unified tool for managing your development workflow. From scaffolding new modules to orchestrating database migrations, everything is at your fingertips.
            </p>
            <div className="flex gap-4 p-5 rounded-2xl bg-primary/5 border-l-4 border-primary mb-8">
              <FaLightbulb className="text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-primary mb-1">DEFINITION</h4>
                <p className="text-sm text-on-surface-variant m-0">{meta.definition}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(meta.usageFlow || []).map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all group">
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant m-0">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>
        );
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-body flex transition-all duration-300">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-screen sticky top-0 w-64 p-6 bg-surface-container-low border-r border-outline-variant/10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_var(--glow)]">
            <span className="material-symbols-outlined text-on-background font-bold">bolt</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tighter">MERN Pro</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">v1.0 ATOMIC</p>
          </div>
        </div>
        
        <nav className="space-y-1 flex-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-4 px-4">Core Documentation</p>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${
                activeSection === section.id 
                ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold' 
                : 'text-on-surface-variant hover:translate-x-1 hover:text-white'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="text-sm tracking-tight">{section.label}</span>
            </button>
          ))}
          
          <div className="pt-8">
            <p className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-4 px-4">External</p>
            <a 
              href="https://github.com/kaviyarasan033/create-react-proapp" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 text-on-surface-variant px-4 py-2.5 rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined">hub</span>
              <span className="text-sm font-medium">GitHub Repo</span>
            </a>
          </div>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <Link to="/" className="flex items-center gap-3 text-outline hover:text-white transition-colors">
            <FaArrowLeft className="text-xs" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 w-full h-16 flex items-center justify-between px-8 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <nav className="flex items-center text-xs font-mono tracking-widest text-outline">
              <Link to="/" className="hover:text-primary transition-colors uppercase">HOME</Link>
              <span className="mx-2 text-surface-container-highest">/</span>
              <Link to="/docs" className="hover:text-primary transition-colors uppercase">DOCS</Link>
              <span className="mx-2 text-surface-container-highest">/</span>
              <span className="text-white font-bold uppercase">{activeSection}</span>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/20 rounded-full px-4 py-1.5 w-64 focus-within:border-primary/50 transition-all">
              <FaSearch className="text-outline text-xs" />
              <input className="bg-transparent border-none text-xs text-on-surface-variant focus:ring-0 placeholder-outline/50 w-full" placeholder="Search docs..." type="text"/>
            </div>
            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-bold rounded-full hover:shadow-[0_0_15px_rgba(66,229,176,0.3)] transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </header>

        <div className="flex flex-1 relative">
          {/* Documentation Content */}
          <div className="flex-1 px-8 lg:px-20 py-12 max-w-4xl mx-auto">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderActiveSection()}
            </motion.div>
            
            {/* Navigation Footer */}
            <div className="mt-20 pt-10 border-t border-outline-variant/10 flex justify-between">
              <button 
                onClick={() => {
                  const idx = sections.findIndex(s => s.id === activeSection);
                  if (idx > 0) setActiveSection(sections[idx-1].id);
                }}
                className="group flex flex-col items-start gap-1"
              >
                <span className="text-[10px] font-mono text-outline tracking-widest uppercase">PREVIOUS</span>
                <span className="text-primary font-bold group-hover:-translate-x-1 transition-transform flex items-center gap-1">
                  <FaArrowLeft /> Step Back
                </span>
              </button>
              <button 
                onClick={() => {
                  const idx = sections.findIndex(s => s.id === activeSection);
                  if (idx < sections.length - 1) setActiveSection(sections[idx+1].id);
                }}
                className="group flex flex-col items-end gap-1"
              >
                <span className="text-[10px] font-mono text-outline tracking-widest uppercase">NEXT</span>
                <span className="text-primary font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Continue <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
          
          {/* Right TOC Sidebar */}
          <aside className="hidden xl:block w-72 h-[calc(100vh-64px)] sticky top-16 p-8 border-l border-outline-variant/10">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-outline mb-6">In this page</p>
            <ul className="space-y-4 text-xs font-medium">
              <li><a className="text-primary border-l-2 border-primary pl-4 block" href="#">Introduction</a></li>
              <li><a className="text-on-surface-variant hover:text-white pl-4 border-l-2 border-transparent block transition-colors" href="#">Basic Usage</a></li>
              <li><a className="text-on-surface-variant hover:text-white pl-4 border-l-2 border-transparent block transition-colors" href="#">Best Practices</a></li>
            </ul>
            
            <div className="mt-12 p-6 rounded-2xl bg-surface-container-high text-center relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
              <h5 className="text-xs font-bold text-white mb-2 relative z-10">Need help?</h5>
              <p className="text-[10px] text-on-surface-variant mb-4 relative z-10">Check our FAQ or join the community discord.</p>
              <button className="w-full py-2 bg-surface-variant text-[10px] font-bold rounded-lg border border-outline-variant/30 hover:border-primary/50 transition-colors relative z-10 uppercase tracking-widest text-white">
                Support Discord
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Docs;
