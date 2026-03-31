import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api/apiClient';
import MernToast from '../utils/MernToast';
import Spinner from '../components/ui/Spinner';
import { FaTrash, FaCopy, FaCheckCircle, FaDatabase, FaShieldAlt, FaPlus, FaRedo, FaSignOutAlt, FaHome, FaBook, FaSearch, FaUser, FaColumns, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, firebaseUser, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'active' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/items');
      setItems(res.data.data);
    } catch (err) {
      MernToast('Failed to fetch items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/items', formData);
      setItems((current) => [res.data.data, ...current]);
      setFormData({ name: '', description: '', status: 'active' });
      MernToast('Item created');
    } catch (err) {
      MernToast(err.response?.data?.message || 'Failed to create item', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/items/${id}`);
      setItems((current) => current.filter((item) => item._id !== id));
      MernToast('Item deleted');
    } catch (err) {
      MernToast('Failed to delete item', 'error');
    }
  };

  const copyCommand = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      MernToast('Copied to clipboard');
    } catch (error) {
      MernToast('Copy failed', 'error');
    }
  };

  const dashboardStats = [
    { label: 'Active Items', value: items.length, icon: <FaDatabase />, color: 'primary' },
    { label: 'User Role', value: user?.role || 'Developer', icon: <FaShieldAlt />, color: 'secondary' },
    { label: 'Cloud Status', value: firebaseUser ? 'Google Sync' : 'Local Auth', icon: <FaCheckCircle />, color: 'primary' }
  ];

  const guideSteps = [
    { title: 'Scaffold Model', command: 'node mern make:model Product' },
    { title: 'Create Controller', command: 'node mern make:controller Product' },
    { title: 'Register Route', command: 'node mern make:route products' },
    { title: 'Full Resource', command: 'node mern make:resource product' }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen font-body flex transition-all duration-300">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-screen sticky top-0 w-64 p-6 bg-surface-container-low border-r border-outline-variant/10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(66,229,176,0.2)]">
            <span className="material-symbols-outlined text-on-primary font-bold">bolt</span>
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tighter">MERN Pro</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">DASHBOARD</p>
          </div>
        </div>
        
        <nav className="space-y-1 flex-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-outline mb-4 px-4">Workspace</p>
          <Link to="/dashboard" className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2.5 rounded-xl border-l-4 border-primary font-semibold">
            <FaColumns size={18} />
            <span className="text-sm">Command Center</span>
          </Link>
          <Link to="/docs" className="flex items-center gap-3 text-on-surface-variant hover:translate-x-1 hover:text-white px-4 py-2.5 rounded-xl transition-all">
            <FaBook size={18} />
            <span className="text-sm">Documentation</span>
          </Link>
          <Link to="/" className="flex items-center gap-3 text-on-surface-variant hover:translate-x-1 hover:text-white px-4 py-2.5 rounded-xl transition-all">
            <FaHome size={18} />
            <span className="text-sm">Project Home</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
              <FaUser size={14} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Engineer'}</p>
              <p className="text-[10px] text-outline truncate">{user?.role || 'Developer Tier'}</p>
            </div>
            <button onClick={logout} className="text-outline hover:text-error transition-colors">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 w-full h-16 flex items-center justify-between px-8 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-white tracking-tight">System Status</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/20 rounded-full px-4 py-1.5 w-64">
              <FaSearch className="text-outline text-xs" />
              <input className="bg-transparent border-none text-xs text-on-surface-variant focus:ring-0 placeholder-outline/50 w-full" placeholder="Search resources..." type="text"/>
            </div>
            <button onClick={fetchItems} className="p-2 text-outline hover:text-primary transition-colors">
              <FaRedo className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="w-px h-6 bg-outline-variant/20"></div>
            <Link to="/docs" className="text-xs font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-widest">
              Guides
            </Link>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {dashboardStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="animate-border-card rounded-3xl shadow-lg group"
              >
                <div className="animate-border-content p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color === 'primary' ? 'primary' : 'secondary'}/10 flex items-center justify-center text-${stat.color === 'primary' ? 'primary' : 'secondary'}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">{stat.value}</h3>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-outline text-on-surface-variant">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Item Section */}
            <div className="lg:col-span-1">
              <div className="animate-border-card rounded-[2.5rem] shadow-xl">
                <div className="animate-border-content p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <FaPlus size={14} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Create Resource</h3>
                  </div>
                  <form onSubmit={handleCreateItem} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-mono text-outline uppercase block mb-2">Item Name</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                        placeholder="e.g. Analytics Module"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-outline uppercase block mb-2">Description</label>
                      <textarea 
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                        placeholder="What does this resource do?"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-outline uppercase block mb-2">Operational Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-br from-primary to-secondary text-on-background py-3.5 rounded-xl font-bold shadow-lg glow-primary active:scale-95 transition-transform">
                      Deploy Resource
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Quick CLI Reference */}
            <div className="lg:col-span-2">
              <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <FaTerminal size={14} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Guided Workflows</h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guideSteps.map((step, i) => (
                    <div key={i} className="bg-surface-container-high/50 p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-primary uppercase font-bold">{step.title}</span>
                        <button onClick={() => copyCommand(step.command)} className="text-outline hover:text-white transition-colors">
                          <FaCopy size={12} />
                        </button>
                      </div>
                      <code className="text-xs font-mono text-on-surface-variant block bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/5">
                        {step.command}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                      Deployed Items
                    </h4>
                    {loading && <Spinner size="small" />}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.length > 0 ? items.map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={item._id} 
                        className="bg-surface-container-high p-4 rounded-2xl border border-outline-variant/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-bold text-sm tracking-tight">{item.name}</h5>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${item.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-outline-variant/20 text-outline'}`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">{item.description || 'No specialized metadata provided.'}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-outline-variant/5">
                          <span className="text-[9px] font-mono text-outline uppercase">{new Date(item.createdAt).toLocaleDateString()}</span>
                          <button onClick={() => handleDelete(item._id)} className="text-outline hover:text-error transition-colors p-1">
                            <FaTrash size={10} />
                          </button>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="col-span-2 py-12 text-center bg-surface-container-high/30 rounded-3xl border border-dashed border-outline-variant/20">
                        <FaDatabase className="mx-auto text-outline/30 mb-4" size={32} />
                        <p className="text-sm text-outline">No resources deployed in this workspace yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
