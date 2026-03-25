# MERN_Solution Guide

## 1. Create The Project

```bash
npx create-mern-proapp my-app
cd my-app
```

This command gives you the MERN_Solution starter with the inbuilt MVC architecture, frontend pages, backend structure, and docs flow.

## 2. Run The Project

```bash
npm run setup
npm run setup:check
npm run mern:start
```

Or separately:

```bash
cd server && npm run dev
cd client && npm run dev
```

## 2A. Server Integrations

- MongoDB remains the primary database for the built-in auth and starter MVC resources.
- MySQL config is available for additional server-side services through `server/config/mysql.js`.
- Firebase Admin config is available through `server/config/firebase.js`.
- Run `npm run setup:check` to verify the current server env values before development.

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
- `POST /api/auth/refresh` - refresh expired JWT tokens
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
node mern help
node mern docs
node mern make:controller Project
node mern make:model Project
node mern make:middleware auditTrail
node mern make:route projects
node mern make:config cache
node mern make:resource project
node mern make:module project
node mern cache:clear
node mern config:clear
node mern optimize:clear
```

## 6A. Cache And Optimize Commands

```bash
npm run cache:clear
npm run config:clear
npm run optimize:clear
```

## 7. Migration Commands

Use these when you are moving an older backend into this structure:

```bash
cd server && npm run mern:docs
cd server && npm run mern:migrate -- ProjectController.js
node mern mern:migrate ProjectController.js
```

## 8. Full Example After `make:resource project`

Expected files:

```text
server/controllers/ProjectController.js
server/models/Project.js
server/routes/projects.js
server/migrations/<timestamp>-create-project.js
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Try to refresh token if expired
      if (error.response.data?.message === 'Token expired') {
        originalRequest._retry = true;
        
        try {
          const refreshResponse = await api.post('/api/auth/refresh');
          if (refreshResponse.data.success) {
            localStorage.setItem('token', refreshResponse.data.data.token);
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      } else {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

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

## 10. Authentication & Token Handling

The MERN_Solution includes robust JWT token handling with Google OAuth support:

### Authentication Options
- **Local JWT Authentication**: Email/password with secure JWT tokens
- **Google OAuth**: Firebase-powered Google authentication with automatic user creation
- **Token Auto Refresh**: Automatic token refresh when expired
- **Secure Token Validation**: Industry-standard Bearer token format

### Token Flow
- **Bearer Token Authentication**: Uses standard `Authorization: Bearer <token>` headers
- **Auto Refresh**: Expired tokens are automatically refreshed via `/api/auth/refresh` endpoint
- **Error Handling**: Differentiates between token expiration, invalid tokens, and missing tokens
- **Google OAuth Integration**: Firebase tokens validated and converted to JWT

### Security Features
- **Helmet**: Security HTTP headers
- **XSS Protection**: Prevents cross-site scripting attacks
- **Rate Limiting**: Prevents API abuse
- **NoSQL Injection Prevention**: Sanitizes MongoDB queries
- **Firebase Security Rules**: Additional Firebase security layer

### Token Endpoints
- `POST /api/auth/login` - Get JWT token
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/google` - Google OAuth authentication
- `POST /api/auth/refresh` - Refresh expired token
- `GET /api/auth/me` - Get current user with valid token

## 11. Docs Page Content

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
