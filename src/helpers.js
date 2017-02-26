const jsonic = require('jsonic');
const qs = require('qs');
const trim = require('lodash/trim');
const mapKeys = require('lodash/mapKeys');

/**
 * Start a timer.
 *
 * @return {Array}
 */
exports.startTimer = function() {
  return process.hrtime();
};

/**
 * Stop the given timer and return elapsed time in milliseconds.
 *
 * @return {Number}
 */
exports.endTimer = function(start) {
  const end = process.hrtime(start);
  return end[0] * 1000 + end[1] / 1000000;
}

/**
 * Parse CLI input into the appropriate request payload.
 */
exports.parseData = function(data) {
  let parsedData = null, headers = {};

  data = trim(data, `'"`);
  if (data && typeof data === 'string') {
    if (data.includes(':')) {
      parsedData = jsonic(data);
    } else if (data.includes('=')) {
      headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      parsedData = qs.stringify(qs.parse(data));
    } else {
      headers = {'Content-Type': 'text/plain'};
      parsedData = data;
    }
  }

  return { parsedData, headers };
}

/**
 * Collect one or more header options.
 *
 * @return {Object} - parsed headers
 */
exports.collectHeaders = function(value, headers) {
  const values = value.split(',');

  for (let i = 0; i < values.length; i++) {
    let [ header, value ] = values[i].split(/[=:]/, 2);

    headers[header] = value;
  }

  return headers;
}

/**
 * Track verbosity CLI argument.
 */
exports.increaseVerbosity = function(v, total) {
  return total + 1;
}
