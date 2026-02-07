import { spawn } from 'node:child_process';

const children = [];
const shell = process.platform === 'win32';

function start(command, args, options = {}) {
  const child = spawn(command, args, { stdio: 'inherit', shell, ...options });
  children.push(child);
  child.on('exit', (code, signal) => {
    if (signal) return;
    if (code === 0) return;
    process.exitCode = code ?? 1;
    shutdown();
  });
  return child;
}

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode != null) continue;
    child.kill('SIGINT');
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(130);
});
process.on('SIGTERM', shutdown);

start('pnpm', ['-C', 'apps/ui-tars', 'run', 'debug:w']);
start('pnpm', ['-C', 'packages/ui-tars/sdk', 'run', 'dev']);
