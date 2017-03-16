const Command = require('../src/Command');

// $ hey put <url> [data]
new Command({method: 'PUT'})
  .description('Make a PUT request')
  .parse(process.argv)
  .run();
