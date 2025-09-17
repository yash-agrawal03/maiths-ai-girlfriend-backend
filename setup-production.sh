#!/bin/bash
# setup-production.sh
# This script sets up the vault.json file for production deployment

echo "🚀 Setting up production environment..."

# Create the .smyth/.sre directory if it doesn't exist
echo "📁 Creating .smyth/.sre directory..."
mkdir -p .smyth/.sre

# Create vault.json with environment variables
cat > .smyth/.sre/vault.json << EOF
{
  "default": {
    "echo": "",
    "openai": "${OPENAI_API_KEY:-}",
    "anthropic": "${ANTHROPIC_API_KEY:-}",
    "googleai": "${GOOGLE_AI_API_KEY:-}",
    "groq": "${GROQ_API_KEY:-}",
    "togetherai": "${TOGETHER_AI_API_KEY:-}",
    "xai": "${XAI_API_KEY:-}",
    "deepseek": "${DEEPSEEK_API_KEY:-}",
    "tavily": "${TAVILY_API_KEY:-}",
    "scrapfly": "${SCRAPFLY_API_KEY:-}"
  }
}
EOF

echo "✅ Production vault.json created successfully!"
