import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import {
  FaBookOpen,
  FaCode,
  FaCopy,
  FaCube,
  FaLayerGroup,
  FaPlay,
  FaRoute,
  FaTerminal,
  FaUserLock,
  FaWrench
} from 'react-icons/fa6';
import toast from 'react-hot-toast';
import api from '../services/apiService';

const iconMap = {
  start: <FaPlay />,
  generators: <FaWrench />,
  routes: <FaRoute />,
  scripts: <FaTerminal />,
  login: <FaUserLock />,
  controllers: <FaCode />,
  products: <FaCube />,
  frontend: <FaLayerGroup />
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

function Docs() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    api.get('/api/meta').then((res) => setMeta(res.data.data)).catch(() => setMeta(null));
  }, []);

  const commandGroups = useMemo(() => {
    if (!Array.isArray(meta?.commands)) {
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

  const gettingStarted = Array.isArray(meta?.gettingStarted) ? meta.gettingStarted : [];
  const routes = Array.isArray(meta?.routes) ? meta.routes : [];
  const controllers = Array.isArray(meta?.controllers) ? meta.controllers : [];
  const backendScripts = Array.isArray(meta?.backendScripts) ? meta.backendScripts : [];
  const integration = Array.isArray(meta?.integration) ? meta.integration : [];
  const products = Array.isArray(meta?.products) ? meta.products : [];
  const frontendModules = Array.isArray(meta?.frontendModules) ? meta.frontendModules : [];
  const implementationSteps = Array.isArray(meta?.implementationSteps) ? meta.implementationSteps : [];
  const usageFlow = Array.isArray(meta?.usageFlow) ? meta.usageFlow : [];
  const sampleCommands = Array.isArray(meta?.sampleCommands) ? meta.sampleCommands : [];

  const copyCommand = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied');
    } catch (error) {
      toast.error('Copy failed');
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'getting-started', label: 'Get Started' },
    { id: 'commands', label: 'Commands' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'routes', label: 'Routes' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'sample', label: 'Sample' },
    { id: 'default-login', label: 'Demo Login' }
  ];

  return (
    <Container className="docs-container docs-layout docs-studio">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-card">
          <span className="eyebrow">Developer docs</span>
          <h2>{meta?.app || 'Open Source Dev Suite'}</h2>
          <p>{meta?.appDescription || 'Complete docs surface for MERN-based developer products.'}</p>
          <div className="docs-sidebar-links">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </div>
        </div>
      </aside>

      <div className="docs-main">
        <motion.div
          className="docs-hero docs-hero-rich"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="docs-orb docs-orb-one" />
          <div className="docs-orb docs-orb-two" />
          <div className="docs-grid-mark" />
          <span className="eyebrow">Open source product docs</span>
          <h1><FaBookOpen /> Frontend, commands, usage, and MERN implementation</h1>
          <p>{meta?.heroTagline || 'Build developer-facing products with a polished MERN foundation.'}</p>
          <div className="docs-hero-actions">
            {sampleCommands.map((item) => (
              <button key={item.command} type="button" className="command-chip" onClick={() => copyCommand(item.command)}>
                <span>{item.label}</span>
                <FaCopy />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.section id="overview" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.start} Definition</div>
          <Card className="panel-card panel-rich">
            <Card.Body>
              <p className="definition-copy">{meta?.definition}</p>
              <div className="usage-grid compact-grid">
                {usageFlow.map((item) => (
                  <div key={item.title} className="mini-doc-card">
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </motion.section>

        <motion.section id="products" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.products} Product ideas with frontend support</div>
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.name} md={6}>
                <Card className="panel-card product-doc-card h-100">
                  <Card.Body>
                    <div className="panel-heading">{product.name}</div>
                    <div className="product-meta">For {product.audience}</div>
                    <p>{product.summary}</p>
                    <code>{product.stack}</code>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.section>

        <motion.section id="getting-started" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.start} How to get and use it</div>
          <Row className="g-4">
            {gettingStarted.map((step) => (
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
        </motion.section>

        <motion.section id="commands" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.scripts} Commands and copy blocks</div>
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
        </motion.section>

        <motion.section id="frontend" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.frontend} Frontend modules and content structure</div>
          <Row className="g-4 mb-4">
            {frontendModules.map((module) => (
              <Col key={module.name} md={6}>
                <Card className="panel-card h-100">
                  <Card.Body>
                    <div className="panel-heading">{module.name}</div>
                    <p>{module.purpose}</p>
                    <code>{module.file}</code>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="panel-heading">Backend controllers</div>
                  <div className="docs-list">
                    {controllers.map((controller) => (
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
                    {backendScripts.map((script) => (
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
        </motion.section>

        <motion.section id="routes" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.routes} API routes and integration values</div>
          <Row className="g-4">
            <Col lg={7}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="docs-list">
                    {routes.map((route) => (
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
            </Col>
            <Col lg={5}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="panel-heading">How to integrate</div>
                  <div className="command-stack">
                    {integration.map((item) => (
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
          </Row>
        </motion.section>

        <motion.section id="implementation" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.generators} Implementation steps</div>
          <Card className="panel-card panel-rich">
            <Card.Body>
              <div className="implementation-flow">
                {implementationSteps.map((step, index) => (
                  <div key={step} className="implementation-step">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </motion.section>

        <motion.section id="sample" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.controllers} Sample command and API response</div>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="command-card-head">
                    <strong>{meta?.sampleApi?.title || 'Sample request'}</strong>
                    <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(meta?.sampleApi?.command || '')}>
                      <FaCopy /> Copy
                    </Button>
                  </div>
                  <pre className="docs-code-block"><code>{meta?.sampleApi?.command}</code></pre>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="command-card-head">
                    <strong>Expected response</strong>
                    <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(meta?.sampleApi?.response || '')}>
                      <FaCopy /> Copy
                    </Button>
                  </div>
                  <pre className="docs-code-block"><code>{meta?.sampleApi?.response}</code></pre>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.section>

        <motion.section id="default-login" className="docs-section" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="section-heading">{iconMap.login} Default login</div>
          <Card className="panel-card panel-rich">
            <Card.Body>
              <div className="docs-list">
                <div><strong>Email</strong> <code>{meta?.defaultLogin?.email || 'demo@mernkit.dev'}</code></div>
                <div><strong>Password</strong> <code>{meta?.defaultLogin?.password || 'Password123!'}</code></div>
                <div><small>{meta?.defaultLogin?.note || 'Run the seed command before signing in.'}</small></div>
              </div>
            </Card.Body>
          </Card>
        </motion.section>
      </div>
    </Container>
  );
}

export default Docs;
