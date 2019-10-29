// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');

// initialize buffer to write graphQuill function into target file
const gQBuff = new Buffer('function graphQuill() {}\ngraphQuill(\n`{\n\n}`\n)\n');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// log message to console when extension successfully launched
	console.log('Congratulations, your extension "shadowserver" is now active!');

	// binding command label to desired functionality
	let disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		// create output channel in user's window to write to and show it
		const channel = vscode.window.createOutputChannel('Child messages');
		channel.show(true);

		// identify current document to monitor for changes once extension is activated
		const currOpenEditor = vscode.window.activeTextEditor;
		const currActiveDoc = currOpenEditor
		? currOpenEditor.document
		: 'no open editor';
		console.log('hello from line 26. currActiveDoc is ', currActiveDoc)
		if (currActiveDoc !== 'no open editor') {
			console.log('hello from line 28. currActiveDoc.fileName is ', currActiveDoc.fileName)
			
			fs.open(currActiveDoc.fileName, 'a+', function(err: Error, fd: Number) {
				if (err) console.log('error opening file: ', err);

				fs.write(fd, gQBuff, 0, gQBuff.length, null, (err: Error) => {
					if (err) console.log('error writing file: ', err);
					fs.close(fd, () => {
						console.log('wrote to file, you sick fuqqq');
					})
				})
			});
		}
		

		// // set event listener on current workspace for documents being saved
		// vscode.workspace.onDidSaveTextDocument((doc: vscode.TextDocument) => {
		// 	console.log(doc);
		// 	// check if document that emitted the save event is the document where the
		// 	// extension was activated from
		// 	if (doc === currActiveDoc) {
		// 		// get file name of current doc
		// 		const fileName = doc.fileName;
				
		// 		// read the current doc
		// 		fs.readFile(fileName, (err: Error, data: Buffer) => {
		// 			if (err) console.log(err);
		// 			else {
		// 				// convert data buffer to string
		// 				const content = data.toString();
		// 				// log content to console
		// 				// clear output channel
		// 				// append content to output channel
		// 				// show output channel (in case it's not already showing) and preserve focus on text editor
		// 				console.log(content);
		// 				channel.clear();
		// 				channel.append(content);
		// 				channel.show(true);
		// 			}
		// 		});
		// 	}
		// })
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
