// renderer initialization and management



import * as THREE from 'three';
import { log } from './logger.js';
import { Callback } from './helpers.js';


const highDPIRendering = true;



export async function initializeRendererAPI(container, cursorAPI, globalScale = 1) {

    const rendererAPI = {
        renderer:null,
        camera:null,
        scene:null,
        requestedFrameId:null, // current animation frame ID, null means no scene is active
        resetParticles:null, // function to reset particles, set when scene starts
        restartScene:null, // function to rebuild the scene after the WebGL context is restored
        onResize: new Callback(), // callback when canvas resizes, arg: dimensions
        aspect: 1, // instance-specific aspect ratio
        cameraScale: 1, // instance-specific camera scale
        globalScale: globalScale, // instance-specific global scale
        pause:async () => {
            rendererAPI.isPaused = true;
            if(!rendererAPI.isPerformancePaused) rendererAPI.onPause.call(true);
            if (rendererAPI.resetParticles) rendererAPI.resetParticles(); // reset particle startTimes to hide them
            renderer.clear(true, true, true);
        },
        resume:async () => {
            rendererAPI.isPaused = false;
            if(!rendererAPI.isPerformancePaused) rendererAPI.onPause.call(false);
        },
        isPaused:false, // paused by user
        isPerformancePaused:true, // start paused, automatically unpauses when particles spawn
        onPause:new Callback(), // bool (includes performance pause)
        onRenderingActive:new Callback(), // bool (false when rendering inactive, during webglcontextlost and windowhidden)
    }

    // initialize THREE scene
    const scene = new THREE.Scene();
    rendererAPI.scene = scene;
    scene.background = null;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10); // near: .1, far: 10
    rendererAPI.camera = camera;
    scene.add(camera)
    camera.position.z = 1 // z = out-of-screen
    
    // check if container is a canvas element or a regular div
    const isCanvas = container.tagName === 'CANVAS';
    
    // helper function to get canvas dimensions
    const getCanvasDimensions = () => {
        if (isCanvas) {
            // use the rendered size of the canvas element
            const rect = container.getBoundingClientRect();
            const dims = { width: rect.width, height: rect.height };
            return dims;
        }
        // use window dimensions for default full-screen canvas (when container is a div)
        const dims = { width: window.innerWidth, height: window.innerHeight };
        return dims;
    };

    const getRenderPixelRatio = () => {
        if (!highDPIRendering) return 1;
        return window.devicePixelRatio || 1;
    };
    
    const renderer = new THREE.WebGLRenderer({
        canvas: isCanvas ? container : undefined, // only pass canvas if container is already a canvas
        powerPreference: "high-performance", // request GPU (discrete GPU on laptops)
        depth: false,
        alpha: true, // needed for transparent background on web
        precision: "mediump",
        antialias: false,
        stencil: false,
    });
    rendererAPI.renderer = renderer;
    renderer.debug.checkShaderErrors = false;
    renderer.sortObjects = true;
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.setPixelRatio(getRenderPixelRatio());
    const dimensions = getCanvasDimensions();
    renderer.setSize(dimensions.width, dimensions.height, !isCanvas); // don't update CSS for existing canvas elements

    // removes all listeners on dispose
    const listeners = new AbortController();

    // handle WebGL context loss (e.g., when system sleeps)
    const canvas = renderer.domElement;
    canvas.addEventListener('webglcontextlost', async (event) => {
        event.preventDefault();
        
        // stop the animation loop to prevent errors
        if (rendererAPI && rendererAPI.requestedFrameId) {
            cancelAnimationFrame(rendererAPI.requestedFrameId);
            rendererAPI.requestedFrameId = null;
        }
        rendererAPI.onRenderingActive.call(false);
    }, { signal: listeners.signal });

    canvas.addEventListener('webglcontextrestored', async () => {
        // reinitialize renderer settings
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(getRenderPixelRatio());
        const dimensions = getCanvasDimensions();
        renderer.setSize(dimensions.width, dimensions.height, !isCanvas);
        
        // restart the scene if it was running
        if (rendererAPI.restartScene && rendererAPI.resetParticles && !rendererAPI.isPaused) {
            await rendererAPI.restartScene();
        }
        rendererAPI.onRenderingActive.call(true);
    }, { signal: listeners.signal });

    // window can still change size later, make camera aspect dynamic
    async function updateCamera() {
        await cursorAPI.updateScreenDimensions(); // update cursor tracking dimensions when this happens
        const dimensions = getCanvasDimensions();
        const aspect = dimensions.width / dimensions.height;
        
        // store aspect on instance
        rendererAPI.aspect = aspect;
        
        // get current global scale from instance (can be updated dynamically)
        const currentGlobalScale = rendererAPI.globalScale || 1.0;
        
        // portrait scale factor
        const portraitScaleUp = 1.35; // it looks better to have portrait bigger than landscape (empirical constant)
        const cameraScale = (aspect >= 1)
            ? 1.0 // landscape: no scaling
            : 1.0 / Math.max((1 / aspect) * portraitScaleUp, 1); // portrait: zoom in (smaller camera bounds)
        
        // apply global scale multiplier (inverted so >1 = bigger, <1 = smaller)
        const finalCameraScale = cameraScale / currentGlobalScale;
        
        // store camera scale on instance
        rendererAPI.cameraScale = finalCameraScale;
        
        if (aspect >= 1) { // if wider than it is tall
            camera.left   = -aspect / 2 * finalCameraScale;
            camera.right  = aspect / 2 * finalCameraScale;
            camera.top    = .5 * finalCameraScale;
            camera.bottom = -.5 * finalCameraScale;
        } else { // if taller than it is wide
            camera.left   = -.5 * finalCameraScale;
            camera.right  = .5 * finalCameraScale;
            camera.top    = 1 / (2 * aspect) * finalCameraScale;
            camera.bottom = -1 / (2 * aspect) * finalCameraScale;
        }

        // set new camera and renderer sizes
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(getRenderPixelRatio());
        // for canvas elements with CSS sizing, don't update the style (pass false)
        renderer.setSize(dimensions.width, dimensions.height, !isCanvas);
        
        // notify listeners
        rendererAPI.onResize.call(dimensions);
    }
    rendererAPI.updateCamera = updateCamera;
    
    // use ResizeObserver for canvas element to properly detect size changes
    let resizeTimeout = null;
    let resizeObserver = null;
    if (isCanvas && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCamera();
            }, 16); // ~60fps
        });
        resizeObserver.observe(canvas);
    } else {
        // fallback to window resize for non-canvas containers
        window.addEventListener('resize', updateCamera, { signal: listeners.signal });
    }
    
    await updateCamera()
    
    // start with cleared canvas
    renderer.clear(true, true, true);
    
    // if container is not a canvas, append the renderer's canvas to it
    if (!isCanvas) {
        container.appendChild(renderer.domElement);
    }

    // release the renderer and stop listening for changes
    rendererAPI.dispose = () => {
        listeners.abort();
        if (resizeObserver) resizeObserver.disconnect();
        clearTimeout(resizeTimeout);
        renderer.dispose();
        if (!isCanvas) renderer.domElement.remove();
    };

    return rendererAPI;
}
