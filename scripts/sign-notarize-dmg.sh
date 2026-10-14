#!/bin/bash

# sign and notarize macOS DMG
# script should be run after the DMG has been bundled

set -e

# try universal build path first, then regular build path
DMG_DIR_UNIVERSAL="src-tauri/target/universal-apple-darwin/release/bundle/dmg"
DMG_DIR_REGULAR="src-tauri/target/release/bundle/dmg"

if [ -d "$DMG_DIR_UNIVERSAL" ]; then
    DMG_DIR="$DMG_DIR_UNIVERSAL"
    echo "Looking for DMG in universal build directory"
elif [ -d "$DMG_DIR_REGULAR" ]; then
    DMG_DIR="$DMG_DIR_REGULAR"
    echo "Looking for DMG in regular build directory"
else
    echo "Error: DMG directory not found at either location:"
    echo "  $DMG_DIR_UNIVERSAL"
    echo "  $DMG_DIR_REGULAR"
    exit 1
fi

# check if signing identity is provided
if [ -z "$APPLE_SIGNING_IDENTITY" ]; then
    echo "Error: APPLE_SIGNING_IDENTITY not set"
    echo "Cannot sign the DMG without a signing identity"
    exit 1
fi

DMG_PATH="$DMG_DIR/*.dmg"
if ls $DMG_PATH 1> /dev/null 2>&1; then
    for DMG_FILE in $DMG_PATH; do
        echo "Signing DMG: $(basename "$DMG_FILE")"
        codesign --force --sign "$APPLE_SIGNING_IDENTITY" \
            --timestamp \
            "$DMG_FILE"
        echo "DMG signed"
        
        if [ -n "$APPLE_ID" ] && [ -n "$APPLE_PASSWORD" ] && [ -n "$APPLE_TEAM_ID" ]; then
            echo "Notarizing DMG: $(basename "$DMG_FILE")"
            
            # submit
            xcrun notarytool submit "$DMG_FILE" \
                --apple-id "$APPLE_ID" \
                --password "$APPLE_PASSWORD" \
                --team-id "$APPLE_TEAM_ID" \
                --wait
            
            # staple
            xcrun stapler staple "$DMG_FILE"
            
            echo "DMG notarized and stapled: $(basename "$DMG_FILE")"
        else
            echo "Error: Apple ID credentials not found"
            echo "Required: APPLE_ID, APPLE_PASSWORD, APPLE_TEAM_ID"
            exit 1
        fi
    done
else
    echo "Error: DMG not found at $DMG_DIR/"
    echo "The DMG should have been created by rebuild-dmg.sh script"
    exit 1
fi
