const chalk = require('chalk');
const axios = require('axios');
const ora = require('ora');
const prettyMs = require('pretty-ms');
const print = console.log;
const printJson = require('jsome');
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
    print(`${chalk.bgBlack.bold('▸ ' + request.method)} ${chalk.underline(request.url.href)}`);
  }

  startRequest() {
    this.spinner = ora('Making request…').start();
  }

  printResponse(response, ms) {
    const successful = response.status >= 200 && response.status <= 300;
    const statusColor = successful ? chalk.green : chalk.red;

    let message = `${statusColor.bold(response.status)} ${statusColor(response.statusText)} `;
    message += chalk.gray(`[${prettyMs(ms)}]`);
    message += '\n';

    if (successful) {
      this.spinner.succeed(message);
    } else {
      this.spinner.fail(message);
    }
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
      printJson(response.data);
  }
}

module.exports = JsonFormatter;
