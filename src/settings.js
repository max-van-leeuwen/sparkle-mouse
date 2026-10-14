// settings window



import { log, logError } from './log.js';
import { initializeStorageAPI } from './storage.js';
import { builtinImages, defaultImage, builtInTemplates } from './builtin.js';
import { clamp, remap, validateSettings } from 'sparkle-mouse/helpers';
import { getMaxSpeed } from 'sparkle-mouse/scene';
import { invoke } from '@tauri-apps/api/core';
import 'xp.css/dist/XP.css';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { emit } from '@tauri-apps/api/event';
import { primaryMonitor, availableMonitors } from '@tauri-apps/api/window';
import { open } from '@tauri-apps/plugin-dialog';
import { readFile } from '@tauri-apps/plugin-fs';
import { process } from 'sparkle-mouse/spritesheet';
import { doActivate, getEyeroll, getBlink, getStandard, getLastActivateFrame, getActivateFrameCount } from './logo.js';
const { listen } = window.__TAURI__.event;



// params
const maxAnimationSpeed = getMaxSpeed(); // fps
const minLife = 0.5; // match with Scene's settingGroups
const maxLife = 5; // match with Scene's settingGroups

// html elements
const previewImg = document.getElementById('sprite-sheet-img');
const spriteSheetSpeed = document.getElementById('image-speed');
const spriteSheetSpeedLabel = document.getElementById('speedLabel');
const lifeSlider = document.getElementById('life');
const templateNameInput = document.getElementById('text22');
const speedMarker = document.getElementById('speed-marker');
const gravitySlider = document.getElementById('gravity');
const gravityMarker = document.getElementById('gravity-marker');
const radiusSlider = document.getElementById('radius');
const radiusMarker = document.getElementById('radius-marker');
const imagesButton = document.getElementById('select-images-btn');
const supportMessage = document.getElementById('is-unlicensed');
const previewContainer = document.getElementById('sprite-sheet-preview');
const deleteBtn = document.getElementById('delete-template-btn');
const showFolderBtn = document.getElementById('show-folder-btn');
const appIcon = document.getElementById('app-icon');
const downloadTemplatesBtn = document.getElementById('download-templates-btn');
const titleBar = document.querySelector('.title-bar');
const windowDiv = document.querySelector('.window');
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');
const okBtn = document.querySelector('.okButton');
const quitBtn = document.querySelector('.quitButton');
const templateSelect = document.getElementById('template-select');
const helpBtn = document.getElementById('help-btn');
const closeBtn = document.getElementById('close-btn');
const imageSelect = document.getElementById('image-data');
const saveTemplateBtn = document.getElementById('save-template-btn');
const pausedCheckbox = document.getElementById('paused');
const monitorSelect = document.getElementById('monitor-select');
const playFromStartCheckbox = document.getElementById('image-play-from-start');
const playFromStartContainer = document.getElementById('play-from-start-container');
const alignCheckbox = document.getElementById('align');
const flipCheckbox = document.getElementById('flip');
const spinningSlider = document.getElementById('spinning');
const spinningLabel = document.querySelector('label[for="spinning"]');
const flipLabel = document.querySelector('label[for="flip"]');

// APIs
let storageAPI;



