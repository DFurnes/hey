const { execSync, spawn } = require('child_process');
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
  var bin = path.join(__dirname, '../bin/hey.js');
  return execSync(`${bin} ${command}`, {stdio: 'pipe'}).toString();
};

