const Command = require('../src/Command');

// $ hey get <url>
new Command(process.argv)
  .description('Make a PUT request')
  .set('method', 'GET')
  .set('body', false)
  .run();
