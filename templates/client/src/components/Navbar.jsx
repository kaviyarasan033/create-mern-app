import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBoxesStacked, FaRightFromBracket, FaCube } from 'react-icons/fa6';
import '../styles/MernPro.css';

const AppNavbar = () => {
  const { isAuthenticated, user, firebaseUser, logout } = useAuth();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative', zIndex: 100 }}
    >
      <Navbar expand="lg" className="premium-navbar mern-pro-nav" sticky="top">
        <Container fluid className="px-4 px-lg-5">
          <Navbar.Brand as={Link} to="/" className="mern-pro-brand">
            <span className="mern-pro-logo-icon" style={{ fontSize: '1.2rem'}}><FaCube /></span> <strong>MERN Pro</strong>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mern-pro-nav-links mx-auto">
              <Nav.Link as={Link} to="/docs">Documentation</Nav.Link>
              <Nav.Link href="https://github.com/kaviyarasan033/create-mern-app" target="_blank" rel="noopener noreferrer">GitHub</Nav.Link>
            </Nav>

            <Nav className="ms-auto align-items-center">
              {isAuthenticated ? (
                <Dropdown align="end" className="user-dropdown">
                  <Dropdown.Toggle as="div" className="user-avatar-toggle" style={{ cursor: 'pointer' }}>
                    {firebaseUser?.photoURL ? (
                      <img src={firebaseUser.photoURL} alt="User Avatar" className="nav-avatar" />
                    ) : (
                      <div className="nav-avatar-fallback">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-sm border-0 mt-2 rounded-3">
                    <div className="px-3 py-2 border-bottom mb-2">
                      <strong className="d-block">{user?.name || firebaseUser?.displayName || 'User'}</strong>
                      <small className="text-muted d-block text-truncate" style={{ maxWidth: '180px' }}>
                        {user?.email || firebaseUser?.email || 'user@example.com'}
                      </small>
                    </div>
                    <Dropdown.Item as={Link} to="/dashboard"><FaBoxesStacked className="me-2 text-muted" /> Dashboard</Dropdown.Item>
                    <Dropdown.Item onClick={logout} className="text-danger mt-1">
                      <FaRightFromBracket className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/register" className="p-0">
                  <Button className="btn-mern-pro-dark">
                    Get Started
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default AppNavbar;
