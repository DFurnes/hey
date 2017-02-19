const normalizeUrl = require('normalize-url');
const parseUrl = require('url').parse;
const program = require('commander');
const Request = require('../src/Request');
const JsonFormatter = require('../src/JsonFormatter');

// cli
program
  .usage('[options]')
  .description('Make a HTTP request.')
  .action(function(options) {
    if (! Array.isArray(options)) options = [options];

    let method, endpoint;
    switch(options.length) {
      case 1: method = 'GET'; endpoint = options[0]; break;
      case 2: method = options[0]; endpoint = options[1]; break;
      default: program.outputHelp(); process.exit();
    }

    let formatter = new JsonFormatter;

    const request = new Request({
      method: method.toUpperCase(),
      url: parseUrl(normalizeUrl(endpoint)),
    }, formatter);

    request.send();
  })
  .option('-h --header <header>')
  .option('-a --auth <authorization>')
  .parse(process.argv);
