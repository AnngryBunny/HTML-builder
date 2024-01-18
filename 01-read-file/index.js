const fs = require('fs');

// Solution 1

/* const readStream = fs.createReadStream('01-read-file/text.txt');

readStream.on('data', (chunk) => console.log(chunk.toString())); */

// Solution 2

const path = require('node:path');

const textPath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(textPath);

readStream.on('data', (chunk) => process.stdout.write(chunk.toString() + '\n'));

// node 01-read-file
