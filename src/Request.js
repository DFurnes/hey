const axios = require('axios');
const { startTimer, endTimer } = require('./helpers');

class Request {
  constructor(options, formatter) {
    this.options = options;
    this.formatter = formatter;
  }

  // Make the this.options and print output:
  send() {
    this.formatter.printRequest(this.options);
    const spinner = this.formatter.startRequest();
    const timer = startTimer();

    axios(this.options)
      .then(response => response)
      .catch(error => error.response)
      .then((response) => {
        const ms = endTimer(timer);
        this.formatter.printResponse(response, ms);
        this.formatter.printData(response);
      });
  }
}

module.exports = Request;
