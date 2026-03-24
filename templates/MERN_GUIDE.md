# MERN_Solution Guide

## 1. Create The Project

```bash
npx create-mern-proapp my-app
cd my-app
```

This command gives you the MERN_Solution starter with the inbuilt MVC architecture, frontend pages, backend structure, and docs flow.

## 2. Run The Project

```bash
npm run mern:start
```

Or separately:

```bash
cd server && npm run dev
cd client && npm run dev
```

## 3. Demo Login

```bash
cd server && npm run seed:demo
```

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## 4. API Routes

- `POST /api/auth/register` - create a user account
- `POST /api/auth/login` - authenticate and receive a JWT
- `POST /api/auth/logout` - clear client session state
- `GET /api/auth/me` - return the current authenticated user
- `GET /api/items` - list protected starter items
- `POST /api/items` - create a protected starter item
- `PUT /api/items/:id` - update a protected starter item
- `DELETE /api/items/:id` - delete a protected starter item
- `GET /api/meta` - return docs, architecture, and code examples

## 5. Controllers

- `server/controllers/authController.js` handles register, login, logout, and current-user requests
- `server/controllers/ItemController.js` handles starter CRUD in MVC style
- `server/controllers/MetaController.js` exposes docs, command groups, architecture, and code samples
- `server/controllers/Controller.js` keeps response formatting consistent

## 6. Generator Commands

```bash
node proapp help
node proapp docs
node proapp make:controller Project
node proapp make:model Project
node proapp make:middleware auditTrail
node proapp make:route projects
node proapp make:config cache
node proapp make:resource project
```

## 7. Migration Commands

Use these when you are moving an older backend into this structure:

```bash
cd server && npm run mern:docs
cd server && npm run mern:migrate -- ProjectController.js
node proapp mern:migrate ProjectController.js
```

## 8. Full Example After `make:resource project`

Expected files:

```text
server/controllers/ProjectController.js
server/models/Project.js
server/routes/projects.js
```

### Sample model

```js
const mongoose = require('mongoose');

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

module.exports = mongoose.model('Project', projectSchema);
```

### Sample controller

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

### Sample route

```js
const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', ProjectController.index.bind(ProjectController));
router.post('/', ProjectController.store.bind(ProjectController));

module.exports = router;
```

### Register the route

```js
const projectRoutes = require('./routes/projects');

app.use('/api/projects', projectRoutes);
```

## 9. Frontend Axios, Service, And Hook Flow

### Axios base service

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

### Feature service

```js
import api from './apiService';

export const getProjects = () => api.get('/api/projects');
export const createProject = (payload) => api.post('/api/projects', payload);
export const updateProject = (id, payload) => api.put(`/api/projects/${id}`, payload);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);
```

### Custom hook

```js
import { useCallback, useEffect, useState } from 'react';
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
}
```

### Page usage

```js
import React from 'react';
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

export default Projects;
```

## 10. Docs Page Content

Open `/docs` in the client to view:

- overview and architecture
- setup commands
- routes and integration values
- frontend Axios and hooks examples
- backend model, controller, and route examples
- generated file flow after create or migrate

## 11. Project Idea

MERN_Solution is designed as an inbuilt MVC-inspired MERN stack solution for developers.

The goal is to provide:

- a structured backend like controller, model, route, and middleware flow
- a ready frontend with auth, dashboard, and docs
- built-in developer commands for extending the project
- a cleaner starting point for real applications instead of a basic CRUD demo
