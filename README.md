# create-mern-app

Create a production-ready MERN stack app with Express MVC, MongoDB models, React auth screens, built-in CLI generators, and migration guidance.

## Features

- Express MVC backend with controllers, models, middleware, and route docs.
- React frontend with login, register, dashboard, and built-in icon-based UI.
- JWT auth flow with protected routes and demo seed command.
- Mongoose-ready MongoDB setup for a clean MERN migration path.
- Built-in `proapp` generator commands for controllers, models, middleware, and routes.
- Project docs that explain routes, controllers, default demo login, and migration commands.

## Quick Start

Build your next big project in seconds:

```bash
npx create-mern-app my-amazing-app
```

Legacy alias still works:

```bash
npx create-react-proapp my-amazing-app
```

## Setup

1. **Navigate to your new project**:
   ```bash
   cd my-amazing-app
   ```

2. **Setup Backend**:
    ```bash
    cd server
    npm install
    copy .env.example .env
    npm run dev
    ```

3. **Setup Frontend**:
   ```bash
   cd ../client
   npm install
   npm start
   ```

4. **Seed demo login (optional)**:
   ```bash
   cd ../server
   npm run seed:demo
   ```

## Project Structure

```text
my-amazing-app/
├── client/          (React Frontend)
│   ├── src/pages/   (Login, Register, Dashboard, Docs)
│   └── src/styles/  (Custom branded UI)
└── server/          (Express Backend)
    ├── controllers/ (MVC request handlers)
    ├── middleware/  (Auth, validation, errors)
    ├── models/      (MongoDB schemas)
    ├── routes/      (REST API endpoints)
    └── scripts/     (demo seed + MERN migration helpers)
```

## Included Commands

```bash
node proapp make:controller Project
node proapp make:model Project
node proapp make:middleware auditTrail
node proapp make:route project
node proapp docs
node proapp migrate:mern
```

## License

MIT

---

Built for developers who want an all-in-one MERN starting point.
