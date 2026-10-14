#!/bin/bash

# post-build script to add icon to .sparkle file association

set -e

# try universal build path first, then regular build path
BUNDLE_PATH_UNIVERSAL="src-tauri/target/universal-apple-darwin/release/bundle/macos/Sparkle Mouse.app/Contents/Info.plist"
BUNDLE_PATH_REGULAR="src-tauri/target/release/bundle/macos/Sparkle Mouse.app/Contents/Info.plist"

if [ -f "$BUNDLE_PATH_UNIVERSAL" ]; then
    PLIST_PATH="$BUNDLE_PATH_UNIVERSAL"
    echo "Found universal build at $PLIST_PATH"
elif [ -f "$BUNDLE_PATH_REGULAR" ]; then
    PLIST_PATH="$BUNDLE_PATH_REGULAR"
    echo "Found regular build at $PLIST_PATH"
else
    echo "Error: Bundle not found at either location:"
    echo "  $BUNDLE_PATH_UNIVERSAL"
    echo "  $BUNDLE_PATH_REGULAR"
    echo "Please build the app first with: npm run tauri build"
    exit 1
fi

echo "Setting document icon for .sparkle files..."
/usr/libexec/PlistBuddy -c "Set :CFBundleDocumentTypes:0:CFBundleTypeIconFile icon.icns" "$PLIST_PATH" 2>/dev/null || \
/usr/libexec/PlistBuddy -c "Add :CFBundleDocumentTypes:0:CFBundleTypeIconFile string icon.icns" "$PLIST_PATH"
echo "Document icon set"
