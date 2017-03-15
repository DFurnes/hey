const Command = require('../src/Command');

// $ hey delete <url> [data]
new Command(process.argv)
  .description('Make a DELETE request')
  .set('method', 'DELETE')
  .run();
