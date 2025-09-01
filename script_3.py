# Create icons directory
import os
import urllib.request
from PIL import Image

# Create icons directory
icons_dir = 'icons'
if not os.path.exists(icons_dir):
    os.makedirs(icons_dir)
    print(f"✓ Created {icons_dir} directory")

# Download the generated icon
icon_url = "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/1696b3a0-ebed-40f5-9eac-fe1b7cd97064.png"
original_icon_path = os.path.join(icons_dir, "icon-512x512.png")

try:
    urllib.request.urlretrieve(icon_url, original_icon_path)
    print("✓ Downloaded original 512x512 icon")

    # Open the original image and create different sizes
    with Image.open(original_icon_path) as img:
        # Define all required sizes
        sizes = [72, 96, 128, 144, 152, 192, 384, 512]
        
        for size in sizes:
            # Resize image
            resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
            
            # Save resized image
            resized_path = os.path.join(icons_dir, f"icon-{size}x{size}.png")
            resized_img.save(resized_path, "PNG", optimize=True)
            print(f"✓ Created icon-{size}x{size}.png")

    print(f"\n✓ All PWA icons created successfully in {icons_dir}/ directory!")
    print("Icon sizes created:", [f"{s}x{s}" for s in sizes])

except Exception as e:
    print(f"Error creating icons: {e}")
    print("Creating placeholder icon structure...")
    
    # Create placeholder structure if image processing fails
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    for size in sizes:
        placeholder_path = os.path.join(icons_dir, f"icon-{size}x{size}.png")
        with open(placeholder_path, 'w') as f:
            f.write("# Placeholder - Replace with actual PNG icon")
        print(f"Created placeholder: icon-{size}x{size}.png")

# List contents of icons directory
print(f"\nContents of {icons_dir} directory:")
print(os.listdir(icons_dir))