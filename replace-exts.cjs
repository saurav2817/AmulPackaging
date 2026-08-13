const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

async function replaceImageExts(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            await replaceImageExts(filePath);
        } else if (file.match(/\.(jsx|js|tsx|ts|css|scss)$/i)) {
            let content = fs.readFileSync(filePath, 'utf-8');
            const newContent = content
                .replace(/\/img\/([^'"]+?)\.(jpg|jpeg|png)/gi, '/img/$1.webp')
                .replace(/url\(['"]?\/img\/([^'"]+?)\.(jpg|jpeg|png)['"]?\)/gi, 'url(/img/$1.webp)');
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf-8');
                console.log(`Updated ${filePath}`);
            }
        }
    }
}

replaceImageExts(srcDir).then(() => console.log('Replaced extensions in src/'));
