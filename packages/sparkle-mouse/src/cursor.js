// web cursor tracking



import * as THREE from 'three';
import { Callback } from './helpers.js';



// shared cursor position cache (singleton for all instances)
let globalCachedCursorPosition = null;
let globalEventListenersInitialized = false;

// initialize global event listeners once
function initializeGlobalCursorTracking() {
    if (globalEventListenersInitialized) return;
    globalEventListenersInitialized = true;
    
    // update cursor position from event (mouse or touch)
    function updateCursorFromEvent(x, y) {
        globalCachedCursorPosition = { x, y };
    }
    
    // listen for mouse movement
    window.addEventListener('mousemove', (event) => {
        updateCursorFromEvent(event.clientX, event.clientY);
    });
    window.addEventListener('mouseout', (event) => {
        // clear cursor position when cursor leaves window
        globalCachedCursorPosition = null;
    });
    
    // listen for touch events (mobile)
    window.addEventListener('touchstart', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            updateCursorFromEvent(touch.clientX, touch.clientY);
        }
    });
    window.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            updateCursorFromEvent(touch.clientX, touch.clientY);
        }
    });
}



export async function initializeCursorAPI(canvas) {
    
    // initialize global cursor tracking on first instance
    initializeGlobalCursorTracking();
    
    const cursorAPI = {
        lastCursorPosition: undefined, // normalized -1 to 1
        lastWorldPosition: undefined,
        lastScreenSize: undefined,
        isMoving: false,
        isHoveringSettings: false, // can be set by Tauri app, always false for web
        breakInterpolation: false, // true when position jumps without interpolation
        onMove: new Callback(), // isFirstMove
        onStop: new Callback(), // isFirstStop
        getCursorPosition: getCursorPosition,
        getScreenSize: getScreenSize,
        updateCursorTracking: updateCursorTracking,
        clearCallbacks: clearCallbacks,
        updateScreenDimensions: updateScreenDimensions,
        enableCursorTracking: enableCursorTracking,
        getCursorTrackingEnabled: getCursorTrackingEnabled,
        emulateCursorPosition: emulateCursorPosition,
        getVelocities: getVelocities,
        getInterpolatedPositions: getInterpolatedPositions,
        resetPathTracking: resetPathTracking,
    };

    let cursorTrackingEnabled = true;
    let pendingCursorPosition; // {x,y}

    // cursor path tracking for interpolation
    let prvCursorWorldPos = null;
    let prvCursorWorldPosTime = null; // timestamp (ms) when prvCursorWorldPos was recorded
    let pendingBreakInterpolation = false; // don't interpolate to next particle

    // stillness detection (prevent false "stopped" during continuous movement)
    let framesWithoutMovement = 0;
    const STILLNESS_THRESHOLD = 3; // frames without movement before considering truly stopped

    // if manualPosition is given, cursor is not tracked
    function getCursorPosition(manualPosition) {
        let position;

        // overriding position manually
        if (manualPosition){
            position = { x: manualPosition.x, y: manualPosition.y };

        // cursor tracking
        }else{
            // use cached position from mousemove listener
            if (!globalCachedCursorPosition) return null;
            position = { x: globalCachedCursorPosition.x, y: globalCachedCursorPosition.y };
        }
        
        // convert screen coordinates to canvas-local coordinates when using custom canvas
        if (canvas && canvas.tagName === 'CANVAS') {
            const rect = canvas.getBoundingClientRect();
            position = {
                x: position.x - rect.left,
                y: position.y - rect.top
            };
        }
        
        // normalize using canvas/window dimensions
        const width = cursorAPI.lastScreenSize.x;
        const height = cursorAPI.lastScreenSize.y;
        const normalizedPosition = {
            x: (position.x / width) * 2 - 1,
            y: 1 - 2 * (position.y / height)
        };
        
        cursorAPI.lastCursorPosition = normalizedPosition;
        return normalizedPosition;
    }

    // returns canvas or window size
    function getScreenSize() {
        // use canvas dimensions for custom canvas
        if (canvas && canvas.tagName === 'CANVAS') {
            const rect = canvas.getBoundingClientRect();
            const size = {
                x: rect.width,
                y: rect.height
            };
            return size;
        }
        // use window dimensions for full-screen
        const size = {
            x: window.innerWidth,
            y: window.innerHeight
        };
        return size;
    }

    // called from main, handles current cursor tracking
    function updateCursorTracking(rendererAPI) {
        
        // store prv position
        const prvPos = cursorAPI.lastCursorPosition ? {
            x: cursorAPI.lastCursorPosition.x,
            y: cursorAPI.lastCursorPosition.y
        } : null;

        // get current cursor position
        let position;
        if (cursorTrackingEnabled){ // if cursor tracking, get live position (ignore pending positions)
            position = cursorAPI.getCursorPosition();
        }else if (pendingCursorPosition !== undefined){ // if not tracking but manual position was given, use that
            position = cursorAPI.getCursorPosition(pendingCursorPosition);
            pendingCursorPosition = undefined; // reset for next frame
        } // if no tracking nor pending manual position, treat as no cursor movement (still)


        // if new position given
        if (position){

            // convert to world position if scene is visible
            if (rendererAPI.requestedFrameId != null){
                cursorAPI.lastWorldPosition = screenToWorld(position, rendererAPI.aspect, rendererAPI.cameraScale);
            }else{
                cursorAPI.lastWorldPosition = undefined;
            }

            // check if cursor moved
            const cursorMoved = didCursorMove(prvPos);

            // update stillness counter
            if (cursorMoved) {
                framesWithoutMovement = 0;
            } else {
                framesWithoutMovement++;
            }

            // determine if cursor is still (requires consecutive frames without movement)
            const isTrulyStill = framesWithoutMovement >= STILLNESS_THRESHOLD;

            // callbacks
            if (!cursorAPI.isMoving && cursorMoved){ // on start
                cursorAPI.isMoving = true;
                framesWithoutMovement = 0;
                cursorAPI.breakInterpolation = true; // don't trail from old position
                cursorAPI.onMove.call(true);

            }else if (cursorAPI.isMoving && isTrulyStill){ // on stop (only after threshold)
                cursorAPI.isMoving = false;
                cursorAPI.onStop.call(true);

            }else if (cursorAPI.isMoving && cursorMoved){ // on continuous move
                cursorAPI.onMove.call(false);
            
            }else if (!cursorAPI.isMoving && !cursorMoved){ // on continuous stop
                cursorAPI.onStop.call(false);
            }
            
        // if no new position was given
        }else{
            // treat as no movement, transition to stopped if currently moving
            framesWithoutMovement++;
            const isTrulyStill = framesWithoutMovement >= STILLNESS_THRESHOLD;
            
            if (cursorAPI.isMoving && isTrulyStill){
                cursorAPI.isMoving = false;
                cursorAPI.onStop.call(true);
            }else if (!cursorAPI.isMoving){
                cursorAPI.onStop.call(false);
            }
        }
        
        // reset
        cursorAPI.breakInterpolation = false;
    }

    function clearCallbacks() {
        cursorAPI.onMove.clear();
        cursorAPI.onStop.clear();
    }

    function updateScreenDimensions() {
        cursorAPI.lastScreenSize = cursorAPI.getScreenSize();
    }

    function enableCursorTracking(enabled) {
        const wasDisabled = !cursorTrackingEnabled;
        cursorTrackingEnabled = enabled;
        
        // reset path tracking when enabling to prevent interpolation from previous position
        if (enabled && wasDisabled) {
            pendingCursorPosition = undefined; // clear any pending emulated position
            resetPathTracking();
            cursorAPI.breakInterpolation = true; // also set break flag for current frame
            framesWithoutMovement = 0; // reset stillness counter
        }
    }

    function getCursorTrackingEnabled() {
        return cursorTrackingEnabled;
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

    // initialize screen size on start
    cursorAPI.updateScreenDimensions();

    // update screen size on window resize (each instance needs its own)
    window.addEventListener('resize', () => {
        cursorAPI.updateScreenDimensions();
    });

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
// cameraScale: camera scale factor
// generates THREE.Vector3 world position for use with ortho camera
function screenToWorld(screenPos, aspect, cameraScale) {
    const position = new THREE.Vector3();
    
    if (aspect >= 1) { // screen is landscape (wider than tall)
        position.x = screenPos.x * aspect / 2 * cameraScale;
        position.y = screenPos.y * .5 * cameraScale;

    } else { // screen is portrait (taller than wide)
        position.x = screenPos.x * .5 * cameraScale;
        position.y = screenPos.y * 1 / (2 * aspect) * cameraScale;
    }
    return position;
}



// worldPos: {x, y} world/canvas coordinates
// aspect: width/height
// screenSize: {x, y} canvas/window dimensions
// cameraScale: camera scale factor
// converts world position to screen pixel coordinates
export function worldToScreen(worldPos, aspect, screenSize, cameraScale) {
    // convert world to normalized screen space (-1 to 1)
    let normalizedX, normalizedY;
    
    if (aspect >= 1) { // landscape
        normalizedX = worldPos.x / (aspect / 2 * cameraScale);
        normalizedY = worldPos.y / (.5 * cameraScale);
    } else { // portrait
        normalizedX = worldPos.x / (.5 * cameraScale);
        normalizedY = worldPos.y / (1 / (2 * aspect) * cameraScale);
    }
    
    // convert normalized screen space to pixel coordinates
    const x = (normalizedX + 1) / 2 * screenSize.x;
    const y = (1 - normalizedY) / 2 * screenSize.y;
    
    return { x, y };
}