const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { collectKeyValues, increaseVerbosity } = require('../src/helpers');

// cli
program
  .usage('<url>')
  .description('Make a GET request.')
  .option('-H, --header <values>', 'Set the request headers.', collectKeyValues, {})
  .option('-q, --query <values>', 'Set the request query-string.', collectKeyValues, {})
  .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0)
  .action(function(url) {
    const formatter = new DefaultFormatter(this.verbose);

    const request = new Request({
      method: 'GET',
      url: url,
      query: this.query,
      headers: this.header
    }, formatter);

    request.send();
  })
  .parse(process.argv);
