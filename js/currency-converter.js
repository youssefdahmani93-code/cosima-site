(function() {
  // Config key for localStorage with TTL support
  const CACHE_KEY = 'store_currency_config_v2';
  const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

  // State
  let config = null;

  // Get query parameter by name
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Get cached configuration if valid
  function getCachedConfig() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const parsed = JSON.parse(cached);
      if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < CACHE_TTL)) {
        return parsed.data;
      }
    } catch (e) {
      console.warn('Failed to parse cached currency config:', e);
    }
    return null;
  }

  // Save configuration to cache
  function setCachedConfig(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch (e) {
      console.warn('Failed to cache currency config:', e);
    }
  }

  // Fetch currency configuration
  async function fetchConfig() {
    const urlCountry = getQueryParam('country');

    // Call API
    try {
      let url = '/api/currency';
      if (urlCountry) {
        url += '?country=' + encodeURIComponent(urlCountry);
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const freshConfig = await response.json();
        // Save to cache
        setCachedConfig(freshConfig);
        return freshConfig;
      }
    } catch (e) {
      console.error('Failed to fetch currency config:', e);
    }

    return null;
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

  // Find country select dropdowns on the page
  function findCountrySelects() {
    const selects = document.querySelectorAll('select');
    const countrySelects = [];
    selects.forEach(select => {
      const options = Array.from(select.options);
      const hasGcc = options.some(opt => {
        const text = opt.textContent.trim().toLowerCase();
        return text === 'saudi arabia' || text === 'united arab emirates' || text === 'qatar';
      });
      if (hasGcc) {
        countrySelects.push(select);
      }
    });
    return countrySelects;
  }

  // Update currency and prices when a country changes
  async function updateCurrencyForCountry(countryCode) {
    try {
      const response = await fetch('/api/currency?country=' + encodeURIComponent(countryCode));
      if (response.ok) {
        config = await response.json();
        setCachedConfig(config);
        
        // Convert all prices on page
        window.convertAllPrices();
        
        // Dispatch event for other listeners
        const event = new CustomEvent('currencyChanged', { detail: config });
        document.dispatchEvent(event);
      }
    } catch (e) {
      console.error('Failed to update currency for country:', countryCode, e);
    }
  }

  // Register change listeners on country selects
  function setupCountrySelectListeners() {
    const countrySelects = findCountrySelects();
    countrySelects.forEach(select => {
      // Avoid duplicate event listener
      if (select.getAttribute('data-has-currency-listener')) return;
      select.setAttribute('data-has-currency-listener', 'true');
      
      select.addEventListener('change', async function() {
        const selectedOption = select.options[select.selectedIndex];
        const text = selectedOption.textContent.trim();
        const value = selectedOption.value ? selectedOption.value.trim() : '';
        
        let countryCode = '';
        if (['SA', 'AE', 'QA', 'KW', 'BH', 'OM'].includes(value.toUpperCase())) {
          countryCode = value.toUpperCase();
        } else {
          const nameMap = {
            'saudi arabia': 'SA',
            'united arab emirates': 'AE',
            'qatar': 'QA',
            'kuwait': 'KW',
            'bahrain': 'BH',
            'oman': 'OM'
          };
          countryCode = nameMap[text.toLowerCase()] || '';
        }
        
        if (countryCode) {
          await updateCurrencyForCountry(countryCode);
        }
      });
    });
  }

  // Synchronize country selects to match the active configuration
  function syncCountryDropdowns() {
    if (!config || !config.country) return;
    const countrySelects = findCountrySelects();
    countrySelects.forEach(select => {
      const countryCode = config.country.toUpperCase();
      let matched = false;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value.toUpperCase() === countryCode) {
          select.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const countryNames = {
          'SA': 'Saudi Arabia',
          'AE': 'United Arab Emirates',
          'QA': 'Qatar',
          'KW': 'Kuwait',
          'BH': 'Bahrain',
          'OM': 'Oman'
        };
        const targetName = countryNames[countryCode];
        if (targetName) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].textContent.trim().toLowerCase() === targetName.toLowerCase()) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
    });
  }

  // Initialize
  async function init() {
    const urlCountry = getQueryParam('country');
    const cached = urlCountry ? null : getCachedConfig();
    
    if (cached) {
      config = cached;
    } else {
      config = {
        success: true,
        country: 'US',
        currency: 'USD',
        symbol: '$',
        rate: 1.0
      };
    }
    
    // Apply cached or default config immediately
    window.convertAllPrices();
    syncCountryDropdowns();
    setupCountrySelectListeners();
    
    // Fetch fresh config in background
    fetchConfig().then(freshConfig => {
      if (freshConfig) {
        // Only update UI if the fresh config actually changed the currency or the rate has changed significantly
        const hasChanged = !config || 
                           freshConfig.currency !== config.currency || 
                           Math.abs(freshConfig.rate - config.rate) > 0.001 ||
                           freshConfig.country !== config.country;
        if (hasChanged) {
          config = freshConfig;
          window.convertAllPrices();
          syncCountryDropdowns();
          
          // Dispatch event for other listeners
          const event = new CustomEvent('currencyChanged', { detail: config });
          document.dispatchEvent(event);
        }
      }
    });
    
    // Listen for custom events to trigger conversion (for dynamic content)
    document.addEventListener('productsLoaded', () => {
      window.convertAllPrices();
      setupCountrySelectListeners();
    });
    
    // Setup observer to watch for dynamic DOM additions
    const observer = new MutationObserver(() => {
      window.convertAllPrices();
      setupCountrySelectListeners();
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
