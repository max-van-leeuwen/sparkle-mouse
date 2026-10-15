// type definitions for sparkle-mouse/react



import type { CanvasHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';
import type SparkleMouse from './index.js';
import type { SparkleData } from './index.js';



/**
 * Props for SparkleMouseCanvas. Any other props are passed on to the canvas element.
 */
export interface SparkleMouseCanvasProps extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'onError'> {
    /** URL path, raw .sparkle file content, or settings object. Uses default sparkles if not provided. Changing this restarts the sparkles, so keep objects stable (e.g. define them outside the component or use useMemo). */
    sparkle?: SparkleData;
    /** Global scale multiplier. >1 makes sparkles bigger, <1 makes sparkles smaller. Default is 1. */
    scale?: number;
    /** Pauses rendering. Default is false. */
    paused?: boolean;
    /** Set to false to disable cursor tracking. Default is true. */
    cursorTracking?: boolean;
    /** Set to false to stop rendering while the canvas is out of view. Default is true. */
    outOfViewRendering?: boolean;
    /** Called with the SparkleMouse instance every time it (re)starts. */
    onStart?: (sparkleMouse: SparkleMouse) => void;
    /** Called when starting fails. Errors are logged to the console if not provided. */
    onError?: (error: unknown) => void;
}



/**
 * Sparkle Mouse 🐁✨ as a React component. Renders a canvas and runs sparkles on it.
 * The ref gives access to the SparkleMouse instance (null until mounted). Everything is released when the component unmounts.
 */
export declare const SparkleMouseCanvas: ForwardRefExoticComponent<SparkleMouseCanvasProps & RefAttributes<SparkleMouse>>;

export default SparkleMouseCanvas;
