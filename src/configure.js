const findConfig = require('find-config');
const configFunction = findConfig.require('.hey.js');
const findKey = require('lodash/findKey')
const merge = require('lodash/merge');
const keytar = require('keytar');
const prompt = require('syncprompt');
const chalk = require('chalk');

const config = configFunction ? configFunction({
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
}) : {};


/**
 * Load a configuration object based on the given options.
 */
function getSite(options) {
  const hostname = options.url.hostname;

  if (config && config.sites) {
    // First, try loading a config by hostname:
    if (config.sites[hostname]) {
      return hostname;
    }

    // Otherwise, try to find config by matching alias::
    return findKey(config.sites, {alias: hostname});
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
  const hostname = getSite(options);

  if (hostname) {
    let site = config.sites[hostname];

    if (site.alias) options.url.set('hostname', hostname);
    if (site.forceSecure) options.url.set('protocol', 'https');
    if (site.port) options.url.set('port', site.port);
    if (site.auth) options.auth = site.auth(options);
    if (site.headers) options.headers = merge(site.headers, options.headers); 
  }

  return options;
}
