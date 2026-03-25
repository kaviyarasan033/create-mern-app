import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/apiService';
import MernToast from '../utils/MernToast';
import Spinner from '../components/Spinner';
import { FaArrowRotateRight, FaCirclePlus, FaCodeBranch, FaDatabase, FaShield, FaTrash, FaCopy, FaBookOpen } from 'react-icons/fa6';

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
    { label: 'items', value: items.length, icon: <FaDatabase /> },
    { label: 'status', value: user?.role || 'member', icon: <FaShield /> },
    { label: 'mode', value: 'protected', icon: <FaCodeBranch /> }
  ];

  const guideSteps = [
    {
      title: '1. Create a logical model',
      description: 'Generate a MongoDB Mongoose model effortlessly using the CLI tool.',
      command: 'node mern make:model Product'
    },
    {
      title: '2. Generate the controller',
      description: 'Create a pre-configured Express controller tied perfectly to your new model.',
      command: 'node mern make:controller Product'
    },
    {
      title: '3. Attach standard API routes',
      description: 'Link your backend resource easily. The MERN CLI binds CRUD operations fast.',
      command: 'node mern make:route products'
    },
    {
      title: '4. Or generate it all instantly',
      description: 'Use the `make:resource` command to scaffold the Model, Controller, and Routes concurrently.',
      command: 'node mern make:resource product'
    }
  ];

  return (
    <Container className="dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
          <section className="dashboard-hero">
            <div className="dashboard-hero-copy">
              <span className="eyebrow">Protected MERN workspace</span>
              <h1 className="fw-bold">Welcome, {user?.name}</h1>
              <p className="text-muted mb-0">Create data, run starter commands, and validate protected routes from one responsive command surface.</p>
              <div className="dashboard-actions">
                <Button variant="outline-secondary" className="nav-action-button" onClick={fetchItems}><FaArrowRotateRight /> Refresh</Button>
                <Button variant="outline-danger" className="nav-action-button" onClick={logout}>Logout</Button>
              </div>
            </div>
             <div className="dashboard-stat-grid">
               {dashboardStats.map((item) => (
                 <div key={item.label} className="hero-metric-card dashboard-metric-card">
                   <div className="dashboard-metric-icon">{item.icon}</div>
                   <span>{item.value}</span>
                   <small>{item.label}</small>
                 </div>
               ))}
               {firebaseUser && (
                 <div className="hero-metric-card dashboard-metric-card">
                   <div className="dashboard-metric-icon">🎯</div>
                   <span>Google</span>
                   <small>auth provider</small>
                 </div>
               )}
             </div>
          </section>

          <Row className="g-4 mb-4">
            <Col lg={5}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="panel-heading"><FaCirclePlus /> Create item</div>
                  <Form onSubmit={handleCreateItem}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Starter task"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="What should this resource describe?"
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </Form.Select>
                    </Form.Group>
                    <Button type="submit" className="w-100">Create</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7}>
              <Card className="panel-card h-100 border-0 shadow-sm" style={{ borderRadius: '24px' }}>
                <Card.Body className="p-4 p-md-5">
                  <div className="panel-heading mb-4 d-flex align-items-center">
                    <FaBookOpen className="me-2 text-primary" /> 
                    <h5 className="mb-0 fw-bold">Step-by-Step Guide</h5>
                  </div>
                  <p className="text-muted mb-4">Follow this built-in solution guide to quickly scaffold your MERN application.</p>
                  <div className="dashboard-command-board">
                    {guideSteps.map((step, index) => (
                      <div key={index} className="command-card command-card-visible mb-4 border rounded-4 p-4 bg-light">
                        <div className="command-card-head d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
                          <strong className="text-dark fs-6">{step.title}</strong>
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="bg-white border shadow-sm rounded-pill px-3 py-1 text-secondary"
                            onClick={() => copyCommand(step.command)}
                          >
                            <FaCopy className="me-1" /> Copy
                          </Button>
                        </div>
                        <p className="text-muted mb-3 small">{step.description}</p>
                        <pre className="docs-code-block compact-code bg-dark text-light p-3 rounded-3 mb-0">
                          <code>{step.command}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {loading ? (
            <div className="d-flex justify-content-center py-5">
            <Spinner size="large" />
          </div>
        ) : (
          <Row>
            {items.length > 0 ? (
              items.map((item, index) => (
                <Col key={item._id} md={6} lg={4} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="item-card h-100 border-0">
                      <Card.Body>
                        <div className="item-card-head">
                          <Card.Title className="fw-bold mb-0">{item.name}</Card.Title>
                          <Badge bg="light" text="dark">{item.status}</Badge>
                        </div>
                        <Card.Text className="text-muted">
                          {item.description || 'No description provided.'}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-transparent border-0 pt-0 d-flex justify-content-between align-items-center">
                        <small className="text-muted">Created: {new Date(item.createdAt).toLocaleDateString()}</small>
                        <Button variant="link" className="icon-button" onClick={() => handleDelete(item._id)}><FaTrash /></Button>
                      </Card.Footer>
                    </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <div className="empty-state p-5 rounded-4">
                  <h3>No items yet</h3>
                  <p className="text-muted">Create your first item here or seed demo data from `server/scripts/seedDemo.js`.</p>
                </div>
              </Col>
            )}
          </Row>
        )}
      </motion.div>
    </Container>
  );
};

export default Dashboard;
