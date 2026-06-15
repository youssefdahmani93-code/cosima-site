const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));

const replacements = [
  {
    target: /Shared on THEMELOCK\.COM - Jovenca \| Modern Jewelry Store HTML Template/g,
    replacement: 'Cosima | Luxury Beauty, Cosmetics & Wellness Store'
  },
  {
    target: /alt="Jovenca"/g,
    replacement: 'alt="Cosima"'
  },
  {
    target: /About Jovenca/g,
    replacement: 'About Cosima'
  },
  {
    target: /Jovenca & CO/g,
    replacement: 'Cosima & CO'
  },
  {
    target: /Jovenca/g,
    replacement: 'Cosima'
  },
  {
    target: /contact@Jovenca\.com/g,
    replacement: 'contact@cosima.com'
  },
  {
    target: /mailto:contact@Jovenca\.com/g,
    replacement: 'mailto:contact@cosima.com'
  },
  {
    target: /Gold &amp; Diomonds/g,
    replacement: 'Spa & Wellness'
  },
  {
    target: /Gold & Diomonds/g,
    replacement: 'Spa & Wellness'
  }
];

console.log('--- Renaming Brand from Jovenca to Cosima ---');

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  replacements.forEach(r => {
    content = content.replace(r.target, r.replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
  } else {
    console.log(`ℹ️ No changes needed: ${file}`);
  }
});

console.log('Done!');
