const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// eslint-disable-next-line prefer-destructuring
const PORT = 3000;

const app = express();
const queryController = require('./controllers/queryController.js');

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  console.log('hello, friend');
  res.send('hello, friend');
});

// serve static content
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html').status(200).sendFile(path.resolve(__dirname, '../client/index.html'), (err) => {
    res.status(404).end('something went wrong');
  });
});

app.listen(3000, () => console.log('fuck you'));
function graphQuill() {}
graphQuill(
`{

}`
)
