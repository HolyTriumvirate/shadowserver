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

// parent function to read file, 
// call helper functions to parse out query string,
// send request to GraphQL API,
// and return response to output channel
function readFileSendReqAndWriteResponse(filePath: string) {
  // read user's file  
  fs.readFile(filePath, (err: Error, data: Buffer) => {
    if (err) {
      console.log(err)
    } else {
      // if no error, convert data to string and pass into gQParser to pull out query/ies
      const result = gQParser(data.toString());
      // send post request to API/graphql
        // then send response back to vscode output channel
    };
  });
}

// given file path, read file at path and parse for instances of 'graphQuill'
function findGQ(string: string) {
  console.log(string);
  // define text to search for in file
  const gq: string = 'graphQuill';
  const queriesArr: string[] = [];
  // iterate over string
  for (let i: number = 0; i < string.length; i += 1) {
    // if current slice of string is 'graphQuill'
    // push evaluated result of parseQueries passing in
    // string sliced from current char to end
    // into queriesArr
    if (string.slice(i, i + gq.length) === gq) {
      queriesArr.push(parseQuery(string.slice(i + gq.length)));
    }
  }
  console.log(queriesArr)
  return queriesArr;
}

// add characters to string while within parentheses
function parseQuery(input: string) {
  // initialize queryString to return once stack is empty
  let queryString: string = '';
  // initialize open and close parens
  const openParen: string = '(';
  const closeParen: string = ')';
  // initialize stack to push/pop open parens to/from
  const stack: string[] = [];
  // initialize index to point to current char in string
  let index: number = 0;
  // iterate over input string at least once, while there are parens in the stack
  // and index hasn't reached the end of the input string
  do {
    const currentChar: string = input[index]
    // if current char is open paren, push to stack
    // if current char is close paren, pop off of stack
    if (currentChar === openParen) {
      stack.push(currentChar);
    } else if (currentChar === closeParen) {
      if (!stack.length) return 'unbalanced parens';
      stack.pop();
    }
    // add current char to queryString and increment index before next iteration of loop
    queryString += currentChar;
    index += 1;
  } while (stack.length && index < input.length)
  return queryString;
}

// console.log(findGQ(longTest))
