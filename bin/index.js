#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Get the folder name from command line argument
const folderName = process.argv[2];

if (!folderName) {
  console.log(chalk.red('❌ Error: Please specify a project name'));
  console.log(chalk.yellow('\nUsage: npx create-react-proapp <folder-name>'));
  console.log(chalk.cyan('\nExample: npx create-react-proapp my-awesome-app'));
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

console.log(chalk.blue.bold('\n🚀 Creating your React + Node.js Pro App...\n'));

try {
  // Create project directory
  fs.ensureDirSync(targetDir);
  console.log(chalk.green(`✓ Created directory: ${folderName}`));

  // Copy template files
  fs.copySync(templateDir, targetDir);
  console.log(chalk.green('✓ Copied project template'));

  // 📦 INSTALL DEPENDENCIES
  console.log(chalk.blue.bold('\n📦 Installing dependencies (this may take a minute)...\n'));

  // Install Server Dependencies
  console.log(chalk.yellow('  → Installing backend dependencies (MVC ready)...'));
  execSync('npm install', { cwd: path.join(targetDir, 'server'), stdio: 'inherit' });
  console.log(chalk.green('  ✓ Backend dependencies installed'));

  // Install Client Dependencies
  console.log(chalk.yellow('\n  → Installing frontend dependencies (Hot Toast ready)...'));
  execSync('npm install', { cwd: path.join(targetDir, 'client'), stdio: 'inherit' });
  console.log(chalk.green('  ✓ Frontend dependencies installed'));

  // Display next steps
  console.log(chalk.blue.bold('\n✨ MVC Project created successfully!\n'));
  console.log(chalk.cyan('📁 Professional Structure:'));
  console.log(chalk.white('   - server/app/Controllers  (Logic)'));
  console.log(chalk.white('   - server/app/Models       (Schemas)'));
  console.log(chalk.white('   - server/database         (Migrations)'));
  console.log(chalk.white('   - proapp.js               (CLI Tool)'));
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

  console.log(chalk.white(`2. Create .env files (copied automatically, just edit if needed):\n`));

  console.log(chalk.white(`3. Start development servers:\n`));
  console.log(chalk.yellow(`   Terminal 1 (Backend):  cd server && npm run dev`));
  console.log(chalk.yellow(`   Terminal 2 (Frontend): cd client && npm start\n`));

  console.log(chalk.white(`4. Use the ProApp CLI (Inside project root):\n`));
  console.log(chalk.yellow(`   node proapp make:controller MyController`));
  console.log(chalk.yellow(`   node proapp make:model MyModel`));

  console.log(chalk.green.bold(`Happy coding! 🎉\n`));

} catch (error) {
  console.log(chalk.red(`❌ Error creating project: ${error.message}`));
  process.exit(1);
}
