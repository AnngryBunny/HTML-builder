// Import all required modules

const path = require('node:path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// Paths

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');
const stylesPath = path.join(__dirname, 'styles');
const cssPath = path.join(__dirname, 'project-dist', 'style.css');
const projectDistPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const assetsCopyPath = path.join(__dirname, 'project-dist', 'assets');

const cssWriteStream = fs.createWriteStream(cssPath);

// Variables

let content;
let components;
let styles;

// Create 'project-dist' folder

async function createFolder() {
  await fsPromises.mkdir(projectDistPath, { recursive: true });
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

async function readStyles() {
  styles = await fsPromises.readdir(stylesPath);
  return styles;
}

async function createCssFile() {
  fsPromises.readdir(projectDistPath, (err, files) => {
    if (![...files].includes('styles.css')) {
      fsPromises.appendFile(cssPath, '');
    } else {
      fsPromises.unlink(cssPath);
      createCssFile();
    }
  });
}

async function modifyCssFile() {
  for (let style of styles) {
    const stylePath = path.join(__dirname, 'styles', style);
    const styleReadStream = fs.createReadStream(stylePath, 'utf-8');
    styleReadStream.pipe(cssWriteStream);
  }
}

// Use the script from task **04-copy-directory** to move the `assets` folder into the `project-dist` folder

async function copyAssetsSubfolder(copyPath) {
  await fsPromises.rm(copyPath, { recursive: true, force: true });
  await fsPromises.mkdir(copyPath, { recursive: true });
}

async function copyAssets(assetsPath, assetsCopyPath) {
  const assets = await fsPromises.readdir(assetsPath, {
    withFileTypes: true,
  });

  for (let file of assets) {
    const filePath = path.join(file.path, file.name);

    if (file.isDirectory()) {
      const copyFolderPath = path.join(assetsCopyPath, file.name);
      await copyAssetsSubfolder(copyFolderPath);
      await copyAssets(filePath, copyFolderPath);
    } else {
      const origin = filePath;
      const copy = path.join(assetsCopyPath, file.name);
      await fsPromises.copyFile(origin, copy);
    }
  }
}

// IIFE

(async function () {
  await createFolder();
  await readTemplate();
  await readComponents();
  await replaceTags();
  await modifyIndexFile();
  await readStyles();
  await createCssFile();
  await modifyCssFile();
  await copyAssets(assetsPath, assetsCopyPath);
})();

// node 06-build-page
