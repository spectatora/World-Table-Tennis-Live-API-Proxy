const express = require('express');
const router = express.Router();
const WorldTableTennisLiveAPI = require('../services/WorldTableTennisAPI');

const wttAPI = new WorldTableTennisLiveAPI();

// Health check with WTT API status
router.get('/', async (req, res) => {
  try {
    // Test WTT API connectivity
    await wttAPI.fetchPlayersFromAPI(1, 1, {});
    
    res.json({
      status: 'ok',
      wtt_api_status: 'connected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      wtt_api_status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
});

module.exports = router; 