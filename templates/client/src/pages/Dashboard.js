import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="brand">Pro App</div>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </nav>
      
      <main className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="grid">
          <div className="card">
            <h3>Overview</h3>
            <p>Welcome to your project! You have 2 items pending.</p>
          </div>
          <div className="card">
            <h3>Statistics</h3>
            <p>Active users: 124</p>
            <p>Uptime: 99.9%</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
