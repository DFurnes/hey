const Command = require('../src/Command');

// $ hey get <url>
new Command({method: 'GET', body: false})
  .description('Make a GET request')
  .parse(process.argv)
  .run();
