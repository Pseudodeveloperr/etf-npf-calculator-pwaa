@echo off
echo 🔍 ETF ^& NPF Calculator PWA - Deployment Verification
echo ==================================================

echo Checking required files...

if exist index.html (echo ✅ index.html) else (echo ❌ index.html - MISSING! & exit /b 1)
if exist app.js (echo ✅ app.js) else (echo ❌ app.js - MISSING! & exit /b 1)
if exist style.css (echo ✅ style.css) else (echo ❌ style.css - MISSING! & exit /b 1)
if exist Logo.jpg (echo ✅ Logo.jpg) else (echo ❌ Logo.jpg - MISSING! & exit /b 1)
if exist manifest.json (echo ✅ manifest.json) else (echo ❌ manifest.json - MISSING! & exit /b 1)
if exist sw.js (echo ✅ sw.js) else (echo ❌ sw.js - MISSING! & exit /b 1)
if exist browserconfig.xml (echo ✅ browserconfig.xml) else (echo ❌ browserconfig.xml - MISSING! & exit /b 1)

if exist icons (echo ✅ icons/ directory) else (echo ❌ icons/ directory - MISSING! & exit /b 1)

echo.
echo ✅ All PWA files present and ready for deployment!
echo.
echo 🚀 Deployment options:
echo 1. GitHub Pages: Push to GitHub and enable Pages
echo 2. Netlify: Drag and drop all files
echo 3. Vercel: Import from GitHub or upload
echo 4. Web hosting: Upload via FTP/cPanel
echo.
echo ⚠️  Remember: PWA requires HTTPS to work fully!
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions
pause
