// Sparkle Mouse - Bundled Version

import SparkleMouse from 'sparkle-mouse';
import { shapeHeart, shapeSquiggly, shapeStar, shapeSwirl } from 'sparkle-mouse/shapes';

// Global instance for simple API
let globalInstance = null;

/**
 * Start sparkle mouse with optional settings
 * @param {Object|string} settings - Sparkle settings object or .sparkle file content/URL
 * @param {HTMLCanvasElement} canvas - Optional canvas element
 * @returns {Promise<SparkleMouse>} The sparkle mouse instance
 */
async function start(settings, canvas) {
  if (globalInstance) {
    await globalInstance.stop();
  }
  globalInstance = new SparkleMouse(canvas);
  await globalInstance.start(settings);
  return globalInstance;
}

/**
 * Stop and cleanup sparkle mouse
 */
async function stop() {
  if (globalInstance) {
    await globalInstance.stop();
    globalInstance = null;
  }
}

/**
 * Pause rendering
 */
function pause() {
  if (globalInstance) {
    globalInstance.pause();
  }
}

/**
 * Resume rendering
 */
function resume() {
  if (globalInstance) {
    globalInstance.resume();
  }
}

/**
 * Enable or disable cursor tracking
 * @param {boolean} enabled
 */
function setCursorTracking(enabled) {
  if (globalInstance) {
    globalInstance.setCursorTracking(enabled);
  }
}

/**
 * Get cursor tracking state
 * @returns {boolean}
 */
function getCursorTracking() {
  return globalInstance ? globalInstance.getCursorTracking() : false;
}

/**
 * Draw particles at world position
 * @param {number} x
 * @param {number} y
 */
function drawAtPosition(x, y) {
  if (globalInstance) {
    globalInstance.drawAtPosition(x, y);
  }
}

/**
 * Draw particles at canvas position
 * @param {number} x
 * @param {number} y
 */
function drawAtCanvasPosition(x, y) {
  if (globalInstance) {
    globalInstance.drawAtCanvasPosition(x, y);
  }
}

/**
 * Get the current instance
 * @returns {SparkleMouse|null}
 */
function getInstance() {
  return globalInstance;
}

// Export simple API
export {
  start,
  stop,
  pause,
  resume,
  setCursorTracking,
  getCursorTracking,
  drawAtPosition,
  drawAtCanvasPosition,
  getInstance,
  shapeHeart,
  shapeSquiggly,
  shapeStar,
  shapeSwirl,
  SparkleMouse
};

// Create object for window global
const SparkleMouseAPI = {
  start,
  stop,
  pause,
  resume,
  setCursorTracking,
  getCursorTracking,
  drawAtPosition,
  drawAtCanvasPosition,
  getInstance,
  shapeHeart,
  shapeSquiggly,
  shapeStar,
  shapeSwirl,
  SparkleMouse
};

// Make it available on window for easy script tag usage
if (typeof window !== 'undefined') {
  window.SparkleMouse = SparkleMouseAPI;
}
export default SparkleMouseAPI;
