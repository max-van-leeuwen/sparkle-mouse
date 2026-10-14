// prepares textures for use in .sparkle files



import { log } from './logger.js';
import { GifReader } from 'omggif';
import UPNG from 'upng-js';



// params
const MAX_TEXTURE_SIZE = 4096;



// accepts file paths, Image objects, GIFs, and APNGs
// pass a custom readFile(path) where fetch() can't reach the path
export async function process(images, { readFile = defaultReadFile } = {}) {
    let allFrames = [];
    let imageCounts = []; // frame count per file
    let cycleCounts = []; // cycles per file (0 = infinite)
    let animationSpeeds = []; // collect animation speeds (GIF/APNG) for averaging

    // check type
    for (const img of images){
        if (img instanceof HTMLImageElement){ // image
            allFrames.push(img);
            imageCounts.push(1);
            cycleCounts.push(0);
        }else if (typeof img === 'string' && img.toLowerCase().endsWith('.gif')){ // path to GIF
            const fileData = await readFile(img);
            try {
                const gifData = await loadGif(fileData);
                allFrames.push(...gifData.frames);
                imageCounts.push(gifData.frames.length);
                cycleCounts.push(gifData.loopCount);
                
                // collect valid GIF speeds for averaging
                if (gifData.fps && !isNaN(gifData.fps) && gifData.fps > 0) {
                    animationSpeeds.push(gifData.fps);
                }
            } catch (error) {
                // file has .gif extension but isn't a valid GIF, check if actually APNG
                if (isAPNG(fileData)) {
                    try {
                        const apngData = await loadAPNG(fileData);
                        allFrames.push(...apngData.frames);
                        imageCounts.push(apngData.frames.length);
                        cycleCounts.push(apngData.loopCount);
                        
                        if (apngData.fps && !isNaN(apngData.fps) && apngData.fps > 0) {
                            animationSpeeds.push(apngData.fps);
                        }
                    } catch (apngError) {
                        // load as static image
                        const loaded = await loadImage(fileData, img);
                        allFrames.push(loaded);
                        imageCounts.push(1);
                        cycleCounts.push(0);
                    }
                } else {
                    // load as static image
                    const loaded = await loadImage(fileData, img);
                    allFrames.push(loaded);
                    imageCounts.push(1);
                    cycleCounts.push(0);
                }
            }
        }else{ // path to image
            const fileData = await readFile(img);
            
            if (isAPNG(fileData)) {
                try {
                    const apngData = await loadAPNG(fileData);
                    allFrames.push(...apngData.frames);
                    imageCounts.push(apngData.frames.length);
                    cycleCounts.push(apngData.loopCount);
                    
                    if (apngData.fps && !isNaN(apngData.fps) && apngData.fps > 0) {
                        animationSpeeds.push(apngData.fps);
                    }
                } catch (error) {
                    // load as static image
                    const loaded = await loadImage(fileData, img);
                    allFrames.push(loaded);
                    imageCounts.push(1);
                    cycleCounts.push(0);
                }
            } else {
                // load as static image
                const loaded = await loadImage(fileData, img);
                allFrames.push(loaded);
                imageCounts.push(1);
                cycleCounts.push(0);
            }
        }
    }
    
    // calculate average animation speed (null if no animated images)
    const averageAnimationSpeed = animationSpeeds.length > 0 
        ? animationSpeeds.reduce((sum, speed) => sum + speed, 0) / animationSpeeds.length 
        : null;
    
    const loadedImages = allFrames;

    // cell size dims
    let maxWidth = 0;
    let maxHeight = 0;
    loadedImages.forEach(img => {
        maxWidth = Math.max(maxWidth, img.width);
        maxHeight = Math.max(maxHeight, img.height);
    });

    // grid layout
    const imageCount = loadedImages.length;
    const cols = Math.ceil(Math.sqrt(imageCount));
    const rows = Math.ceil(imageCount / cols);

    // texture size
    let cellWidth = maxWidth;
    let cellHeight = maxHeight;
    let textureWidth = cellWidth * cols;
    let textureHeight = cellHeight * rows;

    // fit to MAX_TEXTURE_SIZE
    if (textureWidth > MAX_TEXTURE_SIZE || textureHeight > MAX_TEXTURE_SIZE) {
        const scaleX = MAX_TEXTURE_SIZE / textureWidth;
        const scaleY = MAX_TEXTURE_SIZE / textureHeight;
        const scale = Math.min(scaleX, scaleY);
        
        cellWidth = Math.floor(cellWidth * scale);
        cellHeight = Math.floor(cellHeight * scale);
        textureWidth = cellWidth * cols;
        textureHeight = cellHeight * rows;
    }

    // transparent canvas
    const canvas = document.createElement('canvas');
    canvas.width = textureWidth;
    canvas.height = textureHeight;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, textureWidth, textureHeight);

    // draw images
    loadedImages.forEach((img, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * cellWidth;
        const y = row * cellHeight;
        const scaleX = cellWidth / img.width;
        const scaleY = cellHeight / img.height;
        const scale = Math.min(scaleX, scaleY);
        
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        
        // center within cell
        const offsetX = (cellWidth - scaledWidth) / 2;
        const offsetY = (cellHeight - scaledHeight) / 2;

        ctx.drawImage(img, x + offsetX, y + offsetY, scaledWidth, scaledHeight);
    });

    const base64 = canvas.toDataURL('image/png');
    const aspectRatio = cellWidth / cellHeight;

    return {
        base64,
        rows,
        cols,
        imageCount,
        cellWidth,
        cellHeight,
        textureWidth,
        textureHeight,
        animationSpeed: averageAnimationSpeed, // average of all animation speeds (GIF/APNG), or null
        aspectRatio,
        imageCounts, // frame count per file
        cycleCounts, // loop count per file
    };
}



