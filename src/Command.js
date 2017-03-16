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
        this.options.headers = merge(headers, this.header);
        this.options.data = parsedData;
      }
    });

    this.program.parse(argv);

    // Merge the command-line flags into the options,
    this.options = merge(this.options, {
      query: this.program.query,
      headers: this.program.header,
      verbose: this.program.verbose,
    });

    return this;
  }

  /**
   * Run the command.
   */
  run() {
    // If no URL provided, just output help.
    if (! this.options.url) {
      this.program.outputHelp();
      return;
    }

    const formatter = new DefaultFormatter(this.options.verbose);
    const request = new Request(this.options, formatter);

    request.send();
  }
}

module.exports = Command;
