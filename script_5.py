# Create the updated HTML file with PWA elements
# Read the original HTML content
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Add PWA elements to the head section
pwa_head_additions = '''    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#218085">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="ETF & NPF Calculator">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="ETF-NPF Calc">
    <meta name="description" content="Professional ETF and NPF Calculator for financial calculations">
    <meta name="msapplication-TileColor" content="#218085">
    <meta name="msapplication-config" content="browserconfig.xml">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    
    <!-- PWA Icons -->
    <link rel="icon" type="image/png" sizes="32x32" href="icons/icon-152x152.png">
    <link rel="icon" type="image/png" sizes="16x16" href="icons/icon-152x152.png">
    <link rel="apple-touch-icon" href="icons/icon-152x152.png">
    <link rel="apple-touch-icon" sizes="72x72" href="icons/icon-72x72.png">
    <link rel="apple-touch-icon" sizes="96x96" href="icons/icon-96x96.png">
    <link rel="apple-touch-icon" sizes="128x128" href="icons/icon-128x128.png">
    <link rel="apple-touch-icon" sizes="144x144" href="icons/icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="icons/icon-152x152.png">
    <link rel="apple-touch-icon" sizes="192x192" href="icons/icon-192x192.png">
    <link rel="apple-touch-icon" sizes="384x384" href="icons/icon-384x384.png">
    <link rel="apple-touch-icon" sizes="512x512" href="icons/icon-512x512.png">
    
'''

# Add service worker registration script
pwa_script = '''
    <!-- PWA Service Worker Registration -->
    <script>
        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('sw.js')
                    .then(function(registration) {
                        console.log('PWA: Service Worker registered successfully:', registration.scope);
                    })
                    .catch(function(error) {
                        console.log('PWA: Service Worker registration failed:', error);
                    });
            });
        }

        // PWA Install prompt
        let deferredPrompt;
        let installButton = null;

        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA: Install prompt triggered');
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            // Show install button if you want to add one later
            showInstallPromotion();
        });

        function showInstallPromotion() {
            // You can add UI to show install button here
            console.log('PWA: Ready to install');
        }

        window.addEventListener('appinstalled', (evt) => {
            console.log('PWA: App was installed successfully');
        });

        // Handle PWA display mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: Running in standalone mode');
        }
    </script>
'''

# Find the head closing tag and insert PWA elements before it
head_close_index = html_content.find('</head>')
if head_close_index != -1:
    # Insert PWA head elements before </head>
    html_content = html_content[:head_close_index] + pwa_head_additions + html_content[head_close_index:]

# Find the body closing tag and insert PWA script before it  
body_close_index = html_content.find('</body>')
if body_close_index != -1:
    # Insert PWA script before </body>
    html_content = html_content[:body_close_index] + pwa_script + html_content[body_close_index:]

# Fix the logo path to use the attached Logo.jpg instead of the absolute path
html_content = html_content.replace(
    'src="C:\\Users\\Ajay.Sharma\\Downloads\\ETF-NPF Calculator\\ETF-NPF Calculator\\Logo.svg"',
    'src="Logo.jpg"'
)

# Write the updated HTML file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✓ index.html updated with PWA features!")
print("\nPWA additions:")
print("- Manifest link added")
print("- PWA meta tags added")
print("- Service worker registration added")
print("- PWA icons linked")
print("- Install prompt handling added")
print("- Logo path fixed")
print("\nUpdated HTML file length:", len(html_content))