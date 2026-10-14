#!/bin/bash

# set custom icon on DMG file

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

# find and set icon on DMG
DMG_PATH="$DMG_DIR/*.dmg"
if ls $DMG_PATH 1> /dev/null 2>&1; then
    for DMG_FILE in $DMG_PATH; do
        echo "Setting DMG volume icon: $(basename "$DMG_FILE")"
        ICON_PATH="src-tauri/icons/icon.icns"
        if [ -f "$ICON_PATH" ]; then
            MOUNT_POINT=$(mktemp -d)
            
            # convert to read-write
            echo "Converting DMG to read-write..."
            TEMP_RW_DMG="${DMG_FILE}.rw.dmg"
            hdiutil convert "$DMG_FILE" -format UDRW -o "$TEMP_RW_DMG" -quiet
            
            # mount
            echo "Mounting DMG..."
            hdiutil attach "$TEMP_RW_DMG" -mountpoint "$MOUNT_POINT" -nobrowse -quiet
            
            # copy icon to .VolumeIcon.icns
            cp "$ICON_PATH" "$MOUNT_POINT/.VolumeIcon.icns"
            
            # set custom icon attribute
            SetFile -a C "$MOUNT_POINT"
            
            echo "Unmounting DMG..."
            hdiutil detach "$MOUNT_POINT" -quiet
            
            rm -rf "$MOUNT_POINT"
            
            # convert back to compressed read-only and replace original
            echo "Converting DMG to read-only..."
            rm -f "$DMG_FILE"
            hdiutil convert "$TEMP_RW_DMG" -format UDZO -o "$DMG_FILE" -quiet
            rm -f "$TEMP_RW_DMG"
            
            echo "DMG volume icon set: $(basename "$DMG_FILE")"
        else
            echo "Error: Icon file not found at $ICON_PATH"
            exit 1
        fi
    done
else
    echo "Error: DMG not found at $DMG_DIR/"
    echo "The DMG should have been created by rebuild-dmg.sh script"
    exit 1
fi
