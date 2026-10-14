// demo shapes drawing



import { log } from './logger.js';
import { rotatePoint, remap } from './helpers.js';



const portraitScalar = 1.5; // multiplier for shape scale on portrait devices, looks better



// convert screen position to canvas/world position
function screenToCanvas(screenX, screenY, rendererAPI, cursorAPI) {
    const screenSize = cursorAPI.lastScreenSize; // use cached screen size
    const canvas = rendererAPI.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    
    // convert window coordinates to canvas-relative
    const canvasX = screenX - rect.left;
    const canvasY = screenY - rect.top;
    
    // convert to normalized screen space (-1 to 1)
    const normalizedX = (canvasX / screenSize.x) * 2 - 1;
    const normalizedY = 1 - 2 * (canvasY / screenSize.y);
    
    // convert to world coordinates based on camera bounds
    const aspect = rendererAPI.aspect;
    const cameraScale = rendererAPI.cameraScale;
    
    let worldX, worldY;
    if (aspect >= 1) {
        worldX = normalizedX * aspect / 2 * cameraScale;
        worldY = normalizedY * 0.5 * cameraScale;
    } else {
        worldX = normalizedX * 0.5 * cameraScale;
        worldY = normalizedY * 1 / (2 * aspect) * cameraScale;
    }
    
    return { x: worldX, y: worldY };
}

// convert canvas/world position to screen position
function canvasToScreen(worldX, worldY, rendererAPI, cursorAPI) {
    const canvas = rendererAPI.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const screenSize = cursorAPI.lastScreenSize; // use cached screen size
    const aspect = rendererAPI.aspect;
    const cameraScale = rendererAPI.cameraScale;
    
    // convert world to normalized screen space (-1 to 1)
    let normalizedX, normalizedY;
    if (aspect >= 1) {
        normalizedX = worldX / (aspect / 2 * cameraScale);
        normalizedY = worldY / (0.5 * cameraScale);
    } else {
        normalizedX = worldX / (0.5 * cameraScale);
        normalizedY = worldY / (1 / (2 * aspect) * cameraScale);
    }
    
    // convert to canvas-relative pixels
    const canvasX = (normalizedX + 1) / 2 * screenSize.x;
    const canvasY = (1 - normalizedY) / 2 * screenSize.y;
    
    // convert to window coordinates
    const screenX = canvasX + rect.left;
    const screenY = canvasY + rect.top;
    
    return { x: screenX, y: screenY };
}

