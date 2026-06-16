module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Get client country
  // Vercel sets x-vercel-ip-country on production.
  let country = req.headers['x-vercel-ip-country'] || 'US';
  
  // Get IP to fall back if country header is missing (e.g. running locally)
  const ipHeader = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
  const clientIp = ipHeader ? ipHeader.split(',')[0].trim() : '';

  // If local development, check query parameter first, then fallback to GeoIP
  if (req.query.country) {
    country = req.query.country.toUpperCase();
  } else if ((!req.headers['x-vercel-ip-country'] || req.headers['x-vercel-ip-country'] === 'XX') && clientIp && clientIp !== '127.0.0.1' && clientIp !== '::1') {
    try {
      const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.country_code) {
          country = geoData.country_code.toUpperCase();
        }
      }
    } catch (e) {
      console.warn('GeoIP fetch failed:', e.message);
    }
  }

  // 2. Map country code to local currency
  const countryToCurrency = {
    'SA': 'SAR', // Saudi Arabia
    'AE': 'AED', // UAE
    'QA': 'QAR', // Qatar
    'KW': 'KWD', // Kuwait
    'BH': 'BHD', // Bahrain
    'OM': 'OMR', // Oman
    'EG': 'EGP', // Egypt
    'US': 'USD', // USA
    'GB': 'GBP', // UK
    'CA': 'CAD', // Canada
    'AU': 'AUD', // Australia
    // Eurozone countries
    'AT': 'EUR', 'BE': 'EUR', 'CY': 'EUR', 'EE': 'EUR', 'FI': 'EUR', 'FR': 'EUR',
    'DE': 'EUR', 'GR': 'EUR', 'IE': 'EUR', 'IT': 'EUR', 'LV': 'EUR', 'LT': 'EUR',
    'LU': 'EUR', 'MT': 'EUR', 'NL': 'EUR', 'PT': 'EUR', 'SK': 'EUR', 'SI': 'EUR',
    'ES': 'EUR'
  };

  const currency = countryToCurrency[country] || 'USD';

  // 3. Fetch live exchange rate
  let rate = 1.0;
  if (currency !== 'USD') {
    try {
      const rateResponse = await fetch('https://open.er-api.com/v6/latest/USD');
      if (rateResponse.ok) {
        const rateData = await rateResponse.json();
        if (rateData.rates && rateData.rates[currency]) {
          rate = rateData.rates[currency];
        }
      }
    } catch (e) {
      console.error('Exchange rate fetch failed:', e.message);
    }
  }

  // 4. Currency symbols
  const currencySymbols = {
    'USD': '$',
    'SAR': 'SAR',
    'AED': 'AED',
    'QAR': 'QAR',
    'KWD': 'KWD',
    'BHD': 'BHD',
    'OMR': 'OMR',
    'EGP': 'EGP',
    'GBP': '£',
    'EUR': '€',
    'CAD': 'CA$',
    'AUD': 'A$'
  };

  const symbol = currencySymbols[currency] || currency;

  return res.status(200).json({
    success: true,
    country,
    currency,
    symbol,
    rate
  });
};
