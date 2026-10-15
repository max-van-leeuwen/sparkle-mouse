// Sparkle Mouse 🐁✨
// by Max van Leeuwen



import { start, restart, stop, dispose, pause, resume, setCursorTracking, getCursorTracking, drawAtPosition, drawAtCanvasPosition, getCanvasRect } from './main.js';
import { process } from './spritesheet.js';
import { demoShapesDrawing } from './demo.js';
import { shapeHeart, shapeSquiggly, shapeStar, shapeSwirl } from './shapes.js';
import { templateAbout, templateVersion } from './helpers.js';
import defaultSparkleRaw from './templates/sparkles.sparkle?raw';
const defaultSparkle = JSON.parse(defaultSparkleRaw);
const sparkles = defaultSparkle['image-data'];
const demoShapes = [shapeHeart, shapeSquiggly, shapeStar, shapeSwirl];



/**
 * Sparkle Mouse
 * @class
 */
export default class SparkleMouse {
    
    /**
     * Creates a new Sparkle Mouse 🐁✨
     * @param {HTMLCanvasElement} [canvas] - Optional canvas element. If not provided, automatically creates and appends full-screen canvas to the document body.
     * @param {number} [globalScale=1] - Global scale multiplier. >1 makes sparkles bigger, <1 makes sparkles smaller.
     */
    constructor(canvas, globalScale = 1) {
        // track if user provided a custom canvas
        this.isCustomCanvas = !!canvas;
        this.globalScale = globalScale;
        this.renderOutOfView = true;
        
        // use provided canvas or create new full-screen canvas
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '99999';
            document.body.appendChild(canvas);
        }
        
        this.canvas = canvas;
        
        /**
         * Whether rendering has been started.
         * @type {boolean}
         * @readonly
         */
        this.isStarted = false;
        
        /**
         * Whether rendering is currently paused.
         * @type {boolean}
         * @readonly
         */
        this.isPaused = false;

