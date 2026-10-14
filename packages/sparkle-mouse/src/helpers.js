// handy helper functions

import pkg from '../package.json';



/**
 * Default "about" field value for .sparkle template files
 */
export const templateAbout = "Sparkle Mouse Template! 🐁✨";


/**
 * Current Sparkle Mouse package version, embedded in .sparkle template files
 */
export const templateVersion = pkg.version;


/**
 * A simple callback setup
 */
export class Callback {
    constructor() {
        this.callbacks = [];
    }

    /**
     * Registers a callback function to be invoked when call() is executed.
     * @param {Function} callback - The function to register
     */
    add(callback) {
        if (typeof callback === 'function') {
            this.callbacks.push(callback);
        } else {
            console.warn('Callback.add: provided callback is not a function');
        }
    }

    /**
     * Removes a previously registered callback function.
     * @param {Function} callback - The function to remove
     */
    remove(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    /**
     * Removes all registered callback functions.
     */
    clear() {
        this.callbacks = [];
    }

    /**
     * Executes all registered callbacks with the provided arguments.
     * @param {...any} args - Arguments to pass to each callback
     */
    call(...args) {
        this.callbacks.forEach(callback => {
            callback(...args);
        });
    }

    /**
     * Returns the number of registered callbacks.
     * @returns {number} The count of registered callbacks
     */
    get length() {
        return this.callbacks.length;
    }

    /**
     * Checks whether any callbacks are currently registered.
     * @returns {boolean} True if one or more callbacks are registered, false otherwise
     */
    get hasCallbacks() {
        return this.callbacks.length > 0;
    }
}



/**
 * Constrains a value within the specified range.
 * If low and high are not provided, defaults to a range of [0, 1].
 * @param {number} value - The value to clamp
 * @param {number} [low=0] - The minimum value
 * @param {number} [high=1] - The maximum value
 * @returns {number} The clamped value
 */
export function clamp(value, low, high){
    if (isNaN(value)) return 0;
    if (!low && low !== 0) low = 0; // assume low, high to be 0, 1 if not given
    if (!high && high !== 0) high = 1;
    return Math.max(Math.min(value, Math.max(low, high)), Math.min(low, high));
}



/**
 * Remaps a value from one range to another range.
 * @param {number} value - The value to remap
 * @param {number} low1 - The lower bound of the source range
 * @param {number} high1 - The upper bound of the source range
 * @param {number} [low2=0] - The lower bound of the target range
 * @param {number} [high2=1] - The upper bound of the target range
 * @param {boolean} [clamped=false] - Whether to clamp the result to the target range
 * @returns {number} The remapped value
 */
export function remap(value, low1, high1, low2, high2, clamped){
    low2 = low2 == null ? 0 : low2;
    high2 = high2 == null ? 1 : high2;
    var remapped = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    return clamped ? clamp(remapped, low2, high2) : remapped;
}



/**
 * Rotates a 2D point around the origin.
 * @param {number} x - The x-coordinate of the point
 * @param {number} y - The y-coordinate of the point
 * @param {number} angleRadians - The rotation angle in radians
 * @returns {{x: number, y: number}} The rotated point coordinates
 */
export function rotatePoint(x, y, angleRadians) {
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);
    return {
        x: x * cos - y * sin,
        y: x * sin + y * cos
    };
}



/**
 * Performs linear interpolation between two values with optional logarithmic scaling.
 * Logarithmic scaling is useful for sliders where small values need more precision.
 * If the range crosses zero, linear interpolation is used regardless of logarithmicStrength.
 * @param {number} a - The start value
 * @param {number} b - The end value
 * @param {number} t - The interpolation factor (0-1)
 * @param {number} [logarithmicStrength=0] - Blending factor: 0 = linear, 1 = fully logarithmic, 0.5 = halfway blend
 * @returns {number} The interpolated value
 */
