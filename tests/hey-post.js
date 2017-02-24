const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey post', () => {
  it('can request json', () => {
    const json = command('post http://localhost:3000/posts title="Cool Stuff"');
    snapshot(json);
  });
});
