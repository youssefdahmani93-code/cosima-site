const pool = require('./_lib/db');
const { addOrderToSheet } = require('./_lib/sheets');

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Fetch all orders
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT * FROM orders ORDER BY created_at DESC'
      );
      client.release();

      return res.status(200).json({
        success: true,
        orders: result.rows,
        count: result.rowCount,
      });
    } catch (error) {
      console.error('Get Orders Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // POST - Create a new order
  if (req.method === 'POST') {
    try {
      const {
        sku,
        product_name,
        price,
        quantity,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        notes,
      } = req.body;

      // Validation
      if (!product_name || !price || !customer_name || !customer_email || !shipping_address) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: product_name, price, customer_name, customer_email, shipping_address',
        });
      }

      const client = await pool.connect();

      const result = await client.query(
        `INSERT INTO orders (sku, product_name, price, quantity, customer_name, customer_email, customer_phone, shipping_address, notes, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
         RETURNING *`,
        [
          sku || '',
          product_name,
          parseFloat(price),
          parseInt(quantity) || 1,
          customer_name,
          customer_email,
          customer_phone || '',
          shipping_address,
          notes || '',
        ]
      );

      client.release();

      const order = result.rows[0];

      // Also add to Google Sheet (non-blocking)
      addOrderToSheet(order).catch((err) =>
        console.error('Google Sheets sync failed:', err.message)
      );

      return res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        order: order,
      });
    } catch (error) {
      console.error('Create Order Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
