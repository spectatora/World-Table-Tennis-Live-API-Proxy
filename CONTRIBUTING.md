# Contributing to World Table Tennis Live API Proxy

Thank you for your interest in our project! Your contributions are welcome.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or newer)
- npm or yarn
- Git

### Development Installation

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/table-tennis-data.git
   cd table-tennis-data
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📝 Contribution Process

### 1. Creating an Issue

Before starting work, create an issue for:
- Bug reports
- Feature requests
- Improvements
- Documentation updates

### 2. Creating a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

- Follow the existing code style
- Add tests for new functionality
- Update documentation if necessary
- Ensure all tests pass

### 4. Commit Messages

Use clear and descriptive commit messages:

```bash
git commit -m "feat: add new player search filter"
git commit -m "fix: resolve pagination issue in players endpoint"
git commit -m "docs: update API documentation"
```

### 5. Push and Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with:
- Clear description of changes
- Link to the relevant issue
- Screenshots (if applicable)

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Tests with coverage
npm run test:coverage

# Tests in watch mode
npm run test:watch
```

### Writing New Tests

- Tests are located in `src/tests/`
- Use descriptive names for tests
- Cover edge cases and error scenarios

## 📋 Code Style

### JavaScript/Node.js

- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Use JSDoc for function documentation
- Maximum line length: 80 characters

### Example function with JSDoc:

```javascript
/**
 * Fetch players from WTT API with filters
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of results per page
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} API response with players data
 */
async function fetchPlayers(page, limit, filters) {
  // implementation
}
```

## 🏗️ Architecture

### Project Structure

```
src/
├── config/           # Configuration
├── services/         # Business logic
├── routes/           # API endpoints
├── middleware/       # Express middleware
├── utils/            # Utility functions
├── tests/            # Tests
├── app.js            # Express app
└── index.js          # Entry point
```

### Principles

- **Separation of Concerns** - Each function has a clear responsibility
- **DRY (Don't Repeat Yourself)** - Avoid code duplication
- **KISS (Keep It Simple, Stupid)** - Simple solutions are better
- **Error Handling** - Always handle errors properly

## 🐛 Bug Reports

When reporting a bug, include:

1. **Problem description**
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Environment** (OS, Node.js version, browser)
6. **Screenshots** (if applicable)

## ✨ Feature Requests

For feature requests:

1. **Explain why the functionality is needed**
2. **Describe how it would work**
3. **Propose API design** (if applicable)
4. **Discuss alternatives**

## 📚 Documentation

### Updating Documentation

- README.md - Main documentation
- API documentation in `src/routes/docs.js`
- JSDoc comments in code
- CONTRIBUTING.md - This file

### Writing Principles

- Clear and concise language
- Usage examples
- Screenshots for complex concepts
- Up-to-date information

## 🤝 Code Review

### For Pull Request Authors

- Respond to feedback
- Make necessary changes
- Test changes locally
- Update documentation

### For Reviewers

- Be constructive
- Discuss architectural decisions
- Check security implications
- Ensure tests pass

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the ISC License.

## 🆘 Need Help?

If you have questions or need help:

1. Check the documentation
2. Search existing issues
3. Create a new issue
4. Contact maintainers

---

Thank you for your contribution! 🏓 