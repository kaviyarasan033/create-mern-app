# create-mern-proapp

Create a developer-friendly MERN MVC starter with auth, docs, generator commands, migration help, and a complete frontend/backend flow.

## What You Get

- Express MVC backend with controllers, models, middleware, routes, and reusable config.
- React frontend with login, register, dashboard, and a documentation-first `/docs` page.
- JWT authentication flow with protected routes and demo seed credentials.
- Built-in CLI commands for creating controllers, models, routes, middleware, configs, and full resources.
- Metadata-driven docs with code samples for Axios, hooks, models, controllers, routes, and resource architecture.

## Quick Start

```bash
npx create-mern-proapp my-app
cd my-app
```

The generator already creates the full MERN_Solution starter with the inbuilt MVC structure, frontend, backend, docs page, and package setup.

## Run The Project

```bash
npm run mern:start
```

Or run each side manually:

```bash
cd server && npm run dev
cd client && npm run dev
```

## Demo Login

```bash
cd server && npm run seed:demo
```

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## CLI Commands

Run these from the generated project root:

```bash
node mern help
node mern docs
node mern make:controller Project
node mern make:model Project
node mern make:middleware auditTrail
node mern make:route projects
node mern make:config cache
node mern make:resource project
node mern make:module project
node mern mern:migrate ProjectController.js
node mern cache:clear
node mern config:clear
node mern optimize:clear
```

Cache helpers:

```bash
npm run cache:clear
npm run config:clear
npm run optimize:clear
```

## Generated Server Scripts

```bash
cd server && npm run mern:start
cd server && npm run mern:docs
cd server && npm run mern:migrate -- ProjectController.js
cd server && npm run seed:demo
```

## Example Resource Flow

### 1. Generate a resource

```bash
node mern make:resource project
```

This now scaffolds:

- `server/models/Project.js`
- `server/controllers/ProjectController.js`
- `server/routes/projects.js`
- `server/migrations/<timestamp>-create-project.js`

### 2. Complete the backend files

- `server/models/Project.js`
- `server/controllers/ProjectController.js`
- `server/routes/projects.js`
- `server/migrations/<timestamp>-create-project.js`

### 3. Register the route in the server

```js
const projectRoutes = require('./routes/projects');

app.use('/api/projects', projectRoutes);
```

### 4. Connect the frontend

- Create `client/src/services/projectService.js`
- Create `client/src/hooks/useProjects.js`
- Add a page like `client/src/pages/Projects.js`

## Frontend Example

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
```

## Backend Example

```js
const Project = require('../models/Project');
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

module.exports = new ProjectController();
```

## Docs And Guides

- `/docs` page in the generated client
- `GET /api/meta` endpoint for docs content and code snippets
- `templates/README.md` for generated project usage
- `templates/MERN_GUIDE.md` for the long-form workflow guide

## Project Purpose

MERN_Solution is meant to be an inbuilt MVC-style MERN stack solution for developers, inspired by structured frameworks like Laravel.

It focuses on:

- reusable project structure
- built-in auth and protected routes
- generator-based backend workflow
- frontend docs and developer-friendly examples
- clean extension flow for new resources

## License

MIT
