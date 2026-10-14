// optional logging function, e.g. terminal logging from Tauri app.

// internal logger reference
let loggerFn = null;

// configure the logger (call this from Tauri app initialization)
export function setLogger(logFn) {
    loggerFn = logFn;
}

// log function (falls back to console.log if logger not configured)
export async function log(...args) {
    if (loggerFn) {
        await loggerFn(...args);
    } else {
        console.log(...args);
    }
}
