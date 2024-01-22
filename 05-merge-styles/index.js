// Import all required modules
const fs = require('fs');
const path = require('node:path');

// Read the contents of the `styles` folder

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

const writeStream = fs.createWriteStream(bundleFile);

function checkCssFiles() {
  fs.readdir(stylesFolderPath, (err, files) => {
    [...files].forEach((file) => {
      const pathCssFile = path.join(stylesFolderPath, file);
      // Check if an object in the folder is a file and has the correct file extension
      if (pathCssFile.slice(-4) === '.css') {
        fs.stat(pathCssFile, (err, stats) => {
          if (stats.isFile()) {
            // Read the style file
            // Write the read data to an array
            // Write the array of styles to the `bundle.css` file
            const readStream = fs.createReadStream(pathCssFile, 'utf-8');
            readStream.pipe(writeStream);
          }
        });
      }
    });
  });
}
checkCssFiles();

// node 05-merge-styles
