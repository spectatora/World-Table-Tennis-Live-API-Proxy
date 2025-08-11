// API Configuration Constants
module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3000,
  
  // Cache Configuration
  CACHE_TTL: 600, // 10 minutes in seconds
  STATS_CACHE_TTL: 1800, // 30 minutes in seconds
  
  // API Configuration
  WTT_API_ENDPOINT: 'https://wtt-website-api-prod-3-frontdoor-bddnb2haduafdze9.a01.azurefd.net/api/cms/GetPlayersListByFilters',
  
  // Default Headers for WTT API
  DEFAULT_HEADERS: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:141.0) Gecko/20100101 Firefox/141.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Content-Type': 'application/json',
    'Origin': 'https://www.worldtabletennis.com',
    'Referer': 'https://www.worldtabletennis.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site'
  },
  
  // API Limits
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 50,
  DEFAULT_PAGE: 1,
  
  // Timeouts
  API_TIMEOUT: 30000, // 30 seconds
  
  // API Version
  API_VERSION: '2.0.0'
}; 