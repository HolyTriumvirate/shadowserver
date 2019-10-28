console.log('running child.js')

process.on('message', (msg) => {
  console.log('Message from parent: ', msg);
});

let counter = 0;

setInterval(() => {
  process.send({ counter: counter += 1})
}, 500);
