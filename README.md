# World Table Tennis Live API Proxy

Enhanced proxy API for World Table Tennis live player data with advanced filtering capabilities.

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
│   ├── constants.js  # API constants and settings
│   └── cache.js      # Cache configuration
├── services/         # Business logic
│   └── WorldTableTennisAPI.js  # Main API service
├── routes/           # API endpoints
│   ├── players.js    # Player-related endpoints
│   ├── nationalities.js # Nationality endpoints
│   ├── stats.js      # Statistics endpoints
│   ├── health.js     # Health check
│   └── docs.js       # API documentation
├── middleware/       # Express middleware
│   └── cors.js       # CORS configuration
├── utils/            # Utility functions
│   └── helpers.js    # Helper functions
├── tests/            # Test files
│   └── testAPI.js    # API tests
├── app.js            # Express app configuration
└── index.js          # Server entry point
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start

# Run tests
npm test
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## 📚 API Endpoints

### Players API

- **GET** `/api/v1/players` - Search players with filters and pagination
- **POST** `/api/v1/players/filter` - Advanced filtering with JSON payload
- **POST** `/api/v1/players/batch-search` - Multiple searches in one request

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Results per page (default: 50, max: 100)
- `search` - Search text in player names
- `gender` - Filter by gender (M/F)
- `nationality` - Filter by nationality code
- `country` - Alias for nationality
- `sponsors` - Comma-separated sponsor IDs
- `isFavourite` - Filter favorites (true/false)

### Other Endpoints

- **GET** `/api/v1/nationalities` - Get available nationalities
- **GET** `/api/v1/stats` - Get player statistics
- **GET** `/health` - Health check with WTT API status
- **GET** `/` - API documentation

## 🔧 Configuration

Configuration is centralized in `src/config/constants.js`:

- Server port
- Cache TTL settings
- API endpoints
- Request headers
- API limits and timeouts

## 🧪 Testing

The project includes a comprehensive test suite:

```bash
npm test
```

Tests cover:
- Basic API functionality
- Search capabilities
- Filtering
- Statistics generation
- Error handling

## 💾 Caching

The API uses NodeCache for performance optimization:
- Player data: 10 minutes TTL
- Statistics: 30 minutes TTL
- Automatic cache invalidation

## 🌐 CORS

CORS is enabled for all origins to allow cross-origin requests.

## 📝 Examples

### Basic Player Search
```bash
curl "http://localhost:3000/api/v1/players?search=zhang&limit=10"
```

### Gender Filter
```bash
curl "http://localhost:3000/api/v1/players?gender=F&nationality=CHN"
```

### Advanced Filtering
```bash
curl -X POST "http://localhost:3000/api/v1/players/filter" \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 50,
    "searchText": "zhang",
    "gender": "M",
    "nationality": ["CHN", "JPN"]
  }'
```

## 🔍 Health Check

Monitor API health:
```bash
curl "http://localhost:3000/health"
```

## 📊 Features

- **Live Data**: Real-time data from World Table Tennis API
- **Advanced Filtering**: Multiple filter options with pagination
- **Caching**: Performance optimization with intelligent caching
- **Error Handling**: Comprehensive error handling and logging
- **Documentation**: Built-in API documentation
- **Testing**: Automated test suite
- **Modular Architecture**: Clean, maintainable code structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

ISC License 