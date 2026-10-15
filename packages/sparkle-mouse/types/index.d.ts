// type definitions for sparkle-mouse



/**
 * When particles spawn.
 */
export type SparkleMouseState = 'still' | 'move' | 'still-move';


/**
 * All settings that can be passed to start() or used in .sparkle template files.
 * Numerical values range from 0-1 (some use non-linear scaling).
 */
export interface SparkleSettings {
    /** Template description, ignored when rendering. */
    'about'?: string;
    /** Package version the template was made with, ignored when rendering. */
    'version'?: string;

    /** Particle density. */
    'amount': number;
    /** Spawn radius around cursor. Set to 1 for full-screen. */
    'radius': number;
    /** Particle lifetime. */
    'life': number;
    /** Base size of particles. */
    'size': number;
    /** Randomize size and lifetime per particle. */
    'randomize-size-lifetime': boolean;
    /** When to spawn particles. */
    'mouse-state': SparkleMouseState;
    /** Render transparent/subtle particles. */
    'translucent': boolean;
    /** Rotation speed of particles. */
    'spinning': number;
    /** Align rotation to motion (overrides spinning). */
    'align': boolean;
    /** Flip texture horizontally when moving left. */
    'flip': boolean;
    /** Random chaotic motion, makes the particles feel alive. */
    'turbulence': number;
    /** Vertical force on particles. Default is 0.5 (center). */
    'gravity': number;
    /** Sideways gliding motion on spawn. */
    'glide': boolean;
    /** Radial outward force on spawn. */
    'outwards': number;
    /** Scale-in animation. */
    'grow': boolean;
    /** Scale-out animation. */
    'shrink': boolean;
    /** Fade-in and fade-out animation. */
    'fade': boolean;
    /** Scale-bounce animation. */
    'bouncy': boolean;
    /** Shiny effect. */
    'glittery': boolean;

    /** Image/GIF playback speed. */
    'image-speed': number;
    /** Start image/GIF animations from first frame. */
    'image-play-from-start': boolean;
    /** Number of frames in each texture animation. */
    'image-count': number[];
    /** Width/height ratio of texture images. */
    'image-aspect-ratio': number;
    /** Number of animation loops per texture (0 = infinite). */
    'image-cycles': number[];
    /** Base64-encoded texture atlas, optionally prefixed with a built-in image reference (e.g. "image:sparkles*data:image/png;base64,..."). */
    'image-data': string;
}


/**
 * Settings that createSparkleSettings() fills in from the processed images when not provided.
 */
export type SparkleImageSettingKey = 'image-speed' | 'image-play-from-start' | 'image-count' | 'image-aspect-ratio' | 'image-cycles';


/**
 * Settings accepted by createSparkleSettings().
 * All regular settings are required, image-* settings are optional and 'image-data' is generated.
 */
export type SparkleSettingsInput =
    Omit<SparkleSettings, SparkleImageSettingKey | 'image-data'> &
    Partial<Pick<SparkleSettings, SparkleImageSettingKey>>;


/**
 * Anything start() accepts: a URL path to a .sparkle file, raw .sparkle file content, or a settings object.
 */
export type SparkleData = string | SparkleSettings;


/**
 * Canvas coordinate system bounds, see getCanvasRect().
 */
export interface SparkleCanvasRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
}


/**
 * A shape for the demo animation, see setDemoShapesDrawing().
 */
export interface SparkleShape {
    /** Randomly rotate the shape each time it's drawn. */
    rotate: boolean;
    /** Randomly stretch the shape horizontally each time it's drawn. */
    stretch: boolean;
    /** Drawing speed multiplier. */
    speed: number;
    /** Relative chance of this shape being picked. */
    weight: number;
    /** Keep the shape inside the canvas edges. */
    avoidEdges: boolean;
    /** Points to draw through, roughly in the -1 to 1 range. */
    points: Array<{ x: number; y: number }>;
}


/**
 * Options for createSparkleSettings().
 */
export interface CreateSparkleSettingsOptions {
    /** Custom reader, for environments where fetch() can't reach the given paths (e.g. a desktop app reading from the native filesystem). Defaults to fetch(). */
    readFile?: (path: string) => Promise<Uint8Array>;
}



/**
 * Sparkle Mouse 🐁✨
 */
export default class SparkleMouse {

    /**
     * Creates a new Sparkle Mouse 🐁✨
     * @param canvas - Optional canvas element. If not provided, automatically creates and appends full-screen canvas to the document body.
     * @param globalScale - Global scale multiplier. >1 makes sparkles bigger, <1 makes sparkles smaller. Default is 1.
     */
    constructor(canvas?: HTMLCanvasElement | null, globalScale?: number);

