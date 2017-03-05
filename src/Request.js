const axios = require('axios');
const appendQuery = require('append-query');
const normalizeUrl = require('normalize-url');
const URL = require('url-parse');

const configure = require('./configure');
const { startTimer, endTimer } = require('./helpers');

class Request {
  constructor(options, formatter) {
    // Normalize and parse object for URL.
    options.url = new URL(normalizeUrl(options.url));

    // Append any given query string values to the URL.
    if (options.query) {
      options.url.query = appendQuery(options.url.query, options.query);
    }

    this.options = options;

    this.options = configure(options);
    this.formatter = formatter;

    // Re-cast the URL into a string for Axios.
    this.options.url = this.options.url.toString();

    // Consider any completed response to be successful.
    this.options.validateStatus = function (status) {
      return true;
    };
  }

  // Make the this.options and print output:
  send() {
    this.formatter.startRequest(this.options);
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
