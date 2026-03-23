# Your MERN MVC Project

This project was generated with `create-mern-proapp`.

## What Is Included

- `server/controllers` - MVC request handlers.
- `server/models` - MongoDB schemas.
- `server/routes` - REST API endpoints.
- `server/middleware` - auth, validation, and error handling.
- `server/config` - database and reusable backend config modules.
- `server/scripts` - backend start help, migration help, and demo seeding.
- `client/src` - React frontend with auth context, docs page, and command sidebar.

## Quick Installation

```bash
cd server && npm install
cd ../client && npm install
```

## Getting Started

```bash
cd server && npm run mern:start
cd server && npm run dev
cd client && npm start
```

## Backend CLI Commands

Use the built-in `proapp.js` helper from the project root:

- `node proapp help`
- `node proapp docs`
- `node proapp make:controller Project`
- `node proapp make:model Project`
- `node proapp make:middleware auditLog`
- `node proapp make:route projects`
- `node proapp make:config cache`
- `node proapp make:resource project`
- `node proapp mern:migrate ProjectController.js`

## Server Scripts

- `cd server && npm run mern:start`
- `cd server && npm run mern:docs`
- `cd server && npm run mern:migrate -- ProjectController.js`
- `cd server && npm run seed:demo`

## Default Demo Login

Run `cd server && npm run seed:demo` and use:

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## Routes And Controllers

- Auth routes live in `server/routes/auth.js` and call `server/controllers/authController.js`.
- Item routes live in `server/routes/api.js` and call `server/controllers/ItemController.js`.
- Meta/docs route lives in `server/routes/meta.js` and returns route, command, and integration metadata from the API.

## Docs Experience

- Visit `/docs` in the frontend for the docs sidebar, getting-started commands, copy buttons, and route references.
- Open `MERN_GUIDE.md` for the long-form integration guide.
- Run `cd server && npm run mern:docs` for terminal-friendly backend docs.

Happy coding.
