const express = require('express');
const corsMiddleware = require('./middleware/cors');
const playersRoutes = require('./routes/players');
const nationalitiesRoutes = require('./routes/nationalities');
const statsRoutes = require('./routes/stats');
const healthRoutes = require('./routes/health');
const docsRoutes = require('./routes/docs');
const { PORT } = require('./config/constants');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// API Routes
app.use('/api/v1/players', playersRoutes);
app.use('/api/v1/nationalities', nationalitiesRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/health', healthRoutes);
app.use('/', docsRoutes);

// Start server (only if not in serverless environment)
const startServer = () => {
  if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
      console.log(`🏓 WTT Live API Proxy running on port ${PORT}`);
      console.log(`📋 Documentation: http://localhost:${PORT}`);
      console.log(`🔍 Test: http://localhost:${PORT}/api/v1/players?limit=5`);
      console.log(`🌐 Advanced: http://localhost:${PORT}/api/v1/players?search=zhang&gender=M`);
    });
  }
};

module.exports = { app, startServer }; 