export function lerp(a, b, t, logarithmicStrength = 0) {
    t = clamp(t, 0, 1);
    logarithmicStrength = clamp(logarithmicStrength, 0, 1);
    
    // if no logarithmic strength or range crosses zero, use linear
    if (logarithmicStrength === 0 || (a < 0 && b > 0) || (a > 0 && b < 0)) {
        return a + (b - a) * t;
    }

    let logResult;
    
    // both positive: logarithmic behavior
    if (a >= 0 && b >= 0) {
        const safeA = Math.max(a, 0.0001); // avoid log(0)
        const safeB = Math.max(b, 0.0001);
        const logA = Math.log(safeA);
        const logB = Math.log(safeB);
        logResult = Math.exp(logA + (logB - logA) * t);
    }
    // both negative: logarithmic with absolute values, then restore sign
    else if (a <= 0 && b <= 0) {
        const absA = Math.abs(a);
        const absB = Math.abs(b);
        const safeA = Math.max(absA, 0.0001);
        const safeB = Math.max(absB, 0.0001);
        const logA = Math.log(safeA);
        const logB = Math.log(safeB);
        logResult = -Math.exp(logA + (logB - logA) * t);
    }

    // if strength is 1, return full logarithmic result
    if (logarithmicStrength === 1) return logResult;
    
    // blend between linear and logarithmic based on strength
    const linearResult = a + (b - a) * t;
    return linearResult + (logResult - linearResult) * logarithmicStrength;
}



/**
 * Inverse of lerp - calculates the interpolation factor that would produce the given value.
 * Useful for converting a value back to its slider position.
 * If the range crosses zero, linear calculation is used regardless of logarithmicStrength.
 * @param {number} a - The start value
 * @param {number} b - The end value
 * @param {number} value - The value to find the interpolation factor for
 * @param {number} [logarithmicStrength=0] - Blending factor: 0 = linear, 1 = fully logarithmic, 0.5 = halfway blend
 * @returns {number} The interpolation factor (0-1) that would produce the given value
 */
export function inverseLerp(a, b, value, logarithmicStrength = 0) {
    logarithmicStrength = clamp(logarithmicStrength, 0, 1);
    
    // linear inverse
    if (b === a) return 0;
    const linearResult = clamp((value - a) / (b - a), 0, 1);
    
    // if no logarithmic strength or range crosses zero, use linear
    if (logarithmicStrength === 0 || (a < 0 && b > 0) || (a > 0 && b < 0)) {
        return linearResult;
    }

    let logResult;
    
    // both positive: logarithmic behavior
    if (a >= 0 && b >= 0) {
        const safeA = Math.max(a, 0.0001);
        const safeB = Math.max(b, 0.0001);
        const safeValue = Math.max(value, 0.0001);
        const logA = Math.log(safeA);
        const logB = Math.log(safeB);
        const logValue = Math.log(safeValue);
        
        if (logB === logA) return 0;
        logResult = clamp((logValue - logA) / (logB - logA), 0, 1);
    }
    // both negative: logarithmic with absolute values
    else if (a <= 0 && b <= 0) {
        const absA = Math.abs(a);
        const absB = Math.abs(b);
        const absValue = Math.abs(value);
        const safeA = Math.max(absA, 0.0001);
        const safeB = Math.max(absB, 0.0001);
        const safeValue = Math.max(absValue, 0.0001);
        const logA = Math.log(safeA);
        const logB = Math.log(safeB);
        const logValue = Math.log(safeValue);
        
        if (logB === logA) return 0;
        logResult = clamp((logValue - logA) / (logB - logA), 0, 1);
    }

    // if strength is 1, return full logarithmic result
    if (logarithmicStrength === 1) return logResult;
    
    // blend between linear and logarithmic based on strength
    return linearResult + (logResult - linearResult) * logarithmicStrength;
}



