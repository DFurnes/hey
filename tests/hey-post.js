const assert = require('power-assert');
const snapshot = require('snap-shot')
const { command } = require('./helpers');

describe('hey post', () => {
  it('can make a POST request', () => {
    const result = command('post http://localhost:3000/post');
    snapshot(result);
  });

  it('can post form-encoded body', () => {
    const result = command('post http://localhost:3000/post title="Hello World"');
    snapshot(result);
  });

  it('can post json body', () => {
    const result = command(`post http://localhost:3000/post '{"title":"JSON"}'`);
    snapshot(result);
  });

  it('can post lazy json', () => {
    const result = command('post http://localhost:3000/post title:"JSON"');
    snapshot(result);
  });

  // @TODO: Figure out a fix for this! :(
  it.skip('can post lazy json with special characters', () => {
    const result = command('post http://localhost:3000/post title:"JSON, woo!"');
    snapshot(result);
  });
});
