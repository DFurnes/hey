const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Mock
const post = ({id, title = 'Hello World'}) => ({id, title});

// Routes
app.get('/posts/:id', (req, res) => {
  res.status(200).json(post({id: req.params.id, title: 'Hello World'}));
});

app.post('/posts', (req, res) => {
  res.status(201).json(post({id: 3, title: req.body.title}));
});

app.put('/posts/:id', (req, res) => {
  res.status(200).json(post({id: 3, title: req.body.title}));
});

app.delete('/posts/:id', (req, res) => {
  res.status(200).set('Content-Type', 'text/plain').send('Deleted.');
});

app.get('/status/:code', (req, res) => {
  res.status(req.params.code).end();
});

// Start the server!
app.listen(3000, () => console.log('Running mock server on 3000'));
