#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const command = process.argv[2];
const name = process.argv[3];

const templates = {
  controller: (name) => `const Controller = require('./Controller');

class ${name}Controller extends Controller {
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

module.exports = new ${name}Controller();`,

  model: (name) => `const mongoose = require('mongoose');

const ${name}Schema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('${name}', ${name}Schema);`,

  middleware: (name) => `const ${name} = (req, res, next) => {
  // Middleware logic here
  next();
};

module.exports = ${name};`
,

  route: (name) => `const express = require('express');

const router = express.Router();
const ${toPascal(name)}Controller = require('../controllers/${toPascal(name)}Controller');

router.get('/', ${toPascal(name)}Controller.index.bind(${toPascal(name)}Controller));
router.post('/', ${toPascal(name)}Controller.store.bind(${toPascal(name)}Controller));

module.exports = router;`
};

const serverPath = path.join(process.cwd(), 'server');

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

if (command === 'make:controller' && name) {
  const filePath = writeTemplate('controllers', `${name}Controller.js`, templates.controller(name));
  console.log(chalk.green(`✓ Controller created: ${filePath}`));
} else if (command === 'make:model' && name) {
  const filePath = writeTemplate('models', `${name}.js`, templates.model(name));
  console.log(chalk.green(`✓ Model created: ${filePath}`));
} else if (command === 'make:middleware' && name) {
  const filePath = writeTemplate('middleware', `${name}.js`, templates.middleware(name));
  console.log(chalk.green(`✓ Middleware created: ${filePath}`));
} else if (command === 'make:route' && name) {
  const controllerName = `${toPascal(name)}Controller.js`;
  const routeFilePath = writeTemplate('routes', `${name}.js`, templates.route(name));
  const controllerPath = path.join(serverPath, 'controllers', controllerName);
  if (!fs.existsSync(controllerPath)) {
    writeTemplate('controllers', controllerName, templates.controller(toPascal(name)));
    console.log(chalk.green(`✓ Controller created: ${controllerPath}`));
  }
  console.log(chalk.green(`✓ Route created: ${routeFilePath}`));
} else if (command === 'docs') {
  console.log(chalk.cyan('MERN MVC Docs'));
  console.log(chalk.white('- API docs: GET /api/meta'));
  console.log(chalk.white('- Guide file: MERN_GUIDE.md'));
  console.log(chalk.white('- Demo login: demo@mernkit.dev / Password123!'));
} else if (command === 'migrate:mern') {
  console.log(chalk.cyan('MERN migration checklist'));
  console.log(chalk.white('1. Point server/.env to your MongoDB instance'));
  console.log(chalk.white('2. Move schemas into server/models'));
  console.log(chalk.white('3. Move request logic into server/controllers'));
  console.log(chalk.white('4. Register endpoints in server/routes'));
  console.log(chalk.white('5. Wire the frontend to /api endpoints'));
} else {
  console.log(chalk.red('ProApp CLI - Available Commands:'));
  console.log(chalk.cyan('  node proapp make:controller <Name>'));
  console.log(chalk.cyan('  node proapp make:model <Name>'));
  console.log(chalk.cyan('  node proapp make:middleware <Name>'));
  console.log(chalk.cyan('  node proapp make:route <name>'));
  console.log(chalk.cyan('  node proapp docs'));
  console.log(chalk.cyan('  node proapp migrate:mern'));
}
