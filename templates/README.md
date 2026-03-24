# MERN_Solution

This project was generated with `create-mern-proapp`.

It includes a clean MERN MVC structure, auth flow, protected dashboard, docs page, generator commands, and migration help.

## Project Structure

- `server/controllers` - MVC request handlers
- `server/models` - Mongoose schemas
- `server/routes` - API endpoints
- `server/middleware` - auth, validation, and error handlers
- `server/config` - database and reusable config modules
- `server/scripts` - start helpers, docs helpers, migration helpers, and demo seeders
- `client/src/pages` - login, register, docs, dashboard, and page-level UI
- `client/src/services` - Axios service modules
- `client/src/context` - auth context and protected flow state
- `client/src/styles` - responsive docs-style UI system

## Project Creation

```bash
npx create-mern-proapp my-app
cd my-app
```

This generator already gives you the MERN_Solution starter with the inbuilt MVC architecture, frontend, backend, docs page, and command flow.

## Start The App

```bash
npm run mern:start
```

Or run manually:

```bash
cd server && npm run dev
cd client && npm run dev
```

## Default Demo Login

```bash
cd server && npm run seed:demo
```

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## CLI Commands

Run from the project root:

```bash
node proapp help
node proapp docs
node proapp make:controller Project
node proapp make:model Project
node proapp make:middleware auditLog
node proapp make:route projects
node proapp make:config cache
node proapp make:resource project
node proapp make:module project
node proapp mern:migrate ProjectController.js
```

## Server Scripts

```bash
cd server && npm run mern:start
cd server && npm run mern:docs
cd server && npm run mern:migrate -- ProjectController.js
cd server && npm run seed:demo
```

## Full Resource Workflow

### Create a resource

```bash
node proapp make:resource project
```

Expected backend files:

- `server/models/Project.js`
- `server/controllers/ProjectController.js`
- `server/routes/projects.js`
- `server/migrations/<timestamp>-create-project.js`

### Register the route

```js
const projectRoutes = require('./routes/projects');

app.use('/api/projects', projectRoutes);
```

### Create frontend service

```js
import api from './apiService';

export const getProjects = () => api.get('/api/projects');
export const createProject = (payload) => api.post('/api/projects', payload);
```

### Create custom hook

```js
import { useCallback, useEffect, useState } from 'react';
import { createProject, getProjects } from '../services/projectService';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    const res = await getProjects();
    setProjects(res.data.data);
    setLoading(false);
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

### Example page usage

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

## Docs Experience

Visit `/docs` in the frontend to see:

- setup commands
- route references
- architecture guidance
- frontend Axios and hooks examples
- backend model, controller, and route examples
- generated resource flow after create or migrate

## Open `MERN_GUIDE.md`

Use `MERN_GUIDE.md` for a longer guide covering setup, migration, docs flow, architecture, and code examples.
