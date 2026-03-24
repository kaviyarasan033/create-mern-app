const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const TARGETS = {
  'cache:clear': [
    '.cache',
    'client/.cache',
    'client/.vite',
    'client/node_modules/.vite',
    'client/dist',
    'server/.cache',
    'server/build',
    'server/dist',
    'server/tmp/cache'
  ],
  'config:clear': [
    '.config-cache',
    '.cache/config',
    '.cache/env',
    'client/.cache/config',
    'client/.cache/env',
    'server/.cache/config',
    'server/.cache/env'
  ]
};

const VALID_COMMANDS = new Set(['cache:clear', 'config:clear', 'optimize:clear']);

function removeTarget(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);

  if (!fs.existsSync(absolutePath)) {
    return false;
  }

  fs.rmSync(absolutePath, { recursive: true, force: true });
  return true;
}

function getTargets(command) {
  if (command === 'optimize:clear') {
    return [...TARGETS['cache:clear'], ...TARGETS['config:clear']];
  }

  return TARGETS[command] || [];
}

function runOptimizeClear(command = 'optimize:clear') {
  if (!VALID_COMMANDS.has(command)) {
    console.log(`Unknown optimize command: ${command}`);
    console.log('Use one of: cache:clear, config:clear, optimize:clear');
    process.exitCode = 1;
    return;
  }

  const targets = [...new Set(getTargets(command))];
  const removed = [];
  const skipped = [];

  targets.forEach((target) => {
    if (removeTarget(target)) {
      removed.push(target);
      return;
    }

    skipped.push(target);
  });

  console.log(`MERN ${command} completed.`);

  if (removed.length) {
    console.log('Removed:');
    removed.forEach((target) => console.log(`- ${target}`));
  }

  if (skipped.length) {
    console.log('Not found:');
    skipped.forEach((target) => console.log(`- ${target}`));
  }
}

if (require.main === module) {
  runOptimizeClear(process.argv[2]);
}

module.exports = {
  runOptimizeClear
};
