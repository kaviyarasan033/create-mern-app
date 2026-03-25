# MERN Pro Development Guide

MERN Pro is an industrial-strength, MVC-inspired MERN stack starter designed for developers who need to build, scale, and maintain modern web applications with minimal friction.

## 1. Project Philosophy
MERN Pro is built on the principle of **"Productive Architecture"**. It provides:
- **Consistent MVC Structure**: Models for data, Controllers for logic, and an elegant Frontend for views.
- **Developer-First CLI**: Built-in commands for resource scaffolding (`make:controller`, `make:model`, etc.).
- **Built-in Security**: JWT auth, Firebase safety guards, and HTTP security headers.
- **Self-Documenting**: An integrated `/docs` workspace that reflects your current project metadata.

## 2. Setting Up Your Workspace

### Fresh Installation
```bash
npx create-mern-proapp [project-name]
cd [project-name]
```

### Initial Setup & Connection Check
Before starting development, run the automated setup blocks:
```bash
npm run setup            # Install all dependencies (client & server)
npm run setup:check      # Verify MongoDB, MySQL, and Firebase env status
```

### Starting the Engines
```bash
npm run mern:start       # Runs both Client (Port 3000) and Server (Port 5000)
```

## 3. The Power of `node mern` CLI

The project root contains a powerful CLI tool to speed up your workflow.

### Resource Scaffolding
```bash
node mern make:resource [Name]   # Creates Model, Controller, Route, and Migration files
node mern make:module [Name]     # Creates a full-featured module structure
```

### Granular Creation
```bash
node mern make:controller [Name]
node mern make:model [Name]
node mern make:route [path]
node mern make:middleware [name]
```

### Stack Management
```bash
node mern stack:update           # Safely sync your project files with the latest template updates
node mern stack:update:now       # Force overwrite core system files to the current version
```

## 4. Database & Integrations

### Data Seeding (Demo Login)
To test the authentication and dashboard flow immediately:
```bash
cd server && npm run seed:demo
```
- **Email**: `demo@mernkit.dev`
- **Password**: `Password123!`

### Multi-Database Support
- **MongoDB**: Primary database for Auth and MVC resources (Required).
- **MySQL**: Ready-to-use config at `server/config/mysql.js` for secondary relational needs.
- **Firebase**: Safe initialization for Google Auth and storage at `server/config/firebase.js`.

## 5. API Resource Flow
When you create a new resource (e.g., `node mern make:resource Project`), follow this professional flow:

1. **Define Schema**: Update `server/models/Project.js`.
2. **Implement Logic**: Update methods in `server/controllers/ProjectController.js`.
3. **Register Routes**: Add your route to `server/routes/api.js`.
4. **Connect UI**: Create services and hooks in `client/src/services/` and `client/src/hooks/`.

## 6. Pro Layouts & Responsiveness
The entire MERN Pro frontend is built with **"Adaptive Design"**. 
- Desktop-first workspace with sticky sidebars.
- Tablet-optimized grid stacking.
- Mobile-responsive navigation and documentation chips.

## 7. Configuration & Optimization
Maintenance is easy with built-in clear commands:
```bash
npm run cache:clear      # Reset server cache
npm run config:clear     # Refresh configuration maps
npm run optimize:clear   # Clean build artifacts for fresh starts
```

## 8. Stack Upgrade Strategy

MERN Pro includes a safe synchronization mechanism to keep your project core up to date without overwriting your custom logic.

### Core Architecture Sync
Running `node mern stack:update` will synchronize:
- **CLI Logic**: `mern.js` and supporting scripts.
- **System Docs**: `client/src/data/docsFallback.js`.
- **Optimization Tools**: Performance and cache clearing scripts.

### Full System Upgrade
To force a complete synchronization of all MERN Pro core components (useful when a major version patch is released):
```bash
node mern stack:update:now
```

> [!IMPORTANT]
> Always verify your custom configurations in `.env` and `vite.config.js` after a force upgrade, although MERN Pro is designed to respect user-defined environment values.

---
*MERN Pro - Built for developers, by developers.*
