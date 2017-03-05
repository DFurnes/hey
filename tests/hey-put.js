const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey put', () => {
  it('can make a PUT request', () => {
    const result = command('put http://localhost:3000/put');
    snapshot(result);
  });

  it('can put form-encoded body', () => {
    const result = command('put http://localhost:3000/put title="Hello World"');
    snapshot(result);
  });

  it('can put json body', () => {
    const result = command('put http://localhost:3000/put title:"JSON"');
    snapshot(result);
  });
});