// load image from path
async function loadImage(fileData, filePath) {
    const base64 = btoa( // convert to base64
        fileData.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    // get image type
    const extension = filePath.split('.').pop().toLowerCase();
    const mimeTypes = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'bmp': 'image/bmp',
    };
    const mimeType = mimeTypes[extension] || 'image/png'; // default to png
    
    // load
    const dataUrl = `data:${mimeType};base64,${base64}`;
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = (error) => {
            reject(new Error(`Failed to load image: ${filePath}`));
        };

        img.src = dataUrl;
    });
}



// load GIF from path (creates array of images and related animation data)
async function loadGif(fileData) {
    const gifReader = new GifReader(new Uint8Array(fileData)); // parse using omggif
    const numFrames = gifReader.numFrames();
    const gifWidth = gifReader.width;
    const gifHeight = gifReader.height;
    
    // Get loop count from GIF
    // null from GIF = play once (convert to 1)
    // 0 = infinite loop
    // n = loop n times
    const rawLoopCount = gifReader.loopCount();
    const loopCount = rawLoopCount === null ? 1 : rawLoopCount;
    
    // get avg FPS from frame delays (assume all the same length)
    let totalDelay = 0;
    for (let i = 0; i < numFrames; i++){
        const frameInfo = gifReader.frameInfo(i);
        totalDelay += frameInfo.delay || 10; // delay (centiseconds)
    }
    const avgDelay = totalDelay / numFrames;
    const fps = 100 / avgDelay; // centiseconds -> FPS
    
    // canvas
    const canvas = document.createElement('canvas');
    canvas.width = gifWidth;
    canvas.height = gifHeight;
    const ctx = canvas.getContext('2d');

    const imageFrames = [];
    
    // canvas storing the frame before disposal (for disposal method 3)
    const savedCanvas = document.createElement('canvas');
    savedCanvas.width = gifWidth;
    savedCanvas.height = gifHeight;
    const savedCtx = savedCanvas.getContext('2d');
    
    for (let i = 0; i < numFrames; i++){
        
        // dispose previous frame
        if (i > 0){
            const prevFrameInfo = gifReader.frameInfo(i - 1);
            const prevDisposal = prevFrameInfo.disposal;
            
            if (prevDisposal === 2) {
                ctx.clearRect(0, 0, gifWidth, gifHeight); // transparent
            } else if (prevDisposal === 3) {
                ctx.clearRect(0, 0, gifWidth, gifHeight);
                ctx.drawImage(savedCanvas, 0, 0); // restore to previous saved state
            }
            // for disposal 0 or 1, keep the canvas as-is (frame layers on top)
        }
        
        // save canvas for potential disposal method 3
        savedCtx.clearRect(0, 0, gifWidth, gifHeight);
        savedCtx.drawImage(canvas, 0, 0);
        
        // decode frame
        const framePixels = new Uint8ClampedArray(gifWidth * gifHeight * 4);
        gifReader.decodeAndBlitFrameRGBA(i, framePixels);
        
        // create temporary canvas to draw frame with alpha compositing
        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = gifWidth;
        frameCanvas.height = gifHeight;
        const frameCtx = frameCanvas.getContext('2d');
        const imageData = new ImageData(framePixels, gifWidth, gifHeight);
        frameCtx.putImageData(imageData, 0, 0);
        
        // composite to main
        ctx.drawImage(frameCanvas, 0, 0);
        
        // convert to image
        const img = await new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = canvas.toDataURL();
        });
        
        imageFrames.push(img);
    }
    
    return {
        frames: imageFrames,
        fps,
        loopCount
    };
}



