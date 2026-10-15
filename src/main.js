// main window, includes renderer



import { log, logError } from './log.js';
import { invoke } from '@tauri-apps/api/core';
import { initializeStorageAPI } from './storage.js';
import { inverseLerp, validateSettings } from 'sparkle-mouse/helpers';
import { initializeRendererAPI } from 'sparkle-mouse/renderer';
import { showScene, getSettingGroups, getMaxSpeed } from 'sparkle-mouse/scene';
import { setLogger } from 'sparkle-mouse/logger';
import { demoShapesDrawing } from 'sparkle-mouse/demo';
import { shapeHeart, shapeSquiggly, shapeStar, shapeSwirl } from 'sparkle-mouse/shapes';
import { shapeWilly } from './additionalDemoShapes.js';
const demoShapes = [shapeHeart, shapeSquiggly, shapeStar, shapeSwirl, shapeWilly];
import { builtInTemplates, builtinImages, defaultImage } from './builtin.js';
import { getCurrentWindow, primaryMonitor, availableMonitors, LogicalSize, LogicalPosition } from '@tauri-apps/api/window';
import { emit, listen } from '@tauri-apps/api/event';
import { exists, readTextFile, readFile } from '@tauri-apps/plugin-fs';
import { resolve } from '@tauri-apps/api/path';
import { process } from 'sparkle-mouse/spritesheet';
import { initializeCursorAPI } from './cursor.js';


// global monitor state
let currentMonitors = [];
let activeMonitorName = null;

// APIs
let storageAPI;
let trayAPI;
let displayAPI;
let cursorAPI;
let rendererAPI;

// instance-specific scene state accessors
let getSpawning;
let setSpawning;

// store
let liveSettings;
const container = document.getElementById('three-container');



