const program = require('commander');
const Request = require('../src/Request');
const JsonFormatter = require('../src/JsonFormatter');
const { parseData } = require('../src/helpers');

// cli
program
  .usage('[endpoint] <data>')
  .description('Make a PUT request.')
  .action(function(endpoint, data) {
    let formatter = new JsonFormatter;

    const { headers, parsedData } = parseData(data);
    const options = {
      method: 'PUT',
      url: endpoint,
      headers: headers,
      data: parsedData,
    };

    const request = new Request(options, formatter);

    request.send();
  })
  .parse(process.argv);
