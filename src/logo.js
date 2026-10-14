// sparkle mouse logo animator

import a from './assets/logo/A.jpg';
import blink from './assets/logo/Blink.jpg';
import standard from './assets/logo/Standard.jpg';

import activate0001 from './assets/logo/activate/0001.jpg';
import activate0001A from './assets/logo/activate/0001_A.jpg';
import activate0002 from './assets/logo/activate/0002.jpg';
import activate0002A from './assets/logo/activate/0002_A.jpg';
import activate0003 from './assets/logo/activate/0003.jpg';
import activate0003A from './assets/logo/activate/0003_A.jpg';
import activate0004 from './assets/logo/activate/0004.jpg';
import activate0004A from './assets/logo/activate/0004_A.jpg';
import activate0005 from './assets/logo/activate/0005.jpg';
import activate0005A from './assets/logo/activate/0005_A.jpg';
import activate0006 from './assets/logo/activate/0006.jpg';
import activate0006A from './assets/logo/activate/0006_A.jpg';
import activate0007 from './assets/logo/activate/0007.jpg';
import activate0007A from './assets/logo/activate/0007_A.jpg';
import activate0008 from './assets/logo/activate/0008.jpg';
import activate0008A from './assets/logo/activate/0008_A.jpg';
import activate0009 from './assets/logo/activate/0009.jpg';
import activate0009A from './assets/logo/activate/0009_A.jpg';
import activate0010 from './assets/logo/activate/0010.jpg';
import activate0010A from './assets/logo/activate/0010_A.jpg';
import activate0011 from './assets/logo/activate/0011.jpg';
import activate0011A from './assets/logo/activate/0011_A.jpg';
import activate0012 from './assets/logo/activate/0012.jpg';
import activate0012A from './assets/logo/activate/0012_A.jpg';
import activate0013 from './assets/logo/activate/0013.jpg';
import activate0013A from './assets/logo/activate/0013_A.jpg';
import activate0014 from './assets/logo/activate/0014.jpg';
import activate0014A from './assets/logo/activate/0014_A.jpg';
import activate0015 from './assets/logo/activate/0015.jpg';
import activate0015A from './assets/logo/activate/0015_A.jpg';
import activate0016 from './assets/logo/activate/0016.jpg';
import activate0016A from './assets/logo/activate/0016_A.jpg';
import activate0017 from './assets/logo/activate/0017.jpg';
import activate0017A from './assets/logo/activate/0017_A.jpg';
import activate0018 from './assets/logo/activate/0018.jpg';
import activate0018A from './assets/logo/activate/0018_A.jpg';
import activate0019 from './assets/logo/activate/0019.jpg';
import activate0019A from './assets/logo/activate/0019_A.jpg';

import eyeroll0001 from './assets/logo/eyeroll/0001.jpg';
import eyeroll0002 from './assets/logo/eyeroll/0002.jpg';
import eyeroll0003 from './assets/logo/eyeroll/0003.jpg';
import eyeroll0004 from './assets/logo/eyeroll/0004.jpg';
import eyeroll0005 from './assets/logo/eyeroll/0005.jpg';
import eyeroll0006 from './assets/logo/eyeroll/0006.jpg';
import eyeroll0007 from './assets/logo/eyeroll/0007.jpg';
import eyeroll0008 from './assets/logo/eyeroll/0008.jpg';
import eyeroll0009 from './assets/logo/eyeroll/0009.jpg';
import eyeroll0010 from './assets/logo/eyeroll/0010.jpg';
import eyeroll0011 from './assets/logo/eyeroll/0011.jpg';
import eyeroll0012 from './assets/logo/eyeroll/0012.jpg';


const activateFrames = [
    activate0001,
    activate0002,
    activate0003,
    activate0004,
    activate0005,
    activate0006,
    activate0007,
    activate0008,
    activate0009,
    activate0010,
    activate0011,
    activate0012,
    activate0013,
    activate0014,
    activate0015,
    activate0016,
    activate0017,
    activate0018,
    activate0019
];

