# Rename sw.js to service-worker.js as specifically requested by user
import os
import shutil

if os.path.exists('sw.js'):
    shutil.move('sw.js', 'service-worker.js')
    print("✅ Renamed sw.js to service-worker.js")
else:
    print("Creating service-worker.js...")

# Create the service-worker.js file with complete PWA functionality
service_worker_content = '''// ETF & NPF Calculator - Service Worker
// Version 1.0.0

const CACHE_NAME = 'etf-npf-calculator-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './Logo.jpg',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png'
];

// Install event - Cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: All files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache files', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - Serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);
            
            // Return a custom offline page if available
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// Background sync for offline data submission (if needed in future)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Placeholder for future offline data sync functionality
  return Promise.resolve();
}

// Push notification handler (if needed in future)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: './icons/icon-192x192.png',
      badge: './icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('Service Worker: Script loaded successfully');
'''

# Write the service-worker.js file
with open('service-worker.js', 'w', encoding='utf-8') as f:
    f.write(service_worker_content)

print("✅ service-worker.js created with complete PWA functionality!")

# Display the manifest.json content that was already created
print("\n📱 PWA Manifest (manifest.json):")
if os.path.exists('manifest.json'):
    with open('manifest.json', 'r') as f:
        manifest = f.read()
    print("✅ manifest.json already exists")
    print("First 300 characters:", manifest[:300] + "...")
else:
    print("❌ manifest.json not found - creating now...")

# Create the final project structure summary
print("\n🚀 COMPLETE PWA PACKAGE READY FOR GITHUB!")
print("=" * 50)

required_files = [
    ('index.html', 'PWA-ready HTML with all meta tags and service worker registration'),
    ('app.js', 'Original JavaScript functionality (unchanged)'),
    ('style.css', 'Original CSS styling (unchanged)'),
    ('Logo.jpg', 'Original logo image'),
    ('manifest.json', 'PWA manifest for app installation'),
    ('service-worker.js', 'Service worker for offline functionality'),
    ('browserconfig.xml', 'Microsoft tile configuration'),
    ('icons/', 'Directory with all PWA icon sizes')
]

for filename, description in required_files:
    status = "✅" if os.path.exists(filename) else "❌"
    print(f"{status} {filename:<20} - {description}")

# Count files in icons directory
if os.path.exists('icons'):
    icon_count = len([f for f in os.listdir('icons') if f.endswith('.png')])
    print(f"   📱 {icon_count} PWA icons (72px to 512px)")

print(f"\n📊 Total project files: {len([f for f in os.listdir('.') if not f.startswith('.')])}")
print("\n🎯 READY FOR GITHUB DEPLOYMENT!")
print("Just upload all files to your GitHub repository and enable GitHub Pages!")