const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\YOUSSEF\\.gemini\\antigravity\\brain\\c79f63eb-108b-4bd3-b812-e22b1c34f1fc';
const destDir = 'd:\\cosima-site\\images';

const filesToCopy = [
  { src: 'media__1781518143790.png', dest: 'logo.png' },
  { src: 'hero_beauty_1781518251252.png', dest: 'hero-beauty.png' },
  { src: 'hero_health_1781518264872.png', dest: 'hero-health.png' },
  { src: 'hero_elegance_1781518279102.png', dest: 'hero-elegance.png' },
  { src: 'cat_accessories_1781518602597.png', dest: 'cat-accessories.png' },
  { src: 'cat_beauty_1781518614472.png', dest: 'cat-beauty.png' },
  { src: 'cat_wellbeing_1781518624920.png', dest: 'cat-wellbeing.png' }
];

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest} successfully!`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
