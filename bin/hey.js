#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('get [endpoint]', 'Make a GET request.', {isDefault: true})
  .command('post [endpoint] <data>', 'Make a POST request.', {isDefault: true})
  .command('put [endpoint] <data>', 'Make a PUT request.', {isDefault: true})
  .command('delete [endpoint]', 'Make a DELETE request.', {isDefault: true})
  .parse(process.argv);

// Output help if no command is given.
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
