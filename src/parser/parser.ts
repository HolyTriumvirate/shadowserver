import { rejects } from "assert";
import { resolve } from "path";

/** 
 * @module: parser.ts
 * @author: Austin Ruby 
 * @function: parse string for instances of 'graphQuill' and extract content within parens immediately following each instance
 * **/

const fs = require('fs');

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

function readFileSendReqAndWriteResponse(filePath: string) {
    fs.readFile(filePath, (err: Error, data: Buffer) => {
    if (err) {
      console.log(err)
    } else {
      // console.log('got some data: ', data.toString())
      const result = gQParser(data.toString());
      // send post request to API/graphql
        // then send response back to vscode output channel
    };
  });
}

// given file path, read file at path and parse for instances of 'graphQuill'
function gQParser(string: string) {
  console.log(string);
  const gq = 'graphQuill';
  // temp counter to count instances of 'graphQuill' in string input
  let counter: number = 0;
  for (let i = 0; i < string.length; i += 1) {
    if (string.slice(i, i + gq.length) === gq) counter += 1;
  }
  console.log(counter)
  return counter;
}

enum BracketTokens {
  '(' = ')',
  '{' = '}',
  '[' = ']'
}

enum closeBrackets {
  ')',
  '}',
  ']'
}

// add characters to string while within parentheses or other type of brackets
function balancedParens(input: string) {
  const stack: string[] = [];
  for (let i: number = 0; i < input.length; i++) {
    if (input[i] in BracketTokens) {
      stack.push(input[i]);
    } 
    else if (input[i] in closeBrackets) {
      const popped: string | undefined = stack.pop();
      let validatedPopped: string;
      if(popped !== undefined) {
        validatedPopped = popped;
        if (validateToken(validatedPopped)){
          if (BracketTokens[validatedPopped] !== input[i]) return false;
        }
      }
    }
  }
  return stack.length === 0;
}

console.log(balancedParens('{()}'))

// console.log(Object.values(BracketTokens))

function validateToken(char: string): char is keyof typeof BracketTokens {
  return char in BracketTokens
}

// console.log(validateToken('('))

// console.log(gQParser(shortTest));
// console.log(gQParser(longTest));
// console.log(readFileSendReqAndWriteResponse(`${__dirname}/parseMeBaby.js`))
