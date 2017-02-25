const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey delete', () => {
  it('can make a DELETE request', () => {
    const json = command('delete http://localhost:3000/posts/3');
    snapshot(json);
  });
});
