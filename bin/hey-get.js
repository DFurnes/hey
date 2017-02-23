const program = require('commander');
const Request = require('../src/Request');
const JsonFormatter = require('../src/JsonFormatter');
const { increaseVerbosity } = require('../src/helpers');

// cli
program
  .usage('[endpoint]')
  .description('Make a GET request.')
  .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0)
  .action(function(endpoint) {
    let formatter = new JsonFormatter(this.verbose);

    const request = new Request({
      method: 'GET',
      url: endpoint,
    }, formatter);

    request.send();
  })
  .parse(process.argv);
