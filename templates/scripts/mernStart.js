const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const processes = [];
let shuttingDown = false;

function runService(name, cwd, command, args) {
  const child = spawn(command, args, {
    cwd,
    env: process.env,
    shell: true,
    stdio: 'inherit'
  });

  child.on('exit', (code) => {
    if (shuttingDown) {
      return;
    }

    if (code !== 0) {
      console.error(`${name} exited with code ${code}. Stopping MERN app.`);
      shutdown(code || 1);
    }
  });

  child.on('error', (error) => {
    if (shuttingDown) {
      return;
    }

    console.error(`Failed to start ${name}: ${error.message}`);
    shutdown(1);
  });

  processes.push(child);
}

function shutdown(exitCode) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  processes.forEach((child) => {
    if (!child.killed) {
      child.kill();
    }
  });

  process.exit(exitCode);
}

console.log('Starting MERN app...');
console.log('Frontend: client (Vite)');
console.log('Backend: server (Node/Nodemon)');

runService('backend', path.join(rootDir, 'server'), 'npm', ['run', 'dev']);
runService('frontend', path.join(rootDir, 'client'), 'npm', ['start']);

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
