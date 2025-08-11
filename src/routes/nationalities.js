const express = require('express');
const router = express.Router();
const WorldTableTennisLiveAPI = require('../services/WorldTableTennisAPI');
const { formatErrorResponse } = require('../utils/helpers');

const wttAPI = new WorldTableTennisLiveAPI();

// Get available nationalities/countries
router.get('/', async (req, res) => {
  try {
    const nationalities = await wttAPI.getAvailableNationalities();
    
    res.json({
      status: 'success',
      data: nationalities,
      total: nationalities.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json(formatErrorResponse(error));
  }
});

module.exports = router; 