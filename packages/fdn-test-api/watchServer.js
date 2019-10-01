const chokidar = require('chokidar');
const { spawn } = require('child_process');

let runningApi = null;
const restartApi = () => {
  if (runningApi) {
    runningApi.removeAllListeners();
    runningApi.kill();
  }

  runningApi = spawn('node', ['--inspect=9222', './server/index.js'], { stdio: 'inherit' });

  runningApi.on('close', code => console.error(`Looks like the API failed, with code ${code}.`));
};

console.info('Starting API server');
chokidar.watch('./server', { ignoreInitial: true })
  .on('ready', restartApi)
  .on('all', restartApi);
