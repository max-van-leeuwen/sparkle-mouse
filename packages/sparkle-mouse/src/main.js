// main functionality for sparkle-mouse package



import { validateSettings } from './helpers.js';
import SparkleMouse from './index.js';
import { initializeRendererAPI } from './renderer.js';
import { showScene } from './scene.js';
import { initializeCursorAPI, worldToScreen } from './cursor.js';
import { demoShapesDrawing } from './demo.js';



// initialize sparkle mouse for a canvas
export async function initialize(canvas, sparkleData, isCustomCanvas = false, globalScale = 1, renderOutOfView = true) {
    // create instance context
    const context = {
        cursorAPI: null,
        rendererAPI: null,
        currentSettings: null,
        currentImageData: null,
        displayAPI: {
            aspect: null,
            isCustomCanvas: false
        },
        isLoadingScene: false,
        renderOutOfView: renderOutOfView
    };

    // load settings
    await loadSettings(context, sparkleData);
    
    // helper function to get canvas dimensions
    const getCanvasDimensions = () => {
        if (canvas && canvas.tagName === 'CANVAS') {
            const rect = canvas.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        }
        return { width: window.innerWidth, height: window.innerHeight };
    };
    
    // initialize display API with initial monitor aspect ratio
    const dimensions = getCanvasDimensions();
    context.displayAPI.aspect = dimensions.width / dimensions.height;
    context.displayAPI.isCustomCanvas = isCustomCanvas;
    
    // initialize APIs
    try {
        context.cursorAPI = await initializeCursorAPI(canvas);
        context.rendererAPI = await initializeRendererAPI(canvas, context.cursorAPI, globalScale);
    } catch (error) {
        throw error;
    }
    
    // rebuild the scene when the WebGL context is restored (e.g. after system sleep)
    context.rendererAPI.restartScene = async () => {
        await stopScene(context);
        await startScene(context);
    };

    // update displayAPI when renderer resizes
    context.rendererAPI.onResize.add((dimensions) => {
        const newAspect = dimensions.width / dimensions.height;
        context.displayAPI.aspect = newAspect;
    });
    
    return context;
}



// parse and validate sparkle data into the context
async function loadSettings(context, sparkleData) {
    // parse sparkle data
    if (typeof sparkleData === 'string') {
        // check if URL or raw content
        const isURL = sparkleData.startsWith('http://') || 
                      sparkleData.startsWith('https://') || 
                      (sparkleData.startsWith('/') && !sparkleData.startsWith('//')) || 
                      sparkleData.startsWith('./') ||
                      sparkleData.startsWith('../');
        
        if (isURL) {
            // load from URL/path
            try {
                const response = await fetch(sparkleData);
                const text = await response.text();
                context.currentSettings = SparkleMouse.parseSparkleFile(text);
            } catch (error) {
                throw error;
            }
        } else {
            // treat as raw sparkle file content
            try {
                context.currentSettings = SparkleMouse.parseSparkleFile(sparkleData);
            } catch (error) {
                throw error;
            }
        }
    } else if (typeof sparkleData === 'object') {
        // use provided settings object
        context.currentSettings = sparkleData;
    } else {
        throw new Error('sparkleData must be a string (URL/path or raw content) or settings object');
    }
    
    // validate settings
    context.currentSettings = validateSettings(context.currentSettings, {});
    
    // get image data from settings
    context.currentImageData = context.currentSettings['image-data'];
    if (!context.currentImageData) {
        throw new Error('No image data found in sparkle settings');
    }
    
    // clean up image-data if it contains * separator (for Tauri built-in compatibility)
    if (context.currentImageData.includes('*')) {
        context.currentImageData = context.currentImageData.split('*').pop();
    }
}



// start rendering sparkles
export async function start(canvas, sparkleData, isCustomCanvas = false, globalScale = 1, renderOutOfView = true) {
    // initialize
    const context = await initialize(canvas, sparkleData, isCustomCanvas, globalScale, renderOutOfView);
    
    // start the scene
    await startScene(context);

    // return context for instance management
    return context;
}



// restart with new sparkle data, keeping the existing renderer and listeners
export async function restart(context, sparkleData, renderOutOfView = true) {
    await stopScene(context);
    await loadSettings(context, sparkleData);
    context.renderOutOfView = renderOutOfView;
    await startScene(context);
}



async function startScene(context) {
    // prevent duplicate loads
    if (context.isLoadingScene) return;
    context.isLoadingScene = true;
    
    try {
        if (context.rendererAPI.requestedFrameId != null) await stopScene(context); // stop existing scene, if any
        
        // render loop, wait for scene to load before starting animation
        try {
            // get canvas name for logging
            const canvas = context.rendererAPI.renderer.domElement;
            const canvasName = canvas && canvas.tagName === 'CANVAS' ? (canvas.id || canvas.className || 'canvas') : 'canvas';
            
            // helper functions for performance pause
            const startPerformancePause = () => {
                if (!context.rendererAPI.isPerformancePaused) {
                    context.rendererAPI.isPerformancePaused = true;
                    context.rendererAPI.renderer.clear(true, true, true);
                    if (!context.rendererAPI.isPaused) context.rendererAPI.onPause.call(true);
                    // console.log(`performance-paused (${canvasName})`); // show which canvas is currently paused for performance
                }
            };
            
            const stopPerformancePause = () => {
                if (context.rendererAPI.isPerformancePaused) {
                    context.rendererAPI.isPerformancePaused = false;
                    if (!context.rendererAPI.isPaused) context.rendererAPI.onPause.call(false);
                    // console.log(`performance-resumed (${canvasName})`);
                }
            };
            
            const { animate, resetParticles, getSpawning, setSpawning, onParticleActivityChange } = await showScene(
                context.currentSettings,
                context.currentImageData,
                context.rendererAPI,
                context.cursorAPI,
                context.renderOutOfView
            );
            
            // register callback for particle activity changes
            onParticleActivityChange.add((hasActiveParticles) => {
                if (hasActiveParticles) {
                    stopPerformancePause();
                } else {
                    startPerformancePause();
                }
            });
            context.rendererAPI.resetParticles = resetParticles; // store reset function for pause
            
            // store instance-specific state accessors
            context.getSpawning = getSpawning;
            context.setSpawning = setSpawning;
            
            let animateLooped = () => { // create looping request
                context.rendererAPI.requestedFrameId = requestAnimationFrame(animateLooped);
                
                // always update cursor tracking (even when paused)
                context.cursorAPI.updateCursorTracking(context.rendererAPI);
                
                // skip rendering if paused
                if (context.rendererAPI.isPaused || context.rendererAPI.isPerformancePaused) return;
                
                // render
                animate();
            }
            
            animateLooped();
        } catch (error) {
            throw error;
        }
    } finally {
        context.isLoadingScene = false;
    }
}



