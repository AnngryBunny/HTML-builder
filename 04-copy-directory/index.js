// Import all required modules

const fs = require('fs');
const path = require('node:path');
const fsPromises = require('fs').promises;

// Create the `files-copy` folder if it does not exist yet

const filesCopyPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

function createFolder() {
  fs.readdir(__dirname, (err, files) => {
    if (![...files].includes('files-copy')) {
      fs.mkdir(filesCopyPath, (err) => {
        if (err) throw err;
        fs.readdir(filesPath, (err, files) => {
          [...files].forEach((file) => {
            const originPath = path.join(filesPath, file);
            const copyPath = path.join(filesCopyPath, file);
            // Copy files from the `files` folder to the `files-copy` folder
            return fsPromises.copyFile(originPath, copyPath);
          });
        });
      });
    } else {
      fs.rm(filesCopyPath, { recursive: true }, (err) => {
        if (err) throw err;
        createFolder();
      });
    }
  });
}

createFolder();

// node 04-copy-directory
