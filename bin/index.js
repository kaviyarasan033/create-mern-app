#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Get the folder name from command line argument
const folderName = process.argv[2];

if (!folderName) {
  console.log(chalk.red('❌ Error: Please specify a project name'));
  console.log(chalk.yellow('\nUsage: npx create-mern-proapp <folder-name>'));
  console.log(chalk.cyan('\nExample: npx create-mern-proapp my-awesome-app'));
  process.exit(1);
}

// Define paths
const targetDir = path.join(process.cwd(), folderName);
const templateDir = path.join(__dirname, '../templates');

// Check if folder already exists
if (fs.existsSync(targetDir)) {
  console.log(chalk.red(`❌ Error: Folder "${folderName}" already exists!`));
  process.exit(1);
}

console.log(chalk.blue.bold('\n🚀 Creating your MERN MVC app...\n'));

try {
  // Create project directory
  fs.ensureDirSync(targetDir);
  console.log(chalk.green(`✓ Created directory: ${folderName}`));

  // Copy template files
  fs.copySync(templateDir, targetDir);
  console.log(chalk.green('✓ Copied project template'));

  const serverEnvExample = path.join(targetDir, 'server', '.env.example');
  const serverEnv = path.join(targetDir, 'server', '.env');
  const clientEnvExample = path.join(targetDir, 'client', '.env.example');
  const clientEnv = path.join(targetDir, 'client', '.env');

  if (fs.existsSync(serverEnvExample) && !fs.existsSync(serverEnv)) {
    fs.copySync(serverEnvExample, serverEnv);
  }

  if (fs.existsSync(clientEnvExample) && !fs.existsSync(clientEnv)) {
    fs.copySync(clientEnvExample, clientEnv);
  }

  console.log(chalk.green('✓ Created default .env files for client and server'));

  // 📦 INSTALL DEPENDENCIES
  console.log(chalk.blue.bold('\n📦 Installing dependencies (this may take a minute)...\n'));

  // Install Server Dependencies
  console.log(chalk.yellow('  → Installing backend dependencies (Express + MongoDB MVC)...'));
  execSync('npm install', { cwd: path.join(targetDir, 'server'), stdio: 'inherit' });
  console.log(chalk.green('  ✓ Backend dependencies installed'));

  // Install Client Dependencies
  console.log(chalk.yellow('\n  → Installing frontend dependencies (React + Router + Icons)...'));
  execSync('npm install', { cwd: path.join(targetDir, 'client'), stdio: 'inherit' });
  console.log(chalk.green('  ✓ Frontend dependencies installed'));

  // Display next steps
  console.log(chalk.blue.bold('\n✨ MERN MVC project created successfully!\n'));
  console.log(chalk.cyan('📁 Included structure:'));
  console.log(chalk.white('   - server/controllers      (Logic)'));
  console.log(chalk.white('   - server/models           (Schemas)'));
  console.log(chalk.white('   - server/routes           (API Endpoints)'));
  console.log(chalk.white('   - server/middleware       (Auth & Validation)'));
  console.log(chalk.white('   - server/config           (DB & Logger)'));
  console.log(chalk.white('   - server/scripts          (Seed + migration helpers)'));
  console.log(chalk.white('   - proapp / proapp.js      (In-built CLI)'));

  console.log(chalk.cyan('\n🛡️ Built-in features:'));
  console.log(chalk.white('   - Helmet & XSS Protection'));
  console.log(chalk.white('   - NoSQL Injection Prevention'));
  console.log(chalk.white('   - Request Rate Limiting'));
  console.log(chalk.white('   - JWT Authentication'));
  console.log(chalk.white('   - Demo login seed command'));
  console.log(chalk.white('   - Route + controller documentation'));
  console.log(chalk.white(`
  ${folderName}/
  ├── client/                 (React Frontend)
  │   ├── src/
  │   ├── public/
  │   ├── package.json
   │   └── .env.example
  ├── server/                 (Node.js Backend)
   │   ├── routes/
   │   ├── controllers/
   │   ├── models/
   │   ├── middleware/
   │   ├── scripts/
   │   ├── app.js
   │   ├── server.js
   │   ├── package.json
   │   └── .env.example
  ├── .gitignore
  └── README.md
  `));

  console.log(chalk.cyan('\n📋 Next steps:\n'));
  console.log(chalk.white(`1. Navigate to your project:`));
  console.log(chalk.yellow(`   cd ${folderName}\n`));

  console.log(chalk.white(`2. Create .env files from the examples:\n`));
  console.log(chalk.yellow(`   copy server\\.env.example server\\.env`));
  console.log(chalk.yellow(`   copy client\\.env.example client\\.env\n`));

  console.log(chalk.white(`3. Start development servers:\n`));
  console.log(chalk.yellow(`   One command: npm run mern:start`));
  console.log(chalk.yellow(`   Or manually:`));
  console.log(chalk.yellow(`   Terminal 1 (Backend):  cd server && npm run dev`));
  console.log(chalk.yellow(`   Terminal 2 (Frontend): cd client && npm start\n`));

  console.log(chalk.white(`4. Seed the default login (optional):\n`));
  console.log(chalk.yellow(`   cd server && npm run seed:demo\n`));

  console.log(chalk.white(`5. Use the ProApp CLI (Inside project root):\n`));
  console.log(chalk.yellow(`   node proapp make:controller MyController`));
  console.log(chalk.yellow(`   node proapp make:model MyModel`));
  console.log(chalk.yellow(`   node proapp make:config cache`));
  console.log(chalk.yellow(`   node proapp make:resource project`));
  console.log(chalk.yellow(`   node proapp make:module project`));
  console.log(chalk.yellow(`   node proapp make:route my-resource`));
  console.log(chalk.yellow(`   node proapp help`));
  console.log(chalk.yellow(`   node proapp mern:migrate ProjectController.js`));
  console.log(chalk.yellow(`   cd server && npm run mern:docs`));

  console.log(chalk.green.bold(`Happy coding! 🎉\n`));

} catch (error) {
  console.log(chalk.red(`❌ Error creating project: ${error.message}`));
  process.exit(1);
}
