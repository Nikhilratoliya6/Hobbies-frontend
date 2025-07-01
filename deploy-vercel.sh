#!/bin/bash

# Pre-deployment script for Vercel
echo "🔧 Preparing JoynUp Frontend for Vercel deployment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Test build
echo "🧪 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build test successful!"
    echo "📋 Ready for Vercel deployment!"
    echo ""
    echo "🔗 Next steps:"
    echo "1. Push to GitHub: git add . && git commit -m 'Vercel ready' && git push"
    echo "2. Go to https://vercel.com"
    echo "3. Import your GitHub repository"
    echo "4. Set root directory to 'Hobbies-frontend'"
    echo "5. Configure environment variables:"
    echo "   - REACT_APP_API_BASE_URL=https://your-railway-app.railway.app"
    echo "   - REACT_APP_FRONTEND_URL=https://your-vercel-app.vercel.app"
    echo "   - REACT_APP_ENVIRONMENT=production"
    echo "   - GENERATE_SOURCEMAP=false"
else
    echo "❌ Build test failed! Please fix errors before deploying."
    exit 1
fi
