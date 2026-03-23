import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaBookOpen, FaCode, FaRoute, FaTerminal, FaUserLock } from 'react-icons/fa6';
import api from '../services/apiService';

const iconMap = {
  routes: <FaRoute />,
  commands: <FaTerminal />,
  login: <FaUserLock />,
  controllers: <FaCode />
};

function Docs() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    api.get('/api/meta').then((res) => setMeta(res.data.data)).catch(() => setMeta(null));
  }, []);

  return (
    <Container className="docs-container">
      <div className="docs-hero">
        <span className="eyebrow">Project documentation</span>
        <h1><FaBookOpen /> Built-in MERN reference</h1>
        <p>Routes, controllers, demo login, and commands are available from the app and the API.</p>
      </div>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="panel-card h-100">
            <Card.Body>
              <div className="panel-heading">{iconMap.routes} Routes</div>
              <div className="docs-list">
                {meta?.routes?.map((route) => (
                  <div key={`${route.method}-${route.path}`}>
                    <code>{route.method}</code> <span>{route.path}</span> <small>{route.controller}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="panel-card h-100">
            <Card.Body>
              <div className="panel-heading">{iconMap.commands} Commands</div>
              <div className="command-list">
                {meta?.commands?.map((command) => (
                  <code key={command}>{command}</code>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="panel-card h-100">
            <Card.Body>
              <div className="panel-heading">{iconMap.controllers} Controllers</div>
              <div className="docs-list">
                <div><strong>authController</strong> <small>register, login, logout, getCurrentUser</small></div>
                <div><strong>ItemController</strong> <small>index, store, update, destroy</small></div>
                <div><strong>MetaController</strong> <small>project route and command metadata</small></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="panel-card h-100">
            <Card.Body>
              <div className="panel-heading">{iconMap.login} Default login</div>
              <div className="docs-list">
                <div><strong>Email</strong> <code>{meta?.defaultLogin?.email || 'demo@mernkit.dev'}</code></div>
                <div><strong>Password</strong> <code>{meta?.defaultLogin?.password || 'Password123!'}</code></div>
                <div><small>{meta?.defaultLogin?.note || 'Run the seed command before signing in.'}</small></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Docs;
