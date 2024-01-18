//  Import all required modules

const fs = require('fs');
const path = require('node:path');
const readline = require('readline');

// Create a writable stream to a text file

const textPath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(textPath);

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display a welcome message in the console

process.stdout.write('Hello, stranger!\nPlease, type your message here: ');

// Wait for user input, with subsequent checking for the presence of the keyword `exit`
// Write the entered text to the file
// Wait for further input

userInput.on('line', (chunk) => {
  writeStream.write(chunk + '\n');
  //  When pressing the `ctrl + c` key combination or entering `exit` into the console,
  // a farewell phrase is displayed (the text of farewell phrase is of your choice), and the process terminates
  if (chunk === 'exit') {
    userInput.close();
    process.stdout.write('Goodbye, my friend!');
  }
});

//  When pressing the `ctrl + c` key combination or entering `exit` into the console,
// a farewell phrase is displayed (the text of farewell phrase is of your choice), and the process terminates
userInput.on('SIGINT', () => {
  userInput.close();
  process.stdout.write('Goodbye, my friend!');
});

// node 02-write-file
