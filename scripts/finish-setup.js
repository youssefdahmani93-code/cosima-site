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

const prevSessionDir = 'C:\\Users\\YOUSSEF\\.gemini\\antigravity\\brain\\c79f63eb-108b-4bd3-b812-e22b1c34f1fc';
const currSessionDir = 'C:\\Users\\YOUSSEF\\.gemini\\antigravity\\brain\\dd0521c2-293f-4bc9-aa58-efa6e94541f7';
const destDir = path.join(__dirname, '../images');

const filesToCopy = [
  { src: path.join(prevSessionDir, 'cat_accessories_1781518602597.png'), dest: 'cat-accessories.png' },
  { src: path.join(prevSessionDir, 'cat_beauty_1781518614472.png'), dest: 'cat-beauty.png' },
  { src: path.join(prevSessionDir, 'cat_wellbeing_1781518624920.png'), dest: 'cat-wellbeing.png' },
  { src: path.join(currSessionDir, 'skincare_banner_1781519629497.png'), dest: 'skincare-banner.png' },
  { src: path.join(currSessionDir, 'perfume_banner_1781519645309.png'), dest: 'perfume-banner.png' },
  { src: path.join(currSessionDir, 'aroma_banner_1781519661041.png'), dest: 'aroma-banner.png' },
  { src: path.join(currSessionDir, 'newsletter_banner_1781519727660.png'), dest: 'newsletter-banner.png' }
];

console.log('--- Step 1: Copying Category and Banner Images ---');
// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

filesToCopy.forEach(file => {
  if (fs.existsSync(file.src)) {
    fs.copyFileSync(file.src, path.join(destDir, file.dest));
    console.log(`✅ Copied ${path.basename(file.src)} -> ${file.dest}`);
  } else {
    console.error(`❌ Source file not found: ${file.src}`);
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
          ('SKN-001', 'Hyaluronic Acid Serum', 49.99, 'images/hero-beauty.png', 'Skincare', 'Premium hydrating serum for radiant skin'),
          ('VIT-001', 'Organic Multivitamins', 29.99, 'images/hero-health.png', 'Vitamins & Supplements', 'Daily essential vitamins from organic sources'),
          ('FRG-001', 'Oud Imperial Eau de Parfum', 120.00, 'images/hero-elegance.png', 'Luxury Fragrances', 'Sophisticated oud-based luxury fragrance'),
          ('JEW-001', 'Gold Diamond Ring', 299.99, 'images/logo.png', 'Timepieces & Jewelry', 'Beautiful 18k gold diamond ring'),
          ('COS-001', 'Matte Liquid Lipstick', 19.99, 'images/cat-beauty.png', 'Cosmetics & Makeup', 'Long-lasting matte liquid lipstick'),
          ('SPA-001', 'Scented Candle & Diffuser Set', 35.00, 'images/cat-wellbeing.png', 'Home Spa & Aroma', 'Soothing lavender scented candle and reed diffuser')
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