const activateAlphaFrames = [
    activate0001A,
    activate0002A,
    activate0003A,
    activate0004A,
    activate0005A,
    activate0006A,
    activate0007A,
    activate0008A,
    activate0009A,
    activate0010A,
    activate0011A,
    activate0012A,
    activate0013A,
    activate0014A,
    activate0015A,
    activate0016A,
    activate0017A,
    activate0018A,
    activate0019A
];

const eyerollFrames = [
    eyeroll0001,
    eyeroll0002,
    eyeroll0003,
    eyeroll0004,
    eyeroll0005,
    eyeroll0006,
    eyeroll0007,
    eyeroll0008,
    eyeroll0009,
    eyeroll0010,
    eyeroll0011,
    eyeroll0012
];

// precompute transparent images (alpha channels are stored in separate red channels for compression)
let activateTransparent = [];
let eyerollTransparent = [];
let standardTransparent = null;
let blinkTransparent = null;

// combine RGB + A (from r)
async function combineRGBWithAlpha(rgbSrc, alphaSrc) {
    const rgbImg = new Image();
    const alphaImg = new Image();
    
    await Promise.all([
        new Promise(resolve => {
            rgbImg.onload = resolve;
            rgbImg.src = rgbSrc;
        }),
        new Promise(resolve => {
            alphaImg.onload = resolve;
            alphaImg.src = alphaSrc;
        })
    ]);
    
    const canvas = document.createElement('canvas');
    canvas.width = rgbImg.width;
    canvas.height = rgbImg.height;
    const ctx = canvas.getContext('2d');
    
    // rgb
    ctx.drawImage(rgbImg, 0, 0);
    const rgbData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // a
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(alphaImg, 0, 0);
    const alphaData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < rgbData.data.length; i += 4) {
        rgbData.data[i + 3] = alphaData.data[i];
    }
    
    ctx.putImageData(rgbData, 0, 0);
    return canvas.toDataURL();
}

async function precomputeTransparentImages() {
    activateTransparent = await Promise.all(
        activateFrames.map((frame, i) => combineRGBWithAlpha(frame, activateAlphaFrames[i]))
    );
    eyerollTransparent = await Promise.all(
        eyerollFrames.map(frame => combineRGBWithAlpha(frame, a))
    );
    standardTransparent = await combineRGBWithAlpha(standard, a);
    blinkTransparent = await combineRGBWithAlpha(blink, a);
}

// eyeroll frame based on angle (deg)
export function getEyeroll(degrees) {
    if(!checkIfLoaded()) return
    let normalizedAngle = degrees % 360;
    if (normalizedAngle < 0) normalizedAngle += 360;
    const frameIndex = Math.floor((normalizedAngle / 360) * 12) % 12;
    return eyerollTransparent[frameIndex];
}

export function getBlink() {
    if(!checkIfLoaded()) return
    return blinkTransparent;
}

export function getStandard() {
    if(!checkIfLoaded()) return
    return standardTransparent;
}

export function getLastActivateFrame() {
    if(!checkIfLoaded()) return
    return activateTransparent[activateTransparent.length - 1];
}

export function getActivateFrameCount() {
    if(!checkIfLoaded()) return
    return activateTransparent.length;
}

export function doActivate(startFrame, fwd, callback, onEnd) {
    const totalTime = fwd ? 100 : 200; // ms
    const frameCount = activateTransparent.length;
    const frameDuration = totalTime / frameCount;
    let currentFrame = startFrame !== null ? startFrame : (fwd ? 0 : frameCount - 1);
    const direction = fwd ? 1 : -1;
    let stopped = false;
    
    const interval = setInterval(() => {
        if (activateTransparent.length === 0 || stopped) {
            clearInterval(interval);
            return;
        }
        callback(activateTransparent[currentFrame], currentFrame);
        currentFrame += direction;
        if ((fwd && currentFrame >= frameCount) || (!fwd && currentFrame < 0)) {
            clearInterval(interval);
            if (onEnd) onEnd();
        }
    }, frameDuration);
    
    return {
        stop: () => {
            stopped = true;
            clearInterval(interval);
        },
        getCurrentFrame: () => currentFrame - direction
    };
}

// precalculate all images right away
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', async () => {
        await precomputeTransparentImages();
    });
}

function checkIfLoaded() {
    return activateTransparent && eyerollTransparent && standardTransparent && blinkTransparent
}