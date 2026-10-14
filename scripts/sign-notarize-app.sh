#!/bin/bash

# sign and notarize macOS app bundle
# script should be run after modifications

set -e

# try universal build path first, then regular build path
BUNDLE_PATH_UNIVERSAL="src-tauri/target/universal-apple-darwin/release/bundle/macos/Sparkle Mouse.app"
BUNDLE_PATH_REGULAR="src-tauri/target/release/bundle/macos/Sparkle Mouse.app"

if [ -d "$BUNDLE_PATH_UNIVERSAL" ]; then
    BUNDLE_PATH="$BUNDLE_PATH_UNIVERSAL"
    echo "Found universal build at $BUNDLE_PATH"
elif [ -d "$BUNDLE_PATH_REGULAR" ]; then
    BUNDLE_PATH="$BUNDLE_PATH_REGULAR"
    echo "Found regular build at $BUNDLE_PATH"
else
    echo "Error: Bundle not found at either location:"
    echo "  $BUNDLE_PATH_UNIVERSAL"
    echo "  $BUNDLE_PATH_REGULAR"
    echo "Please build the app first with: npm run tauri build"
    exit 1
fi

# check if signing identity is provided
if [ -z "$APPLE_SIGNING_IDENTITY" ]; then
    echo "Error: APPLE_SIGNING_IDENTITY not set"
    echo "Cannot sign the app without a signing identity"
    exit 1
fi

echo "Signing app with identity: $APPLE_SIGNING_IDENTITY"

echo "Cleaning extended attributes and resource forks..."
xattr -cr "$BUNDLE_PATH"

find "$BUNDLE_PATH/Contents" -name "*.dylib" -o -name "*.framework" | while read -r file; do
    codesign --force --sign "$APPLE_SIGNING_IDENTITY" --timestamp --options runtime "$file" 2>/dev/null || true
done

codesign --force --deep --sign "$APPLE_SIGNING_IDENTITY" \
    --timestamp \
    --options runtime \
    "$BUNDLE_PATH"

echo "App signed"

codesign --verify --deep --strict --verbose=2 "$BUNDLE_PATH"
echo "Signature verified"

# notarize
if [ -n "$APPLE_ID" ] && [ -n "$APPLE_PASSWORD" ] && [ -n "$APPLE_TEAM_ID" ]; then
    echo "Notarizing app..."
    
    # create zip for notarization
    NOTARIZE_DIR=$(dirname "$BUNDLE_PATH")
    NOTARIZE_ZIP="$NOTARIZE_DIR/Sparkle Mouse.zip"
    
    ditto -c -k --keepParent "$BUNDLE_PATH" "$NOTARIZE_ZIP"
    
    xcrun notarytool submit "$NOTARIZE_ZIP" \
        --apple-id "$APPLE_ID" \
        --password "$APPLE_PASSWORD" \
        --team-id "$APPLE_TEAM_ID" \
        --wait
    
    xcrun stapler staple "$BUNDLE_PATH"
    
    rm -f "$NOTARIZE_ZIP"
    
    echo "App notarized and stapled"
else
    echo "Error: Apple ID credentials not found"
    echo "Required: APPLE_ID, APPLE_PASSWORD, APPLE_TEAM_ID"
    exit 1
fi
