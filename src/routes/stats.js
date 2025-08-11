const express = require('express');
const router = express.Router();
const WorldTableTennisLiveAPI = require('../services/WorldTableTennisAPI');
const { formatErrorResponse } = require('../utils/helpers');

const wttAPI = new WorldTableTennisLiveAPI();

// Get player statistics
router.get('/', async (req, res) => {
  try {
    const stats = await wttAPI.getPlayerStats();
    
    res.json({
      status: 'success',
      data: stats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json(formatErrorResponse(error));
  }
});

module.exports = router; 