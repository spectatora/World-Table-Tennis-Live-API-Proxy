const { startServer } = require('./app');
const { testLiveAPI } = require('./tests/testAPI');

// Start the server
startServer();

// Run test if this file is executed directly
if (require.main === module) {
  // Run tests after a short delay to ensure server is running
  setTimeout(() => {
    console.log('\n🧪 Running API tests...');
    testLiveAPI();
  }, 2000);
} 