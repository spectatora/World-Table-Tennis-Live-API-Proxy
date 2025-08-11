const express = require('express');
const router = express.Router();
const { API_VERSION } = require('../config/constants');

// Enhanced API documentation
router.get('/', (req, res) => {
  res.json({
    name: 'World Table Tennis Live API Proxy',
    version: API_VERSION,
    description: 'Enhanced proxy for WTT live player data with advanced filtering',
    endpoints: {
      'GET /api/v1/players': 'Search players with filters and pagination',
      'POST /api/v1/players/filter': 'Advanced filtering with JSON payload',
      'POST /api/v1/players/batch-search': 'Multiple searches in one request',
      'GET /api/v1/nationalities': 'Get available nationalities',
      'GET /api/v1/stats': 'Get player statistics',
      'GET /health': 'Health check with WTT API status'
    },
    query_parameters: {
      page: 'Page number (default: 1)',
      limit: 'Results per page (default: 50, max: 100)',
      search: 'Search text in player names',
      gender: 'Filter by gender (M/F)',
      nationality: 'Filter by nationality code',
      country: 'Alias for nationality',
      sponsors: 'Comma-separated sponsor IDs',
      isFavourite: 'Filter favorites (true/false)'
    },
    examples: [
      'GET /api/v1/players?search=zhang&limit=10',
      'GET /api/v1/players?gender=F&nationality=CHN',
      'GET /api/v1/players?page=2&limit=25',
      'POST /api/v1/players/filter with JSON body',
      'GET /api/v1/nationalities',
      'GET /api/v1/stats'
    ],
    json_filter_example: {
      page: 1,
      limit: 50,
      searchText: "zhang",
      gender: "M",
      nationality: ["CHN", "JPN"],
      sponsors: [],
      players: [],
      isFavourite: false
    }
  });
});

module.exports = router; 