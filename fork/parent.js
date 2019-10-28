// import * as vscode from 'vscode';
const { fork } = require('child_process');

const forked = fork('child.js');
console.log(forked)

// const channel = vscode.window.createOutputChannel('Child messages');
// channel.show();

forked.on('message', (msg) => {
  console.log('Message from child: ', msg);
  // channel.append(msg);
});

forked.send({ hello: 'workld' });

// const forked = fork(`${__dirname}/fork/child.js`);
		
		// forked.on('message', (msg: any) => {
		// 	const message = JSON.stringify(msg);
		// 	console.log('Message from child: ', message);
		// 	channel.append(`Message from child: , ${message}`);
		// 	channel.show();
		// });

		// console.log('about to send message')
		// console.log(forked)
		
		// forked.send({ hello: 'workld' });

		// console.log('message sent')