// window is fully destroyed when closed, all initialization happens inside of DOMContentLoaded
window.addEventListener('DOMContentLoaded', async () => {
    
    // start fetching cursor position and monitors immediately
    const initialCursorPosPromise = invoke('get_cursor_position');
    const initialMonitorsPromise = availableMonitors();

    // app info
    const isLicensed = await invoke('get_is_licensed');
    const isSteam = await invoke('get_is_steam');

    // replace __PROJECT_URL__ placeholders in HTML (including paths)
    document.querySelectorAll('a[href^="__PROJECT_URL__"]').forEach(link => {
        const rawHref = link.getAttribute('href');
        let processedHref = rawHref.replace('__PROJECT_URL__', __PROJECT_URL__);

        if (isSteam && processedHref.includes('/buy')) {
            processedHref = processedHref.replace('/buy', '/buy-steam');
        }

        link.href = processedHref;
    });
    const currentOS = await invoke('get_os');
    const isMac = currentOS === 'macos';

    // get license status and set UI
    const topSupportMessage = document.getElementById('support-message');
    topSupportMessage.style.display = isLicensed ? 'none' : 'block';
    supportMessage.style.display = isLicensed ? 'none' : 'flex';
    imagesButton.disabled = !isLicensed;

    const currentWindow = getCurrentWindow();

    // check if opened in initialize-only mode from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const initializeOnly = urlParams.get('initialize_only') === 'true';

    // storage API
    const s = await initializeStorageAPI();
    storageAPI = s.storageAPI;

    // track last title bar interaction time (fix preventing false focus loss on Linux during drag)
    let lastTitleBarMouseDown = 0;

    // initialize draggable title bar
        titleBar.addEventListener('mousedown', async (e) => {
            if (e.target.closest('.title-bar-controls')) return;
            lastTitleBarMouseDown = Date.now();
            await currentWindow.startDragging();
            e.preventDefault();
        });
    

    // initialize close(X) button
        async function closePanel() {
            await currentWindow.setFocus(false);
            await currentWindow.close();
        }
        closeBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                await closePanel();
            } catch (error) {
                await logError('Error closing settings window using close(X)', error);
            }
        });


    // initialize help(?) button
        helpBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                await invoke('open_about_window');
            } catch (error) {
                await logError('Error opening About window', error);
            }
        });


    // initialize OK button (same behavior as close(X) button)
        if (okBtn) {
            okBtn.addEventListener('click', async (e) => {
                try {
                    e.preventDefault();
                    e.stopPropagation();
                    await closePanel();
                } catch (error) {
                    await logError('Error closing settings window using close(X)', error);
                }
            });
        }


    // open hyperlinks in ext browser
        document.addEventListener('click', async (event) => {
            const link = event.target.closest('a');
            if (link && link.href) {
                event.preventDefault();
                try {
                    await invoke('open_url', { url: link.href });
                    await log(`Opened external link: ${link.href}`);
                } catch (error) {
                    await logError('Error opening external link', error);
                }
            }
        });


    // initialize tab switching functionality
        try {
            tabButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    // remove aria-selected from all tabs
                    tabButtons.forEach(tab => {
                        tab.setAttribute('aria-selected', 'false');
                    });

                    // hide all tab panels
                    tabPanels.forEach(panel => {
                        panel.hidden = true;
                    });

                    // set current tab as selected
                    button.setAttribute('aria-selected', 'true');

                    // show corresponding panel
                    const targetPanelId = button.getAttribute('aria-controls');
                    const targetPanel = document.getElementById(targetPanelId);
                    targetPanel.hidden = false;
                });
            });
        } catch (error) {
            await logError("Error initializing tab functionality", error);
        }


    // initialize quit button
        if (quitBtn) {
            quitBtn.addEventListener('click', async (e) => {
                try {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    await invoke('quit_app');
                } catch (error) {
                    await logError('Error quitting application', error);
                }
            });
        }


    // track dropdown focus state
        let isDropdownOpen = false;

        // helper to check if a dropdown is currently focused
        function isDropdownFocused() {
            return document.activeElement === templateSelect || 
                   document.activeElement === imageSelect;
        }
        
        // track when dropdowns are opened
        [templateSelect, imageSelect, monitorSelect].forEach(dropdown => {
            dropdown.addEventListener('mousedown', () => {
                isDropdownOpen = true;
            });
            
            dropdown.addEventListener('focus', () => {
                isDropdownOpen = true;
            });
            
            dropdown.addEventListener('blur', () => {
                isDropdownOpen = false;
            });
            
            dropdown.addEventListener('change', () => {
                isDropdownOpen = false;
            });
        });


    // track image selector state to prevent ESC from closing window
        let imageSelectorOpenTime = 0;

    // esc closes window
        window.addEventListener('keyup', async (event) => {
            if (event.key === 'Escape') {
                // don't close if image selector was opened recently
                const timeSinceImageSelector = Date.now() - imageSelectorOpenTime;
                if (timeSinceImageSelector < 4000) { // threshold time (ms)
                    return;
                }
                
                // don't close if dropdown is open or focused
                if (isDropdownOpen || isDropdownFocused()) {
                    return;
                }
                
                try {
                    await closePanel();
                } catch (error) {
                    await logError('Erorr closing settings with ESC', error);
                }
            }   
        });

    // cmd+w on mac, ctrl+w on windows/linux closes window
        window.addEventListener('keydown', async (event) => {
            const shouldClose = event.key === 'w' && 
                               ((isMac && event.metaKey && !event.ctrlKey) || 
                                (!isMac && event.ctrlKey && !event.metaKey));
            
            if (shouldClose) {
                // don't close if dropdown is open or focused
                if (isDropdownOpen || isDropdownFocused()) {
                    return;
                }
                
                try {
                    event.preventDefault();
                    await closePanel();
                } catch (error) {
                    await logError('Error closing settings with Cmd+W/Ctrl+W', error);
                }
            }
        });

    // // toggle pause checkbox with 'P' key (obsolete, new hotkey)
    //     window.addEventListener('keydown', async (event) => {
    //         if (event.key === 'p' || event.key === 'P') {
    //             // don't toggle pause if user is typing in the template name field
    //             if (document.activeElement === templateNameInput) {
    //                 return; // let the user type 'p' in the field
    //             }
                
    //             try {
    //                 event.preventDefault();
    //                 pausedCheckbox.checked = !pausedCheckbox.checked;
    //                 const changeEvent = new Event('change', { bubbles: true });
    //                 pausedCheckbox.dispatchEvent(changeEvent);
    //             } catch (error) {
    //                 await logError('Error toggling pause with P key', error);
    //             }
    //         }
    //     });


    // disable right-click context menu
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });


    // templates list - define functions early so focus handler can use them
        let customTemplatesCache = []; // cache to avoid re-fetching in event handler

        // emit templates to main window for tray population
        async function emitTemplatesToMain() {
            try {
                const allTemplates = {
                    builtIn: builtInTemplates,
                    custom: customTemplatesCache
                };
                await emit('templates-updated', allTemplates);
            } catch (error) {
                await logError('Error emitting templates to main window', error);
            }
        }
        
        async function populateTemplatesList(selectTemplateName = null){
            try {
                templateSelect.innerHTML = ''; // clear existing options

                // add built-in templates first
                const builtInOptgroup = document.createElement('optgroup');
                builtInOptgroup.label = 'Built-In Templates';
                builtInTemplates.forEach(template => {
                    const option = document.createElement('option');
                    option.textContent = template.name;
                    option.value = template.id;
                    option.dataset.isCustom = 'false'; // mark as built-in template
                    builtInOptgroup.appendChild(option);
                });
                
                templateSelect.appendChild(builtInOptgroup);

                // load custom templates from folder
                customTemplatesCache = await storageAPI.customTemplates.loadTemplates();
                if (customTemplatesCache.length > 0){
                    const customOptgroup = document.createElement('optgroup');
                    customOptgroup.label = 'Custom Templates';
                    customTemplatesCache.forEach(template => {
                        const option = document.createElement('option');
                        option.textContent = template.fileName;
                        option.value = template.fileName;
                        option.dataset.isCustom = 'true'; // mark as custom template
                        customOptgroup.appendChild(option);
                    });
                    templateSelect.appendChild(customOptgroup);
                }
                
                const moreOptgroup = document.createElement('optgroup');
                moreOptgroup.label = 'More';
                
                const moreTemplatesOption = document.createElement('option');
                moreTemplatesOption.textContent = 'More Sparkle Templates...';
                moreTemplatesOption.value = '__more_templates__';
                moreTemplatesOption.dataset.isCustom = 'false';
                moreTemplatesOption.dataset.isAction = 'true'; // mark as action item
                moreOptgroup.appendChild(moreTemplatesOption);
                
                const openFolderOption = document.createElement('option');
                openFolderOption.textContent = 'Open Folder...';
                openFolderOption.value = '__open_folder__';
                openFolderOption.dataset.isCustom = 'false';
                openFolderOption.dataset.isAction = 'true'; // mark as action item
                moreOptgroup.appendChild(openFolderOption);
                
                templateSelect.appendChild(moreOptgroup);

                // emit templates to main window whenever cache is updated
                await emitTemplatesToMain();

                // select specific template if requested, or maintain empty selection for live mode
                if (selectTemplateName){
                    const templateOptions = templateSelect.querySelectorAll('option');
                    let foundTemplate = false;
                    for (const option of templateOptions) {
                        if (option.value === selectTemplateName) {
                            templateSelect.value = selectTemplateName;
                            foundTemplate = true;
                            if (!isApplyingUIChanges) {
                                // dispatch change event but mark it as initialization to skip emitting to main window
                                const changeEvent = new Event('change');
                                changeEvent.isInitialLoad = true;
                                templateSelect.dispatchEvent(changeEvent);
                            }
                            break;
                        }
                    }

                    // if template was not found (deleted from file system), switch to live mode
                    if (!foundTemplate) {
                        templateSelect.value = '';
                        await storageAPI.config.saveSetting('selectedTemplate', '<live>');
                        updateDeleteButtonState(false);
                        await emit('template-selected-from-settings', '<live>');
                    }
                } else if (selectTemplateName === '') {
                    // explicitly maintain empty selection for live mode
                    templateSelect.value = '';
                }

                // initial delete button state
                if (templateSelect.selectedOptions.length > 0) {
                    const firstSelected = templateSelect.selectedOptions[0];
                    const isCustomTemplate = firstSelected.dataset.isCustom === 'true';
                    updateDeleteButtonState(isCustomTemplate);
                }
            } catch (error) {
                await logError('Error populating templates list', error);
            }
        }

    
    // handle window focus for inactive title bar styling & reloading templates
        await currentWindow.onFocusChanged(async ({ payload: focused }) => {
            await emit('focused', focused);
            
            // on Linux, ignore focus changes that happen immediately after title bar mousedown (within 150ms)
            // this prevents false focus loss visual during drag operations
            const linuxTitleDragging = currentOS === 'linux' && (Date.now() - lastTitleBarMouseDown) < 150;
            
            if (focused) {
                if (!linuxTitleDragging) {
                    titleBar.classList.remove('inactive');
                    windowDiv.classList.remove('inactive');
                }
                
                // refresh templates dropdown when window re-gains focus
                const currentSelectedTemplate = await storageAPI.config.loadSetting('selectedTemplate', builtInTemplates[0].id);
                await populateTemplatesList(currentSelectedTemplate === '<live>' ? '' : currentSelectedTemplate);
            } else {
                if (!linuxTitleDragging) {
                    titleBar.classList.add('inactive');
                    windowDiv.classList.add('inactive');
                }
            }
        });


    // template selection event handler
        templateSelect.addEventListener('change', async (e) => {
            try {
                // skip if we're applying UI changes programmatically
                if (isApplyingUIChanges) return;
                
                const selectedOption = e.target.selectedOptions[0];
                if (!selectedOption) return; // handle empty selection
                
                const templateId = selectedOption.value; // use ID instead of display name
                const isCustomTemplate = selectedOption.dataset.isCustom === 'true';
                const isActionItem = selectedOption.dataset.isAction === 'true';
                
                if (isActionItem && templateId === '__more_templates__') {
                    try {
                        const templatesPath = isSteam ? '/templates-steam' : '/templates';
                        await invoke('open_url', { url: `${__PROJECT_URL__}${templatesPath}` });
                        await log(`Opened Sparkle templates page: ${templatesPath}`);
                    } catch (error) {
                        await logError('Error opening templates page', error);
                    }
                    
                    // revert to current template
                    const currentTemplate = await storageAPI.config.loadSetting('selectedTemplate', builtInTemplates[0].id);
                    if (currentTemplate === '<live>') {
                        templateSelect.value = '';
                    } else {
                        templateSelect.value = currentTemplate;
                    }
                    return;
                }
                
                if (isActionItem && templateId === '__open_folder__') {
                    try {
                        await invoke('open_templates_folder');
                        await log('Opened templates folder');
                    } catch (error) {
                        await logError('Error opening templates folder', error);
                    }
                    
                    // revert to current template
                    const currentTemplate = await storageAPI.config.loadSetting('selectedTemplate', builtInTemplates[0].id);
                    if (currentTemplate === '<live>') {
                        templateSelect.value = '';
                    } else {
                        templateSelect.value = currentTemplate;
                    }
                    return;
                }
                
                // don't process if already switching to live mode (empty value)
                if (templateId === '') return;
                
                // update delete button state based on template type
                updateDeleteButtonState(isCustomTemplate);
                
                if (isCustomTemplate) {
                    const customTemplate = customTemplatesCache.find(t => t.fileName === templateId);
                    if (customTemplate) {
                        // load current live settings first
                        const currentLiveSettings = await storageAPI.liveTemplate.loadSettings();
                        const loadedSettings = await customTemplate.loadSettings();
                        const validatedSettings = validateSettings(loadedSettings, builtinImages);
                        // merge loaded settings with current live settings
                        const mergedSettings = { ...currentLiveSettings, ...validatedSettings };
                        await storageAPI.liveTemplate.saveSettings(mergedSettings);
                        await applySettingsToUI(mergedSettings, e.fromTray || e.isInitialLoad); // skip emit during initial load to prevent duplicate scene loading in main window
                    }

                } else { // built-in template selected
                    const loadSettings = await storageAPI.builtInTemplates.loadSettings(templateId);
                    const loadedSettings = await loadSettings();
                    const validatedSettings = validateSettings(loadedSettings, builtinImages);
                    // load current live settings first
                    const currentLiveSettings = await storageAPI.liveTemplate.loadSettings();
                    // merge loaded settings with current live settings
                    const mergedSettings = { ...currentLiveSettings, ...validatedSettings };
                    await storageAPI.liveTemplate.saveSettings(mergedSettings);
                    await applySettingsToUI(mergedSettings, e.fromTray || e.isInitialLoad);
                }
                
                // only save and notify main window if this change didn't come from tray or initial load
                if (!e.fromTray && !e.isInitialLoad) {
                    // save selected template to config using ID
                    await storageAPI.config.saveSetting('selectedTemplate', templateId);
                    
                    // notify main window to update tray checkboxes
                    await emit('template-selected-from-settings', templateId);
                }
            } catch (error) {
                await logError('Error selecting template', error);
            }
        });

        function updateDeleteButtonState(isCustomTemplate) {
            deleteBtn.disabled = !isCustomTemplate;
            if (isCustomTemplate) {
                deleteBtn.style.color = "rgb(163, 0, 0)";
            } else {
                deleteBtn.style.color = "";
            }
        }


    // populate image select dropdown (must be done before applySettingsToUI)
        // add header
        const imageHeader = document.createElement('option');
        imageHeader.textContent = 'Images';
        imageHeader.disabled = true;
        imageSelect.appendChild(imageHeader);

        const images = Object.keys(builtinImages)
        images.forEach(image => { // populate
            const imageOptionElement = document.createElement('option');
            const name = builtinImages[image].name
            imageOptionElement.value = name;
            imageOptionElement.textContent = name;
            imageOptionElement.dataset.imageData = image;
            imageSelect.appendChild(imageOptionElement);
        });


    // populate custom templates in dropdown and select previously saved template
        const savedTemplate = await storageAPI.config.loadSetting('selectedTemplate', builtInTemplates[0].id); // first from builtin list is default when none found

        // flag to prevent infinite loops when programmatically setting values
        var isApplyingUIChanges = false;
         
        if (savedTemplate === '<live>') {
            await populateTemplatesList(); // populate without selecting any template
            
            const liveSettings = await storageAPI.liveTemplate.loadSettings();
            await applySettingsToUI(liveSettings, true); // skip emit during initial load
            templateSelect.value = '';
            
            // update delete button state (disabled for live mode)
            updateDeleteButtonState(false);

        } else {
            await populateTemplatesList(savedTemplate); // populate, select currently saved to config
        }


    // initialize show folder button
        showFolderBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                
                const appDataPath = storageAPI.customTemplates.dir;
                
                await invoke('show_in_folder', { path: appDataPath });
                await log(`Opened app data folder: ${appDataPath}`);
            } catch (error) {
                await logError('Error opening app data folder', error);
            }
        });


    // initialize download templates button
        downloadTemplatesBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                
                const templatesPath = isSteam ? '/templates-steam' : '/templates';
                const templatesUrl = `${__PROJECT_URL__}${templatesPath}`;
                await invoke('open_url', { url: templatesUrl });
                await log(`Opened Sparkle templates page: ${templatesUrl}`);
            } catch (error) {
                await logError('Error opening templates page', error);
            }
        });


    // mouse logo
        let logoIsActivated = false;
        let logoIsHovering = false;
        let logoIsBlinking = false;
        let logoActivateAnim = null;
        let logoCurrentFrame = 0;
        let logoEyeTrackingInterval = null;
        let logoBlinkInterval = null;
        window.lastlogoCursorX = 0;
        window.lastlogoCursorY = 0;
        window.lastlogoCursorPhysicalX = 0;
        window.lastlogoCursorPhysicalY = 0;

        listen('cursor-position-stream', (event) => {
            window.lastlogoCursorPhysicalX = event.payload.x;
            window.lastlogoCursorPhysicalY = event.payload.y;
        });
        
        logoEyeTrackingInterval = setInterval(updateEyeDirection, 50);
        logoBlinkInterval = setInterval(doBlink, 3700);
        
        async function updateEyeDirection() {
            if (logoActivateAnim || logoIsHovering || logoIsBlinking) return;

            // get logo in screen space  
            const windowPosition = await getCurrentWindow().outerPosition();
            const scaleFactor = window.devicePixelRatio || 1;
            const iconRect = appIcon.getBoundingClientRect();
            const iconScreenX = windowPosition.x / scaleFactor + iconRect.left + iconRect.width / 2;
            const iconScreenY = windowPosition.y / scaleFactor + iconRect.top + iconRect.height / 2;
            
            // angle to cursor
            const dx = window.lastlogoCursorPhysicalX - iconScreenX;
            const dy = window.lastlogoCursorPhysicalY - iconScreenY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 190;
            
            // update image
            const eyeImage = getEyeroll(angle);
            if (eyeImage) {
                appIcon.src = eyeImage;
            }
        }
        
        function doBlink() {
            // only blink during eye tracking
            if (logoIsHovering || logoActivateAnim || logoIsBlinking) return;
            
            logoIsBlinking = true;
            const beforeBlinkImage = appIcon.src;
            const blinkImage = getBlink();
            
            if (!blinkImage) {
                logoIsBlinking = false;
                return;
            }
            
            appIcon.src = blinkImage;
            
            setTimeout(() => {
                // back to eye tracking
                if (!logoIsHovering && !logoActivateAnim) {
                    appIcon.src = beforeBlinkImage;
                }
                logoIsBlinking = false;
            }, 300);
        }
        
        appIcon.addEventListener('mouseenter', async () => {
            logoIsHovering = true;
            
            if (logoActivateAnim) {
                logoCurrentFrame = logoActivateAnim.getCurrentFrame();
                logoActivateAnim.stop();
            }
            
            // if already at the end, stay on last frame
            if (logoIsActivated && logoCurrentFrame >= getActivateFrameCount() - 1) {
                const lastFrame = getLastActivateFrame();
                if (lastFrame) {
                    appIcon.src = lastFrame;
                }
                return;
            }
            
            logoActivateAnim = doActivate(logoCurrentFrame, true, (img, frameIdx) => {
                appIcon.src = img;
                logoCurrentFrame = frameIdx;
            }, () => {
                // stay on last frame
                logoIsActivated = true;
                logoActivateAnim = null;
                const lastFrame = getLastActivateFrame();
                if (lastFrame) {
                    appIcon.src = lastFrame;
                }
            });
        });
        
        appIcon.addEventListener('mouseleave', () => {
            logoIsHovering = false;
            
            if (!logoIsActivated && !logoActivateAnim) return;
            
            logoIsActivated = false;
            
            if (logoActivateAnim) {
                logoCurrentFrame = logoActivateAnim.getCurrentFrame();
                logoActivateAnim.stop();
            }
            
            logoActivateAnim = doActivate(logoCurrentFrame, false, (img, frameIdx) => {
                appIcon.src = img;
                logoCurrentFrame = frameIdx;
            }, () => {
                logoActivateAnim = null;
                logoCurrentFrame = 0;
            });
        });


    // initialize delete template button
        deleteBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                
                const selectedOption = templateSelect.selectedOptions[0];
                
                if (!selectedOption) {
                    await log('No template selected for deletion');
                    return;
                }
                
                const isCustomTemplate = selectedOption.dataset.isCustom === 'true';
                if (!isCustomTemplate) {
                    await log('Cannot delete built-in template');
                    return;
                }
                
                const templateName = selectedOption.value;
                await storageAPI.customTemplates.deleteTemplate(templateName);
                await populateTemplatesList();
                
                if (templateSelect.selectedOptions.length === 0 || templateSelect.selectedOptions[0].dataset.isCustom !== 'true') {
                    if (templateSelect.options.length > 0) {
                        templateSelect.selectedIndex = 0;
                        templateSelect.dispatchEvent(new Event('change'));
                    }
                }
                
                await log(`Deleted template ${templateName}`);
            } catch (error) {
                await logError(`Error deleting template ${templateName}`, error);
            }
        });


    // initialize save template button
        saveTemplateBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                
                const templateName = templateNameInput.value.trim();
                
                if (!templateName) {
                    // add transition and show red outline using box-shadow (smoother animation)
                    templateNameInput.style.transition = 'box-shadow 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    templateNameInput.style.boxShadow = '0 0 0 2px #ff0000';
                    
                    // remove outline after a short delay
                    setTimeout(() => {
                        templateNameInput.style.boxShadow = '';
                        // remove transition after animation completes
                        setTimeout(() => {
                            templateNameInput.style.transition = '';
                        }, 300);
                    }, 600);
                    
                    return;
                }
                
                const allValues = getAllSettingControlValues();
                await storageAPI.customTemplates.saveTemplate(templateName, allValues);
                await log(`Template '${templateName}' saved with settings:`, JSON.stringify(allValues, null, 2));
                
                // clear input field and trigger button state update
                templateNameInput.value = '';
                templateNameInput.dispatchEvent(new Event('input', { bubbles: true }));

                // re-populate templates list and select the newly saved template
                await populateTemplatesList(templateName);
                
                // save selected template to config and notify main window to update tray checkboxes
                await storageAPI.config.saveSetting('selectedTemplate', templateName);
                await emit('template-selected-from-settings', templateName);
                
                // show green outline animation on template dropdown to indicate success
                templateSelect.style.transition = 'box-shadow 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                templateSelect.style.boxShadow = '0 0 0 3px rgba(0, 209, 0, 1)';
                
                // remove outline after a short delay
                setTimeout(() => {
                    templateSelect.style.boxShadow = '';
                    // remove transition after animation completes
                    setTimeout(() => {
                        templateSelect.style.transition = '';
                    }, 300);
                }, 600);
                
            } catch (error) {
                await logError('Error saving template', error);
            }
        });


    // initialize template name input validation for save button

        // characters that are invalid in file names on Windows and Mac
        const invalidCharsRegex = /[<>:"|?*\\\/\x00-\x1f]/g;
        
        // reserved names on Windows (case insensitive)
        const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
        
        // sanitize input by removing invalid characters (but allow spaces during typing)
        function sanitizeFileName(input) {
            let sanitized = input.replace(invalidCharsRegex, '');
            sanitized = sanitized.replace(/^[\.]+|[\.]+$/g, '');
            return sanitized;
        }
        
        // check if name is invalid for non-empty cases (reserved names)
        function isInvalidFileNameNonEmpty(input) {
            const trimmed = input.trim();
            if (trimmed === '') return false; // empty is handled separately
            if (reservedNames.test(trimmed)) return true;
            return false;
        }
        
        // save button state based on input
        const saveBtnText = "<small>New Template</small>";
        const saveBtnTextOverwrite = "<small>Overwrite</small>";
        function updateSaveButtonState() {
            const templateName = templateNameInput.value.trim();
            
            // disable button only for invalid non-empty names (like reserved names)
            if (isInvalidFileNameNonEmpty(templateName)) {
                saveTemplateBtn.disabled = true;
                saveTemplateBtn.innerHTML = saveBtnText;
            } else {
                // enable button for empty names and valid names
                saveTemplateBtn.disabled = false;
                
                if (templateName === '') {
                    // empty name case - button enabled but special handling on click
                    saveTemplateBtn.innerHTML = saveBtnText;
                } else {
                    // valid name case - check if template name already exists in custom templates
                    const existingTemplate = customTemplatesCache.find(t => t.fileName === templateName);
                    if (existingTemplate) {
                        saveTemplateBtn.innerHTML = saveBtnTextOverwrite;
                    } else {
                        saveTemplateBtn.innerHTML = saveBtnText;
                    }
                }
            }
        }
        
        function handleInputValidation() {
            const currentValue = templateNameInput.value;
            const sanitizedValue = sanitizeFileName(currentValue);
            
            // only update if the value changed, prevents cursor jumping
            if (currentValue !== sanitizedValue) {
                const cursorPosition = templateNameInput.selectionStart;
                templateNameInput.value = sanitizedValue;
                
                // try to maintain cursor position, accounting for removed characters
                const lengthDifference = currentValue.length - sanitizedValue.length;
                const newCursorPosition = Math.max(0, cursorPosition - lengthDifference);
                templateNameInput.setSelectionRange(newCursorPosition, newCursorPosition);
            }
            
            updateSaveButtonState();
        }
        
        // set initial state, disabled by default
        updateSaveButtonState();
        
        // listen for input changes
        templateNameInput.addEventListener('input', handleInputValidation);
        templateNameInput.addEventListener('keyup', handleInputValidation);
        templateNameInput.addEventListener('paste', () => {
            // using setTimeout to ensure pasted content is processed
            setTimeout(handleInputValidation, 0);
        });


        async function handleImageImports(filePaths) {
            try {
                // sort files if on Windows (to match behavior of file dialog)
                let sortedFiles = filePaths;
                if (currentOS === 'windows') {
                    sortedFiles = [...filePaths].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
                }

                // shader limit
                const filesToProcess = sortedFiles.slice(0, 128);

                if (filePaths.length > 128) {
                    await log(`Processing first 128 of ${filePaths.length} images`);
                }
                
                // set flag to prevent setting controls listener from triggering
                isApplyingUIChanges = true;
                
                speedMarker.style.display = 'none';
                imageSelect.value = '';
                const processed = await processImages(filesToProcess, false); // default to false for play-from-start

                // show speed slider if multiple images/frames were picked
                if (processed.imageCount > 1) {
                    spriteSheetSpeed.style.display = 'block';
                    spriteSheetSpeedLabel.style.display = 'block';
                    playFromStartContainer.style.display = 'flex';
                    
                    // if average speed is available, set slider
                    if (processed.animationSpeed !== null) {
                        const sliderValue = clamp(processed.animationSpeed / maxAnimationSpeed);
                        spriteSheetSpeed.value = sliderValue;
                        
                        // disable play-from-start by default for animated images
                        playFromStartCheckbox.checked = false;
                        
                        // update marker
                        updateSpeedMarker(sliderValue);
                    } else {
                        // set sprite sheet speed to 0 so user sees static particles first
                        spriteSheetSpeed.value = 0;
                    }
                } else {
                    spriteSheetSpeed.style.display = 'none';
                    spriteSheetSpeedLabel.style.display = 'none';
                    playFromStartContainer.style.display = 'none';
                    spriteSheetSpeed.value = 0;
                }

                // save all settings after speed slider is set
                const allValues = getAllSettingControlValues();
                await storageAPI.liveTemplate.saveSettings(allValues);

                if (templateSelect.value !== '') {
                    // save live state to conf
                    await storageAPI.config.saveSetting('selectedTemplate', '<live>');
                    
                    // clear template selector text
                    templateSelect.value = '';

                    // delete button disable
                    updateDeleteButtonState(false);

                    // notify main window about template change
                    await emit('template-selected-from-settings', '<live>');
                }
                
                // reset flag
                isApplyingUIChanges = false;

                await emit('setting-controls-changed', allValues);
            } catch (error) {
                isApplyingUIChanges = false;
                throw error; // re-throw so caller can handle
            }
        }


    // initialize select images button
        imagesButton.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();

                // mark that image selector is being opened
                imageSelectorOpenTime = Date.now();

                // file dialog for selecting images
                // on Mac, this returns files in order of user selection.
                // on Windows 10, this returns ordered alphabetial (desc) and on Windows 11 it's (asc)).
                let selected;
                try {
                    selected = await open({
                        multiple: true,
                        filters: [{
                            name: 'Images',
                            extensions: ['png', 'jpg', 'jpeg', 'bmp', 'gif']
                        }],
                        title: "Select your images & GIFs!"
                    });
                } catch (error) {
                    await logError('Error opening file selection dialog', error);
                    return;
                }

                if (selected && selected.length > 0) {
                    await log(`Selected ${selected.length} file(s): ${selected.join(', ')}`);
                    try {
                        await handleImageImports(selected);
                    } catch (error) {
                        await logError('Error processing selected images', error);
                    }
                } else {
                    imageSelectorOpenTime = Date.now();
                    await log('No files selected');
                }
            } catch (error) {
                await logError('Unexpected error in image selector', error);
            }
        });

    // initialize gravity marker
        updateGravityMarker(.5); // initialize gravity marker on load (set to center/no gravity by default)
    
    // initialize radius marker
        radiusMarker.style.display = 'block';
        radiusMarker.style.left = `calc(97%)`;

    // initialize autostart checkbox
        try {
            const autostartCheckbox = document.getElementById('autostart');
            
            try {
                const isEnabled = await invoke('plugin:autostart|is_enabled');
                autostartCheckbox.checked = isEnabled;
            } catch (error) {
                await logError('Error checking autostart status', error);
                autostartCheckbox.checked = false;
            }
            
            // event listener for checkbox changes
            autostartCheckbox.addEventListener('change', async (e) => {
                const isChecked = e.target.checked;
                
                try {
                    if (isChecked) {
                        await invoke('plugin:autostart|enable');
                        await log('Autostart enabled');
                    } else {
                        await invoke('plugin:autostart|disable');
                        await log('Autostart disabled');
                    }
                } catch (error) {
                    e.target.checked = !e.target.checked; // revert to original setting
                    logError(`Error setting autostart to ${isChecked}`, error)
                    return;
                }
                
                // check if succesful
                try {
                    const actualState = await invoke('plugin:autostart|is_enabled');
                    if (actualState !== isChecked) {
                        e.target.checked = actualState;
                        throw(`Expected ${isChecked}, is ${actualState}`);
                    }
                } catch (error) {
                    await logError(`Error setting autostart when checked`, error);
                }
            });
        } catch (error) {
            await logError("Error initializing autostart checkbox", error);
        }


    // initialize paused checkbox
        const pausedLabel = document.querySelector('label[for="paused"]');
        
        // update label text with platform-specific keyboard shortcut
        const shortcutText = isMac ? '⇧⌃⌘P' : 'Alt+Shift+Ctrl+P';
        pausedLabel.textContent = `Pause (${shortcutText})`;
        
        // initial state from storageAPI
        const isPaused = await storageAPI.config.loadSetting('isPaused', false);
        pausedCheckbox.checked = isPaused;
        
        // event listener for checkbox changes
        pausedCheckbox.addEventListener('change', async (e) => {
            const isChecked = e.target.checked;
            
            try {
                await storageAPI.config.saveSetting('isPaused', isChecked);
                await emit('settings-pause-changed', isChecked);
            } catch (error) {
                e.target.checked = !e.target.checked;
                await logError(`Error setting pause state to ${isChecked}`, error);
            }
        });


    // listen for pause state changes from tray/main window
        try {
            const unlistenPause = await listen('pause-state-changed', async (event) => {
                const isPaused = event.payload;
                if (pausedCheckbox.checked !== isPaused) {
                    pausedCheckbox.checked = isPaused;
                }
            });
            window.pauseStateUnlisten = unlistenPause;
        } catch (error) {
            await logError("Error setting up pause state listener", error);
        }


    // listen for template selection from tray menu
        try {
            const unlistenTemplateSelect = await listen('template-selected-from-tray', async (event) => {
                const templateId = event.payload;
                
                // update dropdown selection if it doesn't match
                if (templateSelect.value !== templateId) {
                    templateSelect.value = templateId;
                    
                    // trigger change event to update UI and load settings
                    const changeEvent = new Event('change', { bubbles: true });
                    changeEvent.fromTray = true;
                    templateSelect.dispatchEvent(changeEvent);
                }
            });
            window.templateSelectUnlisten = unlistenTemplateSelect;
        } catch (error) {
            await logError("Error setting up template selection listener", error);
        }


    // listen for .sparkle file applied from main window (file association)
        try {
            const unlistenSparkleFile = await listen('sparkle-file-applied', async (event) => {
                const settings = event.payload;
                
                // set dropdown to <live> (empty value)
                templateSelect.value = '';
                
                // update UI with the new settings
                await applySettingsToUI(settings, true); // skip emit to prevent duplicate scene reload
                
                // update delete button state (disabled for live mode)
                updateDeleteButtonState(false);
            });
            window.sparkleFileUnlisten = unlistenSparkleFile;
        } catch (error) {
            await logError("Error setting up sparkle file listener", error);
        }


    // initialize drag-and-drop for .sparkle files and images
        try {
            const unlistenDragDrop = await currentWindow.onDragDropEvent(async (event) => {
                if (event.payload.type === 'drop') {
                    const paths = event.payload.paths;
                    
                    // filter for .sparkle files
                    const sparklePaths = paths.filter(path => path.toLowerCase().endsWith('.sparkle'));
                    
                    if (sparklePaths.length > 0) {
                        await log(`Dropped ${sparklePaths.length} .sparkle file(s)`);
                        
                        // emit the same event as when files are double-clicked (file associations)
                        // this will be handled by main.js which processes sparkle files
                        await emit('sparkle-files-opened', sparklePaths);
                    }
                    
                    // filter for image files
                    const imageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
                    const imagePaths = paths.filter(path => {
                        const ext = path.toLowerCase().split('.').pop();
                        return imageExtensions.includes(ext);
                    });
                    
                    if (imagePaths.length > 0 && isLicensed) {
                        await log(`Dropped ${imagePaths.length} image file(s)`);
                        await handleImageImports(imagePaths);
                    }
                }
            });
            window.dragDropUnlisten = unlistenDragDrop;
        } catch (error) {
            await logError("Error setting up drag-and-drop handler", error);
        }


    // initialize monitor selection dropdown
        async function populateMonitorList(monitors) {
            try {
                if (!monitors) {
                    // request monitor list from main window
                    await emit('request-monitor-list');
                    return; // will be called again when monitor-list-update event is received
                }
                
                const savedMonitorName = await storageAPI.config.loadSetting('selectedMonitor', null);
                
                // clear existing options
                monitorSelect.innerHTML = '';

                // todo add "All Monitors" feature
                const allMonitorsOption = document.createElement('option');
                allMonitorsOption.textContent = '[All Monitors] (coming soon!)';
                allMonitorsOption.value = 'all-monitors';
                allMonitorsOption.disabled = true;
                monitorSelect.appendChild(allMonitorsOption);
                
                // add "Primary Monitor" as the default option
                const mainOption = document.createElement('option');
                mainOption.textContent = '(Primary Monitor)';
                mainOption.value = 'primary-monitor';
                mainOption.dataset.monitorIndex = 'main';
                monitorSelect.appendChild(mainOption);
                
                // add monitors to dropdown
                monitors.forEach((monitor, index) => {
                    const option = document.createElement('option');
                    
                    // create monitor label
                    let monitorLabel = `Monitor ${index + 1}`;
                    if (monitor.name) {
                        monitorLabel = monitor.name;
                    }
                    if (monitor.size) {
                        monitorLabel += ` (${monitor.size.width}×${monitor.size.height})`;
                    }
                    
                    option.textContent = monitorLabel;
                    option.value = monitor.name || `monitor-${index}`;
                    option.dataset.monitorIndex = index;
                    
                    monitorSelect.appendChild(option);
                });
                
                // select saved monitor if it exists, otherwise default to "Primary Monitor"
                if (savedMonitorName) {
                    const matchingOption = Array.from(monitorSelect.options).find(
                        opt => opt.value === savedMonitorName
                    );
                    if (matchingOption) {
                        // saved monitor exists in the list, select it
                        monitorSelect.value = savedMonitorName;
                    } else {
                        // saved monitor doesn't exist, fall back to "Primary Monitor" without saving
                        monitorSelect.value = 'primary-monitor';
                    }
                } else {
                    // no saved monitor, default to "Primary Monitor" and save it
                    monitorSelect.value = 'primary-monitor';
                    await storageAPI.config.saveSetting('selectedMonitor', 'primary-monitor');
                }
            } catch (error) {
                await logError('Error populating monitor list', error);
            }
        }
        
        // populate monitor list on initialization
        try {
            // request initial monitor list from main window
            await populateMonitorList(null);
            
            // listen for monitor list updates from main window
            const unlistenMonitorList = await listen('monitor-list-update', async (event) => {
                const monitors = event.payload;
                const savedSelection = monitorSelect.value;
                await populateMonitorList(monitors);
                
                // try to restore selection if monitor still exists
                if (savedSelection) {
                    const matchingOption = Array.from(monitorSelect.options).find(
                        opt => opt.value === savedSelection
                    );
                    if (matchingOption) {
                        monitorSelect.value = savedSelection;
                    }
                }
            });
            window.monitorListUnlisten = unlistenMonitorList;
            
            // listen for active monitor changes from main (when monitor disconnects)
            const unlistenActiveMonitor = await listen('active-monitor-changed', async (event) => {
                const newActiveMonitor = event.payload;
                // update dropdown to show the new active monitor without saving
                if (monitorSelect.value !== newActiveMonitor) {
                    monitorSelect.value = newActiveMonitor;
                }
            });
            window.activeMonitorUnlisten = unlistenActiveMonitor;
            
            // add change event listener to save selected monitor
            monitorSelect.addEventListener('change', async (e) => {
                try {
                    const selectedMonitorName = e.target.value;
                    await storageAPI.config.saveSetting('selectedMonitor', selectedMonitorName);
                    await emit('monitor-changed', selectedMonitorName);
                } catch (error) {
                    await logError('Error saving selected monitor', error);
                }
            });
            
        } catch (error) {
            await logError("Error initializing monitor selection", error);
        }


    // listen for changes on image list
        imageSelect.addEventListener('change', async (e) => {
            try {
                // skip if we're applying settings from saved state
                if (isApplyingUIChanges) return;
                
                // set flag immediately to prevent generic setting-control listener from firing with stale values
                isApplyingUIChanges = true;
                
                const selectedOption = e.target.options[e.target.selectedIndex];
                const imageData = selectedOption.dataset.imageData;

                // if selection changed in this dropdown, that means we're now using a built-in image
                const imageUrl = builtinImages[imageData].img;
                const img = await new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.src = imageUrl;
                });

                // hide speed slider for built-in images that don't support it
                const defaultSpeed = builtinImages[imageData].defaultSpeed;
                const imageCount = builtinImages[imageData].imageCount.reduce((sum, n) => sum + n, 0); // sum array for total
                const playFromStart = builtinImages[imageData].playFromStart;
                await processImages([img], playFromStart);

                // set speed slider visibility and value after processImages
                if (imageCount > 1) {
                    spriteSheetSpeed.style.display = 'block';
                    spriteSheetSpeedLabel.style.display = 'block';
                    playFromStartContainer.style.display = 'flex';
                    
                    // set speed slider to native speed if available (defaultSpeed is already normalized 0-1)
                    if (defaultSpeed !== undefined && defaultSpeed !== null && !isNaN(defaultSpeed)) {
                        spriteSheetSpeed.value = defaultSpeed;
                    }
                } else {
                    spriteSheetSpeed.style.display = 'none';
                    spriteSheetSpeedLabel.style.display = 'none';
                    playFromStartContainer.style.display = 'none';
                    spriteSheetSpeed.value = 0;
                }

                // update speed marker visibility based on whether this image has native speed
                updateSpeedMarker(defaultSpeed);

                // save all settings after speed slider is set
                const allValues = getAllSettingControlValues();
                await storageAPI.liveTemplate.saveSettings(allValues);
                
                // switch to live template mode when image changes
                if (templateSelect.value !== '') { // if not in live template yet
                    // clear template selector to switch to live mode
                    templateSelect.value = '';
                    
                    // save live state to config
                    await storageAPI.config.saveSetting('selectedTemplate', '<live>');
                    
                    // update delete button state
                    updateDeleteButtonState(false);
                    
                    // notify main window about template change
                    await emit('template-selected-from-settings', '<live>');
                }
                
                // reset flag before emitting
                isApplyingUIChanges = false;
                
                await emit('setting-controls-changed', allValues);
            } catch (error) {
                isApplyingUIChanges = false;
                await logError('Error on image select', error);
            }
        });


    // convert image URL to base64
        async function imageUrlToBase64(imageUrl) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => {
                    // if conversion fails, return original URL
                    resolve(imageUrl);
                };
                img.src = imageUrl;
            });
        }

    // apply settings to UI controls
        async function applySettingsToUI(settings, skipEmit = false) {
            try {
                isApplyingUIChanges = true;
                
                // track if we need to replace external image with default image for unlicensed users
                let needsUnlicensedFallback = false;
                
                Object.entries(settings).forEach(([controlId, value]) => {
                    const control = document.getElementById(controlId);
                    
                    // handle radio buttons by name instead of ID
                    if (!control) {
                        // check if this is a radio button group name
                        const radioButtons = document.querySelectorAll(`input[type="radio"][name="${controlId}"]`);
                        if (radioButtons.length > 0) {
                            radioButtons.forEach(radio => {
                                radio.checked = (radio.value === value);
                            });
                            return;
                        }
                        return;
                    }

                    // check control type
                    if (control.type === 'checkbox') {
                        control.checked = Boolean(value);
                    } else if (control.type === 'radio') {
                        control.checked = (control.value === value);
                    } else if (control.type === 'range') {
                        control.value = value;
                        const event = new Event('input', { bubbles: true });
                        control.dispatchEvent(event);
                    } else if (control.type === 'number') {
                        control.value = value;
                    } else if (control.type === 'text' || control.tagName.toLowerCase() === 'input') {
                        control.value = value;
                    }


                    // image-data specifically - defer loading to after all settings are applied
                    if (control.id == "image-data") {
                        if (!value || value.trim() === ''){ // empty, don't change dropdown
                            // leave dropdown at its current value, don't override
                        }else if (value.includes("*")){ // hybrid format: "image:key*base64"
                            const [builtinKey, base64Data] = value.split("*", 2);
                            if (builtinKey.startsWith("image:") && builtinImages[builtinKey]) {
                                // built-in exists, use it
                                const targetName = builtinImages[builtinKey]?.name;
                                control.value = targetName; // set name
                            } else {
                                // built-in doesn't exist
                                if (!isLicensed || !base64Data || base64Data.trim() === '') {
                                    // unlicensed OR no base64 fallback available - use default
                                    needsUnlicensedFallback = true;
                                } else {
                                    // licensed with base64 fallback available
                                    control.value = ""; // set empty to indicate custom
                                }
                            }
                        }else if (value.startsWith("image:")){ // built-in format
                            if (builtinImages[value]) {
                                const targetName = builtinImages[value]?.name;
                                control.value = targetName; // set name
                            } else {
                                // built-in doesn't exist, default to defaultImage
                                needsUnlicensedFallback = true;
                            }
                        } else { // pure base64
                            // if unlicensed, mark for replacement with default built-in sparkles
                            if (!isLicensed) {
                                needsUnlicensedFallback = true;
                            } else {
                                // licensed: prepare to load external image (will happen at the end)
                                control.value = ""; // set empty to indicate custom
                            }
                        }
                    }else{
                        const changeEvent = new Event('change', { bubbles: true });
                        control.dispatchEvent(changeEvent);
                    }

                });

                // handle image loading after all settings are applied
                const imageDataValue = settings["image-data"];
                if (imageDataValue && imageDataValue.trim() !== '') {
                    
                    // parse image data value to handle hybrid format
                    let builtinKey = null;
                    let base64Fallback = null;
                    
                    if (imageDataValue.includes("*")) {
                        // hybrid format: "image:key*base64"
                        const parts = imageDataValue.split("*", 2);
                        if (parts[0].startsWith("image:")) {
                            builtinKey = parts[0];
                            base64Fallback = parts[1];
                        } else {
                            // malformed, treat as external
                            base64Fallback = imageDataValue;
                        }
                    } else if (imageDataValue.startsWith("image:")) {
                        // built-in format
                        builtinKey = imageDataValue;
                    }
                    
                    if (builtinKey && builtinImages[builtinKey]) { // built-in exists, use it

                        // handle speed slider for built-in images
                        const defaultSpeed = builtinImages[builtinKey].defaultSpeed;
                        const playFromStart = builtinImages[builtinKey].playFromStart;

                        // load built-in image to preview container and convert to base64
                        const imageUrl = builtinImages[builtinKey].img;
                        previewImg.src = await imageUrlToBase64(imageUrl);
                        
                        const imageCount = settings["image-count"].reduce((sum, c) => sum + c, 0)
                        previewImg.dataset.imageCount = imageCount.toString();
                        
                        // store array metadata
                        previewImg.dataset.imageCounts = JSON.stringify(settings["image-count"]);
                        previewImg.dataset.cycleCounts = JSON.stringify(settings["image-cycles"]);
                        
                        // update checkbox to reflect play-from-start value
                        playFromStartCheckbox.checked = settings["image-play-from-start"] !== undefined ? settings["image-play-from-start"] : playFromStart;

                        if (imageCount > 1){
                            spriteSheetSpeed.style.display = 'block';
                            spriteSheetSpeedLabel.style.display = 'block';
                            playFromStartContainer.style.display = 'flex';

                            if (settings['image-speed'] !== undefined && settings['image-speed'] >= 0 && settings['image-speed'] <= 1) { // set image-speed value if it exists in settings and is valid
                                spriteSheetSpeed.value = settings['image-speed'];
                            } else if (defaultSpeed !== false) {
                                spriteSheetSpeed.value = defaultSpeed;
                            }
                            
                            // update speed marker to show native speed
                            updateSpeedMarker(defaultSpeed);
                        }else{
                            spriteSheetSpeed.style.display = 'none';
                            spriteSheetSpeedLabel.style.display = 'none';
                            playFromStartContainer.style.display = 'none';
                            speedMarker.style.display = 'none';
                        }

                    } else { // external image or base64 fallback from hybrid format
                        
                        // determine what image data to use
                        const actualImageData = base64Fallback || imageDataValue;
                        
                        // check if we have valid base64 data
                        const hasValidBase64 = actualImageData && actualImageData.trim() !== '' && 
                                              actualImageData !== imageDataValue || !imageDataValue.includes("*");

                        if (needsUnlicensedFallback || !hasValidBase64) {
                            // unlicensed: replace external/fallback with default built-in
                            const targetName = builtinImages[defaultImage]?.name;
                            imageSelect.value = targetName;
                            
                            // load built-in image to preview container and convert to base64
                            const imageUrl = builtinImages[defaultImage].img;
                            previewImg.src = await imageUrlToBase64(imageUrl);
                            previewImg.dataset.imageCount = builtinImages[defaultImage].imageCount.reduce((sum, n) => sum + n, 0).toString(); // sum array for total
                            // update checkbox to reflect play-from-start value
                            playFromStartCheckbox.checked = builtinImages[defaultImage].playFromStart;
                            
                            // handle speed slider for built-in image
                            const defaultSpeed = builtinImages[defaultImage].defaultSpeed;
                            if (previewImg.dataset.imageCount > 1) {
                                spriteSheetSpeed.style.display = 'block';
                                spriteSheetSpeedLabel.style.display = 'block';
                                playFromStartContainer.style.display = 'flex';
                                spriteSheetSpeed.value = defaultSpeed;
                                
                                // update speed marker to show native speed
                                updateSpeedMarker(defaultSpeed);
                            } else {
                                spriteSheetSpeed.style.display = 'none';
                                spriteSheetSpeedLabel.style.display = 'none';
                                playFromStartContainer.style.display = 'none';
                                spriteSheetSpeed.value = 0;
                                speedMarker.style.display = 'none';
                            }
                            
                            // clear template selection to indicate live mode
                            templateSelect.value = '';

                            // delete button disable
                            updateDeleteButtonState(false);
                            
                            // update settings object for saving
                            settings["image-data"] = defaultImage;
                            settings["image-count"] = builtinImages[defaultImage].imageCount;
                            settings["image-play-from-start"] = builtinImages[defaultImage].playFromStart;
                            settings["image-cycles"] = builtinImages[defaultImage].cycles;
                            
                            // save as live template
                            await storageAPI.liveTemplate.saveSettings(settings);
                            await storageAPI.config.saveSetting('selectedTemplate', '<live>');

                        } else {

                            // licensed: load external image or base64 fallback
                            previewImg.src = actualImageData;
                            
                            const imageCounts = settings["image-count"];
                            const totalImageCount = imageCounts.reduce((sum, c) => sum + c, 0);
                            previewImg.dataset.imageCount = totalImageCount.toString();
                            previewImg.dataset.imageCounts = JSON.stringify(imageCounts);
                            
                            const cycleCounts = settings["image-cycles"];
                            previewImg.dataset.cycleCounts = JSON.stringify(cycleCounts);
                            
                            // restore aspect ratio if available
                            if (settings['image-aspect-ratio'] !== undefined) {
                                previewImg.dataset.aspectRatio = settings['image-aspect-ratio'].toString();
                            } else {
                                delete previewImg.dataset.aspectRatio;
                            }

                            // handle speed slider based on image-count and playFromStart
                            const speedValue = settings['image-speed'];
                            if (totalImageCount > 1) {
                                spriteSheetSpeed.style.display = 'block';
                                spriteSheetSpeedLabel.style.display = 'block';
                                playFromStartContainer.style.display = 'flex';
                                if (speedValue !== undefined && speedValue >= 0 && speedValue <= 1){
                                    spriteSheetSpeed.value = speedValue;
                                }else{
                                    spriteSheetSpeed.value = 0;
                                }
                                
                                // hide speed marker for external images (no native speed)
                                speedMarker.style.display = 'none';
                            } else {
                                spriteSheetSpeed.style.display = 'none';
                                spriteSheetSpeedLabel.style.display = 'none';
                                playFromStartContainer.style.display = 'none';
                                spriteSheetSpeed.value = 0;
                                speedMarker.style.display = 'none';
                            }
                        }
                    }
                }

            } catch (error) {
                logError('Error applying settings to UI', error);
            } finally {
                isApplyingUIChanges = false;
                
                updateSpinningSliderState();
                
                // notify main window of current UI state (skip if tray initiated)
                if (!skipEmit) {
                    try {
                        const allValues = getAllSettingControlValues();
                        await emit('setting-controls-changed', allValues);
                    } catch (error) {
                        await logError('Error emitting settings to main window', error);
                    }
                }
            }
        }


    // listen for changes on setting-control objects
        const settingControls = document.querySelectorAll('.setting-control');
        settingControls.forEach(control => {
            control.addEventListener('change', async (e) => {
                // skip while manually setting UI
                if (isApplyingUIChanges) return;
                
                // save all controls to liveTemplate and use
                try {
                    const allValues = getAllSettingControlValues();
                    
                    // switch to live template mode when any setting changes
                    if (templateSelect.value !== '') { // if not in live template yet
                        
                        // save current settings as live template
                        await storageAPI.liveTemplate.saveSettings(allValues);
                        
                        // clear template selector text
                        templateSelect.value = '';

                        // save live state to conf
                        await storageAPI.config.saveSetting('selectedTemplate', '<live>');
                        
                        // delete button disable
                        updateDeleteButtonState(false);
                        
                        // notify main window about template change
                        await emit('template-selected-from-settings', '<live>');

                    } else { // already in live mode, just update the live template settings
                        await storageAPI.liveTemplate.saveSettings(allValues);
                    }
                    
                    await emit('setting-controls-changed', allValues);

                } catch (error) {
                    await logError('Error settings controls change event', error);
                }
            });
        });


    // disable spinning slider
        function updateSpinningSliderState() {
            const shouldDisable = alignCheckbox.checked || flipCheckbox.checked;
            spinningSlider.disabled = shouldDisable;
            spinningSlider.style.opacity = shouldDisable ? '0.4' : '1';
            spinningLabel.style.opacity = shouldDisable ? '0.4' : '1';
        }
        
        updateSpinningSliderState();
        alignCheckbox.addEventListener('change', updateSpinningSliderState);
        flipCheckbox.addEventListener('change', updateSpinningSliderState);


    // wait for XP.css to be fully loaded and applied
        async function waitForStylesLoaded() {
            return new Promise((resolve) => {
                const checkStyles = () => {
                    const windowDiv = document.querySelector('.window');
                    if (!windowDiv) {
                        setTimeout(checkStyles, 10);
                        return;
                    }
                    
                    windowDiv.offsetHeight; // force layout calculation
                    
                    // check if XP.css styles are applied
                    const computedStyle = window.getComputedStyle(windowDiv);
                    const hasXPStyles = computedStyle.border && computedStyle.border !== 'none' && 
                                        computedStyle.padding && computedStyle.padding !== '0px';
                    if (hasXPStyles) {
                        resolve();
                    } else {
                        setTimeout(checkStyles, 10);
                    }
                };
                
                checkStyles();
            });
        }
        await waitForStylesLoaded(); // awaiting XP.css to load and apply styles before continuing


    // initialize window size & tab panel based on XP.css styles
        try {
            const windowDiv = document.querySelector('.window');
            const tabPanels = document.querySelectorAll('[role="tabpanel"]');
            
            // ensure Tab A is visible (it has the most content)
            tabPanels.forEach((panel, index) => {
                panel.hidden = index !== 0;
            });
            
            windowDiv.offsetHeight; // force layout calculation with Tab A
            
            // measure tab-A's panel height to use as reference
            const tabA = document.getElementById('tab-A');
            if (tabA) {
                const tabAHeight = tabA.getBoundingClientRect().height;
                tabPanels.forEach(panel => { // set all tabs to same height
                    panel.style.height = tabAHeight + 'px';
                    panel.style.minHeight = tabAHeight + 'px';
                });
            }
            windowDiv.offsetHeight; // force layout calculation after setting heights
            const rect = windowDiv.getBoundingClientRect();
            
            const scaleFactor = window.devicePixelRatio || 1;
            const paddingBuffer = scaleFactor > 1 ? 12 : 4; // more padding for high DPI
            
            // use the content dims with padding
            const width = Math.ceil(rect.width) + paddingBuffer;
            const height = Math.ceil(rect.height) + paddingBuffer;
            
            await currentWindow.setSize({ 
                type: 'Logical', 
                width: width, 
                height: height
            });

            // center window on the monitor where the cursor was when window opened
            try {
                // await the promises that were started at the beginning
                const cursorPos = await initialCursorPosPromise;
                const monitors = await initialMonitorsPromise;
                
                // find which monitor contains the cursor
                let targetMonitor = null;
                for (const monitor of monitors) {
                    const scaleFactor = monitor.scaleFactor || 1;
                    const monitorX = monitor.position?.x || 0;
                    const monitorY = monitor.position?.y || 0;
                    const monitorWidth = monitor.size?.width || 0;
                    const monitorHeight = monitor.size?.height || 0;
                    
                    // convert size to logical coordinates
                    const logicalWidth = monitorWidth / scaleFactor;
                    const logicalHeight = monitorHeight / scaleFactor;
                    
                    // check if cursor is within this monitor's bounds (both in logical coordinates)
                    if (cursorPos.x >= monitorX && cursorPos.x < monitorX + logicalWidth &&
                        cursorPos.y >= monitorY && cursorPos.y < monitorY + logicalHeight) {
                        targetMonitor = monitor;
                        break;
                    }
                }
                
                // fallback to primary monitor if cursor monitor not found
                if (!targetMonitor) {
                    targetMonitor = await primaryMonitor();
                }
                
                // center window on the target monitor
                if (targetMonitor && targetMonitor.size) {
                    const scaleFactor = targetMonitor.scaleFactor || 1;
                    const monitorX = targetMonitor.position?.x || 0;
                    const monitorY = targetMonitor.position?.y || 0;
                    const logicalScreenWidth = targetMonitor.size.width / scaleFactor;
                    const logicalScreenHeight = targetMonitor.size.height / scaleFactor;
                    const logicalMonitorX = monitorX / scaleFactor;
                    const logicalMonitorY = monitorY / scaleFactor;
                    const centerX = Math.floor(logicalMonitorX + (logicalScreenWidth - width) / 2);
                    const centerY = Math.floor(logicalMonitorY + (logicalScreenHeight - height) / 2);
                    await currentWindow.setPosition({
                        type: 'Logical',
                        x: centerX,
                        y: centerY
                    });
                }
            } catch (error) {
                await logError('Error centering window on cursor monitor', error);
                // fallback to primary monitor
                const monitor = await primaryMonitor();
                if (monitor && monitor.size) {
                    const scaleFactor = monitor.scaleFactor || 1;
                    const logicalScreenWidth = monitor.size.width / scaleFactor;
                    const logicalScreenHeight = monitor.size.height / scaleFactor;
                    const centerX = Math.floor((logicalScreenWidth - width) / 2);
                    const centerY = Math.floor((logicalScreenHeight - height) / 2);
                    await currentWindow.setPosition({
                        type: 'Logical',
                        x: centerX,
                        y: centerY
                    });
                }
            }
        } catch (error) {
            await logError('Error setting window size', error);
        }

        
    // send settings window dimensions to main so it knows where its bounds are on-screen
        setInterval(async () => {
            const windowPosition = await currentWindow.outerPosition();
            const windowSize = await currentWindow.outerSize();
            
            // convert from physical pixels to logical pixels using this monitor's scale factor
            // this ensures cursor position (logical) and window bounds (logical) are in the same coordinate system
            const scaleFactor = window.devicePixelRatio || 1;
            
            // emit window dimensions to main window (in logical coordinates)
            await emit('settings-window-dimensions', {
                position: {
                    x: windowPosition.x / scaleFactor,
                    y: windowPosition.y / scaleFactor
                },
                size: {
                    width: windowSize.width / scaleFactor,
                    height: windowSize.height / scaleFactor
                }
            });
        }, 200); // ms


    await log("Settings window initialized");
    
    // if opened in initialize-only mode, close immediately after initialization
    if (initializeOnly) {
        await currentWindow.close();
        return;
    }

    document.body.style.opacity = '1';

    // bring window to front
    try {
        await currentWindow.setFocus(true);
        await currentWindow.setAlwaysOnTop(true);
        await currentWindow.setAlwaysOnTop(false);
    } catch (error) {
        await logError("Error bringing window to front", error);
    }
});



