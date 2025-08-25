#!/bin/bash
# Setup script for simple BrowserBox automation

echo "🔧 Setting up Simple BrowserBox Automation..."

# Install Python dependencies
pip install playwright

# Install browser binaries
playwright install chromium

echo "✅ Setup complete!"
echo ""
echo "Usage:"
echo "  python3 e2e/workflow/simple_automation.py temp/demo-config.zip"
echo ""
echo "Make sure BrowserBox is running on http://localhost:5173 first:"
echo "  npm run dev"