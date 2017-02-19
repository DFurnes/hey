#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('request <method> [endpoint]', 'Make a HTTP request.', {isDefault: true})
  .parse(process.argv);

// Output help if no command is given.
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
