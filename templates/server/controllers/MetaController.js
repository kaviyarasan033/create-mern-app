const Controller = require('./Controller');

class MetaController extends Controller {
  index(req, res) {
    this.sendResponse(res, {
      app: 'MERN MVC Starter',
      routes: [
        { method: 'POST', path: '/api/auth/register', controller: 'authController.register' },
        { method: 'POST', path: '/api/auth/login', controller: 'authController.login' },
        { method: 'POST', path: '/api/auth/logout', controller: 'authController.logout' },
        { method: 'GET', path: '/api/auth/me', controller: 'authController.getCurrentUser' },
        { method: 'GET', path: '/api/items', controller: 'ItemController.index' },
        { method: 'POST', path: '/api/items', controller: 'ItemController.store' },
        { method: 'PUT', path: '/api/items/:id', controller: 'ItemController.update' },
        { method: 'DELETE', path: '/api/items/:id', controller: 'ItemController.destroy' }
      ],
      commands: [
        'node proapp make:controller Project',
        'node proapp make:model Project',
        'node proapp make:middleware auditTrail',
        'node proapp make:route projects',
        'node proapp docs',
        'node proapp migrate:mern',
        'cd server && npm run seed:demo'
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
