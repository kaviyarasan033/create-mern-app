const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targets = [
  { name: 'server', dir: path.join(rootDir, 'server') },
  { name: 'client', dir: path.join(rootDir, 'client') }
];

console.log('Installing project dependencies...');

targets.forEach(({ name, dir }) => {
  console.log(`\n> ${name}: npm install`);
  execSync('npm install', {
    cwd: dir,
    stdio: 'inherit'
  });
});

console.log('\nSetup complete.');
console.log('Next: copy env files if needed, run npm run setup:check, then npm run mern:start.');
