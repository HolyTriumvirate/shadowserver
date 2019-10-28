const fs = require('fs');
// const EventEmitter = require('events')

// class WithTime extends EventEmitter {
//   execute(asyncFunc, ...args) {
//     this.emit('begin');
//     console.time('execute');
//     asyncFunc(...args, (err, data) => {
//       if (err) return this.emit('error', err);
//       this.emit('data', data);
//       console.timeEnd('execute');
//       this.emit('end');
//     })
//   }
// }

// const withTime = new WithTime();

// withTime.on('begin', () => console.log('About to execute'));
// withTime.on('end', () => console.log('Done with execute'));

// withTime.execute(fs.readFile, 'test.txt')

// // implement writable stream
// const { Writable } = require('stream');

// // this is an echo stream => it will echo anything it receives
// const outStream = new Writable({
//   write(chunk, encoding, callback) { // encoding param required if chunk is a buffer (buffer by default--must config stream differently for it to be anything else)
//     console.log(chunk.toString());
//     callback();
//   }
// })

// // process.stdin is a readable stream, so you can pipe it into outStream (writeable)
// process.stdin.pipe(outStream);

// // implement readable stream
// const { Readable } = require('stream');

// const inStream = new Readable({
//   read(size) {
//     this.push(String.fromCharCode(this.currentCharCode++));
//     if (this.currentCharCode > 91) {
//       this.push(null);
//     }
//   }
// });

// inStream.currentCharCode = 66;

// inStream.pipe(process.stdout);

// /***** copy/pasted transform streams *****/

// const { Transform } = require("stream");

// const commaSplitter = new Transform({
//   readableObjectMode: true,

//   transform(chunk, encoding, callback) {
//     this.push(
//       chunk
//         .toString()
//         .trim()
//         .split(",")
//     );
//     callback();
//   }
// });

// const arrayToObject = new Transform({
//   readableObjectMode: true,
//   writableObjectMode: true,
//   transform(chunk, encoding, callback) {
//     const obj = {};
//     for (let i = 0; i < chunk.length; i += 2) {
//       obj[chunk[i]] = chunk[i + 1];
//     }
//     this.push(obj);
//     callback();
//   }
// });

// const objectToString = new Transform({
//   writableObjectMode: true,
//   transform(chunk, encoding, callback) {
//     this.push(JSON.stringify(chunk) + "\n");
//     callback();
//   }
// });

// process.stdin
//   .pipe(commaSplitter)
//   .pipe(arrayToObject)
//   .pipe(objectToString)
//   .pipe(process.stdout);
