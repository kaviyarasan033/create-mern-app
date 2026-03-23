import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaBookOpen, FaCode, FaCopy, FaPlay, FaRoute, FaTerminal, FaUserLock, FaWrench } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import api from '../services/apiService';

const iconMap = {
  start: <FaPlay />,
  generators: <FaWrench />,
  routes: <FaRoute />,
  scripts: <FaTerminal />,
  login: <FaUserLock />,
  controllers: <FaCode />
};

function Docs() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    api.get('/api/meta').then((res) => setMeta(res.data.data)).catch(() => setMeta(null));
  }, []);

  const commandGroups = useMemo(() => {
    if (!meta?.commands) {
      return [];
    }

    const grouped = meta.commands.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    return Object.entries(grouped);
  }, [meta]);

  const copyCommand = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Command copied');
    } catch (error) {
      toast.error('Failed to copy command');
    }
  };

  const sections = [
    { id: 'getting-started', label: 'Get Started' },
    { id: 'backend-commands', label: 'Backend Commands' },
    { id: 'routes', label: 'Routes' },
    { id: 'controllers', label: 'Controllers' },
    { id: 'integration', label: 'Integration' },
    { id: 'default-login', label: 'Demo Login' }
  ];

  return (
    <Container className="docs-container docs-layout">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-card">
          <span className="eyebrow">Docs sidebar</span>
          <h2>{meta?.app || 'MERN MVC Starter'}</h2>
          <p>{meta?.appDescription || 'Built-in backend guides, scaffold commands, and migration help.'}</p>
          <div className="docs-sidebar-links">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </div>
        </div>
      </aside>

      <div className="docs-main">
        <div className="docs-hero">
          <span className="eyebrow">Project documentation</span>
          <h1><FaBookOpen /> Backend help, commands, and integration</h1>
          <p>Use the generated docs page as your starter manual for installation, migration, resource scaffolding, and route references.</p>
        </div>

        <section id="getting-started" className="docs-section">
          <div className="section-heading">{iconMap.start} Getting started</div>
          <Row className="g-4">
            {meta?.gettingStarted?.map((step) => (
              <Col key={step.command} md={6}>
                <Card className="panel-card h-100">
                  <Card.Body>
                    <div className="command-card-head">
                      <strong>{step.title}</strong>
                      <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(step.command)}>
                        <FaCopy /> Copy
                      </Button>
                    </div>
                    <code>{step.command}</code>
                    <p>{step.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section id="backend-commands" className="docs-section">
          <div className="section-heading">{iconMap.scripts} Backend commands</div>
          <Row className="g-4">
            {commandGroups.map(([category, items]) => (
              <Col key={category} xl={6}>
                <Card className="panel-card h-100">
                  <Card.Body>
                    <div className="panel-heading">{category}</div>
                    <div className="command-stack">
                      {items.map((item) => (
                        <div key={item.command} className="command-card">
                          <div className="command-card-head">
                            <strong>{item.title}</strong>
                            <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(item.command)}>
                              <FaCopy /> Copy
                            </Button>
                          </div>
                          <code>{item.command}</code>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section id="routes" className="docs-section">
          <div className="section-heading">{iconMap.routes} API routes</div>
          <Card className="panel-card">
            <Card.Body>
              <div className="docs-list">
                {meta?.routes?.map((route) => (
                  <div key={`${route.method}-${route.path}`} className="route-card">
                    <div>
                      <code>{route.method}</code> <span>{route.path}</span>
                    </div>
                    <small>{route.controller}</small>
                    <p>{route.description}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </section>

        <section id="controllers" className="docs-section">
          <div className="section-heading">{iconMap.controllers} Controllers and backend scripts</div>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="panel-heading">Controllers</div>
                  <div className="docs-list">
                    {meta?.controllers?.map((controller) => (
                      <div key={controller.name}>
                        <strong>{controller.name}</strong>
                        <small>{controller.methods}</small>
                        <p>{controller.purpose}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="panel-heading">Server scripts</div>
                  <div className="docs-list">
                    {meta?.backendScripts?.map((script) => (
                      <div key={script.name}>
                        <code>{script.name}</code>
                        <p>{script.description}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <section id="integration" className="docs-section">
          <div className="section-heading">{iconMap.generators} Integration guide</div>
          <Row className="g-4">
            {meta?.integration?.map((item) => (
              <Col key={item.command} md={6}>
                <Card className="panel-card h-100">
                  <Card.Body>
                    <div className="command-card-head">
                      <strong>{item.title}</strong>
                      <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(item.command)}>
                        <FaCopy /> Copy
                      </Button>
                    </div>
                    <code>{item.command}</code>
                    <p>{item.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section id="default-login" className="docs-section">
          <div className="section-heading">{iconMap.login} Default login</div>
          <Card className="panel-card">
            <Card.Body>
              <div className="docs-list">
                <div><strong>Email</strong> <code>{meta?.defaultLogin?.email || 'demo@mernkit.dev'}</code></div>
                <div><strong>Password</strong> <code>{meta?.defaultLogin?.password || 'Password123!'}</code></div>
                <div><small>{meta?.defaultLogin?.note || 'Run the seed command before signing in.'}</small></div>
              </div>
            </Card.Body>
          </Card>
        </section>
      </div>
    </Container>
  );
}

export default Docs;
