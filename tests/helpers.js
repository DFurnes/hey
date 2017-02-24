const Promise = require('bluebird');
const path = require('path');
const exec = require('child_process').execSync;
const spawn = require('child_process').spawn;

var bin = path.join(__dirname, '../bin/hey.js');

// Start the mock HTTP server.
spawn('node', [path.join(__dirname, '../mocks/index.js')]);

/**
 * Test the given Hey command.
 */
exports.command = function(command = '') {
  return exec(`${bin} ${command}`, {stdio: 'pipe'}).toString();
};
