const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { parseData, collectKeyValues, increaseVerbosity } = require('../src/helpers');
const merge = require('lodash/merge');

// cli
program
  .usage('<url> [data]')
  .description('Make a POST request.')
  .option('-H, --header <values>', 'Set the request headers.', collectKeyValues, {})
  .option('-q, --query <values>', 'Set the request query-string.', collectKeyValues, {})
  .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0)
  .action(function(url, data) {
    let formatter = new DefaultFormatter(this.verbose);

    const { headers, parsedData } = parseData(data);
    const options = {
      method: 'POST',
      url: url,
      query: this.query,
      headers: merge(headers, this.header),
      data: parsedData,
    };

    const request = new Request(options, formatter);

    request.send();
  })
  .parse(process.argv);