// initialize
window.addEventListener("DOMContentLoaded", async () => {

    // configure logger for sparkle-mouse package
    setLogger(log);

    // make container transparent and fill window
    document.body.style.backgroundColor = 'transparent';
    document.body.style.background = 'transparent';

    // disable right-click context menu
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        event.stopPropagation();
    });

    // initialize APIs
    try {

        const storageAPIData = await initializeStorageAPI();
        storageAPI = storageAPIData.storageAPI;
        liveSettings = storageAPIData.liveSettings;

        // get license status
        window.isLicensed = await invoke('get_is_licensed');

        // import any DLC template files Steam installed alongside the game
        try {
            const importedTemplates = await invoke('import_bundled_templates');
            if (importedTemplates && importedTemplates.length > 0) {
                await log(`Imported bundled templates: ${importedTemplates.join(', ')}`);
            }
        } catch (error) {
            await logError('Error importing bundled templates', error);
        }

        trayAPI = await initializeTrayAPI();
        displayAPI = await initializeDisplayAPI();
        cursorAPI = await initializeCursorAPI(displayAPI);
        rendererAPI = await initializeRendererAPI(container, cursorAPI);

        // rebuild the scene when the WebGL context is restored
        rendererAPI.restartScene = async () => {
            await stopScene();
            await startScene();
        };

        // don't stream cursor position while not rendering
        rendererAPI.onRenderingActive.add(async (isActive) => {
            try {
                if (isActive) {
                    await log('Resuming cursor tracking');
                    await invoke('start_cursor_streaming');
                } else {
                    await log('Pausing cursor tracking');
                    await invoke('stop_cursor_streaming');
                }
            } catch (error) {
                await logError('Error toggling cursor streaming', error);
            }
        });
        
    } catch (error) {
        await logError("Error initializing", error);
        return;
    }

    // get initial cursor position
    try {
        await cursorAPI.getCursorPosition(); // get first cursor position to avoid flash
    } catch (error) {
        await logError("Error getting initial cursor position", error);
        return;
    }

    // initialize pause state - check CLI arg first, then fall back to settings
    try {
        const pendingPause = await invoke('get_pending_pause');
        let isPaused;
        if (pendingPause !== null) {
            isPaused = pendingPause;
            await log(`Initial pause state from CLI: ${isPaused}`);
        } else {
            isPaused = await storageAPI.config.loadSetting('isPaused', false);
        }
        if (isPaused) rendererAPI.pause();
        await invoke('sync_pause_state', { isPaused }); // sync with tray menu
    } catch (error) {
        await logError("Error initializing pause state", error);
    }

    // check if app was launched with a .sparkle file and/or CLI parameters
    try {
        const pendingFiles = await invoke('get_pending_sparkle_file');
        const pendingParams = await invoke('get_pending_sparkle_params');
        const pendingImagePaths = await invoke('get_pending_image_paths');
        
        if (pendingFiles || pendingParams || pendingImagePaths) {
            // load current live settings
            const currentLiveSettings = await storageAPI.liveTemplate.loadSettings();
            let mergedSettings = { ...currentLiveSettings };
            
            // apply .sparkle file settings first (if present) - loop through all files in order
            if (pendingFiles && pendingFiles.length > 0) {
                await log(`Received .sparkle file(s): ${pendingFiles.join(', ')}`);
                for (const filePath of pendingFiles) {
                    const fileContent = await readTextFile(filePath);
                    const loadedSettings = JSON.parse(fileContent);
                    const validatedSettings = validateSettings(loadedSettings, builtinImages);
                    mergedSettings = { ...mergedSettings, ...validatedSettings };
                }
                await log(`Loaded settings from ${pendingFiles.length} .sparkle file(s)`);
            }
            
            // apply CLI parameters as overrides (if present)
            if (pendingParams) {
                await log(`Received sparkle parameters from CLI: ${JSON.stringify(pendingParams)}`);
                
                const convertedParams = { ...pendingParams };

                // convert life from seconds to 0-1 slider value
                if (convertedParams['life'] !== undefined) {
                    const lifeRange = getSettingGroups().life;
                    const clampedLife = Math.max(lifeRange[0], Math.min(lifeRange[1], convertedParams['life']));
                    convertedParams['life'] = inverseLerp(lifeRange[0], lifeRange[1], clampedLife, 1);
                }
                
                // convert image-speed from fps to 0-1 slider value
                if (convertedParams['image-speed'] !== undefined) {
                    const maxFps = getMaxSpeed();
                    const clampedSpeed = Math.max(0, Math.min(maxFps, convertedParams['image-speed']));
                    convertedParams['image-speed'] = clampedSpeed / maxFps;
                }
                
                const validatedParams = validateSettings(convertedParams, builtinImages);
                mergedSettings = { ...mergedSettings, ...validatedParams };
            }
            
            // process image paths (if present)
            if (pendingImagePaths) {
                await log(`Received image paths from CLI: ${JSON.stringify(pendingImagePaths)}`);
                await applyImagePaths(pendingImagePaths, mergedSettings);
            }

            
            // save merged settings to live template
            await storageAPI.liveTemplate.saveSettings(mergedSettings);
            liveSettings = mergedSettings;
            await storageAPI.config.saveSetting('selectedTemplate', '<live>');
            
            // notify settings window to update UI (if open)
            await emit('sparkle-file-applied', mergedSettings);
            
            await log(`Applied CLI settings to <live>`);
        }
    } catch (error) {
        await logError("Error applying CLI settings", error);
    }

    // show scene
    try {
        await startScene();
    } catch (error) {
        await logError("Error starting scene", error);
        return;
    }

    await log("Scene started")

    // register CLI shortcut on each app open
    try {
        const result = await invoke('register_cli_shortcut');
        await log(result);
    } catch (error) {
        await logError("Failed to register CLI shortcut", error);
    }

    // handle visibility changes (e.g., when system sleeps or app is hidden)
    let wasHiddenBeforePause = false;
    document.addEventListener('visibilitychange', async () => {
        if (document.hidden) {
            // hidden (system sleep, app minimized, etc.)
            rendererAPI.onRenderingActive.call(false);
            wasHiddenBeforePause = !rendererAPI.isPaused;
        } else {
            // now visible again
            rendererAPI.onRenderingActive.call(true);
            
            // restart scene if it was running before being hidden
            if (wasHiddenBeforePause && liveSettings) {
                // small delay to ensure system is fully awake
                setTimeout(async () => {
                    await stopScene();
                    await startScene();
                }, 100);
            }
        }
    });

    // listen for .sparkle file open events (file associations and CLI at runtime)
    listen('sparkle-files-opened', async (event) => {
        await applySparkleFiles(event.payload);
    });

    // listen for spawning state changes (from HTTP API)
    listen('spawning-changed', async (event) => {
        setSpawning(event.payload);
        await log(`Spawning state changed to: ${event.payload}`);
    });

    // listen for sparkle parameter changes (from CLI arguments at runtime)
    listen('sparkle-params-changed', async (event) => {
        await applySparkleParams(event.payload);
    });

    // listen for image path changes (from CLI arguments at runtime)
    listen('image-paths-changed', async (event) => {
        await applyImagePathsRuntime(event.payload);
    });

    // listen for cursor tracking changes (from HTTP API)
    listen('cursor-tracking-changed', async (event) => {
        cursorAPI.enableCursorTracking(event.payload);
        await log(`Cursor tracking changed to: ${event.payload}`);
    });

    // listen for draw position changes (from HTTP API)
    listen('draw-position-changed', async (event) => {
        // stop demo if playing
        if (cursorAPI.isDemoShapesDrawing) {
            demoShapesDrawing(cursorAPI, rendererAPI, false, demoShapes);
            await log('Demo stopped due to custom draw command');
        }
        
        cursorAPI.emulateCursorPosition(event.payload);
        await log(`Draw position set to: ${event.payload.x}, ${event.payload.y}`);
    });

    // listen for demo start/stop from about window
    listen('demo-start', async () => {
        cursorAPI.enableCursorTracking(false);

        rendererAPI.resume(); // disable pause when demo starts
        await storageAPI.config.saveSetting('isPaused', false);
        await invoke('sync_pause_state', { isPaused: false }); // sync tray menu
        await emit('pause-state-changed', false); // sync settings window
        
        // switch to "too many" built-in template
        const demoTemplateId = '*builtin_toomany';
        
        try {
            // save selected template
            await storageAPI.config.saveSetting('selectedTemplate', demoTemplateId);
            
            // load template settings
            const tempLoadFunction = await storageAPI.builtInTemplates.loadSettings(demoTemplateId);
            let loadedSettings = await tempLoadFunction();
            
            // validate loaded settings to auto-populate aspect ratio from built-in images
            loadedSettings = validateSettings(loadedSettings, builtinImages);
            
            // merge loaded settings with current live settings
            liveSettings = { ...liveSettings, ...loadedSettings };
            
            // save template settings to live.sparkle
            await storageAPI.liveTemplate.saveSettings(liveSettings);
            
            // update tray checkboxes
            await updateTrayTemplateCheckboxes(demoTemplateId);
            
            // notify settings window about template change
            await emit('template-selected-from-tray', demoTemplateId);
            
            // apply the new template
            await startScene();
        } catch (error) {
            await logError('Error switching to demo template', error);
        }
        
        demoShapesDrawing(cursorAPI, rendererAPI, true, demoShapes);
        await log('Demo started');
    });

    listen('demo-stop', async () => {
        if (cursorAPI.isDemoShapesDrawing){
            cursorAPI.enableCursorTracking(true);
            demoShapesDrawing(cursorAPI, rendererAPI, false, demoShapes);
            await log('Demo stopped');
        }
    });
});



