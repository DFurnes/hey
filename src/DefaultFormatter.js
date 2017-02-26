const chalk = require('chalk');
const ora = require('ora');
const prettyMs = require('pretty-ms');
const print = console.log;
const printJson = require('jsome');
const logSymbols = require('log-symbols');
const emphasize = require('emphasize');
const map = require('lodash/map');

// json formatting
printJson.colors = {
  'num': 'cyan',
  'str': 'green',
  'bool': 'yellow',
  'regex': 'green',
  'undef': 'grey',
  'null': 'grey',
  'attr': ['white', 'bold'],
  'quot': 'green',
  'punc': 'grey',
  'brack': 'grey',
};

class DefaultFormatter {
  constructor(mode = 0) {
    this.spinner = null;
    this.mode = mode;
  }

  getRequestMessage(request) {
    return `${chalk.bgBlack.bold(request.method)} ${chalk.underline(request.url)}`;
  }

  startRequest(request) {
    let message = this.getRequestMessage(request);

    this.spinner = ora(message).start();
  }

  printResponse(response, ms) {
    let symbol, color;
    if (response.status >= 200 && response.status < 300) {
      symbol = logSymbols.success;
      color = chalk.green;
    } else if (response.status >= 400 && response.status < 500) {
      symbol = logSymbols.warning;
      color = chalk.yellow;
    } else if (response.status >= 500) {
      symbol = logSymbols.error;
      color = chalk.red;
    } else {
      symbol = chalk.cyan(process.platform === 'win32' ? 'i' : 'ℹ');
      color = chalk.cyan;
    }

    let requestMessage = this.getRequestMessage(response.config);
    let text = `${color.bold(response.status)} ${color(response.statusText)} `;

    if (this.mode >= 1) {
      text += requestMessage + ' ';
    }

    text += chalk.gray(`[${prettyMs(ms)}]`);
    text += '\n';

    this.spinner.stopAndPersist({symbol, text});

    // Print response headers in verbose mode.
    if (this.mode >= 1 && response.headers) {
      this.printHeaders(response);
    }
  }

  printHeaders(response) {
    map(response.headers, (value, key) => {
      print(`${chalk.bold(key)}${chalk.gray(':')} ${chalk.yellow(value)}`);
    });
    print();
  }

  printError(error, ms) {
    let requestMessage = this.getRequestMessage(error.config);
    let text = `${chalk.red.bold(error.code)} `;

    let details;
    switch (error.code) {
      case 'ENOTFOUND': details = 'The URL didn\'t resolve.'; break;
      default: details = 'An error occurred.';
    }

    text += chalk.red(details);

    if (this.mode >= 1) {
      text += ' ' + requestMessage;
    }

    text += chalk.gray(` [${prettyMs(ms)}]`);
    text += '\n';

    this.spinner.fail(text);

    // Print full error details in verbose mode.
    if (this.mode >= 1) {
      console.error(error.stack);
    }
  }

  printData(response) {
    if (! response.data) {
      return print(chalk.gray('<empty response>'));
    }

    // Handle pretty-printing common types of content (by header).
    if (response.headers && response.headers['content-type']) {
      let type = response.headers['content-type'];

      if (type.includes('application/json')) {
        return printJson(response.data);
      } else if (type.includes('text/html') || type.includes('application/xml')) {
        return print(emphasize.highlight('xml', response.data).value);
      } else if (type.includes('text/plain')) {
        return print(response.data);
      }
    }

    // ...or try to guess!
    return print(emphasize.highlightAuto(response.data).value);
  }
}

module.exports = DefaultFormatter;
