const docsFallback = {
  app: 'MERN_Solution',
  appDescription: 'Clean MERN MVC starter with auth, docs, commands, and responsive developer-facing pages.',
  heroTagline: 'Use MERN_Solution to launch a clear developer product foundation with setup guidance, commands, and protected workflows.',
  definition: 'MERN_Solution is a developer-focused MERN starter built with MongoDB, Express, React, and Node.js. It provides a structured MVC backend, authentication flow, protected routes, starter CRUD, and a documentation surface that explains how to install, run, extend, and maintain the project. The goal is to give developers a clean starting point instead of an empty scaffold or a generic admin panel. The frontend is designed to communicate setup steps, command references, architecture notes, and route guidance in a simple responsive layout. The backend is organized so controllers, models, middleware, services, and routes remain easy to scale as the project grows. MERN_Solution is intended for teams and solo developers who want a practical inbuilt solution for building developer tools, internal systems, or product starters with a clear UI and maintainable structure.',
  products: [
    {
      name: 'Authentication foundation',
      audience: 'Developers starting new projects',
      summary: 'Use seeded credentials, registration, login, and protected routes as a working base layer.',
      stack: 'JWT auth, Express controllers, React forms, Mongo-ready user model'
    },
    {
      name: 'MVC resource starter',
      audience: 'Backend and full-stack developers',
      summary: 'Add resources with a cleaner controller-model-route workflow and keep project structure readable.',
      stack: 'Express routing, controller methods, Mongoose models, reusable middleware'
    },
    {
      name: 'Documentation surface',
      audience: 'Teams shipping internal or public tools',
      summary: 'Present commands, route details, module structure, and setup steps in one clear docs page.',
      stack: 'React docs UI, metadata endpoint, command blocks, responsive layouts'
    },
    {
      name: 'Developer dashboard',
      audience: 'Users validating protected flows',
      summary: 'Manage starter data, test routes, and confirm auth behavior from a simple workspace.',
      stack: 'Protected React dashboard, item CRUD, API services, status panels'
    }
  ],
  routes: [
    { method: 'GET', path: '/api/meta', controller: 'MetaController.index', description: 'Return docs content and frontend metadata' },
    { method: 'POST', path: '/api/auth/register', controller: 'authController.register', description: 'Create a user account' },
    { method: 'POST', path: '/api/auth/login', controller: 'authController.login', description: 'Authenticate and return a JWT' },
    { method: 'GET', path: '/api/auth/me', controller: 'authController.getCurrentUser', description: 'Return the authenticated user' },
    { method: 'GET', path: '/api/items', controller: 'ItemController.index', description: 'List protected starter resources' },
    { method: 'POST', path: '/api/items', controller: 'ItemController.store', description: 'Create a protected starter resource' }
  ],
  controllers: [
    { name: 'MetaController', methods: 'index', purpose: 'Serves docs content and command metadata for the frontend.' },
    { name: 'authController', methods: 'register, login, logout, getCurrentUser', purpose: 'Handles authentication and current-user lookup.' },
    { name: 'ItemController', methods: 'index, store, update, destroy', purpose: 'Provides starter CRUD logic for protected data.' }
  ],
  frontendModules: [
    { name: 'Landing + login page', file: 'client/src/pages/Home.js', purpose: 'Present MERN_Solution clearly while keeping login intact.' },
    { name: 'Developer docs workspace', file: 'client/src/pages/Docs.js', purpose: 'Render sections, commands, and architecture guidance responsively.' },
    { name: 'Responsive visual system', file: 'client/src/styles/App.css', purpose: 'Control layout, cards, spacing, forms, and docs presentation.' },
    { name: 'Navigation shell', file: 'client/src/components/Navbar.js', purpose: 'Guide users through docs, auth, and dashboard views.' }
  ],
  commands: [
    { title: 'Generate app', command: 'npx create-mern-proapp my-app', description: 'Create a new MERN_Solution project.', category: 'Setup' },
    { title: 'Install client deps', command: 'cd my-app/client && npm install', description: 'Install frontend dependencies.', category: 'Setup' },
    { title: 'Run frontend', command: 'cd my-app/client && npm run dev', description: 'Start the React frontend.', category: 'Run' },
    { title: 'Run backend', command: 'cd my-app/server && npm run dev', description: 'Start the Express server.', category: 'Run' },
    { title: 'Seed demo login', command: 'cd my-app/server && npm run seed:demo', description: 'Create demo credentials for testing.', category: 'Run' },
    { title: 'Create resource', command: 'node mern make:resource project', description: 'Generate model, controller, route, and migration together.', category: 'Generators' },
    { title: 'Create module', command: 'node mern make:module project', description: 'Generate the full backend scaffold in one command.', category: 'Generators' },
    { title: 'Create controller', command: 'node mern make:controller Project', description: 'Generate a backend controller.', category: 'Generators' },
    { title: 'Clear cache', command: 'npm run cache:clear', description: 'Clear generated frontend and backend runtime caches.', category: 'Maintenance' },
    { title: 'Clear config cache', command: 'npm run config:clear', description: 'Clear generated config cache folders for the whole MERN app.', category: 'Maintenance' },
    { title: 'Optimize clear', command: 'npm run optimize:clear', description: 'Run both cache clear and config clear for frontend and backend.', category: 'Maintenance' },
    { title: 'Build frontend', command: 'cd my-app/client && npm run build', description: 'Create a production frontend build.', category: 'Release' }
  ],
  gettingStarted: [
    { title: 'Create project', command: 'npx create-mern-proapp my-app', description: 'Generate the starter and initial folder structure.' },
    { title: 'Configure backend env', command: 'copy server/.env.example server/.env', description: 'Create your backend environment file.' },
    { title: 'Start services', command: 'cd my-app/server && npm run dev', description: 'Run the API locally, then start the client.' },
    { title: 'Open docs', command: 'http://localhost:5173/docs', description: 'Review setup, commands, routes, and architecture notes.' }
  ],
  integration: [
    { title: 'Mongo connection', command: 'MONGO_URI=mongodb://127.0.0.1:27017/mern_solution', description: 'Point the server to your MongoDB instance.' },
    { title: 'Frontend API base', command: 'VITE_API_BASE_URL=http://localhost:5000', description: 'Set the frontend API base URL for local development.' },
    { title: 'Backend docs', command: 'cd my-app/server && npm run mern:docs', description: 'Print backend scripts and structure notes.' },
    { title: 'Optimize clear', command: 'npm run optimize:clear', description: 'Clear cache and config artifacts across the full MERN workspace.' },
    { title: 'Targeted migration', command: 'cd my-app/server && npm run mern:migrate -- ProjectController.js', description: 'Review migration help for a backend file.' }
  ],
  implementationSteps: [
    'Start with the built-in auth, starter CRUD, and responsive docs page.',
    'Create new resources on the backend with the generator commands so the MVC structure stays consistent.',
    'Expose clean Express routes and return frontend-friendly JSON payloads.',
    'Map API functions in the React client and render them in dedicated pages or panels.',
    'Keep every setup and usage command documented so contributors can run the project without confusion.'
  ],
  usageFlow: [
    { title: 'Create', detail: 'Generate or clone the project, install dependencies, and set environment values.' },
    { title: 'Run', detail: 'Start backend and frontend locally, then seed the demo account for protected flows.' },
    { title: 'Extend', detail: 'Add resources through controllers, models, routes, services, and API helpers.' },
    { title: 'Document', detail: 'Keep setup steps, routes, and commands visible in the docs experience.' }
  ],
  architectureFlow: [
    { title: 'Client layer', detail: 'Keep pages, hooks, services, and components separate so UI code stays readable.' },
    { title: 'API layer', detail: 'Use one Axios service file for base URL, auth headers, and shared error handling.' },
    { title: 'Server layer', detail: 'Expose resource logic through route, controller, and model files in MVC order.' },
    { title: 'Migration flow', detail: 'After generating or migrating a resource, connect model, controller, route, service, and page together.' }
  ],
  sampleArchitecture: `my-app/
  client/
    src/
      components/
        Navbar.js
        ProtectedRoute.js
      context/
        AuthContext.js
      hooks/
        useProjects.js
      pages/
        Home.js
        Docs.js
        Dashboard.js
        Projects.js
      services/
        apiService.js
        projectService.js
      styles/
        App.css
  server/
    controllers/
      authController.js
      ItemController.js
      ProjectController.js
      MetaController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      User.js
      Item.js
      Project.js
    routes/
      auth.js
      api.js
      projects.js
      meta.js
    scripts/
      seedDemo.js
    app.js
    server.js`,
  sampleCommands: [
    { label: 'Generate', command: 'npx create-mern-proapp mern_solution' },
    { label: 'API', command: 'cd mern_solution/server && npm run dev' },
    { label: 'UI', command: 'cd mern_solution/client && npm run dev' },
    { label: 'Build', command: 'cd mern_solution/client && npm run build' },
    { label: 'Clear', command: 'cd mern_solution && npm run optimize:clear' }
  ],
  sampleApi: {
    title: 'Sample login request',
    command: 'curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"demo@mernkit.dev\",\"password\":\"Password123!\"}"',
    response: '{\n  "success": true,\n  "message": "Login successful",\n  "data": {\n    "token": "jwt-token",\n    "user": {\n      "name": "Demo User",\n      "email": "demo@mernkit.dev"\n    }\n  }\n}'
  },
  backendScripts: [
    { name: 'npm run dev', description: 'Start the backend with nodemon.' },
    { name: 'npm run cache:clear', description: 'Clear MERN runtime cache folders.' },
    { name: 'npm run config:clear', description: 'Clear generated config cache folders.' },
    { name: 'npm run optimize:clear', description: 'Run cache clear and config clear together.' },
    { name: 'npm run seed:demo', description: 'Seed the default demo credentials.' },
    { name: 'npm run mern:docs', description: 'Print backend docs and generators.' },
    { name: 'npm run mern:migrate -- ProjectController.js', description: 'Print migration guidance for a target file.' }
  ],
  frontendSamples: [
    {
      title: 'Axios base service',
      description: 'Use one shared Axios instance for API requests and auth headers.',
      code: `import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }

  return config;
});

export default api;`
    },
    {
      title: 'Feature service file',
      description: 'Move project-specific API calls into a dedicated service module.',
      code: `import api from './apiService';

export const getProjects = () => api.get('/api/projects');
export const createProject = (payload) => api.post('/api/projects', payload);
export const updateProject = (id, payload) => api.put(\`/api/projects/\${id}\`, payload);
export const deleteProject = (id) => api.delete(\`/api/projects/\${id}\`);`
    },
    {
      title: 'Custom hook with fetch flow',
      description: 'Use a reusable hook for list loading, creation, and refresh logic.',
      code: `import { useCallback, useEffect, useState } from 'react';
import { createProject, getProjects } from '../services/projectService';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (payload) => {
    const res = await createProject(payload);
    setProjects((current) => [res.data.data, ...current]);
  };

  return { projects, loading, loadProjects, addProject };
}`
    },
    {
      title: 'Page usage example',
      description: 'Connect the hook to a page and render a simple responsive list.',
      code: `import React from 'react';
import { useProjects } from '../hooks/useProjects';

function Projects() {
  const { projects, loading } = useProjects();

  if (loading) return <p>Loading projects...</p>;

  return (
    <section>
      <h1>Projects</h1>
      {projects.map((project) => (
        <article key={project._id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </article>
      ))}
    </section>
  );
}

export default Projects;`
    }
  ],
  backendSamples: [
    {
      title: 'Mongoose model sample',
      description: 'A clean project model after create or migrate.',
      code: `const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);`
    },
    {
      title: 'Controller sample',
      description: 'Keep resource logic in one controller with index and store methods first.',
      code: `const Project = require('../models/Project');
const Controller = require('./Controller');

class ProjectController extends Controller {
  async index(req, res) {
    const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
    return this.sendResponse(res, projects, 'Projects loaded');
  }

  async store(req, res) {
    const project = await Project.create({
      ...req.body,
      owner: req.user.id
    });

    return this.sendResponse(res, project, 'Project created', 201);
  }
}

module.exports = new ProjectController();`
    },
    {
      title: 'Route sample',
      description: 'Protect resource routes and map them to controller methods.',
      code: `const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', ProjectController.index.bind(ProjectController));
router.post('/', ProjectController.store.bind(ProjectController));

module.exports = router;`
    },
    {
      title: 'Server registration sample',
      description: 'Mount the resource route after create or migration.',
      code: `const projectRoutes = require('./routes/projects');

app.use('/api/projects', projectRoutes);`
    }
  ],
  generatedFlow: [
    { title: '1. Generate resource', detail: 'Run the resource command to create model, controller, and route files as a clean starting point.' },
    { title: '2. Complete the model', detail: 'Add required fields, enums, relations, timestamps, and validation rules in the Mongoose schema.' },
    { title: '3. Complete the controller', detail: 'Implement index, store, update, and destroy so the API returns frontend-friendly JSON.' },
    { title: '4. Register the route', detail: 'Mount the new route in the Express app and apply auth middleware if the feature is protected.' },
    { title: '5. Connect the client', detail: 'Create an Axios service, a custom hook, and a page or dashboard card that consumes the new endpoint.' },
    { title: '6. Document the flow', detail: 'Add commands, route notes, and code samples to the docs page so other developers can use the module quickly.' }
  ],
  defaultLogin: {
    email: 'demo@mernkit.dev',
    password: 'Password123!',
    note: 'Run the demo seed command before signing in.'
  }
};

export default docsFallback;
