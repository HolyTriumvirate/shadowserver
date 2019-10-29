/** 
 * @module: parser.ts
 * @author: Austin Ruby 
 * @function: parse string for instances of 'graphQuill' and extract content within parens immediately following each instance
 * **/

const shortTest: string = 'some other graphQuill shit graphQuill fuck this';
const longTest: string = `
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
{

}
)

`;

function gQParser(string: string) {
  const gq = 'graphQuill';
  // temp counter to count instances of 'graphQuill' in string input
  let counter: number = 0;
  for (let i = 0; i < string.length; i += 1) {
    if (string.slice(i, i + gq.length) === gq) counter += 1;
  }
  return counter;
}

console.log(gQParser(shortTest));
console.log(gQParser(longTest));
