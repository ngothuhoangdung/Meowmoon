const fs = require('fs');
const path = require('path');

const publicImgDir = path.join('d:\\AI\\AI_V2\\#_MeowMoon_web\\public\\images');
const modelsDir = path.join(publicImgDir, 'models');

if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir);
}

const mappings = [
    { oldDir: '1', newDir: 'malik-ousmane' },
    { oldDir: '2', newDir: 'nhat-minh' },
    { oldDir: '3', newDir: 'ren-tran' },
    { oldDir: '4', newDir: 'tu-ha' }
];

let fileRenames = []; // To keep track of oldPath -> newPath relative to public

mappings.forEach(map => {
    const oldDirPath = path.join(publicImgDir, map.oldDir);
    const newDirPath = path.join(modelsDir, map.newDir);
    
    if (fs.existsSync(oldDirPath)) {
        if (!fs.existsSync(newDirPath)) {
            fs.mkdirSync(newDirPath);
        }
        
        const files = fs.readdirSync(oldDirPath);
        files.forEach(file => {
            const oldFilePath = path.join(oldDirPath, file);
            
            // Format filename
            let newFilename = file.toLowerCase();
            newFilename = newFilename.replace(/\\s+/g, '-'); // replace spaces with hyphens
            newFilename = newFilename.replace(/[()]/g, ''); // remove parentheses
            
            const newFilePath = path.join(newDirPath, newFilename);
            
            fs.renameSync(oldFilePath, newFilePath);
            
            fileRenames.push({
                oldStr: `/images/${map.oldDir}/${file}`,
                newStr: `/images/models/${map.newDir}/${newFilename}`
            });
        });
        
        // Remove old directory if empty
        if (fs.readdirSync(oldDirPath).length === 0) {
            fs.rmdirSync(oldDirPath);
        }
    }
});

// Update page.js
const pageJsPath = path.join('d:\\AI\\AI_V2\\#_MeowMoon_web\\src\\app\\ai-doanh-nghiep\\tao-nhan-vat\\page.js');
if (fs.existsSync(pageJsPath)) {
    let content = fs.readFileSync(pageJsPath, 'utf8');
    
    fileRenames.forEach(rename => {
        // Need to escape parentheses in oldStr for regex or use simple string replace
        // Since we know the exact strings, we can just use string replace. Or split/join
        content = content.split(rename.oldStr).join(rename.newStr);
    });
    
    fs.writeFileSync(pageJsPath, content, 'utf8');
    console.log(`Updated page.js with new paths.`);
}

console.log(`Renamed files successfully.`);
