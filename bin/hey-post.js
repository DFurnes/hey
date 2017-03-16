const Command = require('../src/Command');

// $ hey post <url> [data]
new Command({method: 'POST'})
  .description('Make a POST request')
  .parse(process.argv)
  .run();
