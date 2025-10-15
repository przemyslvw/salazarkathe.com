#!/bin/bash

# Create a backup directory if it doesn't exist
mkdir -p gallery/akwarele/kolekcja2025/backup

# Process each image
for img in "gallery/akwarele/kolekcja2025/"*.png; do
    # Skip if no files found
    [ -e "$img" ] || continue
    
    # Create a backup of the original
    cp "$img" "${img}.bak"
    
    # Add white border
    magick "$img" -bordercolor white -border 200 "$img"
    
    echo "Processed: $img"
done

echo "All images have been processed. Original files were backed up with .bak extension."
