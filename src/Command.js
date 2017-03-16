const program = require('commander');
const Request = require('../src/Request');
const DefaultFormatter = require('../src/DefaultFormatter');
const { parseData, collectKeyValues, increaseVerbosity } = require('../src/helpers');
const merge = require('lodash/merge');

class Command {
  constructor(defaults = {}) {
    this.program = program;

    this.options = merge({'body': []}, defaults);

    // Set options for the command.
    this.program
      .option('-H, --header <values>', 'Set the request headers.', collectKeyValues, {})
      .option('-q, --query <values>', 'Set the request query-string.', collectKeyValues, {})
      .option('-v, --verbose', 'Increase the verbosity of the formatter.', increaseVerbosity, 0);

    // Set the usage for the 'help' command.
    this.program.usage(`<url> ${this.options['body'] ? '[data]' : '' }`);
  }

  /**
   * Set the command description.
   */
  description(message) {
    this.program.description(message);
    return this;
  }

  /**
   * Parse the expected command arguments and options.
   */
  parse(argv) {
    // Parse arguments passed to the command.
    this.program.action((url, data) => {
      // Fix awkward Commander.js behavior w/ optional args.
      if (data instanceof program.Command) {
        data = null;
      }

      this.options.url = url;

      if (data && this.options['body']) {
        const { headers, parsedData } = parseData(data);
        this.options.headers = merge(headers, this.header),
          this.options.data = parsedData;
      }
    });

    this.program.parse(argv);

    return this;
  }

  /**
   * Run the command.
   */
  run() {
    if (this.options.url) {
      const formatter = new DefaultFormatter(program.verbose);
      const request = new Request(merge(this.options, {
        query: program.query,
      }), formatter);

      request.send();
    }
  }
}

module.exports = Command;
