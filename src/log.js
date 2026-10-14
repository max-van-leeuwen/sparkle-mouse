// simple logging to terminal



import { invoke } from '@tauri-apps/api/core';
const doLogging = __DO_LOGGING__;



// log to terminal
export async function log(...str) {
    if (!doLogging) return;
    const message = str.join(' ');
    try {
        await invoke('log_to_terminal', { message: message });
    } catch (error) {}
};



// error logging
export async function logError(message, error) {
    await log(`${message}: ${error}`);
    if (error?.stack){
        await log(`Stack trace: ${error.stack}`);
    }
};