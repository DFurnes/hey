const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey get', () => {
  it('can request json', () => {
    const json = command('http://localhost:3000/hello');
    snapshot(json);
  });
});