        // instance context (initialized in start())
        this.context = null;
    }

    /**
     * Gets the built-in sparkles template (default).
     * 
     * @returns {object} The default sparkles template settings.
     */
    static defaultSparkle = defaultSparkle;
    
    /**
     * Gets the canvas element used for rendering.
     * 
     * @returns {HTMLCanvasElement} The canvas element.
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Starts rendering. If already running, stops and restarts with new settings.
     * This method must be awaited before calling other methods.
     * 
     * @param {string|Object} [sparkleData] - URL path, raw .sparkle file content, or settings object. Uses default sparkles if not provided.
     * @example
     * // 1. URL path (put .sparkle files in public/ folder)
     * await sparkleMouse.start('/templates/mysparkle.sparkle');
     * 
     * // 2. Raw content (for bundlers like Vite)
     * import sparkleContent from './mysparkle.sparkle?raw';
     * await sparkleMouse.start(sparkleContent);
     * 
     * // 3. Settings object directly
     * await sparkleMouse.start({ amount: 0.5, life: 0.6, ... });
     * 
     * // 4. Default sparkles
     * await sparkleMouse.start();
     */
    async start(sparkleData) {
        if (!sparkleData) sparkleData = {...defaultSparkle};
        
        if (this.context) {
            // already initialized, keep the renderer and only rebuild the scene
            this.isStarted = false;
            await restart(this.context, sparkleData, this.renderOutOfView);
            // same state as a fresh start
            resume(this.context);
            setCursorTracking(this.context, true);
        } else {
            // start and get context
            this.context = await start(this.canvas, sparkleData, this.isCustomCanvas, this.globalScale, this.renderOutOfView);
        }

        this.isStarted = true;
        this.isPaused = false;
    }

    /**
     * Enables/disables cursor tracking (enabled by default).
     * On mobile devices, this uses touchmove instead of mousemove.
     * If your particles keep spawning and you want them to stop, call drawAtScreenPosition() with no arguments to interrupt the spawning.
     * 
     * @param {boolean} enabled - Set to false to disable.
     */
    setCursorTracking(enabled) {
        if(getCursorTracking(this.context) === enabled) return;
        setCursorTracking(this.context, enabled);
    }

    /**
     * Gets the current cursor tracking state.
     * 
     * @returns {boolean} True if cursor tracking is enabled, false otherwise.
     */
    getCursorTracking() {
        return getCursorTracking(this.context);
    }

    /**
     * Draws sparkles at a specific screen position. This can be called on every frame.
     * Call with no arguments to interrupt interpolation, as well as stopping indefinite spawning for sparkles with 'on still' setting enabled.
     * Make sure to disable cursor tracking first using setCursorTracking(false)!
     * 
     * @param {number} [x] - X position in pixels (0 to window.innerWidth).
     * @param {number} [y] - Y position in pixels (0 to window.innerHeight).
     */
    drawAtScreenPosition(x, y) {
        drawAtPosition(this.context, x, y);
    }

    /**
     * Draws sparkles at a specific canvas/world position. This can be called on every frame.
     * When no arguments are given, the streak will interrupt for one frame (stopping interpolation).
     * Make sure to disable cursor tracking first using setCursorTracking(false)!
     * Use getCanvasRect() to determine the current canvas coordinate bounds.
     * 
     * @param {number} [x] - X position in canvas space (see getCanvasRect() for bounds).
     * @param {number} [y] - Y position in canvas space (see getCanvasRect() for bounds).
     */
    drawAtCanvasPosition(x, y) {
        drawAtCanvasPosition(this.context, x, y);
    }

    /**
     * Gets the current canvas coordinate system bounds.
     * These bounds depend on the canvas aspect ratio and scale settings.
     * Use these bounds with drawAtCanvasPosition().
     * 
     * @returns {Object|null} Canvas bounds with properties: left, right, top, bottom, width, height. Returns null if not started.
     * @example
     * const rect = sparkleMouse.getCanvasRect();
     * // rect = { left: -0.8, right: 0.8, top: 0.5, bottom: -0.5, width: 1.6, height: 1.0 }
     * 
     * // Draw in center of canvas
     * sparkleMouse.drawAtCanvasPosition(0, 0);
     * 
     * // Draw at top-left corner
     * sparkleMouse.drawAtCanvasPosition(rect.left, rect.top);
     */
    getCanvasRect() {
        return getCanvasRect(this.context);
    }

    /**
     * Pauses rendering.
     */
    pause() {
        pause(this.context);
        this.isPaused = true;
    }

    /**
     * Resumes rendering.
     */
    resume() {
        resume(this.context);
        this.isPaused = false;
    }

    /**
     * Stops spawning and stops rendering sparkles.
     */
    async stop() {
        await stop(this.context);
        this.isStarted = false;
        this.isPaused = false;
    }

    /**
     * Stops rendering and releases everything this instance uses: the WebGL renderer, its listeners, and the canvas if it was created automatically.
     * Use this when you're done with the sparkles, e.g. when removing them from the page. Create a new instance to start again.
     */
    async destroy() {
        if (this.context) {
            await dispose(this.context);
            // free the GPU memory right away if nothing else can use the canvas (ours, or already removed from the page)
            if (!this.isCustomCanvas || !this.canvas.isConnected) this.context.rendererAPI.renderer.forceContextLoss();
            this.context = null;
        }
        if (!this.isCustomCanvas) this.canvas.remove();
        this.isStarted = false;
        this.isPaused = false;
    }

    /**
     * Sets the global scale.
     * >1 zooms in, <1 zooms out.
     * 
     * @param {number} scale - Scale multiplier (default: 1).
     */
    setScale(scale) {
        this.globalScale = scale;
        if (this.context && this.context.rendererAPI && this.context.rendererAPI.updateCamera) {
            this.context.rendererAPI.globalScale = scale;
            this.context.rendererAPI.updateCamera();
        }
    }

    /**
     * Sets whether to render particles when canvas is out of view. Default is true.
     * When false, particles won't spawn while the canvas is scrolled out of the viewport.
     * This can save performance on pages with many sparkle instances.
     * 
     * @param {boolean} enabled - Set to false to disable rendering when out of view (default: true).
     */
    setOutOfViewRendering(enabled) {
        this.renderOutOfView = enabled;
        if (this.context) {
            this.context.renderOutOfView = enabled;
        }
    }

    /**
     * Starts or stops demo shape drawing animation.
     * Automatically disables cursor tracking.
     * 
     * @param {boolean} enabled - Set to true to start demo, false to stop.
     * @param {Array} [shapes] - Optional array of shape objects. Defaults to built-in shapes if not provided.
     * @param {number} [scale=1] - Scale multiplier for shape size. Default is 1.
     */
    setDemoShapesDrawing(enabled, shapes, scale = 1) {
        if (this.context && this.context.cursorAPI && this.context.cursorAPI.isDemoShapesDrawing === enabled) {
            return;
        }
        
        if (!this.context) return; // not started yet
        if(enabled) setCursorTracking(this.context, false);
        if(!shapes) shapes = demoShapes;
        demoShapesDrawing(this.context.cursorAPI, this.context.rendererAPI, enabled, shapes, scale);
    }

    /**
     * Creates sparkle settings from images/gifs and configuration data. Returns a settings object that can be saved as a .sparkle file or passed to start().
     * Performance tip: Generate the .sparkle file once and load it as a static file on start. Processing images on every page load is slow.
     * Pro tip: If you prefer a UI, use the Sparkle Mouse desktop app to generate your .sparkle files!
     * 
     * @param {Array<string|HTMLImageElement>} images - Array of image paths or Image objects.
     * @param {Object} settings - Configuration settings (all required settings must be provided).
     * @param {boolean} [downloadNow=false] - If true, automatically downloads the generated .sparkle file to disk
     * @param {Object} [options] - Optional settings.
     * @param {Function} [options.readFile] - Custom (path) => Promise<Uint8Array> reader, for environments where fetch() can't reach the given paths (e.g. a desktop app reading from the native filesystem). Defaults to fetch().
     * @returns {Promise<Object>} Sparkle settings object.
     */
    static async createSparkleSettings(images, settings, downloadNow = false, options = {}) {
        // load sparkles template to get required settings
        const template = {...defaultSparkle};
        
        // clean up image-data if it contains * separator (for Tauri built-in compatibility)
        if (template['image-data'] && template['image-data'].includes('*')) {
            template['image-data'] = template['image-data'].split('*').pop();
        }
        
        // get required settings from template
        // exclude generated 'about', 'image-data'
        // exclude overwritable image properties 'image-count', 'image-aspect-ratio', 'image-cycles', 'image-speed', 'image-play-from-start'
        // include regular (required) settings
        const autoGenerated = ['about', 'image-data'];
        const optionalImageProps = ['image-count', 'image-aspect-ratio', 'image-cycles', 'image-speed', 'image-play-from-start'];
        const requiredSettings = Object.keys(template).filter(key => 
            !autoGenerated.includes(key) && !optionalImageProps.includes(key)
        );
        
        // check for missing required settings
        const missingSettings = requiredSettings.filter(key => !(key in settings));
        if (missingSettings.length > 0) {
            throw new Error(`Missing required settings: ${missingSettings.join(', ')}`);
        }
        
        // process images into texture data
        const processed = await process(images, options);
        
        // create settings object with "about" field first, then user values
        const sparkleSettings = {
            "about": templateAbout,
            "version": templateVersion,
            ...settings,
        };
        
        // always set image-data from processed images
        sparkleSettings['image-data'] = processed.base64;
        
        // set optional image properties from processed images only if user didn't provide them
        if (!('image-speed' in settings)) {
            // default to average of all GIFs, or 0 if no GIFs imported
            sparkleSettings['image-speed'] = processed.animationSpeed ? processed.animationSpeed / 60 : 0;
        }
        if (!('image-count' in settings)) {
            sparkleSettings['image-count'] = processed.imageCounts;
        }
        if (!('image-aspect-ratio' in settings)) {
            sparkleSettings['image-aspect-ratio'] = processed.aspectRatio;
        }
        if (!('image-cycles' in settings)) {
            sparkleSettings['image-cycles'] = processed.cycleCounts;
        }
        if (!('image-play-from-start' in settings)) {
            sparkleSettings['image-play-from-start'] = false;
        }
        
        // download as .sparkle file
        if (downloadNow) {
            const json = JSON.stringify(sparkleSettings, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'template.sparkle';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        return sparkleSettings;
    }

    /**
     * Parse a .sparkle file string into a settings object.
     * @param {string} sparkleFileContent - The content of a .sparkle file as a string
     * @returns {Object} The parsed sparkle settings object
     * @throws {SyntaxError} If the file content is not valid JSON after processing
     */
    static parseSparkleFile(sparkleFileContent) {
        const settings = JSON.parse(sparkleFileContent);
        
        // replace default sparkle image string with image data
        if (settings["image-data"] === "image:sparkles") {
            settings["image-data"] = sparkles;
        }
        
        return settings;
    }
}