// update tray template checkboxes (global function used by multiple places)
async function updateTrayTemplateCheckboxes(selectedTemplateId) {
    try {
        // update built-in templates
        for (const template of builtInTemplates){
            const isSelected = selectedTemplateId === template.id;
            await trayAPI.updateMenuItemChecked(`template_builtin_${template.id}`, isSelected);
        }
        
        // update custom templates (only if licensed)
        if (window.isLicensed){
            const customTemplates = await storageAPI.customTemplates.loadTemplates();
            for (const template of customTemplates) {
                const isSelected = selectedTemplateId === template.fileName;
                await trayAPI.updateMenuItemChecked(`template_${template.fileName}`, isSelected);
            }
        }
    } catch (error) {
        await logError('Error updating tray template checkboxes', error);
    }
}



// applies settings from multiple .sparkle files to <live> (in order)
async function applySparkleFiles(filePaths) {
    // handle both single file and array of files
    const files = Array.isArray(filePaths) ? filePaths : [filePaths];
    await log(`Received .sparkle file(s): ${files.join(', ')}`);
    
    try {
        // get current live settings
        const currentLiveSettings = await storageAPI.liveTemplate.loadSettings();
        let mergedSettings = { ...currentLiveSettings };
        
        // apply each file in order
        for (const filePath of files) {
            const fileContent = await readTextFile(filePath);
            const loadedSettings = JSON.parse(fileContent);
            const validatedSettings = validateSettings(loadedSettings, builtinImages);
            mergedSettings = { ...mergedSettings, ...validatedSettings };
        }
        
        await log(`Loaded settings from ${files.length} .sparkle file(s)`);
        
        // save merged settings to live template
        await storageAPI.liveTemplate.saveSettings(mergedSettings);
        
        // update current settings
        liveSettings = mergedSettings;
        
        // set the selected template to <live>
        await storageAPI.config.saveSetting('selectedTemplate', '<live>');
        
        // update tray menu checkboxes (uncheck all templates since <live> is now active)
        await updateTrayTemplateCheckboxes('<live>');
        
        // notify settings window to update UI (if open)
        await emit('sparkle-file-applied', mergedSettings);
        
        // reload the scene with new settings
        await startScene();
        
        await log(`Applied .sparkle file settings to <live>`);
    } catch (error) {
        await logError(`Error loading .sparkle file: ${filePath}`, error);
    }
}



