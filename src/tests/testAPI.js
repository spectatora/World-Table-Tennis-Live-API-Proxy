const WorldTableTennisLiveAPI = require('../services/WorldTableTennisAPI');

// Test script for WTT Live API
async function testLiveAPI() {
  console.log('🧪 Testing WTT Live API...\n');
  
  const api = new WorldTableTennisLiveAPI();
  
  try {
    // Test 1: Basic fetch
    console.log('1. Testing basic fetch...');
    const basic = await api.fetchPlayersFromAPI(1, 5, {});
    console.log(`✅ Basic fetch: ${basic?.players?.length || 0} players`);
    if (basic?.players?.[0]) {
      console.log('Sample player:', JSON.stringify(basic.players[0], null, 2));
    }
    
    // Test 2: Search functionality
    console.log('\n2. Testing search...');
    const search = await api.searchPlayers({ 
      searchText: 'zhang', 
      limit: 3 
    });
    console.log(`✅ Search results: ${search?.players?.length || 0} players`);
    
    // Test 3: Gender filter
    console.log('\n3. Testing gender filter...');
    const genderFilter = await api.searchPlayers({ 
      gender: 'F', 
      limit: 3 
    });
    console.log(`✅ Female players: ${genderFilter?.players?.length || 0} players`);
    
    // Test 4: Get nationalities
    console.log('\n4. Testing nationalities...');
    const nationalities = await api.getAvailableNationalities();
    console.log(`✅ Nationalities found: ${nationalities.length}`);
    console.log('Sample:', nationalities.slice(0, 10));
    
    // Test 5: Statistics
    console.log('\n5. Testing statistics...');
    const stats = await api.getPlayerStats();
    console.log('✅ Stats:', JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

module.exports = { testLiveAPI };

// Run test if this file is executed directly
if (require.main === module) {
  testLiveAPI();
} 