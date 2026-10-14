#!/bin/bash

# prepare installer images:
# - convert NSIS headerImage.jpg and sidebarImage.jpg to BMP format for Windows (uncompressed 24-bit RGB BMP3 format)
# - convert DMG background to TIFF with 144 DPI for Retina display support on macOS

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ICONS_DIR="$WORKSPACE_ROOT/src-tauri/icons"

cd "$ICONS_DIR"

if ! command -v magick &> /dev/null; then
    echo "install imagemagick with brew install imagemagick"
    exit 1
fi

if [ -f "headerImage.jpg" ]; then
    magick headerImage.jpg -resize 150x57! -type TrueColor -compress None -define bmp:format=bmp3 BMP3:headerImage.bmp
    echo "done converting to headerImage.bmp"
else
    echo "headerImage.jpg not found"
fi

if [ -f "sidebarImage.jpg" ]; then
    magick sidebarImage.jpg -resize 164x314! -type TrueColor -compress None -define bmp:format=bmp3 BMP3:sidebarImage.bmp
    echo "done converting to sidebarImage.bmp"
else
    echo "sidebarImage.jpg not found"
fi

# DMG background for macOS - convert to TIFF with 144 DPI for Retina display support
if [ -f "dmgBackground.jpg" ]; then
    sips -s format tiff -s dpiWidth 144 -s dpiHeight 144 dmgBackground.jpg --out dmgBackground.tiff
    echo "done converting to dmgBackground.tiff (1320x800 @ 144 DPI)"
else
    echo "dmgBackground.jpg not found, skipping DMG background conversion"
fi
