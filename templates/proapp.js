#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const name = process.argv[3];
const serverPath = path.join(process.cwd(), 'server');
const color = {
  bold: (value) => value,
  cyan: (value) => value,
  green: (value) => value,
  red: (value) => value,
  white: (value) => value,
  yellow: (value) => value
};

function toPascal(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeTemplate(dirName, fileName, contents) {
  const targetDir = path.join(serverPath, dirName);
  ensureDir(targetDir);
  const filePath = path.join(targetDir, fileName);
  fs.writeFileSync(filePath, contents);
  return filePath;
}

function createFileIfMissing(dirName, fileName, contents) {
  const targetDir = path.join(serverPath, dirName);
  ensureDir(targetDir);
  const filePath = path.join(targetDir, fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, contents);
    return { filePath, created: true };
  }

  return { filePath, created: false };
}

function printHelp() {
  console.log(color.bold('ProApp CLI - Backend Commands'));
  console.log(color.white('Scaffold backend files, inspect docs, and follow MERN migration steps.'));
  console.log('');
  console.log(color.yellow('Scaffold commands'));
  console.log(color.cyan('  node proapp make:controller Project'));
  console.log(color.cyan('  node proapp make:model Project'));
  console.log(color.cyan('  node proapp make:middleware auditTrail'));
  console.log(color.cyan('  node proapp make:route projects'));
  console.log(color.cyan('  node proapp make:config cache'));
  console.log(color.cyan('  node proapp make:resource project'));
  console.log('');
  console.log(color.yellow('Docs and migration'));
  console.log(color.cyan('  npm run mern:start'));
  console.log(color.cyan('  node proapp docs'));
  console.log(color.cyan('  node proapp help'));
  console.log(color.cyan('  node proapp migrate:mern [ControllerName.js]'));
  console.log(color.cyan('  node proapp mern:migrate [ControllerName.js]'));
  console.log(color.cyan('  cd server && npm run mern:start'));
  console.log(color.cyan('  cd server && npm run mern:docs'));
}

function printMigrationChecklist(targetFile) {
  console.log(color.bold('MERN migration checklist'));
  if (targetFile) {
    console.log(color.white(`Target file: ${targetFile}`));
    console.log(color.white(`Suggested controller path: server/controllers/${targetFile}`));
  }
  console.log(color.white('1. Point server/.env to your MongoDB instance'));
  console.log(color.white('2. Move schemas into server/models'));
  console.log(color.white('3. Move request logic into server/controllers'));
  console.log(color.white('4. Register endpoints in server/routes'));
  console.log(color.white('5. Add auth and validation middleware where needed'));
  console.log(color.white('6. Update client/.env and wire the frontend to /api endpoints'));
  console.log(color.white('7. Run npm run seed:demo if you want starter demo data'));
}

const templates = {
  controller: (resourceName) => `const Controller = require('./Controller');

class ${resourceName}Controller extends Controller {
  async index(req, res) {
    try {
      this.sendResponse(res, [], 'Fetched successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async store(req, res) {
    try {
      this.sendResponse(res, req.body, 'Created successfully', 201);
    } catch (err) {
      this.sendError(res, err);
    }
  }
}

module.exports = new ${resourceName}Controller();`,

  model: (resourceName) => `const mongoose = require('mongoose');

const ${resourceName}Schema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('${resourceName}', ${resourceName}Schema);`,

  middleware: (resourceName) => `const ${resourceName} = (req, res, next) => {
  next();
};

module.exports = ${resourceName};`,

  route: (resourceName) => `const express = require('express');

const router = express.Router();
const ${toPascal(resourceName)}Controller = require('../controllers/${toPascal(resourceName)}Controller');

router.get('/', ${toPascal(resourceName)}Controller.index.bind(${toPascal(resourceName)}Controller));
router.post('/', ${toPascal(resourceName)}Controller.store.bind(${toPascal(resourceName)}Controller));

module.exports = router;`,

  config: (resourceName) => `module.exports = {
  ${resourceName}: {
    enabled: true,
    description: '${resourceName} configuration',
  },
};`
};

if (command === 'make:controller' && name) {
  const resourceName = toPascal(name);
  const filePath = writeTemplate('controllers', `${resourceName}Controller.js`, templates.controller(resourceName));
  console.log(color.green(`✓ Controller created: ${filePath}`));
} else if (command === 'make:model' && name) {
  const resourceName = toPascal(name);
  const filePath = writeTemplate('models', `${resourceName}.js`, templates.model(resourceName));
  console.log(color.green(`✓ Model created: ${filePath}`));
} else if (command === 'make:middleware' && name) {
  const filePath = writeTemplate('middleware', `${name}.js`, templates.middleware(name));
  console.log(color.green(`✓ Middleware created: ${filePath}`));
} else if (command === 'make:route' && name) {
  const resourceName = toPascal(name);
  const controllerName = `${resourceName}Controller.js`;
  const routeFilePath = writeTemplate('routes', `${name}.js`, templates.route(name));
  const controllerPath = path.join(serverPath, 'controllers', controllerName);

  if (!fs.existsSync(controllerPath)) {
    writeTemplate('controllers', controllerName, templates.controller(resourceName));
    console.log(color.green(`✓ Controller created: ${controllerPath}`));
  }

  console.log(color.green(`✓ Route created: ${routeFilePath}`));
} else if (command === 'make:config' && name) {
  const filePath = writeTemplate('config', `${name}.js`, templates.config(name));
  console.log(color.green(`✓ Config created: ${filePath}`));
} else if (command === 'make:resource' && name) {
  const resourceName = toPascal(name);
  const files = [
    createFileIfMissing('models', `${resourceName}.js`, templates.model(resourceName)),
    createFileIfMissing('controllers', `${resourceName}Controller.js`, templates.controller(resourceName)),
    createFileIfMissing('routes', `${name}.js`, templates.route(name))
  ];

  files.forEach(({ filePath, created }) => {
    const output = created ? color.green : color.yellow;
    const prefix = created ? '✓ Created' : '• Exists';
    console.log(output(`${prefix}: ${filePath}`));
  });
} else if (command === 'docs') {
  console.log(color.bold('MERN MVC Docs'));
  console.log(color.white('- API docs: GET /api/meta'));
  console.log(color.white('- Frontend docs page: /docs'));
  console.log(color.white('- Guide file: MERN_GUIDE.md'));
  console.log(color.white('- Full app start: npm run mern:start'));
  console.log(color.white('- Backend helper: cd server && npm run mern:docs'));
  console.log(color.white('- Demo login: demo@mernkit.dev / Password123!'));
} else if (command === 'help') {
  printHelp();
} else if (command === 'migrate:mern' || command === 'mern:migrate') {
  printMigrationChecklist(name);
} else {
  if (command) {
    console.log(color.red(`Command not found: ${command}`));
    console.log(color.yellow('Run `node proapp help` to see available backend commands.'));
    console.log('');
  }
  printHelp();
}
