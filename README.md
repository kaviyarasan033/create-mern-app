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
npm run setup
npm run setup:check
npm run mern:start
```

Or run each side manually:

```bash
cd server && npm run dev
cd client && npm run dev
```

## Server Env And Integrations

- MongoDB is the default database for the built-in MERN starter flow.
- The server template now includes optional Firebase Admin and MySQL config helpers.
- Use `npm run setup` to install project dependencies and `npm run setup:check` to validate server env readiness.
- Firebase keys live in `templates/server/.env.example`, and the helper is exposed through `templates/server/config/firebase.js`.
- MySQL env values live in `templates/server/.env.example`, and the helper is exposed through `templates/server/config/mysql.js`.

## Demo Login

```bash
cd server && npm run seed:demo
```

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## Google OAuth Setup

1. **Enable Firebase Authentication**: Go to Firebase Console → Authentication → Sign-in method → Enable Google
2. **Configure Environment Variables**: Update `.env` files with your Firebase credentials
3. **Client Configuration**: Update `client/.env` with Firebase client config
4. **Server Configuration**: Update `server/.env` with Firebase Admin SDK credentials

### Environment Variables

**Client (.env):**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Server (.env):**
```env
FIREBASE_ENABLED=true
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

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

// Request interceptor for tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for token handling
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
