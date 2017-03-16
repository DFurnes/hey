const Command = require('../src/Command');

// $ hey delete <url> [data]
new Command({method: 'DELETE'})
  .description('Make a DELETE request')
  .parse(process.argv)
  .run();
