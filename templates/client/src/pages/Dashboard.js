import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/apiService';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/items');
      setItems(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-brand">ProApp Dashboard</div>
        <div className="nav-user">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <h1>Your Items</h1>
        {loading ? (
          <Spinner size="large" />
        ) : (
          <div className="items-grid">
            {items.length > 0 ? (
              items.map(item => (
                <div key={item._id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))
            ) : (
              <p>No items found. Create one to get started!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
