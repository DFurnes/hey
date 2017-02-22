const axios = require('axios');
const normalizeUrl = require('normalize-url');
const URL = require('url-parse');
const { startTimer, endTimer } = require('./helpers');

class Request {
  constructor(options, formatter) {
    // Normalize and parse object for URL.
    options.url = new URL(normalizeUrl(options.url));

    this.options = options;
    this.formatter = formatter;

    // Re-cast the URL into a string for Axios.
    this.options.url = this.options.url.toString();

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
