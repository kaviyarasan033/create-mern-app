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
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('${name}', ${name}Schema);`,

  middleware: (name) => `const ${name} = (req, res, next) => {
  // Middleware logic here
  next();
};

module.exports = ${name};`
};

const serverPath = path.join(process.cwd(), 'server');

if (command === 'make:controller' && name) {
  const filePath = path.join(serverPath, 'Controllers', `${name}Controller.js`);
  fs.writeFileSync(filePath, templates.controller(name));
  console.log(chalk.green(`✓ Controller created: ${filePath}`));
} else if (command === 'make:model' && name) {
  const filePath = path.join(serverPath, 'Models', `${name}.js`);
  fs.writeFileSync(filePath, templates.model(name));
  console.log(chalk.green(`✓ Model created: ${filePath}`));
} else if (command === 'make:middleware' && name) {
  const filePath = path.join(serverPath, 'Middleware', `${name}.js`);
  fs.writeFileSync(filePath, templates.middleware(name));
  console.log(chalk.green(`✓ Middleware created: ${filePath}`));
} else if (command === 'migrate') {
  console.log(chalk.yellow('Running database migrations...'));
  // execSync('npm run migrate') logic could go here
} else {
  console.log(chalk.red('ProApp CLI - Available Commands:'));
  console.log(chalk.cyan('  node proapp make:controller <Name>'));
  console.log(chalk.cyan('  node proapp make:model <Name>'));
  console.log(chalk.cyan('  node proapp make:middleware <Name>'));
  console.log(chalk.cyan('  node proapp migrate'));
}
