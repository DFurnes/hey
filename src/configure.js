const findConfig = require('find-config');
const configFunction = findConfig.require('.hey.js');
const find = require('lodash/find')
const keytar = require('keytar');
const prompt = require('syncprompt');
const chalk = require('chalk');

const config = configFunction({
  basicauth: function(username) {
    return (options) => {
      const service = options.url.hostname;
      let password = keytar.getPassword(service, username);

      if (!password) {
        password = prompt(`Enter ${chalk.bold(username)}'s password for ${chalk.bold(service)}: `, { secure: true });
        keytar.addPassword(service, username, password);
      }

      return { username, password };
    }
  },
});


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
    if (project.port) options.url.set('port', project.port);
    if (project.auth) options.auth = project.auth(options);
  }

  return options;
}
