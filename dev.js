import { spawn } from 'child_process';

const rawArgs = process.argv.slice(2);
const cleanArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    cleanArgs.push('-H');
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      cleanArgs.push(rawArgs[i + 1]);
      i++;
    }
  } else if (arg.startsWith('--host=')) {
    cleanArgs.push('-H', arg.split('=')[1]);
  } else if (arg === '--port' || arg === '-p') {
    cleanArgs.push('-p');
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      cleanArgs.push(rawArgs[i + 1]);
      i++;
    }
  } else if (arg.startsWith('--port=')) {
    cleanArgs.push('-p', arg.split('=')[1]);
  } else {
    cleanArgs.push(arg);
  }
}

let hasPort = false;
let hasHost = false;
for (let i = 0; i < cleanArgs.length; i++) {
  if (cleanArgs[i] === '-p' || cleanArgs[i] === '--port') hasPort = true;
  if (cleanArgs[i] === '-H' || cleanArgs[i] === '--hostname') hasHost = true;
}

if (!hasPort) {
  cleanArgs.push('-p', '3000');
}
if (!hasHost) {
  cleanArgs.push('-H', '0.0.0.0');
}

console.log('Starting Next.js dev server with args:', cleanArgs);

const child = spawn('npx', ['next', 'dev', ...cleanArgs], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
