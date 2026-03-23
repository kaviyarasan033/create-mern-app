# MERN Guide

## API Routes

- `POST /api/auth/register` - create a user account.
- `POST /api/auth/login` - authenticate and receive a JWT.
- `POST /api/auth/logout` - client-side logout acknowledgement.
- `GET /api/auth/me` - get the current authenticated user.
- `GET /api/items` - list the current user's items.
- `POST /api/items` - create an item.
- `PUT /api/items/:id` - update an item.
- `DELETE /api/items/:id` - delete an item.
- `GET /api/meta` - built-in route and command documentation.

## Controllers

- `server/controllers/authController.js` handles register, login, logout, and current-user requests.
- `server/controllers/ItemController.js` handles item CRUD in MVC style.
- `server/controllers/MetaController.js` exposes docs to the frontend and API consumers.
- `server/controllers/Controller.js` keeps response formatting consistent.

## Default Demo Login

Seed the demo account first:

```bash
cd server
npm run seed:demo
```

Credentials:

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## Built-In Commands

```bash
node proapp make:controller Project
node proapp make:model Project
node proapp make:middleware auditTrail
node proapp make:route projects
node proapp docs
node proapp migrate:mern
```

## MERN Migration Commands

If you are moving an older project into this structure, use this sequence:

```bash
npm install
cd server && npm install
cd ../client && npm install
cd ../server && npm run migrate:mern
cd ../client && npm start
```

`npm run migrate:mern` prints the backend checklist for models, controllers, routes, auth, and environment setup.
