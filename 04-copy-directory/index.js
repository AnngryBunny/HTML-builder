// Import all required modules

const fs = require('fs');
const path = require('node:path');
const { stdout } = process;
const fsPromises = require('fs').promises;

// Create the `files-copy` folder if it does not exist yet

const filesCopyPath = path.join(__dirname, 'files-copy');

async function createFolder() {
  fs.readdir(__dirname, (err, files) => {
    if (![...files].includes('files-copy')) {
      fs.mkdir(filesCopyPath, (err) => {
        if (err) throw err;
        stdout.write('New folder was created');
      });
    } else {
      stdout.write('This folder already exists');
    }
  });
}

// Read the contents of the `files` folder

const filesPath = path.join(__dirname, 'files');

const readFiles = () => {
  fs.readdir(filesPath, (err, files) => {
    [...files].forEach((file) => {
      const originPath = path.join(filesPath, file);
      const copyPath = path.join(filesCopyPath, file);
      // Copy files from the `files` folder to the `files-copy` folder
      return fsPromises.copyFile(originPath, copyPath);
    });
  });
};

createFolder().then(readFiles);

// node 04-copy-directory
