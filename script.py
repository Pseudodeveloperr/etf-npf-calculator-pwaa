# Let me read the content of the attached files to understand the structure
import os
print("Current directory contents:")
print(os.listdir('.'))

# Try to read the files if they exist
try:
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    print("HTML file found and read successfully")
    print("HTML file length:", len(html_content))
    print("First 500 characters of HTML:")
    print(html_content[:500])
except FileNotFoundError:
    print("index.html not found in current directory")

try:
    with open('app.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
    print("JavaScript file found and read successfully")
    print("JS file length:", len(js_content))
except FileNotFoundError:
    print("app.js not found in current directory")

try:
    with open('style.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    print("CSS file found and read successfully") 
    print("CSS file length:", len(css_content))
except FileNotFoundError:
    print("style.css not found in current directory")