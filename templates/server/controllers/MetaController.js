const Controller = require('./Controller');

class MetaController extends Controller {
  index(req, res) {
    this.sendResponse(res, {
      app: 'MERN MVC Starter',
      appDescription: 'Production-ready starter with backend generators, migration helpers, and built-in docs.',
      routes: [
        { method: 'POST', path: '/api/auth/register', controller: 'authController.register', description: 'Create a new user account' },
        { method: 'POST', path: '/api/auth/login', controller: 'authController.login', description: 'Authenticate and receive a JWT' },
        { method: 'POST', path: '/api/auth/logout', controller: 'authController.logout', description: 'Clear client session state' },
        { method: 'GET', path: '/api/auth/me', controller: 'authController.getCurrentUser', description: 'Return the current authenticated user' },
        { method: 'GET', path: '/api/items', controller: 'ItemController.index', description: 'List the current user items' },
        { method: 'POST', path: '/api/items', controller: 'ItemController.store', description: 'Create a new item' },
        { method: 'PUT', path: '/api/items/:id', controller: 'ItemController.update', description: 'Update an existing item' },
        { method: 'DELETE', path: '/api/items/:id', controller: 'ItemController.destroy', description: 'Delete an item' }
      ],
      controllers: [
        { name: 'authController', methods: 'register, login, logout, getCurrentUser', purpose: 'Authentication flow and current-user lookup' },
        { name: 'ItemController', methods: 'index, store, update, destroy', purpose: 'Starter resource CRUD logic' },
        { name: 'MetaController', methods: 'index', purpose: 'Returns docs, command metadata, and integration notes' }
      ],
      commands: [
        { title: 'Create controller', command: 'node proapp make:controller Project', description: 'Generate a backend controller class', category: 'Generators' },
        { title: 'Create model', command: 'node proapp make:model Project', description: 'Generate a Mongoose model file', category: 'Generators' },
        { title: 'Create middleware', command: 'node proapp make:middleware auditTrail', description: 'Generate a reusable middleware file', category: 'Generators' },
        { title: 'Create route', command: 'node proapp make:route projects', description: 'Generate a route file and matching controller if missing', category: 'Generators' },
        { title: 'Create config', command: 'node proapp make:config cache', description: 'Generate a config module in server/config', category: 'Generators' },
        { title: 'Create resource', command: 'node proapp make:resource project', description: 'Generate model, controller, and route together', category: 'Generators' },
        { title: 'CLI docs', command: 'node proapp docs', description: 'Show docs endpoints and demo login details', category: 'Docs' },
        { title: 'CLI help', command: 'node proapp help', description: 'Show available backend commands', category: 'Docs' },
        { title: 'Migrate file', command: 'node proapp mern:migrate ProjectController.js', description: 'Print migration steps for a target backend file', category: 'Migration' },
        { title: 'Backend start', command: 'cd server && npm run mern:start', description: 'Print startup steps for the API', category: 'Server scripts' },
        { title: 'Backend docs', command: 'cd server && npm run mern:docs', description: 'Print backend scripts and generators', category: 'Server scripts' },
        { title: 'Seed demo login', command: 'cd server && npm run seed:demo', description: 'Create the default demo login', category: 'Server scripts' }
      ],
      gettingStarted: [
        { title: 'Create project', command: 'npx create-mern-proapp my-app', description: 'Generate the starter and install dependencies.' },
        { title: 'Start backend', command: 'cd my-app/server && npm run dev', description: 'Run the API in watch mode.' },
        { title: 'Start frontend', command: 'cd my-app/client && npm start', description: 'Open the React app in the browser.' },
        { title: 'Seed demo user', command: 'cd my-app/server && npm run seed:demo', description: 'Create the default demo credentials.' }
      ],
      integration: [
        { title: 'Environment setup', command: 'copy server/.env.example server/.env', description: 'Create local backend environment values before connecting MongoDB.' },
        { title: 'Backend docs', command: 'cd server && npm run mern:docs', description: 'List scripts, generators, and backend structure.' },
        { title: 'Targeted migration', command: 'cd server && npm run mern:migrate -- ProjectController.js', description: 'Review migration guidance for a controller or backend file.' },
        { title: 'Resource scaffold', command: 'node proapp make:resource project', description: 'Generate a model, controller, and route as a starting point.' }
      ],
      backendScripts: [
        { name: 'npm run dev', description: 'Start the backend with nodemon' },
        { name: 'npm run seed:demo', description: 'Seed the default demo credentials' },
        { name: 'npm run mern:start', description: 'Print startup steps for the backend' },
        { name: 'npm run mern:docs', description: 'Print backend docs and generators' },
        { name: 'npm run mern:migrate -- ProjectController.js', description: 'Print migration guidance for a target file' }
      ],
      defaultLogin: {
        email: 'demo@mernkit.dev',
        password: 'Password123!',
        note: 'Run the demo seed command before using these credentials.'
      }
    }, 'Project metadata loaded');
  }
}

module.exports = new MetaController();
