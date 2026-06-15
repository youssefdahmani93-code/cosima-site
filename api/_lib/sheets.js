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

module.exports = { addOrderToSheet };