// applies sparkle parameters from CLI arguments to <live>
async function applySparkleParams(params) {
    await log(`Received sparkle parameters from CLI: ${JSON.stringify(params)}`);
    
    try {
        // get current live settings
        const currentLiveSettings = await storageAPI.liveTemplate.loadSettings();

        // convert some CLI parameters
        const convertedParams = { ...params };

        // convert life from seconds to 0-1 slider value
        if (convertedParams['life'] !== undefined) {
            const lifeRange = getSettingGroups().life;
            const clampedLife = Math.max(lifeRange[0], Math.min(lifeRange[1], convertedParams['life']));
            convertedParams['life'] = inverseLerp(lifeRange[0], lifeRange[1], clampedLife, 1);
        }
        
        // convert 'image-speed' from fps to 0-1 slider value
        if (convertedParams['image-speed'] !== undefined) {
            const maxFps = getMaxSpeed();
            const clampedSpeed = Math.max(0, Math.min(maxFps, convertedParams['image-speed']));
            convertedParams['image-speed'] = clampedSpeed / maxFps;
        }
        
        const validatedParams = validateSettings(convertedParams, builtinImages);
        const mergedSettings = { ...currentLiveSettings, ...validatedParams };
        
        // save merged settings to live template
        await storageAPI.liveTemplate.saveSettings(mergedSettings);
        
        // update current settings
        liveSettings = mergedSettings;
        
        // set the selected template to <live>
        await storageAPI.config.saveSetting('selectedTemplate', '<live>');
        
        // update tray menu checkboxes (uncheck all templates since <live> is now active)
        await updateTrayTemplateCheckboxes('<live>');
        
        // notify settings window to update UI (if open)
        await emit('sparkle-file-applied', mergedSettings);
        
        // reload the scene with new settings
        await startScene();
        
        await log(`Applied CLI sparkle parameters to <live>`);
    } catch (error) {
        await logError(`Error applying sparkle parameters`, error);
    }
}



// processes image paths from CLI and applies to settings
async function applyImagePaths(imagePaths, mergedSettings) {
    try {
        // filter and validate image paths
        let validImagePaths = [];
        let isGif = false;
        
        for (const path of imagePaths) {
            const lowerPath = path.toLowerCase();
            
            if (lowerPath.endsWith('.gif')) {
                if (!isGif) {
                    // first GIF found, use it and ignore any others
                    validImagePaths = [path];
                    isGif = true;
                    break; // stop processing after first GIF
                }
            } else if (lowerPath.endsWith('.png') || lowerPath.endsWith('.jpg') || 
                       lowerPath.endsWith('.jpeg') || lowerPath.endsWith('.bmp')) {
                validImagePaths.push(path);
            }
        }
        
        if (validImagePaths.length === 0) {
            await log(`No valid image paths provided`);
            return;
        }
        
        await log(`Processing ${validImagePaths.length} valid image path(s)`);
        
        const processed = await process(validImagePaths, { readFile });
        mergedSettings['image-data'] = processed.base64;
        mergedSettings['image-count'] = processed.imageCounts;
        mergedSettings['image-cycles'] = processed.cycleCounts;
        mergedSettings['image-aspect-ratio'] = processed.aspectRatio;

        // set animation speed and play-from-start based on image type
        if (isGif) {
            // use native speed and set play-from-start
            mergedSettings['image-play-from-start'] = true;

            if (processed.animationSpeed !== null) {
                // calculate slider value (clamped 0-1)
                const maxAnimationSpeed = getMaxSpeed();
                const sliderValue = Math.max(0, Math.min(1, processed.animationSpeed / maxAnimationSpeed));
                mergedSettings['image-speed'] = sliderValue;
            }
        } else if (validImagePaths.length > 1) {
            // multiple images: set image-speed to 0 (static random dist)
            mergedSettings['image-speed'] = 0;
            mergedSettings['image-play-from-start'] = false;
        } else {
            // single image: set image-speed to 0
            mergedSettings['image-speed'] = 0;
            mergedSettings['image-play-from-start'] = false;
        }
    } catch (error) {
        await logError(`Error processing image paths`, error);
    }
}



// applies image paths from runtime CLI arguments to <live>
async function applyImagePathsRuntime(imagePaths) {
    await log(`Received image paths from runtime CLI: ${JSON.stringify(imagePaths)}`);
    
    try {
        // get current live settings
        const currentLiveSettings = await storageAPI.liveTemplate.loadSettings();
        const mergedSettings = { ...currentLiveSettings };
        
        // process and apply image paths
        await applyImagePaths(imagePaths, mergedSettings);
        
        // save merged settings to live template
        await storageAPI.liveTemplate.saveSettings(mergedSettings);
        
        // update current settings
        liveSettings = mergedSettings;
        
        // set the selected template to <live>
        await storageAPI.config.saveSetting('selectedTemplate', '<live>');
        
        // update tray menu checkboxes (uncheck all templates since <live> is now active)
        await updateTrayTemplateCheckboxes('<live>');
        
        // notify settings window to update UI (if open)
        await emit('sparkle-file-applied', mergedSettings);
        
        // reload the scene with new settings
        await startScene();

    } catch (error) {
        await logError(`Error applying runtime image paths`, error);
    }
}



