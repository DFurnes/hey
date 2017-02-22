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
      url: endpoint,
    }, formatter);

    request.send();
  })
  .parse(process.argv);
