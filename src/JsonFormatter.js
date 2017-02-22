const chalk = require('chalk');
const axios = require('axios');
const ora = require('ora');
const prettyMs = require('pretty-ms');
const print = console.log;
const printJson = require('jsome');
const logSymbols = require('log-symbols');
const emphasize = require('emphasize');
const { startTimer, endTimer } = require('./helpers');

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

class JsonFormatter {
  constructor() {
    this.spinner = null;
  }

  printRequest(request) {
    print(`${chalk.bgBlack.bold('▸ ' + request.method)} ${chalk.underline(request.url)}`);
  }

  startRequest() {
    this.spinner = ora('Making request…').start();
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

    let text= `${color.bold(response.status)} ${color(response.statusText)} `;
    text += chalk.gray(`[${prettyMs(ms)}]`);
    text += '\n';

    this.spinner.stopAndPersist({symbol, text});
  }

  printError(error, ms) {
    let message = `${chalk.red.bold(error.code)} `;

    let details;
    switch (error.code) {
      case 'ENOTFOUND': details = 'The URL could not be resolved.'; break;
      default: details = 'An error occurred.';
    }

    message += chalk.red(details);
    message += chalk.gray(` [${prettyMs(ms)}]`);
    message += '\n';

    this.spinner.fail(message);
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

module.exports = JsonFormatter;
