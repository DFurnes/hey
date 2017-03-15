const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { parseData, collectKeyValues, increaseVerbosity } = require('../src/helpers');
const merge = require('lodash/merge');

class Command {
  constructor(input) {
    this.program = program;
    this.input = input;

    this.commandOptions = {'body': []};

    this.program
      .option('-H, --header <values>', 'Set the request headers.', collectKeyValues, {})
      .option('-q, --query <values>', 'Set the request query-string.', collectKeyValues, {})
      .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0);
  }

  set(key, value) {
    this.commandOptions[key] = value;
    return this;
  }

  description(message) {
    this.program.description(message);
    return this;
  }

  run() {
    this.program
      .usage(`<url> ${this.commandOptions['body'] ? '[data]' : '' }`);

    this.program.action((url, data) => {
      let formatter = new DefaultFormatter(this.verbose);

      if (data && this.commandOptions['body']) {
        const { headers, parsedData } = parseData(data);
        this.commandOptions.headers = merge(headers, this.header),
        this.commandOptions.data = parsedData;
      }

      const request = new Request(merge(this.commandOptions, {
        url: url,
        query: this.query,
      }), formatter);

      request.send();
    });

    this.program.parse(this.input);
  }

}

module.exports = Command;