// stop rendering
export async function stop(context) {
    if (!context) return;
    await stopScene(context);
}



// stop rendering and release the renderer and listeners, the context can't be used afterwards
export async function dispose(context) {
    await stopScene(context);
    if (context.cursorAPI) context.cursorAPI.dispose();
    if (context.rendererAPI) context.rendererAPI.dispose();
}



// stop and destroy an existing scene
async function stopScene(context) {
    // stop animation loop
    if (context.rendererAPI && context.rendererAPI.requestedFrameId != null) {
        cancelAnimationFrame(context.rendererAPI.requestedFrameId);
        context.rendererAPI.requestedFrameId = null;
    }
    
    // remove all cursor tracking callbacks
    if (context.cursorAPI) {
        context.cursorAPI.clearCallbacks();
    }

    // stop demo shapes drawing, it would keep running in the background
    if (context.cursorAPI && context.cursorAPI.isDemoShapesDrawing) {
        demoShapesDrawing(context.cursorAPI, context.rendererAPI, false);
    }
    
    // destroy scene data
    if (context.rendererAPI) {
        const renderer = context.rendererAPI.renderer;
        const camera = context.rendererAPI.camera;
        const scene = context.rendererAPI.scene;
        
        // get all scene objects except camera
        const objectsToRemove = scene.children.filter(child => child !== camera);
        objectsToRemove.forEach(mesh => {
            // remove from scene
            scene.remove(mesh);
            
            // dispose of geo
            if (mesh.geometry) {
                mesh.geometry.dispose();
            }
            
            // dispose of materials
            if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach(material => material.dispose());
                } else {
                    mesh.material.dispose();
                }
            }
        });
        
        // render empty frame
        renderer.render(scene, camera);
    }
}



// pause rendering
export function pause(context) {
    if (context && context.rendererAPI) {
        context.rendererAPI.pause();
    }
}



// resume rendering
export function resume(context) {
    if (context && context.rendererAPI) {
        context.rendererAPI.resume();
    }
}



// enable/disable cursor tracking
export function setCursorTracking(context, enabled) {
    if (context && context.cursorAPI) {
        context.cursorAPI.enableCursorTracking(enabled);
    }
}

// get cursor tracking state
export function getCursorTracking(context) {
    if (context && context.cursorAPI) {
        return context.cursorAPI.getCursorTrackingEnabled();
    }
    return false;
}



// draw at specific position (cursor tracking must be disabled)
export function drawAtPosition(context, x, y) {
    if (context && context.cursorAPI) {
        if (x === undefined) {
            // no position given, break interpolation
            context.cursorAPI.breakInterpolation = true;
            context.cursorAPI.lastWorldPosition = undefined; // don't allow sparkles that use 'on still' to keep spawning here
        } else {
            // position given, emulate cursor there
            context.cursorAPI.emulateCursorPosition({ x, y });
        }
    }
}



// draw at specific canvas/world position (cursor tracking must be disabled)
export function drawAtCanvasPosition(context, x, y) {
    if (context && context.cursorAPI && context.rendererAPI) {
        if (x === undefined) {
            // no position given, break interpolation
            context.cursorAPI.breakInterpolation = true;
            context.cursorAPI.lastWorldPosition = undefined; // don't allow sparkles that use 'on still' to keep spawning here
        } else {
            // convert canvas/world coordinates to canvas-relative screen coordinates
            const aspect = context.rendererAPI.aspect;
            const cameraScale = context.rendererAPI.cameraScale;
            const screenSize = context.cursorAPI.getScreenSize();
            const canvasRelativePos = worldToScreen({ x, y }, aspect, screenSize, cameraScale);
            
            // convert canvas-relative to window coordinates by adding canvas position on page
            const canvas = context.rendererAPI.renderer.domElement;
            const rect = canvas.getBoundingClientRect();
            const windowPos = {
                x: canvasRelativePos.x + rect.left,
                y: canvasRelativePos.y + rect.top
            };
            
            // emulate cursor at window position
            context.cursorAPI.emulateCursorPosition(windowPos);
        }
    }
}



// get current canvas rect bounds
export function getCanvasRect(context) {
    if (context && context.rendererAPI && context.rendererAPI.camera) {
        const camera = context.rendererAPI.camera;
        return {
            left: camera.left,
            right: camera.right,
            top: camera.top,
            bottom: camera.bottom,
            width: camera.right - camera.left,
            height: camera.top - camera.bottom
        };
    }
    return null;
}