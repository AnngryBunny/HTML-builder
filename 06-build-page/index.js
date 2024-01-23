// Import all required modules

const fs = require('fs');
const path = require('node:path');
const fsPromises = require('fs').promises;

// Read and save the template file in a variable

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

let content;
let components;
let componentsPaths = [];

async function readTemplate() {
  content = await fsPromises.readFile(templatePath, 'utf-8');
  return content;
}

// Replace template tags with the content of component files

async function readComponents() {
  components = await fsPromises.readdir(componentsPath);
  return components;
}

async function createComponentPath() {
  for (let component of components) {
    const componentPath = path.join(__dirname, 'components', component);
    componentsPaths.push(componentPath);
  }
}

readTemplate().then(readComponents).then(createComponentPath);

// Write the modified template to the `index.html` file in the `project-dist` folder

// Use the script written in task **05-merge-styles** to create the `style.css` file

// Use the script from task **04-copy-directory** to move the `assets` folder into the `project-dist` folder

// node 06-build-page
