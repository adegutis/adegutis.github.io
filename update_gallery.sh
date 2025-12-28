#!/bin/bash

# Configuration
PICTURES_DIR="pictures"
OUTPUT_FILE="assets/images.json"

# Check if pictures directory exists
if [ ! -d "$PICTURES_DIR" ]; then
    echo "Error: Directory '$PICTURES_DIR' not found."
    exit 1
fi

# Find images (jpg, jpeg, png, gif, webp) and create a JSON array
echo "Scanning '$PICTURES_DIR' for images..."

# Use a temporary file to construct the list
TEMP_FILE=$(mktemp)
echo "[" > "$TEMP_FILE"

# Enable case-insensitive globbing (compatible with macOS bash 3.2)
shopt -s nocaseglob
# Enable nullglob so patterns that match nothing don't expand to the pattern itself
shopt -s nullglob

FIRST=true
for img in "$PICTURES_DIR"/*.{jpg,jpeg,png,gif,webp}; do
    # Check if file exists (handle standard file check just in case)
    [ -f "$img" ] || continue
    
    if [ "$FIRST" = true ]; then
        FIRST=false
    else
        echo "," >> "$TEMP_FILE"
    fi
    # Extract filename using basename
    BASENAME=$(basename "$img")
    echo "  \"$BASENAME\"" >> "$TEMP_FILE"
done

echo "]" >> "$TEMP_FILE"

# Move temp file to output
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "Updated '$OUTPUT_FILE' successfully."
cat "$OUTPUT_FILE"
