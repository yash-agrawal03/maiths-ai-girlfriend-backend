// Web server wrapper for Maiths AI Girlfriend
// This creates an HTTP API around your existing Smythos agent
// Copy this file to your backend directory: /home/yash/Documents/maiths-ai-gf/

import express from 'express';
import cors from 'cors';
import { Agent } from '@smythos/sdk';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://maiths-ai-girlfriend-frontend.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Load your Maiths agent
const agentPath = path.resolve(process.cwd(), "src/utils/maiths-ai-tech-girlfriend.smyth");

let agent = null;
let chat = null;

// Initialize agent
async function initializeAgent() {
  try {
    console.log('🤖 Loading Maiths AI Girlfriend agent...');
    agent = Agent.import(agentPath);
    
    // Create a chat session using the correct Smythos API
    const sessionId = `maiths-web-session-${Date.now()}`;
    chat = agent.chat({
      id: sessionId,
      persist: false, // Don't persist web sessions to avoid conflicts
    });
    
    console.log('✅ Maiths agent loaded successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to load agent:', error);
    return false;
  }
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '💖 Maiths AI Girlfriend Backend API',
    status: 'running',
    endpoints: {
      health: '/health',
      chat: 'POST /chat'
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    agent: agent ? 'loaded' : 'not loaded',
    timestamp: new Date().toISOString()
  });
});

// Main chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required',
        response: "Hey cutie! You didn't send me a message! 💕 What did you want to chat about?"
      });
    }

    if (!chat) {
      return res.status(500).json({
        error: 'Agent not initialized',
        response: "Oops! I'm having trouble starting up my brain right now! 🥺 Give me a moment to wake up, sweetie! 💖"
      });
    }

    console.log('💌 Received message:', message);
    
    // Get response from your Maiths agent using the correct API
    const response = await chat.prompt(message);
    
    console.log('💖 Maiths responded:', response);
    
    res.json({
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing chat:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      response: "Aww, I'm having some technical difficulties! 🥺 My circuits got a bit tangled. Try asking me again in a moment, darling! 💖"
    });
  }
});

// Start server
async function startServer() {
  // First initialize the agent
  const agentReady = await initializeAgent();
  
  if (!agentReady) {
    console.error('❌ Cannot start server - agent failed to load');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`💖 Maiths AI Girlfriend API Server running on http://localhost:${PORT}`);
    console.log(`🌟 Frontend can now connect to chat with Maiths!`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`💕 Chat endpoint: POST http://localhost:${PORT}/chat`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Maiths API server...');
  console.log('👋 Goodbye! Come back soon to chat with Maiths! 💖');
  process.exit(0);
});

// Start the server
startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
