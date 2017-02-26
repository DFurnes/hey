const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { parseData, collectHeaders, increaseVerbosity } = require('../src/helpers');
const merge = require('lodash/merge');

// cli
program
  .usage('[endpoint] <data>')
  .description('Make a PUT request.')
  .option('-H, --header <values>', 'Set the request headers.', collectHeaders, {})
  .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0)
  .action(function(endpoint, data) {
    let formatter = new DefaultFormatter(this.verbose);

    const { headers, parsedData } = parseData(data);
    const options = {
      method: 'PUT',
      url: endpoint,
      headers: merge(headers, this.header),
      data: parsedData,
    };

    const request = new Request(options, formatter);

    request.send();
  })
  .parse(process.argv);