// collect all setting-control values
function getAllSettingControlValues() {
    const settingControls = document.querySelectorAll('.setting-control');
    const values = {};

    let imageSelectValue;

    settingControls.forEach(control => {
        if (control.id) {
            if (control.type === 'checkbox') {
                values[control.id] = control.checked;
            } else if (control.type === 'radio') {
                if (control.checked) {
                    values[control.name] = control.value;
                }
            } else if (control.type === 'range') {
                values[control.id] = parseFloat(control.value);
            } else if (control.tagName === 'IMG') {
                values[control.id] = control.src;
            } else {
                values[control.id] = control.value;
            }

            if (control.id == "image-data") imageSelectValue = control.value;
        }
    });
    
    
    // additional data to store
    
        // built-in image
        const builtInName = Object.keys(builtinImages).find(key => builtinImages[key].name === imageSelectValue) || null; // get relevant built-in name if any, otherwise null
        if (builtInName) {
            // save as hybrid format: "image:key*base64" for compatibility with other apps
            // previewImg.src should already contain base64 from when the image was loaded
            const base64Data = previewImg.src;
            values["image-data"] = `${builtInName}*${base64Data}`;
            values["image-count"] = builtinImages[builtInName].imageCount;
            values["image-aspect-ratio"] = builtinImages[builtInName].aspectRatio; // aspect ratio (width/height)
            values["image-cycles"] = builtinImages[builtInName].cycles;

        // external image
        } else if (previewImg.src && previewImg.src.trim() !== '') {
            values["image-data"] = previewImg.src;
            values["image-count"] = JSON.parse(previewImg.dataset.imageCounts);
            values["image-cycles"] = JSON.parse(previewImg.dataset.cycleCounts);
            
            // store aspect ratio if available
            if (previewImg.dataset.aspectRatio !== undefined) {
                values["image-aspect-ratio"] = parseFloat(previewImg.dataset.aspectRatio);
            }else{
                values["image-aspect-ratio"] = 1;
            }
        }

    // move image-data to the end of the object
    if (values["image-data"] !== undefined && values["image-data"] !== '') {
        const imageData = values["image-data"];
        delete values["image-data"];
        values["image-data"] = imageData;
    }

    return values;
}



