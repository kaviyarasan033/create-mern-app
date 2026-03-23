import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
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
    <Container className="dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="fw-bold">My Items</h1>
            <p className="text-muted">Manage your professional catalog</p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={fetchItems}>Refresh</Button>
          </Col>
        </Row>

        <hr className="mb-5 opacity-10" />

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
                    <Card className="item-card h-100 shadow-sm border-0">
                      <Card.Body>
                        <Card.Title className="fw-bold mb-3">{item.name}</Card.Title>
                        <Card.Text className="text-muted">
                          {item.description || 'No description provided.'}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-transparent border-0 pt-0">
                        <small className="text-muted">Created: {new Date(item.created_at).toLocaleDateString()}</small>
                      </Card.Footer>
                    </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <div className="empty-state p-5 rounded-4 bg-white shadow-sm border">
                  <h3>No items yet</h3>
                  <p className="text-muted">Start by creating your first item via the API or proapp CLI.</p>
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