async function initializeTrayAPI(){

    const trayAPI = {
        async addMenuItem(id, title) {
            await invoke('add_dynamic_menu_item', { id, title });
        },
        async addCheckboxMenuItem(id, title, checked = false) {
            await invoke('add_dynamic_checkbox_menu_item', { id, title, checked });
        },
        async setTemplateMenuItems(items) {
            await invoke('set_template_menu_items', { items });
        },
        async updateMenuItemChecked(id, checked) {
            await invoke('update_dynamic_menu_item_checked', { id, checked });
        },
        async removeMenuItem(id) {
            await invoke('remove_dynamic_menu_item', { id });
        },
        async clearAllMenuItems() {
            await invoke('clear_dynamic_menu_items');
        },
        async clearTemplateMenuItems() {
            await invoke('clear_dynamic_menu_items');
        }
    };


    listen('tray-settings', async () => {
        try {
            await invoke('open_settings_window');
        } catch (error) {
            await logError("Error opening settings window", error);
        }
    });
    listen('tray-dynamic-item', async (event) => { // dynamic items
        const itemId = event.payload;
        
        // handle template selection from tray
        if (itemId.startsWith('template_')) {
            let templateId;
            
            if (itemId.startsWith('template_builtin_')) {
                templateId = itemId.replace('template_builtin_', '');
            } else {
                templateId = itemId.replace('template_', '');
            }
            
            try {
                // check if custom template file exists before loading
                if (!templateId.startsWith('*builtin_')) {
                    const templatePath = await resolve(await storageAPI.customTemplates.dir, templateId + '.sparkle');
                    const fileExists = await exists(templatePath);
                    
                    if (!fileExists) {
                        await log(`Template file not found: ${templateId}, falling back to built-in sparkles`);
                        
                        // fallback to built-in sparkles template
                        templateId = builtInTemplates[0].id; // first built-in template (sparkles)
                        
                        // save the fallback template
                        await storageAPI.config.saveSetting('selectedTemplate', templateId);
                        
                        // refresh tray menu to remove deleted template
                        const customTemplates = await storageAPI.customTemplates.loadTemplates();
                        await updateTrayTemplates({
                            builtIn: builtInTemplates,
                            custom: customTemplates
                        });
                        
                        // notify settings window about template change
                        await emit('template-selected-from-tray', templateId);
                        
                        // load built-in sparkles template
                        const tempLoadFunction = await storageAPI.builtInTemplates.loadSettings(templateId);
                        let loadedSettings = await tempLoadFunction();
                        
                        // validate loaded settings to auto-populate aspect ratio from built-in images
                        loadedSettings = validateSettings(loadedSettings, builtinImages);
                        
                        // merge loaded settings with current live settings
                        liveSettings = { ...liveSettings, ...loadedSettings };
                        
                        // save template settings to live.sparkle
                        await storageAPI.liveTemplate.saveSettings(liveSettings);
                        
                        await startScene();
                        return;
                    }
                }
                
                // save selected template
                await storageAPI.config.saveSetting('selectedTemplate', templateId);
                
                // refresh entire tray menu to ensure deleted templates are removed and checkboxes are correct
                const customTemplates = await storageAPI.customTemplates.loadTemplates();
                await updateTrayTemplates({
                    builtIn: builtInTemplates,
                    custom: customTemplates
                });
                
                // notify settings window about template change
                await emit('template-selected-from-tray', templateId);
                
                // load template settings and merge with current live settings
                let loadedSettings;
                if (templateId.startsWith('*builtin_')) {
                    const tempLoadFunction = await storageAPI.builtInTemplates.loadSettings(templateId);
                    loadedSettings = await tempLoadFunction();
                } else {
                    const tempLoadFunction = await storageAPI.customTemplates.loadSettings(templateId);
                    loadedSettings = await tempLoadFunction();
                }
                
                // validate loaded settings to auto-populate aspect ratio from built-in images
                loadedSettings = validateSettings(loadedSettings, builtinImages);
                
                // merge loaded settings with current live settings
                liveSettings = { ...liveSettings, ...loadedSettings };
                
                // save template settings to live.sparkle
                await storageAPI.liveTemplate.saveSettings(liveSettings);
                
                await startScene();
            } catch (error) {
                await logError(`Error selecting template from tray: ${templateId}`, error);
            }
        }
    });

    // update tray template checkboxes
    async function updateTrayTemplateCheckboxes(selectedTemplateId) {
        try {
            // update built-in templates
            for (const template of builtInTemplates) {
                const isSelected = selectedTemplateId === template.id;
                await trayAPI.updateMenuItemChecked(`template_builtin_${template.id}`, isSelected);
            }
            
            // update custom templates
            const customTemplates = await storageAPI.customTemplates.loadTemplates();
            for (const template of customTemplates) {
                const isSelected = selectedTemplateId === template.fileName;
                await trayAPI.updateMenuItemChecked(`template_${template.fileName}`, isSelected);
            }
        } catch (error) {
            await logError('Error updating tray template checkboxes', error);
        }
    }

    // listen for settings changes from settings window
    listen('settings-changed', async (event) => {
        await log(`Settings changed:`, event.payload);
        window.settings = event.payload; // retrieve settings
    });

    // listen for tray menu pause toggles
    listen('pause-toggled', async (event) => {
        const isPaused = event.payload;
        
        // update rendering state
        if (isPaused) {
            rendererAPI.pause();
        } else {
            rendererAPI.resume();
        }
        
        await storageAPI.config.saveSetting('isPaused', isPaused);
        await invoke('sync_pause_state', { isPaused }); // sync tray menu checkbox
        await emit('pause-state-changed', isPaused);
    });

    // listen for settings window pause toggles
    listen('settings-pause-changed', async (event) => {
        const isPaused = event.payload;
        
        if (isPaused) {
            rendererAPI.pause();
        } else {
            rendererAPI.resume();
        }
        
        // update tray button text
        const { invoke } = window.__TAURI__.core;
        try {
            await invoke('sync_pause_state', { isPaused });
        } catch (error) {
            await logError('Error syncing pause state with tray', error);
        }
    });

    // listen for setting controls changes from settings window
    listen('setting-controls-changed', async (event) => {
        await stopScene();
        const settingValues = event.payload;
        liveSettings = settingValues;
        await startScene();
    });

    // listen for template updates from settings window
    listen('templates-updated', async (event) => {
        const templates = event.payload;
        await updateTrayTemplates(templates);
    });

    // listen for template selection from settings window
    listen('template-selected-from-settings', async (event) => {
        const templateId = event.payload;
        await updateTrayTemplateCheckboxes(templateId);
    });

    // listen for monitor changes from settings window
    listen('monitor-changed', async (event) => {
        const monitorName = event.payload;
        await moveWindowToMonitor(monitorName);
    });
    
    // listen for monitor list requests from settings window
    listen('request-monitor-list', async () => {
        try {
            const monitors = await availableMonitors();
            await emit('monitor-list-update', monitors);
        } catch (error) {
            await logError('Error sending monitor list to settings', error);
        }
    });
    
    // perform initial monitor check
    await checkMonitorConfiguration();
    
    // periodically check for monitor configuration changes
    setInterval(async () => {
        await checkMonitorConfiguration();
    }, 7000);

    // initialize settings window (ensures tray menu items are populated)
    const isFirstRun = await storageAPI.config.loadSetting("firstRun", true);
    const wasHeadless = await invoke('was_launched_headless');
    
    if (isFirstRun) { // if first run, register and show settings window
        await storageAPI.config.saveSetting("firstRun", false);
        await invoke('open_settings_window', { initializeOnly: false });
    } else if (wasHeadless) { // if launched in headless mode, don't show settings window
        await invoke('open_settings_window', { initializeOnly: true });
    } else { // if manually started, show settings window
        await invoke('open_settings_window', { initializeOnly: false });
    }

    // function to update tray with template items
    async function updateTrayTemplates(templates) {
        try {
            // get currently selected template
            const selectedTemplate = await storageAPI.config.loadSetting('selectedTemplate', builtInTemplates[0].id);
            
            // collect all menu items in a single array
            const menuItems = [];
            
            // add built-in templates with proper prefix for grouping
            for (const template of templates.builtIn) {
                const isSelected = selectedTemplate === template.id;
                menuItems.push({
                    id: `template_builtin_${template.id}`,
                    title: template.name,
                    is_checkbox: true,
                    checked: isSelected
                });
            }
            
            // add custom templates if any exist
            if (templates.custom && templates.custom.length > 0) {
                for (const template of templates.custom) {
                    const isSelected = selectedTemplate === template.fileName;
                    menuItems.push({
                        id: `template_${template.fileName}`,
                        title: template.fileName,
                        is_checkbox: true,
                        checked: isSelected
                    });
                }
            }
            
            // set all template items at once to avoid race conditions
            await trayAPI.setTemplateMenuItems(menuItems);
        } catch (error) {
            await logError('Error populating tray templates', error);
        }
    }

    await log("Tray menu initialized")
    return trayAPI;
}



