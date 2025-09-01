#!/bin/bash
# PWA Deployment Verification Script

echo "🔍 ETF & NPF Calculator PWA - Deployment Verification"
echo "=================================================="

# Check if all required files exist
echo "Checking required files..."

files=(
    "index.html"
    "app.js" 
    "style.css"
    "Logo.jpg"
    "manifest.json"
    "sw.js"
    "browserconfig.xml"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING!"
        exit 1
    fi
done

# Check icons directory
echo "Checking icons directory..."
if [ -d "icons" ]; then
    echo "✅ icons/ directory"
    icon_count=$(ls icons/ | wc -l)
    echo "   📱 Found $icon_count icon files"
else
    echo "❌ icons/ directory - MISSING!"
    exit 1
fi

echo ""
echo "✅ All PWA files present and ready for deployment!"
echo ""
echo "🚀 Deployment options:"
echo "1. GitHub Pages: Push to GitHub and enable Pages"
echo "2. Netlify: Drag and drop all files"
echo "3. Vercel: Import from GitHub or upload"
echo "4. Web hosting: Upload via FTP/cPanel"
echo ""
echo "⚠️  Remember: PWA requires HTTPS to work fully!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
