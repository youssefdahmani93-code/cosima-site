(function() {
  // Config key for sessionStorage
  const CACHE_KEY = 'store_currency_config';

  // State
  let config = null;

  // Get query parameter by name
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Fetch currency configuration
  async function fetchConfig() {
    // Check URL override first
    const urlCountry = getQueryParam('country');
    
    // Check cache
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached && !urlCountry) {
      try {
        config = JSON.parse(cached);
        return config;
      } catch (e) {
        console.warn('Failed to parse cached currency config:', e);
      }
    }

    // Call API
    try {
      let url = '/api/currency';
      if (urlCountry) {
        url += '?country=' + encodeURIComponent(urlCountry);
      }
      
      const response = await fetch(url);
      if (response.ok) {
        config = await response.json();
        // Save to cache
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(config));
        return config;
      }
    } catch (e) {
      console.error('Failed to fetch currency config:', e);
    }

    // Default fallback
    config = {
      success: true,
      country: 'US',
      currency: 'USD',
      symbol: '$',
      rate: 1.0
    };
    return config;
  }

  // Format amount from USD
  window.formatPrice = function(usdAmount) {
    if (!config) return '$' + parseFloat(usdAmount).toFixed(2);
    
    const converted = parseFloat(usdAmount) * config.rate;
    // Format based on currency type
    if (config.currency === 'USD') {
      return '$' + converted.toFixed(2);
    } else if (config.currency === 'GBP') {
      return '£' + converted.toFixed(2);
    } else if (config.currency === 'EUR') {
      return '€' + converted.toFixed(2);
    } else {
      // Localized format for SAR, AED, etc.
      return converted.toFixed(2) + ' ' + config.symbol;
    }
  };

  // Get current config
  window.getCurrencyConfig = function() {
    return config;
  };

  // Scan DOM and convert all elements with [data-price-usd] or class names containing price
  window.convertAllPrices = function() {
    if (!config) return;
    
    // 1. Convert elements with explicit data-price-usd
    const explicitElements = document.querySelectorAll('[data-price-usd]');
    explicitElements.forEach(el => {
      const usdVal = parseFloat(el.getAttribute('data-price-usd'));
      if (!isNaN(usdVal)) {
        el.textContent = window.formatPrice(usdVal);
      }
    });

    // 2. Auto-detect and parse prices from known classes if they don't have data-price-usd
    const priceSelectors = '.regPrice, .salePrice, .Hprice, .HDprice, .tb-price, .HPrice, .subheading strong, .cartSide strong';
    const autoElements = document.querySelectorAll(priceSelectors);
    
    autoElements.forEach(el => {
      // Skip if already converted explicitly
      if (el.hasAttribute('data-price-usd')) return;
      
      const text = el.textContent.trim();
      // Check if it contains currency symbols to be safe
      if (text.includes('£') || text.includes('$') || text.includes('€') || text.includes('SAR') || text.includes('AED')) {
        // Extract numeric value
        const match = text.match(/[\d.,]+/);
        if (match) {
          const usdVal = parseFloat(match[0].replace(/,/g, ''));
          if (!isNaN(usdVal)) {
            el.setAttribute('data-price-usd', usdVal);
            el.textContent = window.formatPrice(usdVal);
          }
        }
      }
    });

    // 3. Update any header currency dropdown buttons to display the active currency
    const currencyButtons = document.querySelectorAll('.phtbCurrencyDropdown button');
    currencyButtons.forEach(btn => {
      btn.textContent = config.currency;
    });
  };

  // Initialize
  async function init() {
    await fetchConfig();
    window.convertAllPrices();
    
    // Listen for custom events to trigger conversion (for dynamic content)
    document.addEventListener('productsLoaded', () => {
      window.convertAllPrices();
    });
    
    // Setup observer to watch for dynamic DOM additions
    const observer = new MutationObserver(() => {
      window.convertAllPrices();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
