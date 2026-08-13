const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicImgDir = path.join(__dirname, 'public', 'img');

async function convertToWebp(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            await convertToWebp(filePath);
        } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const ext = path.extname(file);
            const basename = path.basename(file, ext);
            const webpPath = path.join(dir, `${basename}.webp`);
            
            // Only convert if the file is larger than 100KB to save time, or we can just convert all.
            // Let's convert all so we can safely replace `.jpg` and `.png` across the codebase.
            try {
                if (!fs.existsSync(webpPath)) {
                    await sharp(filePath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    console.log(`Converted ${file} to ${basename}.webp`);
                }
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

convertToWebp(publicImgDir)
    .then(() => console.log('Done converting images!'))
    .catch(console.error);
