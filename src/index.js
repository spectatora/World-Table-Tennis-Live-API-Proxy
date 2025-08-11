const { startServer } = require('./app');
const { testLiveAPI } = require('./tests/testAPI');

// Start the server (only in development)
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  startServer();
}

// Run test if this file is executed directly and not in production
if (require.main === module && process.env.NODE_ENV !== 'production') {
  // Run tests after a short delay to ensure server is running
  setTimeout(() => {
    console.log('\n🧪 Running API tests...');
    testLiveAPI();
  }, 2000);
} 