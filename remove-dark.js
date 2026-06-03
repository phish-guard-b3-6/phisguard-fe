const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts') || dirPath.endsWith('.jsx') || dirPath.endsWith('.js')) {
        callback(dirPath);
      }
    }
  });
}

let count = 0;
walkDir(__dirname, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content.replace(/\s*dark:[^\s"'\`]+/g, '');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${filePath}`);
    count++;
  }
});
console.log(`Total files updated: ${count}`);
