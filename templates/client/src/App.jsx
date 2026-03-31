import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import ProtectedRoute from './components/layout/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app-wrapper bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/docs" element={<Docs />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
