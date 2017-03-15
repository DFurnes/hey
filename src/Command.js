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

    this.makeRequest = this.makeRequest.bind(this);
  }

  /**
   * Set an option on the command.
   */
  set(key, value) {
    this.commandOptions[key] = value;
    return this;
  }

  /**
   * Set the command description.
   */
  description(message) {
    this.program.description(message);
    return this;
  }

  /**
   * Make the request.
   */
  makeRequest(url, data) {
    let formatter = new DefaultFormatter(this.verbose);

    // Fix awkward Commander.js behavior w/ optional args.
    if (data instanceof program.Command) {
      data = null;
    }

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
  }

  /**
   * Run the command.
   */
  run() {
    this.program.usage(`<url> ${this.commandOptions['body'] ? '[data]' : '' }`);

    this.program.action(this.makeRequest);

    this.program.parse(this.input);
  }
}

module.exports = Command;