    /**
     * Whether rendering has been started.
     */
    readonly isStarted: boolean;

    /**
     * Whether rendering is currently paused.
     */
    readonly isPaused: boolean;

    /**
     * Gets the built-in sparkles template (default).
     */
    static readonly defaultSparkle: SparkleSettings;

    /**
     * Gets the canvas element used for rendering.
     */
    getCanvas(): HTMLCanvasElement;

    /**
     * Starts rendering. If already running, stops and restarts with new settings.
     * This method must be awaited before calling other methods.
     * @param sparkleData - URL path, raw .sparkle file content, or settings object. Uses default sparkles if not provided.
     */
    start(sparkleData?: SparkleData): Promise<void>;

    /**
     * Enables/disables cursor tracking (enabled by default).
     * On mobile devices, this uses touchmove instead of mousemove.
     * @param enabled - Set to false to disable.
     */
    setCursorTracking(enabled: boolean): void;

    /**
     * Gets the current cursor tracking state.
     */
    getCursorTracking(): boolean;

    /**
     * Draws sparkles at a specific screen position. This can be called on every frame.
     * Call with no arguments to interrupt interpolation, as well as stopping indefinite spawning for sparkles with 'on still' setting enabled.
     * Make sure to disable cursor tracking first using setCursorTracking(false)!
     * @param x - X position in pixels (0 to window.innerWidth).
     * @param y - Y position in pixels (0 to window.innerHeight).
     */
    drawAtScreenPosition(): void;
    drawAtScreenPosition(x: number, y: number): void;

    /**
     * Draws sparkles at a specific canvas/world position. This can be called on every frame.
     * When no arguments are given, the streak will interrupt for one frame (stopping interpolation).
     * Make sure to disable cursor tracking first using setCursorTracking(false)!
     * @param x - X position in canvas space (see getCanvasRect() for bounds).
     * @param y - Y position in canvas space (see getCanvasRect() for bounds).
     */
    drawAtCanvasPosition(): void;
    drawAtCanvasPosition(x: number, y: number): void;

    /**
     * Gets the current canvas coordinate system bounds. Returns null if not started.
     * These bounds depend on the canvas aspect ratio and scale settings.
     */
    getCanvasRect(): SparkleCanvasRect | null;

    /**
     * Pauses rendering.
     */
    pause(): void;

    /**
     * Resumes rendering.
     */
    resume(): void;

    /**
     * Stops spawning and stops rendering sparkles.
     */
    stop(): Promise<void>;

    /**
     * Stops rendering and releases everything this instance uses: the WebGL renderer, its listeners, and the canvas if it was created automatically.
     * Use this when you're done with the sparkles, e.g. when removing them from the page. Create a new instance to start again.
     */
    destroy(): Promise<void>;

    /**
     * Sets the global scale. >1 zooms in, <1 zooms out.
     * @param scale - Scale multiplier (default: 1).
     */
    setScale(scale: number): void;

    /**
     * Sets whether to render particles when canvas is out of view. Default is true.
     * @param enabled - Set to false to disable rendering when out of view.
     */
    setOutOfViewRendering(enabled: boolean): void;

    /**
     * Starts or stops demo shape drawing animation.
     * Automatically disables cursor tracking.
     * @param enabled - Set to true to start demo, false to stop.
     * @param shapes - Optional array of shapes. Defaults to built-in shapes if not provided.
     * @param scale - Scale multiplier for shape size. Default is 1.
     */
    setDemoShapesDrawing(enabled: boolean, shapes?: SparkleShape[], scale?: number): void;

    /**
     * Creates sparkle settings from images/gifs and configuration data. Returns a settings object that can be saved as a .sparkle file or passed to start().
     * Performance tip: Generate the .sparkle file once and load it as a static file on start. Processing images on every page load is slow.
     * @param images - Array of image paths or Image objects.
     * @param settings - Configuration settings (all required settings must be provided).
     * @param downloadNow - If true, automatically downloads the generated .sparkle file to disk. Default is false.
     * @param options - Optional settings.
     */
    static createSparkleSettings(
        images: Array<string | HTMLImageElement>,
        settings: SparkleSettingsInput,
        downloadNow?: boolean,
        options?: CreateSparkleSettingsOptions
    ): Promise<SparkleSettings>;

    /**
     * Parse a .sparkle file string into a settings object.
     * @param sparkleFileContent - The content of a .sparkle file as a string.
     * @throws {SyntaxError} If the file content is not valid JSON after processing.
     */
    static parseSparkleFile(sparkleFileContent: string): SparkleSettings;
}
