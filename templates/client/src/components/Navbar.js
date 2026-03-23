import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaBoxesStacked, FaRightFromBracket, FaRocket } from 'react-icons/fa6';

const AppNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar expand="lg" className="premium-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold brand-mark">
            <FaRocket /> <span>MERN Command Center</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/docs"> <FaBookOpen /> Docs</Nav.Link>
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/dashboard"><FaBoxesStacked /> Dashboard</Nav.Link>
                  <span className="nav-user-pill">Hello, {user?.name}</span>
                  <Button variant="outline-light" size="sm" onClick={logout}><FaRightFromBracket /> Logout</Button>
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
