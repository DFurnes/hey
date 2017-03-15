const Command = require('../src/Command');

// $ hey put <url> [data]
new Command(process.argv)
  .description('Make a PUT request')
  .set('method', 'PUT')
  .run();
