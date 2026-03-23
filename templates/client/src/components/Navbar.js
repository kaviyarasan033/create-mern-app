import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" className="premium-navbar shadow">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <span className="text-primary">Pro</span>App MVC
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <span className="text-light mx-3">Hello, {user?.name}</span>
                  <Button variant="outline-primary" size="sm" onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <Button variant="primary" size="sm">Get Started</Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default AppNavbar;
