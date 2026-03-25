# MERN Pro MVC Stack

MERN Pro is a professional-grade boilerplate and CLI tool for building robust MERN applications. It provides a structured MVC backend and a premium React frontend, integrated with JWT authentication and developer documentation.

## Core Features
- **MVC Architecture**: Models, Controllers, and Routes organized for scalability.
- **Premium Frontend**: React-Bootstrap UI with GSAP animations and a dedicated `/docs` workspace.
- **Developer CLI**: Build controllers, models, and resources in seconds.
- **Production Ready**: Optimized JWT auth flow, Firebase safety guards, and industrial setup checks.

## Quick Setup

```bash
npx create-mern-proapp my-app
cd my-app
```

### Automatic Setup
Run these commands to prepare your project:
```bash
npm run setup            # Installs client & server dependencies
npm run setup:check      # Checks your database and environment connections
```

### Running the App
```bash
npm run mern:start       # React (Port 3000) | Express (Port 5000)
```

## CLI Reference (`node mern`)
Accelerate your development with built-in commands:

- `node mern make:resource Name` - Full MVC scaffold
- `node mern make:controller Name` - Add business logic
- `node mern make:model Name` - Add database schema
- `node mern make:route Name` - Add API endpoints
- `node mern stack:update` - Sync with latest template updates
- `node mern help` - See all available commands

## Demo Credentials
Test the project immediately:
```bash
cd server && npm run seed:demo
```
- **Login**: `demo@mernkit.dev`
- **Password**: `Password123!`

## Navigation
- **Frontend Workspace**: [http://localhost:3000](http://localhost:3000)
- **Developer Documentation**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

## Philosophy
MERN Pro is designed to bridge the gap between simple tutorials and complex enterprise frameworks. It gives you the structure you need without the bloat you don't.

License: MIT
