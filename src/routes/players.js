const express = require('express');
const router = express.Router();
const WorldTableTennisLiveAPI = require('../services/WorldTableTennisAPI');
const { formatResponse, formatErrorResponse } = require('../utils/helpers');
const { MAX_LIMIT, DEFAULT_LIMIT, DEFAULT_PAGE } = require('../config/constants');

const wttAPI = new WorldTableTennisLiveAPI();

// Main players endpoint with advanced filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
      search,
      searchText,
      gender,
      nationality,
      country,
      sponsors,
      players,
      isFavourite
    } = req.query;

    // Convert query params to API format
    const options = {
      page: parseInt(page),
      limit: Math.min(parseInt(limit), MAX_LIMIT), // Cap at MAX_LIMIT
      searchText: search || searchText || "",
      gender: gender || "",
      nationality: nationality || country || [],
      sponsors: sponsors ? sponsors.split(',') : [],
      players: players ? players.split(',') : [],
      isFavourite: isFavourite === 'true'
    };

    const data = await wttAPI.searchPlayers(options);

    // Format response in a consistent way
    const response = formatResponse(data, page, limit, options);
    res.json(response);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json(formatErrorResponse(error));
  }
});

// POST endpoint for complex filtering (mirrors WTT API structure)
router.post('/filter', async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, ...filters } = req.body;
    
    const data = await wttAPI.fetchPlayersFromAPI(page, limit, filters);
    
    res.json({
      status: 'success',
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json(formatErrorResponse(error));
  }
});

// Batch search endpoint for multiple queries
router.post('/batch-search', async (req, res) => {
  try {
    const { searches } = req.body;
    
    if (!Array.isArray(searches)) {
      return res.status(400).json({
        status: 'error',
        message: 'Expected array of search queries'
      });
    }

    const results = await Promise.all(
      searches.map(async (searchOptions) => {
        try {
          return await wttAPI.searchPlayers(searchOptions);
        } catch (error) {
          return { error: error.message };
        }
      })
    );

    res.json({
      status: 'success',
      data: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json(formatErrorResponse(error));
  }
});

module.exports = router; 