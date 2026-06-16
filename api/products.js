const pool = require('./_lib/db');
const { getProductsFromSheet } = require('./_lib/sheets');

const fallbackProducts = [
  {
    sku: 'JEW-001',
    name: 'Gold Diamond Ring (Fallback)',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=305&h=305&fit=crop&q=80',
    category: 'Rings',
    description: 'Beautiful 18k gold diamond ring'
  },
  {
    sku: 'JEW-002',
    name: 'Silver Necklace (Fallback)',
    price: 149.99,
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=305&h=305&fit=crop&q=80',
    category: 'Necklaces',
    description: 'Elegant sterling silver necklace'
  },
  {
    sku: 'JEW-003',
    name: 'Pearl Earrings (Fallback)',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=305&h=305&fit=crop&q=80',
    category: 'Earrings',
    description: 'Classic freshwater pearl earrings'
  },
  {
    sku: 'JEW-004',
    name: 'Rose Gold Bracelet (Fallback)',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=305&h=305&fit=crop&q=80',
    category: 'Bracelets',
    description: 'Stunning rose gold bracelet'
  }
];

// In-memory cache for Google Sheets products
let cachedProducts = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.query;

  // 1. Try Google Sheets
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      const now = Date.now();
      let products;
      let isFromCache = false;

      if (cachedProducts && (now - cacheTimestamp < CACHE_TTL)) {
        products = cachedProducts;
        isFromCache = true;
      } else {
        products = await getProductsFromSheet();
        cachedProducts = products;
        cacheTimestamp = now;
      }

      let resultProducts = products;
      if (category) {
        resultProducts = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
      }
      return res.status(200).json({
        success: true,
        source: isFromCache ? 'google-sheets-cache' : 'google-sheets',
        products: resultProducts,
        count: resultProducts.length
      });
    }
  } catch (sheetError) {
    console.warn('Google Sheets fetch failed, falling back to database:', sheetError.message);
  }

  // 2. Try PostgreSQL
  try {
    const client = await pool.connect();
    let query = 'SELECT * FROM products WHERE in_stock = true';
    const params = [];

    if (category) {
      query += ' AND LOWER(category) = LOWER($1)';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';
    const result = await client.query(query, params);
    client.release();

    if (result.rowCount > 0) {
      return res.status(200).json({
        success: true,
        source: 'database',
        products: result.rows,
        count: result.rowCount
      });
    }
  } catch (dbError) {
    console.warn('Database fetch failed, falling back to hardcoded mockups:', dbError.message);
  }

  // 3. Fallback to Mockup
  let products = fallbackProducts;
  if (category) {
    products = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
  }

  return res.status(200).json({
    success: true,
    source: 'mockup',
    products: products,
    count: products.length
  });
};

