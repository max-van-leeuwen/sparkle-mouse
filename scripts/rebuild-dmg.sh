#!/bin/bash

# rebuild DMG after plist modifications using Tauri's bundle_dmg.sh script

set -e

# get workspace root (script is in scripts/ directory)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$WORKSPACE_ROOT"

# get bundle dir
BUNDLE_PATH_UNIVERSAL="src-tauri/target/universal-apple-darwin/release/bundle"
BUNDLE_PATH_REGULAR="src-tauri/target/release/bundle"

if [ -d "$BUNDLE_PATH_UNIVERSAL/macos" ]; then
    BUNDLE_DIR="$BUNDLE_PATH_UNIVERSAL"
    ARCH="universal"
    echo "Found universal build"
elif [ -d "$BUNDLE_PATH_REGULAR/macos" ]; then
    BUNDLE_DIR="$BUNDLE_PATH_REGULAR"
    ARCH="aarch64"
    echo "Found regular build"
else
    echo "Error: No bundle found"
    exit 1
fi

APP_PATH="$BUNDLE_DIR/macos/Sparkle Mouse.app"
DMG_DIR="$BUNDLE_DIR/dmg"

if [ ! -d "$APP_PATH" ]; then
    echo "Error: App bundle not found at $APP_PATH"
    exit 1
fi

# create DMG directory if it doesn't exist
mkdir -p "$DMG_DIR"

# get version from tauri.conf.json
VERSION=$(grep -o '"version": *"[^"]*"' src-tauri/tauri.conf.json | head -1 | sed 's/"version": *"\(.*\)"/\1/')

DMG_NAME="Sparkle Mouse_${VERSION}_${ARCH}.dmg"
DMG_PATH="$DMG_DIR/$DMG_NAME"

# remove old DMG
if [ -f "$DMG_PATH" ]; then
    echo "Removing old DMG..."
    rm -f "$DMG_PATH"
fi

# create temporary directory
TEMP_DMG_DIR=$(mktemp -d)
echo "Creating DMG contents in $TEMP_DMG_DIR..."

# copy app to temporary directory
cp -R "$APP_PATH" "$TEMP_DMG_DIR/"

# verify plist modifications
if /usr/libexec/PlistBuddy -c "Print :CFBundleDocumentTypes:0:CFBundleTypeIconFile" "$TEMP_DMG_DIR/Sparkle Mouse.app/Contents/Info.plist" > /dev/null 2>&1; then
    echo "✓ Plist modification verified in temp directory"
else
    echo "Error: Plist modification not found in copied .app"
    echo "The document icon was not set. Please check set-plist-icon.sh"
    rm -rf "$TEMP_DMG_DIR"
    exit 1
fi

# create DMG using Tauri's configuration
echo "Building DMG: $DMG_NAME"

# get absolute path to background image from workspace root
DMG_BACKGROUND_PATH="$WORKSPACE_ROOT/src-tauri/icons/dmgBackground.tiff"

# use Tauri's bundle_dmg.sh script with the same settings from tauri.conf.json
if [ -f "$DMG_DIR/bundle_dmg.sh" ]; then
    # Tauri's script should already be there from a previous build
    # use the same params that Tauri uses
    cd "$DMG_DIR"
    ./bundle_dmg.sh \
        --volname "Sparkle Mouse" \
        --volicon "icon.icns" \
        --background "$DMG_BACKGROUND_PATH" \
        --window-pos 200 120 \
        --window-size 660 400 \
        --icon-size 128 \
        --icon "Sparkle Mouse.app" 180 170 \
        --hide-extension "Sparkle Mouse.app" \
        --app-drop-link 480 170 \
        "$DMG_NAME" \
        "$TEMP_DMG_DIR"
    cd - > /dev/null
else
    echo "Error: bundle_dmg.sh not found at $DMG_DIR/bundle_dmg.sh"
    echo "Please run a full tauri build first to generate the DMG bundling script"
    rm -rf "$TEMP_DMG_DIR"
    exit 1
fi

rm -rf "$TEMP_DMG_DIR"

echo "DMG created: $DMG_NAME"
echo "DMG rebuild complete: $DMG_PATH"
