const Controller = require('./Controller');

class MetaController extends Controller {
  index(req, res) {
    this.sendResponse(res, {
      app: 'Open Source Dev Suite',
      appDescription: 'MERN starter for developer-facing products with docs, commands, seeded auth, and production-shaped frontend sections.',
      heroTagline: 'Build open source tools for developers with a polished MERN foundation.',
      definition: 'Open Source Dev Suite is a MERN starter designed for teams building products for developers, not generic dashboards. It combines MongoDB, Express, React, and Node.js into a workflow that already includes authentication, protected routes, starter CRUD, command references, and a frontend documentation surface that explains how the product works. The goal is to help developers move from idea to usable platform faster while keeping structure clean enough for long-term scaling. You can use it to launch API testing tools, documentation copilots, code review assistants, internal engineering hubs, or deployment dashboards. On the frontend, the starter gives you room to present product value clearly with animated sections, command cards, onboarding steps, and implementation guides. On the backend, it keeps responsibilities separated into controllers, routes, models, middleware, and scripts so new modules are easy to add. Because the project is open source oriented, the documentation emphasizes installation, usage, integration, and extension rather than only admin CRUD. That makes it suitable for portfolio projects, final-year submissions, startup prototypes, or real internal tools where developers expect both clean UI and clear technical guidance from the first release.',
      products: [
        {
          name: 'AI Code Review Assistant',
          audience: 'Open source maintainers',
          summary: 'Analyze pull requests, summarize risk, and suggest safer merges from a React command center.',
          stack: 'React UI, Express review endpoints, Mongo audit history, Node workers for analysis'
        },
        {
          name: 'API Testing Workbench',
          audience: 'Backend and QA developers',
          summary: 'Store request collections, compare responses, and share saved environments across teams.',
          stack: 'React workspace, Express collections API, Mongo environments, Node scripting hooks'
        },
        {
          name: 'Docs Copilot Portal',
          audience: 'Developer relations teams',
          summary: 'Turn internal notes into searchable product guides with examples, commands, and release notes.',
          stack: 'React docs shell, Express content delivery, Mongo document models, Node sync scripts'
        },
        {
          name: 'DevOps Visibility Hub',
          audience: 'Platform engineers',
          summary: 'Show builds, incidents, environments, and service health in one place with secure access.',
          stack: 'React status views, Express metrics routes, Mongo timeline logs, Node integrations'
        }
      ],
      routes: [
        { method: 'POST', path: '/api/auth/register', controller: 'authController.register', description: 'Create a new user account' },
        { method: 'POST', path: '/api/auth/login', controller: 'authController.login', description: 'Authenticate and receive a JWT' },
        { method: 'POST', path: '/api/auth/logout', controller: 'authController.logout', description: 'Clear client session state' },
        { method: 'GET', path: '/api/auth/me', controller: 'authController.getCurrentUser', description: 'Return the current authenticated user' },
        { method: 'GET', path: '/api/items', controller: 'ItemController.index', description: 'List the current user items' },
        { method: 'POST', path: '/api/items', controller: 'ItemController.store', description: 'Create a new item' },
        { method: 'PUT', path: '/api/items/:id', controller: 'ItemController.update', description: 'Update an existing item' },
        { method: 'DELETE', path: '/api/items/:id', controller: 'ItemController.destroy', description: 'Delete an item' }
      ],
      controllers: [
        { name: 'authController', methods: 'register, login, logout, getCurrentUser', purpose: 'Authentication flow and current-user lookup' },
        { name: 'ItemController', methods: 'index, store, update, destroy', purpose: 'Starter resource CRUD logic' },
        { name: 'MetaController', methods: 'index', purpose: 'Returns docs, command metadata, and integration notes' }
      ],
      frontendModules: [
        { name: 'Hero + product storytelling', file: 'client/src/pages/Home.js', purpose: 'Present the developer product value before sign in.' },
        { name: 'Product docs experience', file: 'client/src/pages/Docs.js', purpose: 'Explain setup, commands, architecture, and extension points.' },
        { name: 'Global visual system', file: 'client/src/styles/App.css', purpose: 'Own gradients, SVG atmosphere, cards, command blocks, and responsive behavior.' },
        { name: 'Navigation shell', file: 'client/src/components/Navbar.js', purpose: 'Route users between docs, auth, and dashboard surfaces.' }
      ],
      commands: [
        { title: 'Create controller', command: 'node proapp make:controller Project', description: 'Generate a backend controller class', category: 'Generators' },
        { title: 'Create model', command: 'node proapp make:model Project', description: 'Generate a Mongoose model file', category: 'Generators' },
        { title: 'Create middleware', command: 'node proapp make:middleware auditTrail', description: 'Generate a reusable middleware file', category: 'Generators' },
        { title: 'Create route', command: 'node proapp make:route projects', description: 'Generate a route file and matching controller if missing', category: 'Generators' },
        { title: 'Create config', command: 'node proapp make:config cache', description: 'Generate a config module in server/config', category: 'Generators' },
        { title: 'Create resource', command: 'node proapp make:resource project', description: 'Generate model, controller, and route together', category: 'Generators' },
        { title: 'Install frontend deps', command: 'cd client && npm install', description: 'Install React app dependencies for the docs and product UI', category: 'Frontend setup' },
        { title: 'Run frontend dev', command: 'cd client && npm run dev', description: 'Start the Vite frontend locally', category: 'Frontend setup' },
        { title: 'Run backend dev', command: 'cd server && npm run dev', description: 'Start the Express API locally', category: 'Backend setup' },
        { title: 'Seed demo login', command: 'cd server && npm run seed:demo', description: 'Create the default demo login', category: 'Backend setup' },
        { title: 'CLI docs', command: 'node proapp docs', description: 'Show docs endpoints and demo login details', category: 'Docs' },
        { title: 'CLI help', command: 'node proapp help', description: 'Show available backend commands', category: 'Docs' },
        { title: 'Migrate file', command: 'node proapp mern:migrate ProjectController.js', description: 'Print migration steps for a target backend file', category: 'Migration' },
        { title: 'Build frontend', command: 'cd client && npm run build', description: 'Create a production build for deployment', category: 'Release' },
        { title: 'Backend docs', command: 'cd server && npm run mern:docs', description: 'Print backend scripts and generators', category: 'Release' }
      ],
      gettingStarted: [
        { title: 'Create project', command: 'npx create-mern-proapp my-app', description: 'Generate the starter and install dependencies.' },
        { title: 'Start backend', command: 'cd my-app/server && npm run dev', description: 'Run the API in watch mode.' },
        { title: 'Start frontend', command: 'cd my-app/client && npm run dev', description: 'Open the React app in the browser.' },
        { title: 'Seed demo user', command: 'cd my-app/server && npm run seed:demo', description: 'Create the default demo credentials.' },
        { title: 'Open docs', command: 'open http://localhost:5173/docs', description: 'Review commands, architecture, and integration guidance.' }
      ],
      integration: [
        { title: 'Environment setup', command: 'copy server/.env.example server/.env', description: 'Create local backend environment values before connecting MongoDB.' },
        { title: 'Mongo connection', command: 'MONGO_URI=mongodb://127.0.0.1:27017/open-source-dev-suite', description: 'Point the backend to a local or hosted MongoDB instance.' },
        { title: 'Backend docs', command: 'cd server && npm run mern:docs', description: 'List scripts, generators, and backend structure.' },
        { title: 'Targeted migration', command: 'cd server && npm run mern:migrate -- ProjectController.js', description: 'Review migration guidance for a controller or backend file.' },
        { title: 'Resource scaffold', command: 'node proapp make:resource project', description: 'Generate a model, controller, and route as a starting point.' },
        { title: 'Frontend API target', command: 'VITE_API_BASE_URL=http://localhost:5000', description: 'Point the React app to the Express backend during development.' }
      ],
      implementationSteps: [
        'Define the developer-facing product module you want to ship first, such as reviews, API collections, docs, or build monitoring.',
        'Create the resource with the built-in generator so the backend keeps consistent MVC structure.',
        'Expose the resource through Express routes and return clean JSON for the frontend cards, tables, and docs sections.',
        'Map the new endpoints into React service functions and surface them in dedicated pages, panels, or product modules.',
        'Document every setup and usage command in the docs page so open source users can install, run, and extend your project quickly.'
      ],
      usageFlow: [
        { title: 'Get', detail: 'Clone or generate the project, install dependencies, and configure MongoDB plus environment variables.' },
        { title: 'Use', detail: 'Run backend and frontend locally, seed the demo account, and sign in to validate protected routes.' },
        { title: 'Integrate', detail: 'Connect new services through controller methods, environment values, and React API helpers.' },
        { title: 'Implement', detail: 'Add product-specific pages, docs sections, and backend resources that match your developer tool idea.' }
      ],
      sampleCommands: [
        { label: 'Generate app', command: 'npx create-mern-proapp open-dev-suite' },
        { label: 'Run API', command: 'cd open-dev-suite/server && npm run dev' },
        { label: 'Run UI', command: 'cd open-dev-suite/client && npm run dev' },
        { label: 'Build release', command: 'cd open-dev-suite/client && npm run build' }
      ],
      sampleApi: {
        title: 'Sample integration request',
        command: "curl -X POST http://localhost:5000/api/auth/login -H \"Content-Type: application/json\" -d '{\"email\":\"demo@mernkit.dev\",\"password\":\"Password123!\"}'",
        response: '{\n  "success": true,\n  "message": "Login successful",\n  "data": {\n    "token": "jwt-token",\n    "user": {\n      "name": "Demo User",\n      "email": "demo@mernkit.dev"\n    }\n  }\n}'
      },
      backendScripts: [
        { name: 'npm run dev', description: 'Start the backend with nodemon' },
        { name: 'npm run seed:demo', description: 'Seed the default demo credentials' },
        { name: 'npm run mern:start', description: 'Print startup steps for the backend' },
        { name: 'npm run mern:docs', description: 'Print backend docs and generators' },
        { name: 'npm run mern:migrate -- ProjectController.js', description: 'Print migration guidance for a target file' }
      ],
      defaultLogin: {
        email: 'demo@mernkit.dev',
        password: 'Password123!',
        note: 'Run the demo seed command before using these credentials.'
      }
    }, 'Project metadata loaded');
  }
}

module.exports = new MetaController();
