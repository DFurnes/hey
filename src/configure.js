const findConfig = require('find-config');
const config = findConfig.require('.hey.js');
const find = require('lodash/find')

/**
 * Load a configuration object based on the given options.
 */
function getProjectConfig(options) {
  const hostname = options.url.hostname;

  if (config && config.projects) {
    // First, try loading a config by project alias:
    if (config.projects[hostname]) {
      return config.projects[hostname];
    }

    // Otherwise, try to find config by matching hostname:
    return find(config.projects, {url: hostname});
  }

  return null;
}

/**
 * Customize the given options based on the loaded config file.
 *
 * @param {Object} options
 * @return {Object}
 */
module.exports = function configure(options) {
  const project = getProjectConfig(options);

  if (project) {
    if (project.forceSecure) options.url.set('protocol', 'https');
    if (project.url) options.url.set('hostname', project.url);
  }

  return options;
}