// check if PNG file is an APNG (has acTL chunk)
function isAPNG(fileData) {
    const bytes = new Uint8Array(fileData);
    
    // PNG signature
    if (bytes.length < 8 || bytes[0] !== 0x89 || bytes[1] !== 0x50 || 
        bytes[2] !== 0x4E || bytes[3] !== 0x47) {
        return false;
    }
    
    // look for acTL Animation Control chunk
    let pos = 8; // skip PNG signature
    while (pos < bytes.length - 8) {
        const chunkLength = (bytes[pos] << 24) | (bytes[pos + 1] << 16) | 
                           (bytes[pos + 2] << 8) | bytes[pos + 3];
        const chunkType = String.fromCharCode(
            bytes[pos + 4], bytes[pos + 5], bytes[pos + 6], bytes[pos + 7]
        );
        
        if (chunkType === 'acTL') return true;
        if (chunkType === 'IEND') break; // IEND marks end of PNG
        pos += 12 + chunkLength; // length (4) + type (4) + data (length) + CRC (4)
    }
    
    return false;
}



// load APNG from file data, creates array of images and animation data
async function loadAPNG(fileData) {
    const img = UPNG.decode(fileData);
    const numFrames = img.frames.length;
    const width = img.width;
    const height = img.height;
    const loopCount = img.tabs?.acTL?.num_plays ?? 0; // 0 = infinite
    
    // calculate average FPS from frame delays
    let totalDelay = 0;
    for (let i = 0; i < numFrames; i++) {
        const delay = img.frames[i].delay || 100; // ms
        await log(`APNG frame ${i} delay: ${delay}ms`);
        totalDelay += delay;
    }
    const avgDelay = totalDelay / numFrames;
    const fps = 1000 / avgDelay; // ms to FPS
    
    await log(`APNG total delay: ${totalDelay}ms, avg delay: ${avgDelay}ms, calculated FPS: ${fps}`);
    
    // convert each frame to Image object
    const imageFrames = [];
    for (let i = 0; i < numFrames; i++) {
        const rgba = UPNG.toRGBA8(img)[i];
        
        // canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // put pixel data on canvas
        const imageData = new ImageData(new Uint8ClampedArray(rgba), width, height);
        ctx.putImageData(imageData, 0, 0);
        
        // convert to Image
        const image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = canvas.toDataURL();
        });
        
        imageFrames.push(image);
    }
    
    return {
        frames: imageFrames,
        fps,
        loopCount
    };
}



// default file reader for web usage
async function defaultReadFile(filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}