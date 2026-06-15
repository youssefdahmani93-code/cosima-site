const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

/**
 * Add an order row to Google Sheets
 * @param {Object} orderData - The order data to add
 */
async function addOrderToSheet(orderData) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Use the first sheet, or create one if needed
    let sheet = doc.sheetsByIndex[0];
    
    // If the sheet has no headers, set them
    if (sheet.headerValues === undefined || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow([
        'Order ID',
        'SKU',
        'Product Name',
        'Price',
        'Quantity',
        'Total',
        'Customer Name',
        'Customer Email',
        'Customer Phone',
        'Shipping Address',
        'Status',
        'Date',
      ]);
    }

    // Add the order as a new row
    await sheet.addRow({
      'Order ID': orderData.id || '',
      'SKU': orderData.sku || '',
      'Product Name': orderData.product_name || '',
      'Price': orderData.price || '',
      'Quantity': orderData.quantity || '',
      'Total': (parseFloat(orderData.price || 0) * parseInt(orderData.quantity || 1)).toFixed(2),
      'Customer Name': orderData.customer_name || '',
      'Customer Email': orderData.customer_email || '',
      'Customer Phone': orderData.customer_phone || '',
      'Shipping Address': orderData.shipping_address || '',
      'Status': orderData.status || 'pending',
      'Date': new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('Error adding to Google Sheet:', error.message);
    // Don't throw - we don't want Google Sheets failure to block the order
    return false;
  }
}

/**
 * Get products from Google Sheets
 * If the "Products" tab doesn't exist, create it with sample products.
 */
async function getProductsFromSheet() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Try to find the "Products" sheet
    let sheet = doc.sheetsByTitle['Products'];

    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = await doc.addSheet({
        title: 'Products',
        headerValues: ['SKU', 'Name', 'Price', 'Image URL', 'Category', 'Description'],
      });

      // Add some default sample products
      await sheet.addRows([
        {
          SKU: 'JEW-001',
          Name: 'Gold Diamond Ring',
          Price: '299.99',
          'Image URL': 'https://placehold.co/305x305',
          Category: 'Rings',
          Description: 'Beautiful 18k gold diamond ring',
        },
        {
          SKU: 'JEW-002',
          Name: 'Silver Necklace',
          Price: '149.99',
          'Image URL': 'https://placehold.co/305x305',
          Category: 'Necklaces',
          Description: 'Elegant sterling silver necklace',
        },
        {
          SKU: 'JEW-003',
          Name: 'Pearl Earrings',
          Price: '89.99',
          'Image URL': 'https://placehold.co/305x305',
          Category: 'Earrings',
          Description: 'Classic freshwater pearl earrings',
        },
        {
          SKU: 'JEW-004',
          Name: 'Rose Gold Bracelet',
          Price: '199.99',
          'Image URL': 'https://placehold.co/305x305',
          Category: 'Bracelets',
          Description: 'Stunning rose gold bracelet',
        },
      ]);
    }

    const rows = await sheet.getRows();
    return rows.map((row) => ({
      sku: row.get('SKU'),
      name: row.get('Name'),
      price: parseFloat(row.get('Price')),
      image_url: row.get('Image URL') || 'https://placehold.co/305x305',
      category: row.get('Category'),
      description: row.get('Description'),
    }));
  } catch (error) {
    console.error('Error fetching products from Google Sheet:', error.message);
    throw error;
  }
}

module.exports = { addOrderToSheet, getProductsFromSheet };

