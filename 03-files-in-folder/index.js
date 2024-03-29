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

        let fileExtension = path.extname(file);
        let fileName = path.basename(file, fileExtension);

        process.stdout.write(
          `${fileName} - ${fileExtension.slice(1)} - ${stats.size}b\n`,
        );
      }
    });
  });
});

// node 03-files-in-folder
