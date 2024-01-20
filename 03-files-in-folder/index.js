// Import all required modules
const fs = require('fs');
const path = require('node:path');

// Variables
const pathSecretFolder = path.join(__dirname, 'secret-folder');

let filesArraySecretFolder = [];

// Read the contents of the secret-folder
// Retrieve data for each object within the secret-folder

fs.readdir(pathSecretFolder, (err, files) => {
  filesArraySecretFolder = [...files];

  filesArraySecretFolder.forEach((file) => {
    let filePath = path.join(__dirname, 'secret-folder', file);

    // Check if the object is a file

    fs.stat(filePath, (err, stats) => {
      if (stats.isFile()) {
        // Display file data in the console

        process.stdout.write(
          `${file.slice(0, -4)} - ${path.extname(file).slice(1)} - ${
            stats.size / 1000
          }kb\n`,
        );
      }
    });
  });
});

// node 03-files-in-folder