// draw demo shapes
export function demoShapesDrawing(cursorAPI, rendererAPI, enabled, shapes, scale = 1) {
    if (!cursorAPI || !rendererAPI) return;
    if (enabled && !shapes) return; // no shapes given

    const scaleRange = [.2, .4];
    const baseMargin = 0.15;

    if (enabled) {
        // weighted random selection for initial shape
        const totalWeight = shapes.reduce((sum, shape) => sum + shape.weight, 0);
        let random = Math.random() * totalWeight;
        let shapeIndex = 0;
        for (let i = 0; i < shapes.length; i++) {
            random -= shapes[i].weight;
            if (random <= 0) {
                shapeIndex = i;
                break;
            }
        }
        let isPaused = false;
        let pauseStartTime = 0;
        const pauseDuration = 2000; // ms
        const baseDuration = 2000; // ms
        let currentShapeDuration = baseDuration;
        let shapeStartTime = 0;
        
        // generate random transformations for current shape (recalculated when shape changes)
        let shapeRotation = 0;
        let shapeStretch = 1;
        let shapeScale = 1;
        let shapeOffsetX = 0;
        let shapeOffsetY = 0;
        let lockedCanvasX = 0; // locked canvas/world X position
        let lockedCanvasY = 0; // locked canvas/world Y position
        
        const generateShapeTransform = (shape) => {
            shapeRotation = shape.rotate ? Math.random() * Math.PI * 2 : 0; // random rotation
            shapeStretch = shape.stretch ? remap(Math.random(), 0, 1, 0.6, 1.6) : 1; // stretch x-axis randomly
            shapeScale = remap(Math.random(), 0, 1, scaleRange[0], scaleRange[1]) * scale;                    
            const speedMultiplier = remap(shapeScale / scale, scaleRange[0], scaleRange[1], 1, 2); // slower when bigger
            const shapeSpeedMultiplier = shape.speed; // use shape's speed setting
            currentShapeDuration = (baseDuration * speedMultiplier) / shapeSpeedMultiplier;
            
            // calculate bounding box of transformed shape
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            if (shape.avoidEdges){
                // transform all points to find actual bounds
                for (const point of shape.points){
                    let x = point.x;
                    let y = point.y;
                    
                    // apply stretch
                    if (shape.stretch) x *= shapeStretch;
                    
                    // apply rotation
                    const rotated = rotatePoint(x, y, shapeRotation);
                    x = rotated.x;
                    y = rotated.y;
                    
                    // apply scale
                    const screenWidth = window.innerWidth;
                    const screenHeight = window.innerHeight;
                    const screenScale = screenWidth < screenHeight ? Math.hypot(screenWidth, screenHeight) * portraitScalar : Math.min(screenWidth, screenHeight); // dims min for landscape, max for portrait
                    const scaleFactor = screenScale * shapeScale;
                    x *= scaleFactor;
                    y *= scaleFactor;
                    
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
                
                // calculate margins based on bounding box (in screen space)
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const marginLeft = Math.abs(minX) / screenWidth;
                const marginRight = Math.abs(maxX) / screenWidth;
                const marginTop = Math.abs(maxY) / screenHeight;
                const marginBottom = Math.abs(minY) / screenHeight;
                
                // random position with calculated margins
                shapeOffsetX = remap(Math.random(), 0, 1, marginLeft, 1 - marginRight);
                shapeOffsetY = remap(Math.random(), 0, 1, marginTop, 1 - marginBottom);
            } else {
                // use simple margin for shapes that don't avoid edges
                const stretchMargin = shape.stretch ? baseMargin * shapeStretch * 0.5 : baseMargin;
                shapeOffsetX = remap(Math.random(), 0, 1, stretchMargin, 1 - stretchMargin);
                shapeOffsetY = remap(Math.random(), 0, 1, baseMargin, 1 - baseMargin);
            }
            
            // convert initial screen position to canvas position and lock it
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const screenX = screenWidth * shapeOffsetX;
            const screenY = screenHeight * shapeOffsetY;
            const canvasPos = screenToCanvas(screenX, screenY, rendererAPI, cursorAPI);
            lockedCanvasX = canvasPos.x;
            lockedCanvasY = canvasPos.y;
        };
        
        // initialize first shape transform
        generateShapeTransform(shapes[shapeIndex]);
        shapeStartTime = Date.now();
        cursorAPI.breakInterpolation = true; // prevent interpolation from previous cursor position
        
        const animateShapes = () => {
            if (!cursorAPI.isDemoShapesDrawing) return;
            const now = Date.now();

            // pause between shapes
            if (isPaused) {
                if (now - pauseStartTime >= pauseDuration) {
                    // check if canvas is in viewport before starting new shape
                    const canvas = rendererAPI.renderer.domElement;
                    const rect = canvas.getBoundingClientRect();
                    const isInView = rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
                    
                    if (!isInView) {
                        // canvas not visible, skip starting new shape and reset timer
                        // const canvasName = canvas.id || canvas.className || 'canvas';
                        pauseStartTime = now; // reset pause to check again after pauseDuration
                        cursorAPI.demoAnimationFrameId = requestAnimationFrame(animateShapes);
                        return;
                    }
                    
                    // canvas is visible, proceed with new shape
                    isPaused = false;

                    // avoid same shape twice in a row (unless it has stretch)
                    let newShapeIndex;
                    do {
                        // weighted random selection based on shape.weight
                        const totalWeight = shapes.reduce((sum, shape) => sum + shape.weight, 0);
                        let random = Math.random() * totalWeight;
                        for (let i = 0; i < shapes.length; i++) {
                            random -= shapes[i].weight;
                            if (random <= 0) {
                                newShapeIndex = i;
                                break;
                            }
                        }
                    } while (
                        newShapeIndex === shapeIndex && 
                        !shapes[newShapeIndex].stretch && 
                        shapes.length > 1
                    );
                    
                    shapeIndex = newShapeIndex;
                    
                    generateShapeTransform(shapes[shapeIndex]);
                    shapeStartTime = now;
                    cursorAPI.breakInterpolation = true;
                }else {
                    cursorAPI.demoAnimationFrameId = requestAnimationFrame(animateShapes);
                    return;
                }
            }
            
            const currentShape = shapes[shapeIndex];
            const elapsed = now - shapeStartTime;
            const t = Math.min(elapsed / currentShapeDuration, 1); // 0-1 progress through shape
            
            if (t < 1) {
                // interpolate position along shape points
                const pointCount = currentShape.points.length;
                const exactIndex = t * (pointCount - 1);
                const index0 = Math.floor(exactIndex);
                const index1 = Math.min(index0 + 1, pointCount - 1);
                const localT = exactIndex - index0;
                
                // lerp between two points
                const point0 = currentShape.points[index0];
                const point1 = currentShape.points[index1];
                const interpolatedX = point0.x + (point1.x - point0.x) * localT;
                const interpolatedY = point0.y + (point1.y - point0.y) * localT;

                // apply transformations to the interpolated point
                let transformedX = interpolatedX;
                let transformedY = interpolatedY;
                
                // stretch
                if (currentShape.stretch) transformedX *= shapeStretch;
                
                // rotation
                const rotated = rotatePoint(transformedX, transformedY, shapeRotation);
                transformedX = rotated.x;
                transformedY = rotated.y;
                
                // scale to canvas units
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const screenScale = screenWidth < screenHeight ? Math.hypot(screenWidth, screenHeight) * portraitScalar : Math.min(screenWidth, screenHeight); // dims min for landscape, max for portrait
                const aspect = rendererAPI.aspect;
                const cameraScale = rendererAPI.cameraScale;
                
                // convert screen-based scale to canvas units
                let canvasScaleFactor;
                if (aspect >= 1) {
                    canvasScaleFactor = (aspect * cameraScale) / screenWidth;
                } else {
                    canvasScaleFactor = (cameraScale) / screenHeight;
                }
                
                const canvasScale = screenScale * shapeScale * canvasScaleFactor;
                transformedX *= canvasScale;
                transformedY *= canvasScale;
                
                // position in canvas space (locked to initial canvas position)
                const canvasX = lockedCanvasX + transformedX;
                const canvasY = lockedCanvasY + transformedY; // canvas Y increases upward
                
                // convert back to screen coordinates for drawing
                const screenPos = canvasToScreen(canvasX, canvasY, rendererAPI, cursorAPI);
                cursorAPI.emulateCursorPosition({x: screenPos.x, y: screenPos.y});
            }else {
                cursorAPI.breakInterpolation = true;

                // finished current shape, start pause
                isPaused = true;
                pauseStartTime = now;
            }
            
            cursorAPI.demoAnimationFrameId = requestAnimationFrame(animateShapes);
        };
        
        cursorAPI.isDemoShapesDrawing = true;
        animateShapes();
    }else{
        cursorAPI.breakInterpolation = true;
        cursorAPI.isDemoShapesDrawing = false;
        if (cursorAPI.demoAnimationFrameId !== null && cursorAPI.demoAnimationFrameId !== undefined) {
            cancelAnimationFrame(cursorAPI.demoAnimationFrameId);
            cursorAPI.demoAnimationFrameId = null;
        }
    }
}
