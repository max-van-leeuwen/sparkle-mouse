// @ts-check
// React component for sparkle-mouse, type checked against types/react.d.ts (npm run typecheck)



import { createElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import SparkleMouse from 'sparkle-mouse'; // by package name, so the core stays a separate (shared) import



/**
 * Sparkle Mouse 🐁✨ as a React component. Renders a canvas and runs sparkles on it.
 * The ref gives access to the SparkleMouse instance. Everything is released when the component unmounts.
 * All props are documented in types/react.d.ts, any other props are passed on to the canvas element.
 *
 * @type {typeof import('../types/react.js').SparkleMouseCanvas}
 * @example
 * <SparkleMouseCanvas sparkle="/templates/mysparkle.sparkle" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
 */
const SparkleMouseCanvas = forwardRef(function SparkleMouseCanvas(props, ref) {
    const {
        sparkle,
        scale = 1,
        paused = false,
        cursorTracking = true,
        outOfViewRendering = true,
        onStart,
        onError,
        ...canvasProps
    } = props;

    /** @type {import('react').RefObject<HTMLCanvasElement | null>} */
    const canvasRef = useRef(null);
    /** @type {[SparkleMouse | undefined, (instance: SparkleMouse) => void]} */
    const [sparkleMouse, setSparkleMouse] = useState();

    // latest props, applied after every (re)start
    const latest = useRef(props);
    latest.current = props;

    // start() and destroy() are async, run them in order so they can't overlap
    const queue = useRef(Promise.resolve());
    /** @param {() => Promise<void>} task */
    const enqueue = (task) => {
        queue.current = queue.current.then(task).catch((error) => {
            if (latest.current.onError) latest.current.onError(error);
            else console.error(error);
        });
    };

    // @ts-expect-error React's types don't allow a null handle, but it's null until mounted like any React ref
    useImperativeHandle(ref, () => sparkleMouse || null, [sparkleMouse]);

    // create the instance for the canvas, release everything on unmount
    useEffect(() => {
        const instance = new SparkleMouse(canvasRef.current);
        setSparkleMouse(instance);
        return () => enqueue(() => instance.destroy());
    }, []);

    // start, and restart when the sparkle changes
    useEffect(() => {
        if (!sparkleMouse) return;
        let active = true;
        enqueue(async () => {
            if (!active) return; // a newer sparkle came in before this one started
            await sparkleMouse.start(sparkle);
            // start() resets these, apply them again
            if (latest.current.paused) sparkleMouse.pause();
            sparkleMouse.setCursorTracking(latest.current.cursorTracking !== false);
            if (latest.current.onStart) latest.current.onStart(sparkleMouse);
        });
        return () => {
            active = false;
        };
    }, [sparkleMouse, sparkle]);

    // keep the instance in sync with props
    useEffect(() => {
        if (sparkleMouse) sparkleMouse.setScale(scale);
    }, [sparkleMouse, scale]);

    useEffect(() => {
        if (sparkleMouse) sparkleMouse.setOutOfViewRendering(outOfViewRendering);
    }, [sparkleMouse, outOfViewRendering]);

    useEffect(() => {
        if (!sparkleMouse || !sparkleMouse.isStarted || sparkleMouse.isPaused === paused) return;
        if (paused) sparkleMouse.pause();
        else sparkleMouse.resume();
    }, [sparkleMouse, paused]);

    useEffect(() => {
        if (sparkleMouse && sparkleMouse.isStarted) sparkleMouse.setCursorTracking(cursorTracking);
    }, [sparkleMouse, cursorTracking]);

    return createElement('canvas', { ...canvasProps, ref: canvasRef });
});



export { SparkleMouseCanvas };
export default SparkleMouseCanvas;
