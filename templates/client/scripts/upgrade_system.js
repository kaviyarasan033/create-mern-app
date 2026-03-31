import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve(process.cwd());
const packageJsonPath = path.join(projectRoot, 'package.json');

console.log('🚀 Starting MERN Pro Auto-Upgrade System...');

function runCommand(command) {
  try {
    console.log(`\nRunning: ${command}`);
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    return null;
  }
}

// 1. Check for outdated dependencies
console.log('\n--- Checking for dependency updates ---');
runCommand('npm outdated --json').catch(() => {
  // npm outdated returns 1 if there are updates, which is fine
});

// 2. Audit fix
console.log('\n--- Running security audit and fixes ---');
runCommand('npm audit fix');

// 3. Clean install (optional but good for health)
// console.log('\n--- Refreshing node_modules ---');
// runCommand('npm install');

// 4. Build Check
console.log('\n--- Verifying build health ---');
const buildResult = runCommand('npm run build');

if (buildResult !== null) {
  console.log('\n✅ System health check passed! Your project is up to date and building correctly.');
} else {
  console.log('\n⚠️ Build failed after potential updates. Please check the errors above.');
}

console.log('\n✨ Upgrade process complete!');
