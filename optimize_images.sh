#!/bin/bash

# Configuration
SOURCE_DIR="pictures"
THUMB_DIR="assets/images/thumbnails"
FULL_DIR="assets/images/full"
JSON_FILE="assets/images.json"

# Create directories
mkdir -p "$THUMB_DIR"
mkdir -p "$FULL_DIR"

echo "Optimizing images from '$SOURCE_DIR' using sips..."

# Enable nullglob
shopt -s nullglob
shopt -s nocaseglob

# Start JSON array
TEMP_JSON=$(mktemp)
echo "[" > "$TEMP_JSON"
FIRST=true

for img in "$SOURCE_DIR"/*.{jpg,jpeg,png,gif,webp,heic}; do
    [ -f "$img" ] || continue
    
    FILENAME=$(basename "$img")
    # Convert HEIC to JPG for web compatibility if needed, or just handle extension
    # For simplicity, we output everything as JPG for consistency and compression
    BASENAME="${FILENAME%.*}"
    NEW_FILENAME="${BASENAME}.jpg"
    
    THUMB_PATH="$THUMB_DIR/$NEW_FILENAME"
    FULL_PATH="$FULL_DIR/$NEW_FILENAME"

    echo "Processing $FILENAME..."

    # 1. Generate Thumbnail (Width 600px)
    if [ ! -f "$THUMB_PATH" ]; then
        sips -s format jpeg -s formatOptions 70 -Z 600 "$img" --out "$THUMB_PATH" > /dev/null
    fi

    # 2. Generate Optimized Full Size (Width 2048px max)
    if [ ! -f "$FULL_PATH" ]; then
        sips -s format jpeg -s formatOptions 80 -Z 2048 "$img" --out "$FULL_PATH" > /dev/null
    fi

    # Add to JSON
    if [ "$FIRST" = true ]; then
        FIRST=false
    else
        echo "," >> "$TEMP_JSON"
    fi
    echo "  \"$NEW_FILENAME\"" >> "$TEMP_JSON"
done

echo "]" >> "$TEMP_JSON"

# Move JSON
mv "$TEMP_JSON" "$JSON_FILE"

echo "Done! Images optimized and JSON updated."