function uiLock(locked) {
    const settingControls = document.querySelectorAll('.setting-control');
    const buttons = document.querySelectorAll('button');
    const selects = document.querySelectorAll('select');
    const tabs = document.querySelectorAll('[role="tab"]');
    
    if (locked) {
        // prevent interaction with all interactive elements using pointer-events
        settingControls.forEach(control => control.style.pointerEvents = 'none');
        buttons.forEach(button => button.style.pointerEvents = 'none');
        selects.forEach(select => select.style.pointerEvents = 'none');
        tabs.forEach(tab => tab.style.pointerEvents = 'none');
    } else {
        // restore interaction with all interactive elements
        settingControls.forEach(control => control.style.pointerEvents = '');
        buttons.forEach(button => button.style.pointerEvents = '');
        selects.forEach(select => select.style.pointerEvents = '');
        tabs.forEach(tab => tab.style.pointerEvents = '');
    }
}



async function processImages(images, playFromStart = false){

    // lock UI on this window until done
    uiLock(true);

    previewContainer.style.display = 'none';

    // show progress bar
    const progressBar = document.getElementById('image-loading-progress');
    const progressText = document.getElementById('image-loading-text');
    progressBar.style.display = 'block';
    progressText.style.display = 'block';
    progressBar.value = 10;
    
    // animate progress bar (choppy animation but better than nothing)
    const animationDuration = 2000; // ms
    const startTime = Date.now();
    let animationFrame;
    function animateProgress() {
        const elapsed = Date.now() - startTime;
        const t = (elapsed / animationDuration) / 2 + .5; // 0 to 1 -> .5 to 1
        const ratio = Math.min(t, 1); // clamped
        const easedRatio = 1 - Math.pow(1 - ratio, 2); // quadratic ease-out: fast at start, slow at end
        const progress = easedRatio * 100; // percentages
        progressBar.value = progress;
        if (progress < 100) animationFrame = requestAnimationFrame(animateProgress);
    }
    animateProgress();
    
    // process images
    const processed = await process(images, { readFile });
    
    // stop animation and hide progress bar
    cancelAnimationFrame(animationFrame);
    progressBar.style.display = 'none';
    progressText.style.display = 'none';

    // show preview
    previewImg.src = processed.base64;
    previewImg.dataset.imageCount = processed.imageCount.toString(); // store total frame count
    
    // store the new array metadata
    previewImg.dataset.imageCounts = JSON.stringify(processed.imageCounts); // array of frame counts per file
    previewImg.dataset.cycleCounts = JSON.stringify(processed.cycleCounts); // array of cycles per file
    
    // update checkbox to reflect play-from-start value
    playFromStartCheckbox.checked = playFromStart;
    
    // store aspect ratio
    if (processed.aspectRatio !== null && processed.aspectRatio !== undefined) {
        previewImg.dataset.aspectRatio = processed.aspectRatio.toString();
    } else {
        delete previewImg.dataset.aspectRatio;
    }
    
    // unlock UI
    uiLock(false);

    previewContainer.style.display = 'block';

    return processed;
}



