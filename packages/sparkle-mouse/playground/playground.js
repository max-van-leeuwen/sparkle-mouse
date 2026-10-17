// playground for working on the package, uses src directly (npm run dev)



import SparkleMouse from '../src/index.js';



const templates = {
    default: SparkleMouse.defaultSparkle,
    turbulence: { ...SparkleMouse.defaultSparkle, turbulence: 0.5 },
    big: { ...SparkleMouse.defaultSparkle, size: 0.5, amount: 1 },
};

let sparkleMouse = null;
let demo = false;
const log = (text) => document.getElementById('log').textContent = text;
const on = (id, fn) => document.getElementById(id).addEventListener('click', fn);
const selected = () => templates[document.getElementById('template').value];



on('start', async () => {
    if (!sparkleMouse) sparkleMouse = new SparkleMouse(); // full screen canvas
    await sparkleMouse.start(selected());
    log('started, move your mouse');
});

on('pause', () => {
    if (!sparkleMouse) return;
    if (sparkleMouse.isPaused) sparkleMouse.resume();
    else sparkleMouse.pause();
    log(sparkleMouse.isPaused ? 'paused' : 'resumed');
});

on('stop', async () => {
    if (sparkleMouse) await sparkleMouse.stop();
    log('stopped');
});

on('destroy', async () => {
    if (sparkleMouse && sparkleMouse.destroy) await sparkleMouse.destroy();
    sparkleMouse = null;
    log('destroyed');
});

on('demo', () => {
    if (!sparkleMouse) return;
    demo = !demo;
    sparkleMouse.setDemoShapesDrawing(demo);
    if (!demo) sparkleMouse.setCursorTracking(true);
    log(demo ? 'drawing demo shapes' : 'back to the cursor');
});

// simulates the GPU resetting (e.g. after the system sleeps)
on('restore', async () => {
    if (!sparkleMouse) return;
    const lose = sparkleMouse.getCanvas().getContext('webgl2').getExtension('WEBGL_lose_context');
    lose.loseContext();
    await new Promise((resolve) => setTimeout(resolve, 500));
    lose.restoreContext();
    log('webgl context lost and restored');
});

document.getElementById('template').addEventListener('change', async () => {
    if (sparkleMouse && sparkleMouse.isStarted) await sparkleMouse.start(selected());
});

log('press start');
