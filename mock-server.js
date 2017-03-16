const express = require('express');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const mapValues = require('lodash/mapValues');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multiparty());

// Status Code
app.get('/status/:code', (req, res) => {
  res.status(req.params.code).end();
});

// Echo Request
app.all(/^\/(get|post|patch|put|delete)$/, (req, res) => {
  // Return 405 if not the proper HTTP method.
  if (req.method.toLowerCase() !== req.path.replace('/', '')) {
    return res.status(405).end();
  }

  // Ensure headers are sorted.
  let headers = {};
  Object.keys(req.headers).sort().forEach(key => {
    headers[key] = req.headers[key];
  })

  res.json({
    url: req.protocol + '://' + req.get('Host') + req.url,
    query: req.query,
    body: req.body,
    files: mapValues(req.files, file => {
      return { name: file.name, type: file.type, size: file.size };
    }),
    headers: headers,
  });
});

// Delay
app.get('/delay/:seconds', (req, res) => {
  const seconds = parseInt(req.params.seconds) || 0;
  const ms = seconds * 1000;

  setTimeout(() => res.json({seconds}), ms);
});


// Start the server!
app.listen(3000, () => console.log('Running mock server on 3000'));
