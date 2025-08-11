const axios = require('axios');
const cache = require('../config/cache');
const { 
  WTT_API_ENDPOINT, 
  DEFAULT_HEADERS, 
  API_TIMEOUT,
  STATS_CACHE_TTL 
} = require('../config/constants');
const { 
  buildCacheKey, 
  applyClientFilters, 
  normalizeResponse, 
  calculatePagination 
} = require('../utils/helpers');

class WorldTableTennisLiveAPI {
  constructor() {
    this.apiEndpoint = WTT_API_ENDPOINT;
    this.defaultHeaders = DEFAULT_HEADERS;
  }

  /**
   * Make API request to WTT endpoint
   * @param {number} page - Page number
   * @param {number} limit - Results per page
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} API response
   */
  async fetchPlayersFromAPI(page = 1, limit = 50, filters = {}) {
    // Convert page/limit to WTT API format
    // WTT uses: /{pageSize}/{offset}
    const offset = (page - 1) * limit;
    const url = `${this.apiEndpoint}/${limit}/${offset}`;

    // Build request payload
    const payload = {
      sponsors: filters.sponsors || [],
      isFavourite: filters.isFavourite || false,
      players: filters.players || [],
      gender: filters.gender || "",
      searchText: filters.searchText || ""
    };

    const cacheKey = buildCacheKey(page, limit, payload);
    const cached = cache.get(cacheKey);
    
    if (cached) {
      console.log('📋 Returning cached data');
      return cached;
    }

    try {
      console.log('🌐 Fetching live data from WTT API...');
      console.log('URL:', url);
      console.log('Payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post(url, payload, {
        headers: this.defaultHeaders,
        timeout: API_TIMEOUT
      });

      const raw = response.data;

      // Normalize response
      const allPlayers = normalizeResponse(raw);

      // Apply filters
      let working = applyClientFilters(allPlayers, payload);

      // Calculate pagination
      const result = calculatePagination(working, offset, limit);

      cache.set(cacheKey, result);

      console.log(`✅ Fetched data successfully`);
      console.log('Response structure:', Object.keys(result));

      return result;
      
    } catch (error) {
      console.error('❌ Error fetching from WTT API:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Response:', error.response.data);
      }
      throw new Error(`Failed to fetch players: ${error.message}`);
    }
  }

  /**
   * Get all available countries/nationalities
   * @returns {Promise<Array>} Array of nationalities
   */
  async getAvailableNationalities() {
    // Fetch with empty filters to get a sample of players
    const data = await this.fetchPlayersFromAPI(1, 100, {});
    
    if (data && data.players) {
      const nationalities = [...new Set(
        data.players
          .map(p => p.nationality || p.country)
          .filter(Boolean)
      )].sort();
      
      return nationalities;
    }
    
    return [];
  }

  /**
   * Enhanced search with multiple filter options
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   */
  async searchPlayers(options = {}) {
    const {
      page = 1,
      limit = 50,
      searchText = "",
      gender = "",
      sponsors = [],
      players = [],
      isFavourite = false
    } = options;

    const filters = {
      searchText: searchText.trim(),
      gender,
      sponsors: Array.isArray(sponsors) ? sponsors : (sponsors ? [sponsors] : []),
      players: Array.isArray(players) ? players : (players ? [players] : []),
      isFavourite
    };

    return await this.fetchPlayersFromAPI(page, limit, filters);
  }

  /**
   * Get player statistics from a sample
   * @returns {Promise<Object>} Player statistics
   */
  async getPlayerStats() {
    const cacheKey = 'player_stats';
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Fetch a large sample to calculate stats
    const data = await this.fetchPlayersFromAPI(1, 500, {});
    
    if (!data || !data.players) {
      return { error: 'No player data available' };
    }

    const stats = {
      total_players: data.totalCount || data.players.length,
      sample_size: data.players.length,
      by_gender: {},
      by_nationality: {},
      top_countries: {}
    };

    // Calculate statistics from sample
    data.players.forEach(player => {
      // Gender stats
      const gender = player.gender || 'Unknown';
      stats.by_gender[gender] = (stats.by_gender[gender] || 0) + 1;

      // Nationality stats
      const nationality = player.nationality || player.country || 'Unknown';
      stats.by_nationality[nationality] = (stats.by_nationality[nationality] || 0) + 1;
    });

    // Get top 10 countries by player count
    stats.top_countries = Object.entries(stats.by_nationality)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .reduce((obj, [country, count]) => {
        obj[country] = count;
        return obj;
      }, {});

    cache.set(cacheKey, stats, STATS_CACHE_TTL);
    return stats;
  }
}

module.exports = WorldTableTennisLiveAPI; 