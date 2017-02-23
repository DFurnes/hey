#!/usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

// Notify the user if updates are available.
const DAILY = 1000 * 60 * 60 * 24;
updateNotifier({pkg, updateCheckInterval: DAILY}).notify();

// Accept all-caps HTTP methods as commands.
const methods = ['get', 'post', 'put', 'delete'];
if (process.argv[2]) {
  const method = process.argv[2].toLowerCase();
  if (methods.includes(method)) process.argv[2] = method;
}

program
  .version(pkg.version)
  .command('get [endpoint]', 'Make a GET request.', {isDefault: true})
  .command('post [endpoint] <data>', 'Make a POST request.')
  .command('put [endpoint] <data>', 'Make a PUT request.')
  .command('delete [endpoint]', 'Make a DELETE request.')
  .parse(process.argv);

// Output help if no command is given.
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
