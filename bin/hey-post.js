const Command = require('../src/Command');

// $ hey post <url> [data]
new Command(process.argv)
  .description('Make a POST request')
  .set('method', 'POST')
  .run();
