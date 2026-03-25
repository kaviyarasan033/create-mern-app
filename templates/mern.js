#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { runOptimizeClear } = require('./scripts/mernOptimizeClear');

const command = process.argv[2];
const name = process.argv[3];
const currentDir = process.cwd();
const serverPath = path.basename(currentDir).toLowerCase() === 'server'
  ? currentDir
  : path.join(currentDir, 'server');
const projectRoot = path.basename(currentDir).toLowerCase() === 'server'
  ? path.dirname(currentDir)
  : currentDir;
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

function toCamel(value) {
  const pascal = toPascal(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPlural(value) {
  const normalized = toKebab(value);

  if (normalized.endsWith('ies') || normalized.endsWith('ses')) {
    return normalized;
  }

  if (normalized.endsWith('y')) {
    return `${normalized.slice(0, -1)}ies`;
  }

  if (/(s|x|z|ch|sh)$/.test(normalized)) {
    return `${normalized}es`;
  }

  if (normalized.endsWith('s')) {
    return normalized;
  }

  return `${normalized}s`;
}

function ensureServerRoot() {
  if (!fs.existsSync(serverPath)) {
    console.log(color.red(`Server directory not found: ${serverPath}`));
    console.log(color.yellow('Run this command from the project root or from inside `server`.'));
    process.exit(1);
  }
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

function migrationFileName(resourceName) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  return `${stamp}-create-${toKebab(resourceName)}.js`;
}

function printHelp() {
  console.log(color.bold('MERN CLI - Backend Commands'));
  console.log(color.white('Scaffold backend files, inspect docs, and follow MERN migration steps.'));
  console.log(color.white(`Project root: ${projectRoot}`));
  console.log(color.white(`Server root: ${serverPath}`));
  console.log('');
  console.log(color.yellow('Scaffold commands'));
  console.log(color.cyan('  node mern make:controller Project'));
  console.log(color.cyan('  node mern make:model Project'));
  console.log(color.cyan('  node mern make:middleware auditTrail'));
  console.log(color.cyan('  node mern make:route projects'));
  console.log(color.cyan('  node mern make:config cache'));
  console.log(color.cyan('  node mern make:resource project'));
  console.log(color.cyan('  node mern make:module project'));
  console.log(color.cyan('  node mern cache:clear'));
  console.log(color.cyan('  node mern config:clear'));
  console.log(color.cyan('  node mern optimize:clear'));
  console.log('');
  console.log(color.yellow('Docs and migration'));
  console.log(color.cyan('  npm run mern:start'));
  console.log(color.cyan('  node mern docs'));
  console.log(color.cyan('  node mern help'));
  console.log(color.cyan('  node mern migrate:mern [ControllerName.js]'));
  console.log(color.cyan('  node mern mern:migrate [ControllerName.js]'));
  console.log(color.cyan('  node mern stack:update'));
  console.log(color.cyan('  node mern stack:update:now'));
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
  controller: (resourceName) => {
    const variableName = toCamel(resourceName);
    return `const Controller = require('./Controller');
const ${resourceName} = require('../models/${resourceName}');

class ${resourceName}Controller extends Controller {
  async index(req, res) {
    try {
      const records = await ${resourceName}.find().sort({ createdAt: -1 });
      this.sendResponse(res, records, '${resourceName} list fetched successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async show(req, res) {
    try {
      const ${variableName} = await ${resourceName}.findById(req.params.id);
      if (!${variableName}) return this.notFound(res, '${resourceName} not found');
      this.sendResponse(res, ${variableName}, '${resourceName} fetched successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async store(req, res) {
    try {
      const ${variableName} = await ${resourceName}.create({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
      });

      this.sendResponse(res, ${variableName}, '${resourceName} created successfully', 201);
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async update(req, res) {
    try {
      const ${variableName} = await ${resourceName}.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          status: req.body.status
        },
        { new: true, runValidators: true }
      );

      if (!${variableName}) return this.notFound(res, '${resourceName} not found');
      this.sendResponse(res, ${variableName}, '${resourceName} updated successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async destroy(req, res) {
    try {
      const ${variableName} = await ${resourceName}.findByIdAndDelete(req.params.id);
      if (!${variableName}) return this.notFound(res, '${resourceName} not found');
      this.sendResponse(res, ${variableName}, '${resourceName} deleted successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }
}

module.exports = new ${resourceName}Controller();`;
  },

  model: (resourceName) => `const mongoose = require('mongoose');

const ${resourceName}Schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived'],
    default: 'draft'
  }
}, { timestamps: true });

module.exports = mongoose.model('${resourceName}', ${resourceName}Schema);`,

  middleware: (resourceName) => `const ${resourceName} = (req, res, next) => {
  next();
};

module.exports = ${resourceName};`,

  route: (resourceName, routeName) => `const express = require('express');

const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ${resourceName}Controller = require('../controllers/${resourceName}Controller');

router.get('/', auth, ${resourceName}Controller.index.bind(${resourceName}Controller));
router.get('/:id', auth, ${resourceName}Controller.show.bind(${resourceName}Controller));
router.post('/', auth, ${resourceName}Controller.store.bind(${resourceName}Controller));
router.put('/:id', auth, ${resourceName}Controller.update.bind(${resourceName}Controller));
router.delete('/:id', auth, ${resourceName}Controller.destroy.bind(${resourceName}Controller));

module.exports = router;`,

  config: (resourceName) => `module.exports = {
  ${resourceName}: {
    enabled: true,
    description: '${resourceName} configuration'
  }
};`,

  migration: (resourceName) => `module.exports = {
  async up() {
    return {
      name: '${resourceName}',
      description: 'Create the ${resourceName} collection indexes or seed defaults here.'
    };
  },

  async down() {
    return {
      name: '${resourceName}',
      description: 'Rollback logic for ${resourceName} goes here.'
    };
  }
};`
};

function createResource(resourceInput) {
  const resourceName = toPascal(resourceInput);
  const routeName = toPlural(resourceInput);
  const files = [
    createFileIfMissing('models', `${resourceName}.js`, templates.model(resourceName)),
    createFileIfMissing('controllers', `${resourceName}Controller.js`, templates.controller(resourceName)),
    createFileIfMissing('routes', `${routeName}.js`, templates.route(resourceName, routeName)),
    createFileIfMissing('migrations', migrationFileName(resourceName), templates.migration(resourceName))
  ];

  files.forEach(({ filePath, created }) => {
    const output = created ? color.green : color.yellow;
    const prefix = created ? '✓ Created' : '• Exists';
    console.log(output(`${prefix}: ${filePath}`));
  });

  console.log(color.cyan(`Register route with: app.use('/api/${routeName}', require('./routes/${routeName}'));`));
}

ensureServerRoot();

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
  const resourceName = toPascal(name.replace(/s$/i, ''));
  const routeName = toPlural(name);
  const controllerName = `${resourceName}Controller.js`;
  const routeFilePath = writeTemplate('routes', `${routeName}.js`, templates.route(resourceName, routeName));
  const controllerPath = path.join(serverPath, 'controllers', controllerName);

  if (!fs.existsSync(controllerPath)) {
    writeTemplate('controllers', controllerName, templates.controller(resourceName));
    console.log(color.green(`✓ Controller created: ${controllerPath}`));
  }

  console.log(color.green(`✓ Route created: ${routeFilePath}`));
} else if (command === 'make:config' && name) {
  const filePath = writeTemplate('config', `${name}.js`, templates.config(name));
  console.log(color.green(`✓ Config created: ${filePath}`));
} else if ((command === 'make:resource' || command === 'make:module') && name) {
  createResource(name);
} else if (command === 'docs') {
  console.log(color.bold('MERN MVC Docs'));
  console.log(color.white('- API docs: GET /api/meta'));
  console.log(color.white('- Frontend docs page: /docs'));
  console.log(color.white('- Guide file: MERN_GUIDE.md'));
  console.log(color.white('- Full app start: npm run mern:start'));
  console.log(color.white('- Clear all caches: npm run optimize:clear'));
  console.log(color.white('- Clear config cache: npm run config:clear'));
  console.log(color.white('- Clear runtime cache: npm run cache:clear'));
  console.log(color.white('- Backend helper: cd server && npm run mern:docs'));
  console.log(color.white('- Demo login: demo@mernkit.dev / Password123!'));
} else if (command === 'help') {
  printHelp();
} else if (command === 'migrate:mern' || command === 'mern:migrate') {
  printMigrationChecklist(name);
} else if (command === 'stack:update' || command === 'stack:update:now') {
  const { runStackUpdate } = require('./scripts/mernUpdate');
  runStackUpdate(command === 'stack:update:now');
} else if (command === 'cache:clear' || command === 'config:clear' || command === 'optimize:clear') {

  runOptimizeClear(command);
} else {
  if (command) {
    console.log(color.red(`Command not found: ${command}`));
    console.log(color.yellow('Run `node mern help` to see available backend commands.'));
    console.log('');
  }
  printHelp();
}
