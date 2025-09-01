# Read the current HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

print("Current HTML structure:")
print("Length:", len(html_content))
print("\nFirst 1000 characters:")
print(html_content[:1000])