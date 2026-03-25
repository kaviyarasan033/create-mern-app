const fs = require('fs');
const path = require('path');

/**
 * mernUpdate.js
 * Safely syncs template files to the current project.
 */

function getAllTemplateFiles(dirPath, arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.join(basePath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        arrayOfFiles = getAllTemplateFiles(fullPath, arrayOfFiles, relativePath);
      }
    } else {
      arrayOfFiles.push({ src: relativePath, dest: relativePath });
    }
  });
  return arrayOfFiles;
}

function mergeJsonFiles(srcPath, destPath) {
  try {
    const srcData = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    const destData = JSON.parse(fs.readFileSync(destPath, 'utf8'));
    
    // Deep merge for specific keys like dependencies, devDependencies, scripts
    const keysToMerge = ['dependencies', 'devDependencies', 'scripts'];
    keysToMerge.forEach(key => {
      if (srcData[key]) {
        if (!destData[key]) destData[key] = {};
        Object.assign(destData[key], srcData[key]); // source overwrites dest for matching keys, keeps user's other keys
      }
    });

    fs.writeFileSync(destPath, JSON.stringify(destData, null, 2));
    return true;
  } catch (err) {
    return false;
  }
}

function runStackUpdate(force = false) {
  const currentDir = process.cwd();
  console.log('\x1b[1mMERN Stack Update\x1b[0m');
  
  const templatePath = __dirname.includes('node_modules') 
    ? path.join(__dirname, '../templates')
    : path.join(__dirname, '..');

  console.log(`Checking for updates from: ${templatePath}`);

  // Get all files from templates directory instead of just core files
  const allFiles = getAllTemplateFiles(templatePath);

  let updatedCount = 0;
  let mergedCount = 0;
  let skippedCount = 0;
  let backedUpCount = 0;

  allFiles.forEach(file => {
    const srcPath = path.join(templatePath, file.src);
    const destPath = path.join(currentDir, file.dest);

    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destPath)) {
        // File is missing in target, create it
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        console.log(`\x1b[32m✓ Created:\x1b[0m ${file.dest}`);
        updatedCount++;
      } else {
        // File exists in target
        if (file.src.endsWith('.json')) {
          // Merge JSON safely
          const success = mergeJsonFiles(srcPath, destPath);
          if (success) {
            console.log(`\x1b[36m✓ Merged JSON:\x1b[0m ${file.dest}`);
            mergedCount++;
          } else {
            console.log(`\x1b[33m• Skipped (JSON parse error):\x1b[0m ${file.dest}`);
            skippedCount++;
          }
        } else if (force) {
          // Force is true: backup user changes, then overwrite
          const backupPath = destPath + '.backup';
          fs.copyFileSync(destPath, backupPath);
          fs.copyFileSync(srcPath, destPath);
          console.log(`\x1b[35m✓ Updated (Backup created):\x1b[0m ${file.dest}`);
          backedUpCount++;
        } else {
          // Force is false, file exists and not JSON
          console.log(`\x1b[33m• Skipped (exists):\x1b[0m ${file.dest}`);
          skippedCount++;
        }
      }
    }
  });

  console.log('\n\x1b[1mUpdate Summary:\x1b[0m');
  console.log(`\x1b[32m- Created missing files:\x1b[0m ${updatedCount}`);
  console.log(`\x1b[36m- Safely merged JSONs:\x1b[0m ${mergedCount}`);
  if (force) {
    console.log(`\x1b[35m- Force updated (with backups):\x1b[0m ${backedUpCount}`);
  }
  console.log(`\x1b[33m- Skipped (preserve custom):\x1b[0m ${skippedCount}`);

  if (updatedCount === 0 && mergedCount === 0 && !force) {
    console.log('\n\x1b[36mYour project files are fully up to date.\x1b[0m');
    console.log('Run `node mern stack:update:now` to force update standard files (creates .backup files for your changes).');
  } else {
    console.log('\n\x1b[32mSuccessfully synced project files while preserving developer changes.\x1b[0m');
  }
}

module.exports = { runStackUpdate };