async function checkMonitorConfiguration() {
    try {
        const monitors = await availableMonitors();
        const previousMonitorCount = currentMonitors.length;
        currentMonitors = monitors;
        
        // if monitor count changed
        if (previousMonitorCount !== 0 && monitors.length !== previousMonitorCount) {
            await log(`Monitor configuration changed: ${previousMonitorCount} -> ${monitors.length} monitors`);
            
            // notify settings window if open
            await emit('monitor-list-update', monitors);
            
            // check if the active monitor still exists
            if (activeMonitorName && activeMonitorName !== 'primary-monitor') {
                const activeMonitorExists = monitors.some(m => m.name === activeMonitorName);
                
                if (!activeMonitorExists) {
                    await log(`Active monitor '${activeMonitorName}' disconnected, switching to Primary Monitor`);
                    
                    // switch to primary monitor
                    const primaryMon = await primaryMonitor();
                    if (primaryMon) {
                        const currentWindow = getCurrentWindow();
                        await stopScene();
                        await setWindowToMonitor(displayAPI, currentWindow, primaryMon);
                        await rendererAPI.updateCamera();
                        await startScene();
                        
                        // update active monitor name but don't save to config
                        activeMonitorName = 'primary-monitor';
                        
                        // notify settings window to update UI
                        await emit('active-monitor-changed', 'primary-monitor');
                    }
                }
            }
            
            // check if we're on Primary Monitor fallback and saved monitor has reconnected
            if (activeMonitorName === 'primary-monitor') {
                const savedMonitorName = await storageAPI.config.loadSetting('selectedMonitor', null);
                
                // if there's a saved monitor that's not 'primary-monitor', check if it's now available
                if (savedMonitorName && savedMonitorName !== 'primary-monitor') {
                    const savedMonitorExists = monitors.some(m => m.name === savedMonitorName);
                    
                    if (savedMonitorExists) {
                        await log(`Saved monitor '${savedMonitorName}' reconnected, switching back to it`);
                        
                        // switch back to saved monitor
                        const targetMonitor = monitors.find(m => m.name === savedMonitorName);
                        if (targetMonitor) {
                            const currentWindow = getCurrentWindow();
                            await stopScene();
                            await setWindowToMonitor(displayAPI, currentWindow, targetMonitor);
                            await rendererAPI.updateCamera();
                            await startScene();
                            
                            // update active monitor name
                            activeMonitorName = savedMonitorName;
                            
                            // notify settings window to update UI
                            await emit('active-monitor-changed', savedMonitorName);
                        }
                    }
                }
            }
        }
    } catch (error) {
        await logError('Error checking monitor configuration', error);
    }
}

