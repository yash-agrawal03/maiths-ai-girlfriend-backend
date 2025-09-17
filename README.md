# 🤖 Maiths AI Girlfriend - Backend API

A powerful Node.js/Express backend API for Maiths AI Girlfriend, providing HTTP endpoints for the cute chat interface. Built with Smythos SDK integration and modern Node.js practices.

![AI Backend](https://img.shields.io/badge/AI-Backend-purple?style=for-the-badge&logo=node.js)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- 🚀 **Express.js API** - RESTful endpoints for chat functionality
- 🤖 **Smythos Integration** - Seamless AI agent communication
- 🌐 **CORS Support** - Ready for frontend integration
- 💖 **Personality-Rich** - Maintains Maiths' cute personality
- 🔒 **Error Handling** - Robust error management and logging
- ⚡ **Fast Response** - Optimized for quick chat responses
- 🛠️ **Production Ready** - Built for deployment and scaling

## 🎥 Demo

Check out our project in action! Watch the demo video to see Maiths AI Girlfriend in action:

[🎬 **Watch Demo Video** 💖](https://github.com/user-attachments/assets/1c804678-df1d-495e-a8ce-8682b28e26d8)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Smythos SDK access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yash-agrawal03/maiths-ai-girlfriend-backend.git
   cd maiths-ai-girlfriend-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys**
   ```bash
   # Copy the vault template and add your API keys
   cp .smyth/.sre/vault.json.example .smyth/.sre/vault.json
   # Edit vault.json with your actual API keys
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Verify it's working**
   - API will be running on http://localhost:5000
   - Health check: http://localhost:5000/health

## 🔧 API Endpoints

### Chat Endpoint
**POST** `/chat`

Send a message to Maiths and receive her response.

**Request:**
```json
{
  "message": "Hello Maiths! How are you today?",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "response": "Hey sweetie! I'm doing great, thanks for asking! 💖 How has your day been?",
  "timestamp": "2024-01-01T00:00:01.000Z",
  "status": "success"
}
```

### Health Check
**GET** `/health`

Check if the API and AI agent are running properly.

**Response:**
```json
{
  "status": "healthy",
  "agent": "loaded",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": "0:05:23"
}
```

## 🏗️ Project Structure

```
├── src/                    # Source code
│   ├── utils/             # Utility functions
│   │   └── maiths-ai-tech-girlfriend.smyth  # AI agent file
│   └── index.ts           # Main application entry
├── web-server.js          # Express server implementation
├── package.json           # Dependencies and scripts
├── .env.example          # Environment configuration template
├── .gitignore            # Git ignore patterns
└── README.md             # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Smythos Configuration
SMYTHOS_AGENT_PATH=./src/utils/maiths-ai-tech-girlfriend.smyth

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Logging
LOG_LEVEL=info
```

### Package.json Scripts

```json
{
  "scripts": {
    "start": "node web-server.js",
    "dev": "nodemon web-server.js",
    "build": "npm run compile",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

## 🔗 Frontend Integration

This backend is designed to work with the [Maiths AI Girlfriend Frontend](https://github.com/yash-agrawal03/maiths-ai-girlfriend-frontend).

### CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000` (React development server)
- `http://localhost:3001` (Alternative development port)

For production, update the CORS origins in your environment configuration.

### Frontend Setup

1. Clone the frontend repository
2. Set `REACT_APP_API_URL=http://localhost:5000` in frontend `.env`
3. Start both backend and frontend servers
4. Enjoy chatting with Maiths! 💖

## 🚀 Deployment

### Option 1: Node.js Hosting (Heroku, Railway, etc.)

```bash
# Build for production
npm run build

# Set environment variables on your platform
# Deploy using platform-specific methods
```

### Option 2: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Option 3: PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start web-server.js --name "maiths-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

## 🛠️ Development

### Local Development

```bash
# Install dependencies
npm install

# Start in development mode with auto-reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Adding New Features

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔍 Troubleshooting

### Common Issues

**Agent not loading:**
- Check that your `.smyth` file exists in the correct path
- Verify Node.js version compatibility
- Check console logs for specific error messages

**CORS errors:**
- Verify frontend URL is in ALLOWED_ORIGINS
- Check that CORS middleware is properly configured
- Ensure requests include proper headers

**Connection timeouts:**
- Increase timeout values in configuration
- Check network connectivity
- Verify agent initialization is complete

### Debug Mode

Enable debug logging:
```bash
LOG_LEVEL=debug npm start
```

## 📝 API Documentation

Full API documentation is available at `/docs` when running in development mode.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 💖 Acknowledgments

- Built with love for AI companionship
- Powered by Smythos SDK
- Thanks to the Node.js and Express.js communities
- Special thanks to all contributors

## 🔮 Roadmap

- [ ] WebSocket support for real-time chat
- [ ] Message history persistence
- [ ] Multi-user session management
- [ ] Rate limiting and security enhancements
- [ ] Metrics and monitoring integration
- [ ] Docker containerization
- [ ] Kubernetes deployment configs

---

**Made with 💖 for AI girlfriend enthusiasts everywhere!**

For questions or support, please open an issue on GitHub.
