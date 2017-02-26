const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { parseData, increaseVerbosity } = require('../src/helpers');

// cli
program
  .usage('[endpoint] <data>')
  .description('Make a POST request.')
  .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0)
  .action(function(endpoint, data) {
    let formatter = new DefaultFormatter(this.verbose);

    const { headers, parsedData } = parseData(data);
    const options = {
      method: 'POST',
      url: endpoint,
      headers: headers,
      data: parsedData,
    };

    const request = new Request(options, formatter);

    request.send();
  })
  .parse(process.argv);
