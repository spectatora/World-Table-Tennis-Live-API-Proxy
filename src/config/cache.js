const NodeCache = require('node-cache');
const { CACHE_TTL } = require('./constants');

// Initialize cache with shorter TTL for live data
const cache = new NodeCache({ stdTTL: CACHE_TTL });

module.exports = cache; 