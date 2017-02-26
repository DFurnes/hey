const { spawnSync, spawn } = require('child_process');
const onCleanup = require('node-cleanup');
const path = require('path');

// Set working directory to `tests/`.
process.chdir(__dirname);

// Start the mock HTTP server as a child process.
const server = spawn('node', [path.join(__dirname, '../mock-server.js')]);
onCleanup(() => server.kill());

/**
 * Test the given Hey command.
 */
exports.command = function(command = '') {
  const bin = path.join(__dirname, '../bin/hey.js');
  const args = command.length ? command.split(' ') : [];

  const result = spawnSync(bin, args);

  return {
    status: result.status,
    output: processOutput(result.stdout.toString()),
    error: result.stderr.toString(),
  };
};

/**
 * Remove request timer from output so we can snapshot.
 */
function processOutput(string) {
    return string.replace(/\[[0-9]*\ms]/, '[##ms]');
};