// store marker target values for click handlers
let speedMarkerTargetValue = null;
let gravityMarkerTargetValue = null;

// update speed marker position to show GIF's native speed
function updateSpeedMarker(nativeSpeedValue) {
    if (nativeSpeedValue) {
        // snap to speed slider's step value for precise alignment
        const speedStep = parseFloat(spriteSheetSpeed.step);
        const snappedValue = Math.round(nativeSpeedValue / speedStep) * speedStep;

        // store the target value for click handler
        speedMarkerTargetValue = snappedValue;

        const manualRange = [10, 93]; // slider needs a custom range to fit
        speedMarker.style.display = 'block';
        const adjustedPercentage = remap(snappedValue, 0, 1, manualRange[0], manualRange[1]);
        speedMarker.style.left = `calc(${adjustedPercentage}%`;
    } else {
        speedMarker.style.display = 'none';
        speedMarkerTargetValue = null;
    }
}

// update gravity marker position
function updateGravityMarker(targetValue) {
    if (targetValue !== undefined && targetValue !== null) {
        // snap to gravity slider's step value for precise alignment
        const gravityStep = parseFloat(gravitySlider.step);
        const snappedValue = Math.round(targetValue / gravityStep) * gravityStep;

        // store the target value for click handler
        gravityMarkerTargetValue = snappedValue;
        const manualRange = [15, 90]; // slider needs a custom range to fit
        gravityMarker.style.display = 'block';
        const adjustedPercentage = remap(snappedValue, 0, 1, manualRange[0], manualRange[1]);
        gravityMarker.style.left = `calc(${adjustedPercentage}%`;
    } else {
        gravityMarker.style.display = 'none';
    }
}



speedMarker.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (speedMarkerTargetValue !== null) {
        spriteSheetSpeed.value = speedMarkerTargetValue;
        spriteSheetSpeed.dispatchEvent(new Event('change', { bubbles: true }));
    }
});

gravityMarker.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    gravitySlider.value = gravityMarkerTargetValue;
    gravitySlider.dispatchEvent(new Event('change', { bubbles: true }));
});

radiusMarker.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    radiusSlider.value = 1;
    radiusSlider.dispatchEvent(new Event('change', { bubbles: true }));
});



// tooltip follows cursor for all elements with data-tooltip
document.addEventListener('mousemove', (e) => {
    const tooltipElements = document.querySelectorAll('.tooltip[data-tooltip]:hover');
    tooltipElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        element.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});