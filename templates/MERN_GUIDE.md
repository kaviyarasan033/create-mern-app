# MERN Guide

## Installation

```bash
npm install
cd server && npm install
cd ../client && npm install
```

## Getting Started

```bash
npm run mern:start
```

Example:

```bash
npm run mern:start
```

## API Routes

- `POST /api/auth/register` - create a user account.
- `POST /api/auth/login` - authenticate and receive a JWT.
- `POST /api/auth/logout` - client-side logout acknowledgement.
- `GET /api/auth/me` - get the current authenticated user.
- `GET /api/items` - list the current user's items.
- `POST /api/items` - create an item.
- `PUT /api/items/:id` - update an item.
- `DELETE /api/items/:id` - delete an item.
- `GET /api/meta` - built-in route, command, and integration documentation.

## Controllers

- `server/controllers/authController.js` handles register, login, logout, and current-user requests.
- `server/controllers/ItemController.js` handles item CRUD in MVC style.
- `server/controllers/MetaController.js` exposes docs, command groups, and integration notes.
- `server/controllers/Controller.js` keeps response formatting consistent.

## Backend Generator Commands

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

## MERN Migration Commands

Use these when you are moving an older backend into this structure:

```bash
cd server && npm run mern:docs
cd server && npm run mern:migrate -- ProjectController.js
node proapp mern:migrate ProjectController.js
```

`npm run mern:migrate -- ProjectController.js` prints a targeted checklist for models, controllers, routes, auth, environment setup, and follow-up docs.

## Demo Login

```bash
cd server
npm run seed:demo
```

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## Frontend Docs Page

Open `/docs` in the generated client to see:

- sidebar navigation
- copy buttons for commands
- installation and getting-started commands
- backend integration steps
- route and controller references
