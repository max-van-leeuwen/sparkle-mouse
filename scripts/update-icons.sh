#!/bin/bash

# update sparkle-mouse.png for all resolutions
npx @tauri-apps/cli icon src/assets/UI/sparkle-mouse.png

# update sparkles-BW.png for tray icon
npx @tauri-apps/cli icon src/assets/UI/sparkles-BW.png --output src-tauri/icons/tray