const pool = require('./_lib/db');

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await pool.connect();

    // Optional: filter by category
    const { category } = req.query;
    let query = 'SELECT * FROM products WHERE in_stock = true';
    const params = [];

    if (category) {
      query += ' AND LOWER(category) = LOWER($1)';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const result = await client.query(query, params);
    client.release();

    return res.status(200).json({
      success: true,
      products: result.rows,
      count: result.rowCount,
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