/**
 * Validates all Sparkle settings in an object and returns a new object containing only valid values.
 * Automatically populates image-count and image-aspect-ratio from built-in images when applicable (in-app use only).
 * @param {Object} settings - The settings object to validate
 * @param {Object} [builtinImages] - Built-in images registry (in-app use only)
 * @returns {Object} A new object containing only validated settings
 */
export function validateSettings(settings, builtinImages) {
    const validated = {};
    for (const [key, value] of Object.entries(settings)) {
        const validatedValue = paramValidate(key, value);
        if (validatedValue !== undefined) {
            validated[key] = validatedValue;
        }
    }
    
    // auto-populate image-count and aspect-ratio from built-in image if not provided
    if (validated['image-data'] && validated['image-data'].startsWith('image:')) {
        const builtInImage = builtinImages?.[validated['image-data']];
        
        if (builtInImage) {
            if (validated['image-count'] === undefined && builtInImage.imageCount !== undefined) {
                validated['image-count'] = builtInImage.imageCount;
            }
            if (validated['image-aspect-ratio'] === undefined && builtInImage.aspectRatio !== undefined) {
                validated['image-aspect-ratio'] = builtInImage.aspectRatio;
            }
            if (validated['image-cycles'] === undefined && builtInImage.cycles !== undefined) {
                validated['image-cycles'] = builtInImage.cycles;
            }
        }
    }
    
    return validated;
}

/**
 * Validates a single parameter value based on its key.
 * @param {string} key - The parameter name
 * @param {*} value - The value to validate
 * @returns {*|undefined} The validated value, or undefined if invalid
 * @private
 */
function paramValidate(key, value) {
    // image-count array of frame counts per file
    if (key === 'image-count') {
        if (Array.isArray(value)) {
            const validated = value.map(v => {
                const num = parseFloat(v);
                return isNaN(num) ? 1 : Math.max(1, Math.floor(num));
            });
            return validated.length > 0 ? validated : [1];
        }
        return [1];
    }
    
    // image-cycles array of loop counts per file (0 = infinite)
    if (key === 'image-cycles') {
        if (Array.isArray(value)) {
            const validated = value.map(v => {
                const parsed = parseInt(v, 10);
                return (!isNaN(parsed) && parsed >= 0) ? parsed : 0;
            });
            return validated.length > 0 ? validated : [0];
        }
        return [0];
    }
    
    // numeric parameters (clamped 0-1)
    const numericParams = ['amount', 'life', 'radius', 'size', 'gravity', 'outwards', 'spinning', 'turbulence', 'image-speed'];
    if (numericParams.includes(key)) {
        const num = parseFloat(value);
        if (isNaN(num)) {
            return undefined;
        }
        return Math.max(0, Math.min(1, num));
    }
    
    // boolean parameters
    const booleanParams = ['grow', 'shrink', 'fade', 'bouncy', 'glittery', 'glide', 'translucent', 'image-play-from-start', 'randomize-size-lifetime', 'align', 'flip'];
    if (booleanParams.includes(key)) {
        // handle string booleans from CLI
        if (typeof value === 'string') {
            if (value.toLowerCase() === 'true') return true;
            if (value.toLowerCase() === 'false') return false;
            return undefined;
        }
        return Boolean(value);
    }
    
    // string parameters
    if (key === 'image-data') {
        if (typeof value !== 'string') {
            return undefined;
        }
        return value;
    }
    
    // image-aspect-ratio (width/height ratio)
    if (key === 'image-aspect-ratio') {
        const parsed = parseFloat(value);
        if (!isNaN(parsed) && parsed > 0) {
            return parsed;
        }
        return undefined;
    }
    
    // mouse-state (specific string values)
    if (key === 'mouse-state') {
        const validStates = ['still', 'move', 'still-move'];
        if (typeof value === 'string' && validStates.includes(value)) {
            return value;
        }
        return undefined;
    }
    
    // unrecognized parameter
    return undefined;
}
