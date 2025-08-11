// Helper utility functions

/**
 * Build cache key for request parameters
 * @param {number} page - Page number
 * @param {number} limit - Results per page
 * @param {Object} filters - Filter parameters
 * @returns {string} Cache key
 */
function buildCacheKey(page, limit, filters) {
  return `players_${page}_${limit}_${JSON.stringify(filters)}`;
}

/**
 * Apply client-side filters to player list
 * @param {Array} list - List of players
 * @param {Object} params - Filter parameters
 * @returns {Array} Filtered player list
 */
function applyClientFilters(list, params) {
  const text = (params.searchText || '').toLowerCase();
  const ids = Array.isArray(params.players) ? params.players.map(String) : [];
  const nats = Array.isArray(params.nationality) ? params.nationality : [];

  return list.filter(player => {
    if (params.gender && player.gender !== params.gender) return false;
    if (nats.length && !nats.includes(player.nationality)) return false;
    if (ids.length && !ids.includes(String(player.ittfid))) return false;
    if (typeof params.isFavourite === 'boolean' && player.isFavourite !== params.isFavourite) return false;
    if (text && !(player.fullName || '').toLowerCase().includes(text)) return false;
    return true;
  });
}

/**
 * Normalize API response data
 * @param {*} raw - Raw API response
 * @returns {Array} Normalized player array
 */
function normalizeResponse(raw) {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.players)) return raw.players;
  return [];
}

/**
 * Calculate pagination info
 * @param {Array} working - Working data array
 * @param {number} offset - Offset for pagination
 * @param {number} limit - Results per page
 * @returns {Object} Pagination result
 */
function calculatePagination(working, offset, limit) {
  const pageStart = offset;
  const pageEnd = offset + limit;
  const pageSlice = working.slice(pageStart, pageEnd);

  return {
    players: pageSlice,
    totalCount: working.length,
    hasMore: pageEnd < working.length
  };
}

/**
 * Format API response consistently
 * @param {Object} data - API data
 * @param {number} page - Current page
 * @param {number} limit - Results per page
 * @param {Object} options - Applied filters
 * @returns {Object} Formatted response
 */
function formatResponse(data, page, limit, options) {
  return {
    status: 'success',
    data: {
      players: data.players || [],
      pagination: {
        current_page: parseInt(page),
        per_page: parseInt(limit),
        total: data.totalCount || 0,
        total_pages: Math.ceil((data.totalCount || 0) / parseInt(limit)),
        has_next: data.hasMore || false,
        has_prev: parseInt(page) > 1
      }
    },
    filters_applied: options,
    cached_at: new Date().toISOString()
  };
}

/**
 * Format error response
 * @param {Error} error - Error object
 * @returns {Object} Formatted error response
 */
function formatErrorResponse(error) {
  return {
    status: 'error',
    message: error.message,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  buildCacheKey,
  applyClientFilters,
  normalizeResponse,
  calculatePagination,
  formatResponse,
  formatErrorResponse
}; 