const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey post', () => {
  it('can make a POST request', () => {
    const response = command('post http://localhost:3000/posts');
    snapshot(response);
  });

  it('can post form-encoded body', () => {
    const response = command('post http://localhost:3000/posts title:"Hello World"');
    snapshot(response);
  });

  it('can post json body', () => {
    const response = command('post http://localhost:3000/posts title="JSON, woo!"');
    snapshot(response);
  });
});
