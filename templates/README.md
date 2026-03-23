# Your MERN MVC Project

This project was generated with `create-mern-app`.

## What Is Included

- `server/controllers` - MVC request handlers.
- `server/models` - MongoDB schemas.
- `server/routes` - REST API endpoints.
- `server/middleware` - auth, validation, and error handling.
- `server/scripts` - demo login seed and MERN migration helper.
- `client/src` - React frontend with auth context, docs page, and icon-based UI.

## CLI Commands

Use the built-in `proapp.js` helper from the project root:

- `node proapp make:controller Project`
- `node proapp make:model Project`
- `node proapp make:middleware auditLog`
- `node proapp make:route projects`
- `node proapp docs`
- `node proapp migrate:mern`

## Default Demo Login

Run `cd server && npm run seed:demo` and use:

- Email: `demo@mernkit.dev`
- Password: `Password123!`

## Routes And Controllers

- Auth routes live in `server/routes/auth.js` and call `server/controllers/authController.js`.
- Item routes live in `server/routes/api.js` and call `server/controllers/ItemController.js`.
- Meta/docs route lives in `server/routes/meta.js` and returns route + command documentation from the API.

## Getting Started

1. Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`.
2. Start backend: `cd server && npm run dev`
3. Start frontend: `cd client && npm start`
4. Open the docs page in the app or read `MERN_GUIDE.md`.

## MERN Migration Help

Run `node proapp migrate:mern` for the command checklist and `npm run migrate:mern` in `server/` for backend migration notes.

Happy coding.
