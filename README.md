# ETF & NPF Calculator PWA

## Overview
This is the Progressive Web App (PWA) version of the ETF & NPF Calculator. The original functionality remains completely unchanged - only PWA features have been added for enhanced user experience.

## PWA Features Added

### ✅ Web App Manifest (manifest.json)
- App name and description
- Icons for all device sizes
- Standalone display mode
- Theme colors matching the app design
- Offline capabilities

### ✅ Service Worker (sw.js)
- Offline functionality
- Caching of all app resources
- Background sync support (for future enhancements)
- Push notification support (for future enhancements)

### ✅ PWA Icons
Complete icon set in the `icons/` directory:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### ✅ PWA Meta Tags
- Theme color configuration
- Mobile app capabilities
- Apple-specific meta tags
- Microsoft tile configuration

## File Structure
```
/
├── index.html          # Updated with PWA features
├── app.js              # Original JavaScript (unchanged)
├── style.css           # Original styles (unchanged)
├── Logo.jpg            # Original logo
├── manifest.json       # Web App Manifest
├── sw.js              # Service Worker
├── browserconfig.xml   # Microsoft tile configuration
├── icons/             # PWA icon directory
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md          # This file
```

## Changes Made to Original Files

### index.html
**Added (no original content changed):**
- PWA manifest link
- PWA meta tags for mobile compatibility
- Apple-specific PWA meta tags
- Service worker registration script
- PWA install prompt handling
- Fixed logo path to use relative path

### app.js
**No changes made** - original functionality preserved

### style.css
**No changes made** - original styling preserved

## Installation & Deployment

### Local Development
1. Place all files in a web server directory
2. Serve over HTTPS (required for PWA features)
3. Access the app through a browser

### GitHub Pages Deployment
1. Create a new GitHub repository
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Access via: `https://username.github.io/repository-name`

### Other Web Hosting
1. Upload all files to your web host
2. Ensure HTTPS is enabled (required for PWA)
3. Configure web server to serve the app

## PWA Requirements Met

### ✅ HTTPS
- Required for service worker registration
- Must be served over secure connection

### ✅ Web App Manifest
- Complete manifest with all required fields
- Multiple icon sizes provided
- Proper theme colors configured

### ✅ Service Worker
- Caches all app resources
- Provides offline functionality
- Handles network failures gracefully

### ✅ Responsive Design
- Original app was already responsive
- Works on all device sizes

### ✅ Fast Loading
- Service worker caches resources
- Instant loading after first visit

## Browser Support
- Chrome (Desktop & Mobile)
- Edge (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Samsung Internet
- Other modern browsers

## User Benefits
1. **Install to Home Screen**: Users can install the app on their device
2. **Offline Access**: App works without internet connection
3. **Fast Loading**: Cached resources load instantly
4. **Native App Feel**: Fullscreen experience without browser UI
5. **Automatic Updates**: Service worker handles app updates

## Developer Notes
- All original calculations and formulas remain unchanged
- No breaking changes to existing functionality
- Progressive enhancement - works as regular web app if PWA features fail
- Service worker includes comprehensive error handling

## Testing PWA Features
1. Open in Chrome DevTools
2. Go to Application tab
3. Check Manifest section
4. Check Service Workers section
5. Test offline functionality
6. Use Lighthouse audit for PWA score

## Future Enhancements Possible
- Push notifications for calculation reminders
- Background sync for data persistence
- Advanced caching strategies
- Offline data synchronization

---
**No formulas or calculations were modified in this PWA conversion.**
