const jsonic = require('jsonic');
const qs = require('qs');

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
  let parsedData, headers;

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
