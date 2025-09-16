# Contributing to Maiths AI Girlfriend Backend 🤖

Thank you for your interest in contributing to the Maiths AI Girlfriend Backend! We welcome contributions that help make AI companionship more accessible and reliable.

## 🤝 Ways to Contribute

- 🐛 **Bug Reports** - Help us identify and fix backend issues
- ✨ **Feature Requests** - Suggest new API endpoints or improvements
- 💻 **Code Contributions** - Submit bug fixes or new features
- 📖 **Documentation** - Improve our API docs and guides
- 🔧 **Performance** - Help optimize response times and resource usage
- 🔒 **Security** - Identify and fix security vulnerabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git
- Access to Smythos SDK
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/maiths-ai-girlfriend-backend.git
   cd maiths-ai-girlfriend-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start in development mode**
   ```bash
   npm run dev
   ```

5. **Verify everything works**
   - API should be running on http://localhost:5000
   - Check health endpoint: curl http://localhost:5000/health

## 📝 Development Guidelines

### Code Style

- **JavaScript/Node.js** - Follow modern ES6+ practices
- **Error Handling** - Always handle errors gracefully
- **Logging** - Use appropriate log levels
- **Security** - Validate all inputs, sanitize outputs

### API Design Principles

1. **RESTful Design** - Follow REST conventions
2. **Consistent Responses** - Use standard response formats
3. **Error Messages** - Provide helpful, user-friendly errors
4. **Documentation** - Document all endpoints thoroughly
5. **Versioning** - Consider API versioning for breaking changes

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 API Development

### Adding New Endpoints

1. **Plan the endpoint** - Define purpose, method, and path
2. **Implement handler** - Add route handler in appropriate file
3. **Add validation** - Validate inputs and sanitize outputs
4. **Error handling** - Handle all possible error cases
5. **Document** - Update API documentation
6. **Test** - Add comprehensive tests

### Example Endpoint

```javascript
// POST /api/v1/chat/history
app.post('/api/v1/chat/history', async (req, res) => {
  try {
    const { userId, limit = 50 } = req.body;
    
    // Validate input
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required',
        code: 'MISSING_USER_ID'
      });
    }
    
    // Process request
    const history = await getChatHistory(userId, limit);
    
    // Return response
    res.json({
      success: true,
      data: history,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({
      error: 'Failed to retrieve chat history',
      code: 'INTERNAL_ERROR'
    });
  }
});
```

### Response Format Standards

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Testing Guidelines

### Unit Tests

```javascript
const request = require('supertest');
const app = require('../web-server');

describe('POST /chat', () => {
  it('should return a response from Maiths', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        message: 'Hello Maiths!',
        timestamp: new Date().toISOString()
      })
      .expect(200);
      
    expect(response.body).toHaveProperty('response');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body.success).toBe(true);
  });

  it('should handle empty messages', async () => {
    const response = await request(app)
      .post('/chat')
      .send({
        message: '',
        timestamp: new Date().toISOString()
      })
      .expect(400);
      
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('EMPTY_MESSAGE');
  });
});
```

### Integration Tests

Test the full flow including Smythos agent integration:

```javascript
describe('Integration: Chat Flow', () => {
  beforeAll(async () => {
    // Initialize test environment
    await initializeTestAgent();
  });

  it('should handle complete chat conversation', async () => {
    // Test multiple message exchange
    const messages = ['Hello', 'How are you?', 'Tell me a joke'];
    
    for (const message of messages) {
      const response = await request(app)
        .post('/chat')
        .send({ message, timestamp: new Date().toISOString() })
        .expect(200);
        
      expect(response.body.success).toBe(true);
      expect(response.body.data.response).toBeTruthy();
    }
  });
});
```

## 🔒 Security Guidelines

### Input Validation

```javascript
const { body, validationResult } = require('express-validator');

app.post('/chat', [
  body('message')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be 1-1000 characters')
    .trim()
    .escape(),
  body('timestamp')
    .isISO8601()
    .withMessage('Invalid timestamp format')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  // Process valid request...
});
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

app.use('/chat', chatLimiter);
```

## 📊 Performance Guidelines

### Response Times

- Chat endpoints: < 2 seconds
- Health checks: < 100ms
- Static content: < 50ms

### Memory Usage

- Monitor memory leaks
- Use streaming for large responses
- Implement proper cleanup

### Monitoring

```javascript
const responseTime = require('response-time');

app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} - ${time}ms`);
  
  // Log slow requests
  if (time > 2000) {
    console.warn(`Slow request: ${req.method} ${req.url} took ${time}ms`);
  }
}));
```

## 🚀 Deployment Guidelines

### Environment Preparation

```bash
# Production environment variables
NODE_ENV=production
PORT=5000
LOG_LEVEL=info

# Security
CORS_ORIGINS=https://your-frontend-domain.com
API_KEY_REQUIRED=true
```

### Health Checks

Implement comprehensive health checks:

```javascript
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    agent: await checkAgentHealth()
  };
  
  res.json(health);
});
```

## 📝 Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(api): add chat history endpoint
fix(cors): resolve production CORS configuration
docs(readme): update API documentation
perf(chat): optimize response processing
security(auth): add rate limiting to endpoints
```

## 🤝 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/chat-history-api
   ```

2. **Make Changes**
   - Implement feature
   - Add tests
   - Update documentation

3. **Test Everything**
   ```bash
   npm test
   npm run lint
   npm run security-audit
   ```

4. **Submit PR**
   - Clear title and description
   - Link related issues
   - Include API documentation updates

## 🆘 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and ideas
- **Discord/Slack** - For real-time chat (if available)

## 💖 Thank You!

Every contribution helps make Maiths more reliable and accessible to AI girlfriend enthusiasts worldwide!

**Happy coding! 🚀💕**
