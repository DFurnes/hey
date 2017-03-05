const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey', () => {
  it('should make a GET request by default', () => {
    const result = command('http://localhost:3000/get');

    snapshot(result);
  });

  it('should display help if no command provided', () => {
    const menu = command('');
    const help = command('--help');

    assert(menu.output === help.output);
  });

  it('should show help menu with --help', () => {
    const help = command('--help');

    snapshot(help);
  });
});
