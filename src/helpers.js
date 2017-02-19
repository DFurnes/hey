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
