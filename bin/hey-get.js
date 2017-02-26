const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { increaseVerbosity } = require('../src/helpers');

// cli
program
  .usage('[endpoint]')
  .description('Make a GET request.')
  .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0)
  .action(function(endpoint) {
    let formatter = new DefaultFormatter(this.verbose);

    const request = new Request({
      method: 'GET',
      url: endpoint,
    }, formatter);

    request.send();
  })
  .parse(process.argv);
