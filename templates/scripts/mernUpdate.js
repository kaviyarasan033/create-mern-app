const fs = require('fs');
const path = require('path');

/**
 * mernUpdate.js
 * Safely syncs template files to the current project.
 */

function runStackUpdate(force = false) {
  const currentDir = process.cwd();
  console.log('\x1b[1mMERN Stack Update\x1b[0m');
  
  // In a real scenario, this might fetch from npm or a git repo.
  // Here we assume the tool is being used to sync from the package's own templates.
  
  const templatePath = __dirname.includes('node_modules') 
    ? path.join(__dirname, '../templates')
    : path.join(__dirname, '..');

  console.log(`Checking for updates from: ${templatePath}`);

  const coreFiles = [
    { src: 'mern.js', dest: 'mern.js' },
    { src: 'scripts/mernUpdate.js', dest: 'scripts/mernUpdate.js' },
    { src: 'scripts/mernOptimizeClear.js', dest: 'scripts/mernOptimizeClear.js' },
    { src: 'scripts/mernStart.js', dest: 'scripts/mernStart.js' },
    { src: 'client/src/data/docsFallback.js', dest: 'client/src/data/docsFallback.js' }
  ];

  let updatedCount = 0;

  coreFiles.forEach(file => {
    const srcPath = path.join(templatePath, file.src);
    const destPath = path.join(currentDir, file.dest);

    if (fs.existsSync(srcPath)) {
      if (force || !fs.existsSync(destPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        console.log(`\x1b[32m✓ Updated:\x1b[0m ${file.dest}`);
        updatedCount++;
      } else {
        console.log(`\x1b[33m• Skipped (exists):\x1b[0m ${file.dest}`);
      }
    }
  });

  if (updatedCount === 0 && !force) {
    console.log('\n\x1b[36mYour core stack files are already up to date.\x1b[0m');
    console.log('Run `node mern stack:update:now` to force overwrite core files.');
  } else {
    console.log(`\n\x1b[32mSuccessfully synced ${updatedCount} core files.\x1b[0m`);
  }
}

module.exports = { runStackUpdate };
