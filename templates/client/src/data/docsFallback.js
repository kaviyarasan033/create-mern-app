const docsFallback = {
  app: 'Open Source Dev Suite',
  appDescription: 'Responsive MERN starter for developer-facing tools with docs, commands, auth, and production-ready structure.',
  heroTagline: 'Ship a modern developer product with clear onboarding, visible commands, and scalable backend modules.',
  definition: 'Open Source Dev Suite is a MERN starter for building software used by developers. It gives you a polished React frontend, Express API, MongoDB-ready backend, and Node-based workflow that are structured for real product development instead of simple demo CRUD. The project includes authentication, protected routes, starter resources, and a documentation surface that explains how to install, run, use, integrate, and extend the application. That makes it useful for open source projects where developers expect both a clean interface and practical setup guidance. You can adapt it into an AI code review assistant, API testing platform, documentation portal, deployment dashboard, or internal engineering workspace. The frontend is designed to present commands, modules, and integration steps clearly across desktop, tablet, and mobile devices. The backend follows a readable MVC pattern so resources, middleware, and services can be added without creating confusion later. Because the documentation data is available from the server and also has a frontend fallback, the interface stays usable even during early setup. This starter is intended to help teams move from idea to implementation faster while keeping code organized enough for future scaling, collaboration, and open source contribution.',
  products: [
    {
      name: 'AI Code Review Assistant',
      audience: 'Open source maintainers',
      summary: 'Review diffs, summarize pull request risk, and show contributor-friendly feedback in one place.',
      stack: 'React review UI, Express review APIs, Mongo activity history, Node jobs for async analysis'
    },
    {
      name: 'API Testing Workbench',
      audience: 'Backend and QA teams',
      summary: 'Create collections, save environments, and inspect API response history from a clean command-focused interface.',
      stack: 'React workspace, Express request runners, Mongo environments, Node integration scripts'
    },
    {
      name: 'Docs Copilot Portal',
      audience: 'Developer relations teams',
      summary: 'Publish searchable guides, setup snippets, and examples for internal or external engineering users.',
      stack: 'React docs shell, Express content APIs, Mongo docs storage, Node import tooling'
    },
    {
      name: 'DevOps Visibility Hub',
      audience: 'Platform engineers',
      summary: 'Track builds, incidents, environments, and release readiness through one secure dashboard.',
      stack: 'React status panels, Express metrics routes, Mongo event timelines, Node service connectors'
    }
  ],
  routes: [
    { method: 'GET', path: '/api/meta', controller: 'MetaController.index', description: 'Return docs, commands, and frontend content metadata' },
    { method: 'POST', path: '/api/auth/register', controller: 'authController.register', description: 'Create a user account' },
    { method: 'POST', path: '/api/auth/login', controller: 'authController.login', description: 'Authenticate a user and return a JWT' },
    { method: 'GET', path: '/api/auth/me', controller: 'authController.getCurrentUser', description: 'Return the authenticated user' },
    { method: 'GET', path: '/api/items', controller: 'ItemController.index', description: 'List protected starter resources' },
    { method: 'POST', path: '/api/items', controller: 'ItemController.store', description: 'Create a protected starter resource' }
  ],
  controllers: [
    { name: 'MetaController', methods: 'index', purpose: 'Serves docs content and command metadata for the frontend.' },
    { name: 'authController', methods: 'register, login, logout, getCurrentUser', purpose: 'Handles JWT auth and current-user lookup.' },
    { name: 'ItemController', methods: 'index, store, update, destroy', purpose: 'Starter CRUD module for protected data.' }
  ],
  frontendModules: [
    { name: 'Home hero + login shell', file: 'client/src/pages/Home.js', purpose: 'Show product positioning while keeping login intact.' },
    { name: 'Interactive docs workspace', file: 'client/src/pages/Docs.js', purpose: 'Render sections, commands, and implementation guidance responsively.' },
    { name: 'Global responsive styles', file: 'client/src/styles/App.css', purpose: 'Control layout, cards, spacing, gradients, and mobile behavior.' },
    { name: 'Navigation shell', file: 'client/src/components/Navbar.js', purpose: 'Route users through docs, auth, and dashboard views.' }
  ],
  commands: [
    { title: 'Generate app', command: 'npx create-mern-proapp my-app', description: 'Create a new MERN starter project.', category: 'Setup' },
    { title: 'Install client deps', command: 'cd my-app/client && npm install', description: 'Install frontend dependencies.', category: 'Setup' },
    { title: 'Run frontend', command: 'cd my-app/client && npm run dev', description: 'Start the Vite frontend.', category: 'Run' },
    { title: 'Run backend', command: 'cd my-app/server && npm run dev', description: 'Start the Express server.', category: 'Run' },
    { title: 'Seed demo login', command: 'cd my-app/server && npm run seed:demo', description: 'Create demo credentials for testing.', category: 'Run' },
    { title: 'Create resource', command: 'node proapp make:resource project', description: 'Generate model, controller, and route together.', category: 'Generators' },
    { title: 'Create controller', command: 'node proapp make:controller Project', description: 'Generate a backend controller.', category: 'Generators' },
    { title: 'Build frontend', command: 'cd my-app/client && npm run build', description: 'Create a production frontend build.', category: 'Release' }
  ],
  gettingStarted: [
    { title: 'Create project', command: 'npx create-mern-proapp my-app', description: 'Generate the starter and initial folder structure.' },
    { title: 'Configure backend env', command: 'copy server/.env.example server/.env', description: 'Create your backend environment file.' },
    { title: 'Start services', command: 'cd my-app/server && npm run dev', description: 'Run the API locally, then start the client.' },
    { title: 'Open docs', command: 'http://localhost:5173/docs', description: 'Review setup, commands, and implementation guidance.' }
  ],
  integration: [
    { title: 'Mongo connection', command: 'MONGO_URI=mongodb://127.0.0.1:27017/open-source-dev-suite', description: 'Point the server to your MongoDB instance.' },
    { title: 'Frontend API base', command: 'VITE_API_BASE_URL=http://localhost:5000', description: 'Set the frontend API base URL for local development.' },
    { title: 'Backend docs', command: 'cd my-app/server && npm run mern:docs', description: 'Print backend scripts and structure notes.' },
    { title: 'Targeted migration', command: 'cd my-app/server && npm run mern:migrate -- ProjectController.js', description: 'Review migration help for a backend file.' }
  ],
  implementationSteps: [
    'Choose the first developer workflow you want to support, such as reviews, API collections, docs, or build visibility.',
    'Create resources on the backend with generators so the MVC structure stays consistent.',
    'Expose clean Express routes and return frontend-friendly JSON payloads.',
    'Map API functions in the React client and render them as cards, tables, forms, or command panels.',
    'Document every command and setup step so contributors can run and extend the project without guesswork.'
  ],
  usageFlow: [
    { title: 'Get', detail: 'Generate or clone the project, install dependencies, and set environment values.' },
    { title: 'Use', detail: 'Run backend and frontend locally, then seed the demo account for protected flows.' },
    { title: 'Integrate', detail: 'Wire third-party APIs or internal services through Express controllers and frontend helpers.' },
    { title: 'Implement', detail: 'Turn the starter into a real developer product by adding resource modules and docs sections.' }
  ],
  sampleCommands: [
    { label: 'Generate', command: 'npx create-mern-proapp open-dev-suite' },
    { label: 'API', command: 'cd open-dev-suite/server && npm run dev' },
    { label: 'UI', command: 'cd open-dev-suite/client && npm run dev' },
    { label: 'Build', command: 'cd open-dev-suite/client && npm run build' }
  ],
  sampleApi: {
    title: 'Sample login request',
    command: 'curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"demo@mernkit.dev\",\"password\":\"Password123!\"}"',
    response: '{\n  "success": true,\n  "message": "Login successful",\n  "data": {\n    "token": "jwt-token",\n    "user": {\n      "name": "Demo User",\n      "email": "demo@mernkit.dev"\n    }\n  }\n}'
  },
  backendScripts: [
    { name: 'npm run dev', description: 'Start the backend with nodemon.' },
    { name: 'npm run seed:demo', description: 'Seed the default demo credentials.' },
    { name: 'npm run mern:docs', description: 'Print backend docs and generators.' },
    { name: 'npm run mern:migrate -- ProjectController.js', description: 'Print migration guidance for a target file.' }
  ],
  defaultLogin: {
    email: 'demo@mernkit.dev',
    password: 'Password123!',
    note: 'Run the demo seed command before signing in.'
  }
};

export default docsFallback;
