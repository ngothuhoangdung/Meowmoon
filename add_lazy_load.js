const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:\\\\AI\\\\AI_V2\\\\#_MeowMoon_web\\\\src');
let totalReplaced = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Simple check
  if (content.includes('<img')) {
    // Regex to add loading="lazy" to all <img tags if not already present
    // It looks for "<img" followed by one or more whitespace characters
    const newContent = content.replace(/<img(?!\s+loading="lazy")(\s+)/g, '<img loading="lazy"$1');
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      totalReplaced++;
      console.log(`Updated ${file}`);
    }
  }
});

console.log(`Done. Updated ${totalReplaced} files.`);
