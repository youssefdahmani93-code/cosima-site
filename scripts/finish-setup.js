const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Load environment variables from .env manually to avoid extra dependency
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

const srcDir = 'C:\\Users\\YOUSSEF\\.gemini\\antigravity\\brain\\c79f63eb-108b-4bd3-b812-e22b1c34f1fc';
const destDir = path.join(__dirname, '../images');

const categoryFiles = [
  { src: 'cat_accessories_1781518602597.png', dest: 'cat-accessories.png' },
  { src: 'cat_beauty_1781518614472.png', dest: 'cat-beauty.png' },
  { src: 'cat_wellbeing_1781518624920.png', dest: 'cat-wellbeing.png' }
];

console.log('--- Step 1: Copying Category Images ---');
// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

categoryFiles.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${file.src} -> ${file.dest}`);
  } else {
    console.error(`❌ Source file not found: ${srcPath}`);
  }
});

console.log('\n--- Step 2: Initializing PostgreSQL Database ---');
if (!process.env.DATABASE_URL) {
  console.log('⚠️ DATABASE_URL is not set in .env. Skipping database initialization...');
} else {
  try {
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    (async () => {
      const client = await pool.connect();
      console.log('🔌 Connected to PostgreSQL Database.');

      // Create products table
      console.log('Creating products table if it does not exist...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          sku VARCHAR(50) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          image_url TEXT,
          category VARCHAR(100),
          description TEXT,
          in_stock BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create orders table
      console.log('Creating orders table if it does not exist...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          sku VARCHAR(50),
          product_name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          customer_name VARCHAR(255) NOT NULL,
          customer_email VARCHAR(255) NOT NULL,
          customer_phone VARCHAR(50),
          shipping_address TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Insert sample products
      console.log('Inserting sample products...');
      await client.query(`
        INSERT INTO products (sku, name, price, image_url, category, description)
        VALUES 
          ('JEW-001', 'Gold Diamond Ring', 299.99, 'images/img-01.jpg', 'Rings', 'Beautiful 18k gold diamond ring'),
          ('JEW-002', 'Silver Necklace', 149.99, 'images/img-02.jpg', 'Necklaces', 'Elegant sterling silver necklace'),
          ('JEW-003', 'Pearl Earrings', 89.99, 'images/img-03.jpg', 'Earrings', 'Classic freshwater pearl earrings'),
          ('JEW-004', 'Rose Gold Bracelet', 199.99, 'images/img-04.jpg', 'Bracelets', 'Stunning rose gold bracelet'),
          ('JEW-005', 'Diamond Pendant', 349.99, 'images/img-05.jpg', 'Necklaces', 'Brilliant cut diamond pendant'),
          ('JEW-006', 'Gold Chain', 179.99, 'images/img-06.jpg', 'Necklaces', 'Italian gold chain 22 inches')
        ON CONFLICT (sku) DO NOTHING;
      `);

      client.release();
      await pool.end();
      console.log('✅ Database initialized successfully!');
      
      runGitAndDeploy();
    })();
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    console.log('Proceeding to git step anyway...');
    runGitAndDeploy();
  }
}

function runGitAndDeploy() {
  console.log('\n--- Step 3: Pushing updates to GitHub ---');
  try {
    console.log('Running: git add .');
    execSync('git add .', { stdio: 'inherit' });

    console.log('Running: git commit -m "design: add categories images and complete database setup"');
    execSync('git commit -m "design: add categories images and complete database setup"', { stdio: 'inherit' });

    console.log('Running: git push');
    execSync('git push', { stdio: 'inherit' });

    console.log('\n🎉 Setup finished! GitHub repository updated. Vercel will auto-deploy the changes.');
  } catch (gitErr) {
    console.error('❌ Git execution failed:', gitErr.message);
    console.log('Please run the git commands manually:');
    console.log('  git add .');
    console.log('  git commit -m "design: add categories images and complete database setup"');
    console.log('  git push');
  }
}