async function initializeDisplayAPI() {
    let displayAPI = {
        scaleFactor: null,
        logicalWidth: null,
        logicalHeight: null,
        physicalWidth: null,
        physicalHeight: null,
        monitorOffsetX: null,
        monitorOffsetY: null,
        aspect: null
    };

    const currentWindow = getCurrentWindow();
    
    // load saved monitor preference from config
    const savedMonitorName = await storageAPI.config.loadSetting('selectedMonitor', null);
    activeMonitorName = savedMonitorName || 'primary-monitor';
    
    let targetMonitor;
    
    if (savedMonitorName === 'primary-monitor' || savedMonitorName === null) {
        // use primary monitor if 'primary-monitor' was saved or no monitor was saved
        targetMonitor = await primaryMonitor();
        if (!targetMonitor){
            // primaryMonitor() can return null on some platforms (e.g., Linux)
            // fall back to first available monitor
            await log("Primary monitor not available, using first available monitor");
            const monitors = await availableMonitors();
            if (monitors && monitors.length > 0) {
                targetMonitor = monitors[0];
            } else {
                await logError("No monitor found", new Error('No monitor found'));
                return;
            }
        }
    } else {
        // find saved monitor by name
        const monitors = await availableMonitors();
        targetMonitor = monitors.find(m => m.name === savedMonitorName);
        
        if (!targetMonitor) {
            // saved monitor not found, fall back to primary
            await log(`Saved monitor '${savedMonitorName}' not found, using primary`);
            targetMonitor = await primaryMonitor();
            if (!targetMonitor){
                // primaryMonitor() can return null on some platforms (e.g., Linux)
                // fall back to first available monitor
                await log("Primary monitor not available, using first available monitor");
                if (monitors && monitors.length > 0) {
                    targetMonitor = monitors[0];
                } else {
                    await logError("No monitor found", new Error('No monitor found'));
                    return;
                }
            }
        }
    }

    return await setWindowToMonitor(displayAPI, currentWindow, targetMonitor);
}

async function setWindowToMonitor(displayAPI, windowObj, monitor) { // takes displayAPI, updates it and returns it
    // scaleFactor to get the correct logical size
    const scaleFactor = monitor.scaleFactor || 1;
    
    // calculate logical size (physical size / scale factor)
    const { width, height } = monitor.size;
    const logicalWidth = Math.floor(width / scaleFactor);
    const logicalHeight = Math.floor(height / scaleFactor);
    
    // monitor position is already in logical coordinates, don't divide by scale
    const monitorX = monitor.position?.x || 0;
    const monitorY = monitor.position?.y || 0;
    
    // set window size and position to monitor's position
    await windowObj.setSize(new LogicalSize(logicalWidth, logicalHeight));
    await windowObj.setPosition(new LogicalPosition(monitorX, monitorY));

    // store display info for use in animations
    displayAPI = {
        scaleFactor: scaleFactor,
        logicalWidth: logicalWidth,
        logicalHeight: logicalHeight,
        physicalWidth: width,
        physicalHeight: height,
        monitorOffsetX: monitorX,
        monitorOffsetY: monitorY,
        aspect: logicalWidth / logicalHeight
    };

    await log(`Window set to monitor: ${logicalWidth}x${logicalHeight} at (${monitorX}, ${monitorY}) - scale factor ${scaleFactor}`);
    return displayAPI;
}

