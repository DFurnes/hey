const normalizeUrl = require('normalize-url');
const parseUrl = require('url').parse;
const program = require('commander');
const Request = require('../src/Request');
const JsonFormatter = require('../src/JsonFormatter');

// cli
program
  .usage('[endpoint]')
  .description('Make a GET request.')
  .action(function(endpoint) {
    let formatter = new JsonFormatter;

    const request = new Request({
      method: 'GET',
      url: parseUrl(normalizeUrl(endpoint)),
    }, formatter);

    request.send();
  })
  .parse(process.argv);
