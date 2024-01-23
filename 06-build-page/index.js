// Import all required modules

const path = require('node:path');
const fsPromises = require('fs').promises;

// Paths

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');

// Variables

let content;
let components;

// Create 'project-dist' folder

async function createFolder() {
  const folders = await fsPromises.readdir(__dirname);

  if (!folders.includes('project-dist')) {
    fsPromises.mkdir(path.join(__dirname, 'project-dist'));
  }
}

// Read and save the template file in a variable

async function readTemplate() {
  content = await fsPromises.readFile(templatePath, 'utf-8');
  return content;
}

// Replace template tags with the content of component files

async function readComponents() {
  components = await fsPromises.readdir(componentsPath);
  return components;
}

async function replaceTags() {
  for (let component of components) {
    const extension = path.extname(component);
    const basename = path.basename(component, extension);
    const templateTag = `{{${basename}}}`;

    const contentReader = await fsPromises.readFile(
      path.join(__dirname, 'components', component),
      'utf-8',
    );

    if (content.match(templateTag)) {
      content = content.replace(templateTag, contentReader);
    }
  }
}

// Write the modified template to the `index.html` file in the `project-dist` folder

async function modifyIndexFile() {
  fsPromises.writeFile(indexPath, content, {
    encoding: 'utf8',
    flag: 'w',
  });
}

// Use the script written in task **05-merge-styles** to create the `style.css` file

// Use the script from task **04-copy-directory** to move the `assets` folder into the `project-dist` folder

// IIFE

(async function () {
  await createFolder();
  await readTemplate();
  await readComponents();
  await replaceTags();
  await modifyIndexFile();
})();

// node 06-build-page