async function moveWindowToMonitor(monitorName) {
    try {
        const currentWindow = getCurrentWindow();
        
        let targetMonitor;
        
        // handle special 'primary-monitor' value
        if (monitorName === 'primary-monitor') {
            targetMonitor = await primaryMonitor();
            if (!targetMonitor) {
                await logError('Primary monitor not found', new Error('Primary monitor not found'));
                return;
            }
        } else {
            // find the monitor by name
            const monitors = await availableMonitors();
            targetMonitor = monitors.find(m => m.name === monitorName);
            if (!targetMonitor) {
                await logError(`Monitor not found: ${monitorName}`, new Error('Monitor not found'));
                return;
            }
        }
        
        await stopScene();
        await setWindowToMonitor(displayAPI, currentWindow, targetMonitor);
        
        // update camera and renderer for new monitor's scale factor
        await rendererAPI.updateCamera();
        
        await startScene();
        
        // track active monitor name
        activeMonitorName = monitorName;
    } catch (error) {
        await logError('Error moving window to monitor', error);
    }
}



// return built-in image if needed
function getBuiltInImage(imageData){
    if (!imageData || imageData.trim() == ''){ // invalid, default fallback
        return builtinImages[defaultImage].img;
    }else if (imageData.includes("*")){ // hybrid format: "image:key*base64"
        // only respect the built-in key, ignore base64
        const [builtinKey] = imageData.split("*", 2);
        if (builtinKey.startsWith("image:") && builtinImages[builtinKey]) {
            return builtinImages[builtinKey].img; // use built-in
        } else {
            return builtinImages[defaultImage].img; // built-in doesn't exist, use default
        }
    }else if (imageData.startsWith("image:")){ // built-in format
        if (builtinImages[imageData]) {
            return builtinImages[imageData].img;
        } else {
            return builtinImages[defaultImage].img; // built-in doesn't exist, use default
        }
    }else{ // external image (base64)
        // if unlicensed, use default built-in sparkle image instead
        if (!window.isLicensed) {
            return builtinImages[defaultImage].img;
        }
        return imageData;
    }
}



// prevent duplicate scene loads
let isLoadingScene = false;

async function startScene() {
    // prevent duplicate loads
    if (isLoadingScene) return;
    isLoadingScene = true;

    try {
        if (rendererAPI.requestedFrameId != null) await stopScene(); // stop existing scene, if any

        // get current settings
        const settings = liveSettings;
    
        // render loop, wait for scene to load before starting animation
        try {
            const imageData = getBuiltInImage(settings['image-data']);
            
            const sceneResult = await showScene(settings, imageData, rendererAPI, cursorAPI, true); // start new scene, get its animation function
            const { animate, resetParticles, onParticleActivityChange } = sceneResult;
            
            // register callback for particle activity changes
            onParticleActivityChange.add((hasActiveParticles) => {
                if (hasActiveParticles) stopPerformancePause();
                else startPerformancePause();
            });
            rendererAPI.resetParticles = resetParticles; // store reset function for pause
            
            // store instance-specific accessors
            getSpawning = sceneResult.getSpawning;
            setSpawning = sceneResult.setSpawning;
            
            let animateLooped = () => { // create looping request
                rendererAPI.requestedFrameId = requestAnimationFrame(animateLooped);
                
                // always update cursor tracking (even when paused) to detect movement and unpause
                cursorAPI.updateCursorTracking(rendererAPI).catch(error => logError("Error in cursor tracking", error))
                
                // skip rendering if paused
                if (rendererAPI.isPaused || rendererAPI.isPerformancePaused) return;

                // render
                animate();
            }
            animateLooped();
        } catch (error) {
            logError("Error loading scene", error);
        }

    } finally {
        isLoadingScene = false;
    }
}

// pause invisibly
function startPerformancePause() {
    if (!rendererAPI.isPerformancePaused){ // only log on state change
        rendererAPI.isPerformancePaused = true;
        rendererAPI.renderer.clear(true, true, true);
        if(!rendererAPI.isPaused) rendererAPI.onPause.call(true);
        log('Performance-paused');
    }
}

function stopPerformancePause() {
    if (rendererAPI.isPerformancePaused){
        rendererAPI.isPerformancePaused = false;
        if(!rendererAPI.isPaused) rendererAPI.onPause.call(false);
        log('Disabled performance-pause');
    }
}

// stop and destroy an existing scene, keep camera
async function stopScene() {
    // stop animation loop
    if (rendererAPI.requestedFrameId != null) {
        cancelAnimationFrame(rendererAPI.requestedFrameId);
        rendererAPI.requestedFrameId = null;
    }

    // remove all cursor tracking callbacks
    cursorAPI.clearCallbacks();

    // destroy scene data - read geometry directly from scene
    const renderer = rendererAPI.renderer;
    const camera = rendererAPI.camera;
    const scene = rendererAPI.scene;
    
    // get all scene objects except camera
    const objectsToRemove = scene.children.filter(child => child !== camera);
    objectsToRemove.forEach(mesh => {
        // remove from scene
        scene.remove(mesh);
        
        // dispose of geo
        if (mesh.geometry){
            mesh.geometry.dispose();
        }

        // dispose of materials
        if (mesh.material){
            if (Array.isArray(mesh.material)){
                mesh.material.forEach(material => material.dispose());
            }else{
                mesh.material.dispose();
            }
        }
    });

    // render empty frame
    renderer.render(scene, camera);
}