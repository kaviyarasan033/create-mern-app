import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import {
  FaBookOpen,
  FaCode,
  FaCopy,
  FaCube,
  FaLaptopCode,
  FaPlay,
  FaRoute,
  FaTerminal,
  FaUserLock,
  FaWrench
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import api from '../services/apiService';
import docsFallback from '../data/docsFallback';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  overview: <FaBookOpen />,
  products: <FaCube />,
  gettingStarted: <FaPlay />,
  commands: <FaTerminal />,
  frontend: <FaLaptopCode />,
  routes: <FaRoute />,
  implementation: <FaWrench />,
  sample: <FaCode />,
  login: <FaUserLock />
};

function Docs() {
  const [meta, setMeta] = useState(docsFallback);
  const [activeSection, setActiveSection] = useState('overview');
  const sectionBodyRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    api.get('/api/meta')
      .then((res) => {
        if (mounted && res?.data?.data) {
          setMeta({ ...docsFallback, ...res.data.data });
        }
      })
      .catch(() => {
        if (mounted) {
          setMeta(docsFallback);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!sectionBodyRef.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.docs-card-animate',
        { autoAlpha: 0, y: 32, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionBodyRef.current,
            start: 'top 78%',
            once: true
          }
        }
      );
    }, sectionBodyRef);

    return () => ctx.revert();
  }, [activeSection]);

  const commandGroups = useMemo(() => {
    if (!Array.isArray(meta?.commands)) {
      return [];
    }

    const grouped = meta.commands.reduce((acc, command) => {
      const category = command.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(command);
      return acc;
    }, {});

    return Object.entries(grouped);
  }, [meta]);

  const sections = [
    { id: 'overview', label: 'Overview', description: 'Definition and workflow' },
    { id: 'products', label: 'Products', description: 'Developer product ideas' },
    { id: 'gettingStarted', label: 'Get Started', description: 'Install and run' },
    { id: 'commands', label: 'Commands', description: 'Copy-ready command blocks' },
    { id: 'frontend', label: 'Frontend', description: 'UI and module structure' },
    { id: 'routes', label: 'Routes', description: 'API and integration values' },
    { id: 'implementation', label: 'Implementation', description: 'Step-by-step build plan' },
    { id: 'sample', label: 'Sample', description: 'Request and response' },
    { id: 'login', label: 'Demo Login', description: 'Seeded credentials' }
  ];

  const activeMeta = sections.find((section) => section.id === activeSection) || sections[0];

  const copyCommand = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Copy failed');
    }
  };

  const renderQuickActions = () => (
    <div className="docs-hero-actions">
      {(meta?.sampleCommands || []).map((item) => (
        <button key={item.command} type="button" className="command-chip" onClick={() => copyCommand(item.command)}>
          <span>{item.label}</span>
          <FaCopy />
        </button>
      ))}
    </div>
  );

  const renderOverview = () => (
    <>
      <Card className="panel-card docs-card-animate docs-focus-card">
        <Card.Body>
          <div className="section-heading">{iconMap.overview} Definition</div>
          <p className="definition-copy">{meta.definition}</p>
        </Card.Body>
      </Card>
      <div className="docs-panel-grid docs-card-animate docs-grid-4">
        {(meta.usageFlow || []).map((item) => (
          <Card key={item.title} className="panel-card mini-doc-card">
            <Card.Body>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );

  const renderProducts = () => (
    <div className="docs-panel-grid docs-grid-2">
      {(meta.products || []).map((product) => (
        <Card key={product.name} className="panel-card docs-card-animate product-doc-card">
          <Card.Body>
            <div className="section-heading small-heading">{iconMap.products} {product.name}</div>
            <div className="product-meta">For {product.audience}</div>
            <p>{product.summary}</p>
            <pre className="inline-code-block"><code>{product.stack}</code></pre>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  const renderGettingStarted = () => (
    <div className="docs-panel-grid docs-grid-2">
      {(meta.gettingStarted || []).map((step) => (
        <Card key={step.command} className="panel-card docs-card-animate command-panel-card">
          <Card.Body>
            <div className="command-card-head">
              <strong>{step.title}</strong>
              <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(step.command)}>
                <FaCopy /> Copy
              </Button>
            </div>
            <pre className="docs-code-block"><code>{step.command}</code></pre>
            <p>{step.description}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  const renderCommands = () => (
    <div className="docs-panel-grid docs-grid-2">
      {commandGroups.map(([category, commands]) => (
        <Card key={category} className="panel-card docs-card-animate">
          <Card.Body>
            <div className="section-heading small-heading">{iconMap.commands} {category}</div>
            <div className="command-stack">
              {commands.map((item) => (
                <div key={item.command} className="command-card command-card-visible">
                  <div className="command-card-head">
                    <strong>{item.title}</strong>
                    <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(item.command)}>
                      <FaCopy /> Copy
                    </Button>
                  </div>
                  <pre className="docs-code-block compact-code"><code>{item.command}</code></pre>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  const renderFrontend = () => (
    <>
      <div className="docs-panel-grid docs-grid-2">
        {(meta.frontendModules || []).map((module) => (
          <Card key={module.name} className="panel-card docs-card-animate">
            <Card.Body>
              <div className="section-heading small-heading">{iconMap.frontend} {module.name}</div>
              <p>{module.purpose}</p>
              <pre className="inline-code-block"><code>{module.file}</code></pre>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Row className="g-4 docs-card-animate">
        <Col lg={6}>
          <Card className="panel-card h-100">
            <Card.Body>
              <div className="section-heading small-heading">{iconMap.sample} Backend controllers</div>
              <div className="docs-list">
                {(meta.controllers || []).map((controller) => (
                  <div key={controller.name} className="stack-detail-card">
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
              <div className="section-heading small-heading">{iconMap.commands} Server scripts</div>
              <div className="docs-list">
                {(meta.backendScripts || []).map((script) => (
                  <div key={script.name} className="stack-detail-card">
                    <pre className="inline-code-block"><code>{script.name}</code></pre>
                    <p>{script.description}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderRoutes = () => (
    <Row className="g-4">
      <Col xl={7}>
        <Card className="panel-card docs-card-animate h-100">
          <Card.Body>
            <div className="section-heading small-heading">{iconMap.routes} API routes</div>
            <div className="docs-list">
              {(meta.routes || []).map((route) => (
                <div key={`${route.method}-${route.path}`} className="route-card route-card-strong">
                  <div className="route-topline">
                    <span className="route-method">{route.method}</span>
                    <code>{route.path}</code>
                  </div>
                  <small>{route.controller}</small>
                  <p>{route.description}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={5}>
        <Card className="panel-card docs-card-animate h-100">
          <Card.Body>
            <div className="section-heading small-heading">{iconMap.commands} Integration</div>
            <div className="command-stack">
              {(meta.integration || []).map((item) => (
                <div key={item.command} className="command-card command-card-visible">
                  <div className="command-card-head">
                    <strong>{item.title}</strong>
                    <Button variant="outline-secondary" size="sm" onClick={() => copyCommand(item.command)}>
                      <FaCopy /> Copy
                    </Button>
                  </div>
                  <pre className="docs-code-block compact-code"><code>{item.command}</code></pre>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderImplementation = () => (
    <Card className="panel-card docs-card-animate">
      <Card.Body>
        <div className="section-heading">{iconMap.implementation} Implementation steps</div>
        <div className="implementation-flow">
          {(meta.implementationSteps || []).map((step, index) => (
            <div key={step} className="implementation-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );

  const renderSample = () => (
    <Row className="g-4">
      <Col lg={6}>
        <Card className="panel-card docs-card-animate h-100">
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
        <Card className="panel-card docs-card-animate h-100">
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
  );

  const renderLogin = () => (
    <Card className="panel-card docs-card-animate docs-focus-card">
      <Card.Body>
        <div className="section-heading">{iconMap.login} Default login</div>
        <div className="docs-list docs-login-list">
          <div className="stack-detail-card">
            <strong>Email</strong>
            <pre className="inline-code-block"><code>{meta?.defaultLogin?.email || 'demo@mernkit.dev'}</code></pre>
          </div>
          <div className="stack-detail-card">
            <strong>Password</strong>
            <pre className="inline-code-block"><code>{meta?.defaultLogin?.password || 'Password123!'}</code></pre>
          </div>
          <div className="stack-detail-card">
            <strong>Note</strong>
            <p>{meta?.defaultLogin?.note || 'Run the demo seed command before signing in.'}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'products':
        return renderProducts();
      case 'gettingStarted':
        return renderGettingStarted();
      case 'commands':
        return renderCommands();
      case 'frontend':
        return renderFrontend();
      case 'routes':
        return renderRoutes();
      case 'implementation':
        return renderImplementation();
      case 'sample':
        return renderSample();
      case 'login':
        return renderLogin();
      default:
        return renderOverview();
    }
  };

  return (
    <Container className="docs-container docs-workspace">
      <div className="docs-shell">
        <aside className="docs-sidebar-panel">
          <div className="docs-sidebar-card docs-sidebar-card-strong">
            <span className="eyebrow">Developer docs</span>
            <h1>{meta.app}</h1>
            <p>{meta.appDescription}</p>
            <div className="docs-sidebar-links docs-sidebar-buttons">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`docs-sidebar-button ${activeSection === section.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveSection(section.id);
                    sectionBodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <span className="sidebar-icon">{iconMap[section.id]}</span>
                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="docs-content-panel">
          <Card className="panel-card docs-hero-card">
            <Card.Body>
              <div className="docs-hero-grid">
                <div>
                  <span className="eyebrow">Open source product docs</span>
                  <h2>Responsive commands, modern cards, and backend-aligned structure.</h2>
                  <p>{meta.heroTagline}</p>
                  {renderQuickActions()}
                </div>
                <div className="docs-hero-stack">
                  <div className="hero-metric-card">
                    <span>09</span>
                    <small>Structured docs sections</small>
                  </div>
                  <div className="hero-metric-card">
                    <span>{(meta.commands || []).length}</span>
                    <small>Visible command blocks</small>
                  </div>
                  <div className="hero-metric-card">
                    <span>{(meta.routes || []).length}</span>
                    <small>Backend routes documented</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          <div ref={sectionBodyRef} className="docs-section-panel">
            <div className="docs-section-header docs-card-animate">
              <div className="section-heading section-heading-large">
                {iconMap[activeMeta.id]} {activeMeta.label}
              </div>
              <p>{activeMeta.description}</p>
            </div>
            {renderActiveSection()}
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Docs;
