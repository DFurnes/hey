const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey put', () => {
  it('can make a PUT request', () => {
    const response = command('put http://localhost:3000/posts/4');
    snapshot(response);
  });

  it('can put form-encoded body', () => {
    const response = command('put http://localhost:3000/posts title="Hello World"');
    snapshot(response);
  });

  it('can put json body', () => {
    const response = command('put http://localhost:3000/posts title:"JSON"');
    snapshot(response);
  });
});
