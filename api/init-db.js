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

    // Insert some sample products
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
