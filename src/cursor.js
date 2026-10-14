// cursor tracking



import { log, logError } from './log.js';
import * as THREE from 'three';
import { invoke } from '@tauri-apps/api/core';
import { emit } from '@tauri-apps/api/event';
import { Callback } from 'sparkle-mouse/helpers';
const { listen } = window.__TAURI__.event;



export async function initializeCursorAPI(displayAPI) {

    const cursorAPI = {
        lastCursorPositionRaw: undefined, // raw screen coordinates
        lastCursorPositionRelative: undefined, // relative to current monitor
        lastCursorPosition: undefined, // normalized -1 to 1
        lastWorldPosition: undefined,
        lastScreenSize: undefined,
        isMoving: false,
        isCursorOnCurrentMonitor: false, // true if cursor is within current monitor bounds
        settingsWindowPosition: undefined, // settings window position {x, y}
        settingsWindowSize: undefined, // settings window size {width, height}
        isHoveringSettings: false,
        breakInterpolation: false, // true when position jumps without interpolation
        isDemoShapesDrawing: false, // if currently doing demo drawing
        onMove: new Callback(), // isFirstMove, isFirstMoveNotHoveringSettings
        onStop: new Callback(), // isFirstStop, isFirstStopNotHoveringSettings
        getCursorPosition: getCursorPosition,
        getScreenSize: getScreenSize,
        updateCursorTracking: updateCursorTracking,
        clearCallbacks: clearCallbacks,
        updateScreenDimensions: updateScreenDimensions,
        enableCursorTracking: enableCursorTracking,
        emulateCursorPosition: emulateCursorPosition,
        getVelocities: getVelocities,
        getInterpolatedPositions: getInterpolatedPositions,
        resetPathTracking: resetPathTracking,
    };

    let wasHoveringSettings = false;
    let isSettingsWindowOpen = false;
    let isSettingsWindowFocused = true;
    let isAboutWindowFocused = false;
    let cursorTrackingEnabled = true;
    let pendingCursorPosition; // {x,y}

    // cursor path tracking for interpolation
    let prvCursorWorldPos = null;
    let prvCursorWorldPosTime = null; // timestamp (ms) when prvCursorWorldPos was recorded
    let pendingBreakInterpolation = false; // don't interpolate to next particle

    // if manualPosition is given, cursor is not tracked
    async function getCursorPosition(manualPosition) {
        let rawPosition; // position coords including all monitors
        let relativePosition; // position coords within current monitor

        // overriding position manually
        if (manualPosition){

            // convert to raw position by adding monitor offsets
            const offsetX = displayAPI?.monitorOffsetX || 0;
            const offsetY = displayAPI?.monitorOffsetY || 0;
            rawPosition = {
                x: manualPosition.x + offsetX,
                y: manualPosition.y + offsetY
            };

            // relative position to current monitor (as given)
            relativePosition = manualPosition;

        // cursor tracking
        }else{

            // use cached position from stream
            if (!cachedCursorPosition) return null;
            rawPosition = { x: cachedCursorPosition.x, y: cachedCursorPosition.y };
            cachedCursorPosition = null; // clear cache

            // subtract monitor offset to get position relative to current monitor
            const offsetX = displayAPI?.monitorOffsetX || 0;
            const offsetY = displayAPI?.monitorOffsetY || 0;
            relativePosition = {
                x: rawPosition.x - offsetX,
                y: rawPosition.y - offsetY
            };
        }
        
        // check if cursor is within current monitor bounds
        const monitorWidth = displayAPI?.logicalWidth || cursorAPI.lastScreenSize.x;
        const monitorHeight = displayAPI?.logicalHeight || cursorAPI.lastScreenSize.y;
        const isOnMonitor = relativePosition.x >= 0 && 
                            relativePosition.x <= monitorWidth && 
                            relativePosition.y >= 0 && 
                            relativePosition.y <= monitorHeight;
        cursorAPI.isCursorOnCurrentMonitor = isOnMonitor;
        
        // normalize using current monitor dimensions
        const normalizedPosition = {
            x: (relativePosition.x/monitorWidth)*2-1,
            y: 1-2*(relativePosition.y/monitorHeight)
        };
        cursorAPI.lastCursorPositionRaw = rawPosition; // store absolute position
        cursorAPI.lastCursorPositionRelative = relativePosition; // store relative position
        cursorAPI.lastCursorPosition = normalizedPosition;
        return { raw: rawPosition, relative: relativePosition, normalized: normalizedPosition };
    }

    // returns screen size, should be the same as logical window size but let's grab it here to be sure
    async function getScreenSize() {
        try {
            const size = await invoke('get_screen_size');
            return size;
        } catch (error) {
            await logError("Error getting screen size", error);
            return null;
        }
    }
    
    // get monitor refresh rate, null if unknown - to use, also enable in lib.rs
    // async function getRefreshRate() {
    //     try {
    //         const refreshRate = await invoke('get_refresh_rate');
    //         return refreshRate;
    //     } catch (error) {
    //         await logError("Error getting refresh rate", error);
    //         return null;
    //     }
    // }

    // called from main, handles current cursor tracking
    async function updateCursorTracking(rendererAPI) {
        
        // store prv position
        const prvPos = cursorAPI.lastCursorPosition ? {
            x: cursorAPI.lastCursorPosition.x,
            y: cursorAPI.lastCursorPosition.y
        } : null;

        // resets
        let isHoveringSettingsStopFrame = false;

        // get current cursor position
        let positions; // cursor positions object
        let isManual; // when new cursor position was manually given instead of cursor tracked
        if (cursorTrackingEnabled){ // if cursor tracking, get live position (ignore pending positions)
            positions = await cursorAPI.getCursorPosition();
        }else if (pendingCursorPosition!==undefined){ // if not tracking but manual position was given, use that
            positions = await cursorAPI.getCursorPosition(pendingCursorPosition);
            isManual = true;
            pendingCursorPosition = undefined; // reset for next frame
        } // if no tracking nor pending manual position, treat as no cursor movement (still)


        // if new position given
        if (positions){

            // convert to world position only if scene is visible and cursor is on current monitor (allow anywhere when manual)
            if (rendererAPI.requestedFrameId != null && (cursorAPI.isCursorOnCurrentMonitor || isManual)){
                // Tauri uses window.aspect since it doesn't have canvas-specific aspect ratios
                cursorAPI.lastWorldPosition = screenToWorld(positions.normalized, window.aspect || rendererAPI.aspect || 1);
            }else{
                cursorAPI.lastWorldPosition = undefined;
            }
            
            // check if cursor is within settings window bounds
            let isNowHovering = false;
            if (isSettingsWindowOpen && !isManual) { // only relevant when settings window is open and cursor tracked
                // when window is unfocused, isNowHovering stays false, allowing particles to render above
                if (isSettingsWindowFocused || isAboutWindowFocused) isNowHovering = isCursorInSettingsWindow();

                if (!wasHoveringSettings && isNowHovering) { // on first frame of window hovering
                    wasHoveringSettings = true;
                } else if (wasHoveringSettings && !isNowHovering) { // on first frame of not window hovering
                    wasHoveringSettings = false;
                    isHoveringSettingsStopFrame = true; // is automatically set to false at end of every tracking frame
                }
            }else if (wasHoveringSettings){ // on first frame of window closed/unfocused
                wasHoveringSettings = false;
                isHoveringSettingsStopFrame = true;
            }
            cursorAPI.isHoveringSettings = isNowHovering;

            // no lerping over settings panel
            if (isHoveringSettingsStopFrame) cursorAPI.breakInterpolation = true;

            // check if cursor moved
            const cursorMoved = didCursorMove(prvPos);

            // callbacks
            if (cursorAPI.isCursorOnCurrentMonitor || isManual){
                if (!cursorAPI.isMoving && cursorMoved){ // on start
                    cursorAPI.isMoving = true;
                    cursorAPI.onMove.call(true, isHoveringSettingsStopFrame);

                }else if (cursorAPI.isMoving && !cursorMoved){ // on stop
                    cursorAPI.isMoving = false;
                    cursorAPI.onStop.call(true, isHoveringSettingsStopFrame);

                }else if (cursorAPI.isMoving && cursorMoved){ // on continuous move
                    cursorAPI.onMove.call(false, isHoveringSettingsStopFrame);
                
                }else if (!cursorAPI.isMoving && !cursorMoved){ // on continuous stop
                    cursorAPI.onStop.call(false, isHoveringSettingsStopFrame);
                }

            // cursor is off-monitor and not manual, ensure we're in stopped state
            }else{
                if (cursorAPI.isMoving){
                    cursorAPI.isMoving = false;
                    cursorAPI.onStop.call(true, false);
                }else{
                    cursorAPI.onStop.call(false, false);
                }
            }
            
        // if no new position was given
        }else{
            // simpler settings hover check
            let isNowHovering = false;
            if (isSettingsWindowOpen){
                isNowHovering = wasHoveringSettings;
            }else{
                isHoveringSettingsStopFrame = wasHoveringSettings;
                wasHoveringSettings = false;
            }
            cursorAPI.isHoveringSettings = isNowHovering;

            // treat as no movement, transition to stopped if currently moving
            if (cursorAPI.isMoving){
                cursorAPI.isMoving = false;
                cursorAPI.onStop.call(true, false);
            }else{
                cursorAPI.onStop.call(false, false);
            }
        }
        
        // reset
        cursorAPI.breakInterpolation = false;
    }

    function clearCallbacks() {
        cursorAPI.onMove.clear();
        cursorAPI.onStop.clear();
    }

    async function updateScreenDimensions() {
        cursorAPI.lastScreenSize = await cursorAPI.getScreenSize();
    }

    function enableCursorTracking(enabled) {
        cursorTrackingEnabled = enabled;
    }

    function emulateCursorPosition(position) {
        pendingCursorPosition = position;
    }

    // cursor movement velocity
    function getVelocities() {
        // get time elapsed between prvCursorWorldPosTime and cursorAPI.lastWorldPosition (now)
        const now = performance.now();
        const trackingDeltaTime = prvCursorWorldPosTime ? (now - prvCursorWorldPosTime) / 1000 : 0; // convert to seconds

        // get current world pos
        if (!prvCursorWorldPos || !cursorAPI.lastWorldPosition) return { velocity: 0, distance: 0, trackingDeltaTime: null };
        const cursorWorldPos = cursorAPI.lastWorldPosition;
        
        // check if position has changed
        if (cursorWorldPos.x === prvCursorWorldPos.x && cursorWorldPos.y === prvCursorWorldPos.y) return { velocity: 0, distance: 0, trackingDeltaTime: null };

        const distance = Math.hypot(
            cursorWorldPos.x - prvCursorWorldPos.x,
            cursorWorldPos.y - prvCursorWorldPos.y
        );
        const velocity = trackingDeltaTime ? distance/trackingDeltaTime : 0;
        return {velocity, distance, trackingDeltaTime};
    }

    // returns a function that creates interpolated positions for the current line fragment
    function getInterpolatedPositions() {

        // handle inteprolation breaks
        if (cursorAPI.breakInterpolation) pendingBreakInterpolation = true;
        if (pendingBreakInterpolation){
            prvCursorWorldPos = null;
            prvCursorWorldPosTime = null;
            pendingBreakInterpolation = false;
        }

        if (!cursorAPI.lastWorldPosition) return null; // abort if there is no cursor position
        const cursorWorldPos = {
            x: cursorAPI.lastWorldPosition.x,
            y: cursorAPI.lastWorldPosition.y
        };

        // whether to interpolate or just spawn at singular point
        const doInterpolation = prvCursorWorldPos && !cursorAPI.breakInterpolation;

        // return position generator function
        return {
            
            // generate particle position for t (0-1)
            getPosition: (t) => {
                let particlePos;

                // linear, fill prv position to current cursor
                if (doInterpolation) {
                    particlePos = {
                        x: prvCursorWorldPos.x + (cursorWorldPos.x - prvCursorWorldPos.x) * t,
                        y: prvCursorWorldPos.y + (cursorWorldPos.y - prvCursorWorldPos.y) * t
                    };

                // no interpolation
                }else{
                    // no data for lerping, use points directly
                    particlePos = {
                        x: cursorWorldPos.x,
                        y: cursorWorldPos.y
                    };
                }

                return particlePos;
            },

            // get velocity, distance, deltatime for this tracked line segment, store to object
            ...cursorAPI.getVelocities(),

            // call after all particles on line segment are processed
            finalize: () => {
                // update previous cursor position if requested
                if (cursorAPI.lastWorldPosition) {
                    prvCursorWorldPos = {
                        x: cursorWorldPos.x,
                        y: cursorWorldPos.y
                    };
                    prvCursorWorldPosTime = performance.now(); // store timestamp
                }
            }
        };
    }

    // reset cursor path tracking state
    function resetPathTracking() {
        prvCursorWorldPos = null;
        prvCursorWorldPosTime = null;
        pendingBreakInterpolation = false;
    }

    // cursor streaming cache, continuously updated by event listener
    let cachedCursorPosition = null;
    listen('cursor-position-stream', (event) => {
        cachedCursorPosition = event.payload;
    });

    // initialize screen size on start
    await cursorAPI.updateScreenDimensions();

    // listen for settings window hover events
    listen('settings-window-dimensions', async (event) => {
        const { position, size } = event.payload;
        cursorAPI.settingsWindowPosition = position;
        cursorAPI.settingsWindowSize = size;
        isSettingsWindowOpen = true; // update cached state
    });
    listen('settings-window-closed', async () => {
        isSettingsWindowOpen = false; // update cached state
        wasHoveringSettings = false; // reset hover state
    });
    listen('focused', async (event) => {
        isSettingsWindowFocused = event.payload;
    });
    listen('about-focused', async (event) => {
        isAboutWindowFocused = event.payload;
    });
    listen('about-window-closed', async () => {
        isAboutWindowFocused = false; // reset focus state when about window closes
        await emit('demo-stop'); // stop demo if running
    });

    // helper function to check if cursor is within settings window bounds
    function isCursorInSettingsWindow() {
        if (!cursorAPI.lastCursorPositionRaw || !cursorAPI.settingsWindowPosition || !cursorAPI.settingsWindowSize) return false;
        
        // both cursor position and settings window position/size are in logical pixels (screen coordinates)
        // compare without scale factor conversion so it works with multi-monitor setups
        const winX = cursorAPI.settingsWindowPosition.x;
        const winY = cursorAPI.settingsWindowPosition.y;
        const winWidth = cursorAPI.settingsWindowSize.width;
        const winHeight = cursorAPI.settingsWindowSize.height;

        return cursorAPI.lastCursorPositionRaw.x >= winX && 
               cursorAPI.lastCursorPositionRaw.x <= winX + winWidth && 
               cursorAPI.lastCursorPositionRaw.y >= winY && 
               cursorAPI.lastCursorPositionRaw.y <= winY + winHeight;
    }

    // use new tracking data to check if cursor is moving or standing still
    function didCursorMove(prvPos){
        const thisPos = cursorAPI.lastCursorPosition;
        if (!thisPos || !prvPos) return false; // first frame doesn't count as moving
        if (thisPos.x != prvPos.x || thisPos.y != prvPos.y) return true;
        return false;
    }

    return cursorAPI;
}



// screenPos: {x, y} int position on logical monitor resolution
// aspect: width/height
// generates THREE.Vector3 world position for use with ortho camera
function screenToWorld(screenPos, aspect) {
    const position = new THREE.Vector3();
    if (aspect >= 1) { // screen is landscape (wider than tall)
        position.x = screenPos.x * aspect / 2;
        position.y = screenPos.y * .5;

    } else { // screen is portrait (taller than wide)
        position.x = screenPos.x * .5;
        position.y = screenPos.y * 1 / (2 * aspect);
    }
    return position;
}