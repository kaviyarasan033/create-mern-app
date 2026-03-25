import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBoxesStacked, FaRightFromBracket, FaCube } from 'react-icons/fa6';
import '../styles/MernPro.css';

const AppNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

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
              <Nav.Link href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</Nav.Link>
            </Nav>

            <Nav className="ms-auto align-items-center">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/dashboard" className="me-3"><FaBoxesStacked /> Dashboard</Nav.Link>
                  <Button variant="outline-dark" className="btn-mern-pro-light" onClick={logout}><FaRightFromBracket /> Logout</Button>
                </>
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
