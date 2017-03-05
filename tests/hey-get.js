const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command, processOutput } = require('./helpers');

describe('hey get', () => {
  it('can request json', () => {
    const result = command('http://localhost:3000/get');

    snapshot(result);
  });
});
