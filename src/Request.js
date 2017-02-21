const axios = require('axios');
const { startTimer, endTimer } = require('./helpers');

class Request {
  constructor(options, formatter) {
    this.options = options;
    this.formatter = formatter;

    this.options.validateStatus = function (status) {
      return true;
    };
  }

  // Make the this.options and print output:
  send() {
    this.formatter.printRequest(this.options);
    const spinner = this.formatter.startRequest();
    const timer = startTimer();

    axios(this.options)
      .then((response) => {
        const ms = endTimer(timer);
        this.formatter.printResponse(response, ms);
        this.formatter.printData(response);
      })
      .catch(error => {
        const ms = endTimer(timer);
        this.formatter.printError(error, ms);
      })
  }
}

module.exports = Request;
