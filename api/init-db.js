const pool = require('./_lib/db');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await pool.connect();

    // Create products table
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
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(50),
        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        price_usd DECIMAL(10, 2) DEFAULT 0.00,
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

    // Alter orders table to add columns if they don't exist (migration)
    await client.query(`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'USD',
      ADD COLUMN IF NOT EXISTS price_usd DECIMAL(10, 2) DEFAULT 0.00;
    `);

    // Insert some sample products
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

    return res.status(200).json({
      success: true,
      message: 'Database tables created successfully with sample data!',
      tables: ['products', 'orders'],
    });
  } catch (error) {
    console.error('Init DB Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
