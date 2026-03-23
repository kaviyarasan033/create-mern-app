# create-mern-proapp

Create a production-ready MERN stack app with Express MVC, MongoDB models, React auth screens, backend scaffold commands, and migration helpers.

## Quick Start

```bash
npx create-mern-proapp my-amazing-app
```

After generation, developers can use the built-in project CLI and server scripts to scaffold backend files and follow MERN migration steps.

## Generated Backend Commands

```bash
node proapp help
node proapp make:controller Project
node proapp make:model Project
node proapp make:middleware auditTrail
node proapp make:route projects
node proapp make:config cache
node proapp make:resource project
node proapp mern:migrate ProjectController.js
```

## Generated Server Scripts

```bash
cd server && npm run mern:start
cd server && npm run mern:docs
cd server && npm run mern:migrate -- ProjectController.js
cd server && npm run seed:demo
```

## Docs And Integration

- `/docs` page with sidebar navigation, getting-started steps, copy buttons, and route references.
- `GET /api/meta` endpoint for command and integration metadata.
- `MERN_GUIDE.md` and generated `README.md` inside the scaffolded project.

## Included Features

- Express MVC backend with controllers, models, middleware, routes, and config helpers.
- React frontend with login, register, dashboard, and built-in docs experience.
- JWT auth flow with protected routes and demo seed command.
- MERN migration help for controllers, models, routes, auth, and environment setup.

## License

MIT
