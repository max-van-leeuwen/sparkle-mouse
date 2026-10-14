// about window



import { log, logError } from './log.js';
import { invoke } from '@tauri-apps/api/core';
import 'xp.css/dist/XP.css';
import { getCurrentWindow, primaryMonitor, availableMonitors } from '@tauri-apps/api/window';
import { emit } from '@tauri-apps/api/event';
import { getVersion } from '@tauri-apps/api/app';



// wave animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes demoWave {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
    }
    .demo-wave-char {
        display: inline-block;
        animation: demoWave 0.6s ease-in-out infinite;
    }
`;
document.head.appendChild(style);



// window initialization
window.addEventListener('DOMContentLoaded', async () => {
    
    // start fetching cursor position and monitors immediately
    const initialCursorPosPromise = invoke('get_cursor_position');
    const initialMonitorsPromise = availableMonitors();
    
    const currentWindow = getCurrentWindow();
    
    // get Steam build status
    const isSteam = await invoke('get_is_steam');

    // remove donate link in Steam builds
    if (isSteam) {
        document.getElementById('donate-link')?.remove();
    }

    // replace __PROJECT_URL__ placeholders in HTML (including paths)
    document.querySelectorAll('a[href^="__PROJECT_URL__"]').forEach(link => {
        const rawHref = link.getAttribute('href');
        let processedHref = rawHref.replace('__PROJECT_URL__', __PROJECT_URL__);
        
        if (isSteam && processedHref.includes('/templates')) {
            processedHref = processedHref.replace('/templates', '/templates-steam');
        }
        
        link.href = processedHref;
    });

    // get OS from Rust
    const currentOS = await invoke('get_os');
    const isMac = currentOS === 'macos';

    // track last title bar interaction time (to prevent false focus loss on Linux during drag)
    let lastTitleBarMouseDown = 0;

    // initialize draggable title bar
    try {
        const titleBar = document.querySelector('.title-bar');
        titleBar.addEventListener('mousedown', async (e) => {
            if (e.target.closest('.title-bar-controls')) return;
            lastTitleBarMouseDown = Date.now();
            await currentWindow.startDragging();
            e.preventDefault();
        });
    } catch (error) {
        await logError("Error initializing draggable about title bar", error);
    }
    

    // initialize close(X) button
    async function closeWindow() {
        await currentWindow.close();
    }
    try {
        const closeBtn = document.getElementById('close-btn');
        closeBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                await closeWindow();
            } catch (error) {
                await logError('Error closing about window using close(X)', error);
            }
        });
    } catch (error) {
        await logError("Error initializing close(X) button", error);
    }


    // initialize OK button (same behavior as close(X) button)
    try {
        const okBtn = document.querySelector('.okButton');
        okBtn.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                await closeWindow();
            } catch (error) {
                await logError('Error closing about window using OK', error);
            }
        });
    } catch (error) {
        await logError("Error initializing OK button", error);
    }


    // open hyperlinks in ext browser
    try {
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
    } catch (error) {
        await logError("Error initializing hyperlink handler", error);
    }


    // disable right-click context menu
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        event.stopPropagation();
    });


    // display app version
    try {
        // build variant (standard=1, unlicensed=2, steam=3, steam-unlicensed=4)
        const isLicensed = await invoke('get_is_licensed');
        const buildVariant = 1 + (isLicensed ? 0 : 1) + (isSteam ? 2 : 0);
        const version = `${(await getVersion()).split('+')[0]}+${buildVariant}`;
        const versionElement = document.getElementById('app-version');
        versionElement.textContent = `v${version}, pkg ${__PACKAGE_VERSION__}`;
    } catch (error) {
        await logError('Error getting app version', error);
    }

        
    // esc closes window
    window.addEventListener('keyup', async (event) => {
        if (event.key === 'Escape') {
            try {
                await closeWindow();
            } catch (error) {
                await logError('Error closing about with ESC', error);
            }
        }   
    });

    // enter closes window
    window.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            try {
                await closeWindow();
            } catch (error) {
                await logError('Error closing about with Enter', error);
            }
        }   
    });

    // cmd+w on mac, ctrl+w on windows/linux closes window
    window.addEventListener('keydown', async (event) => {
        const shouldClose = event.key === 'w' && 
                           ((isMac && event.metaKey && !event.ctrlKey) || 
                            (!isMac && event.ctrlKey && !event.metaKey));
        
        if (shouldClose) {
            try {
                event.preventDefault();
                await closeWindow();
            } catch (error) {
                await logError('Error closing About with Cmd+W/Ctrl+W', error);
            }
        }
    });


    // handle window focus for inactive title bar styling
    const titleBar = document.querySelector('.title-bar');
    const windowDiv = document.querySelector('.window');
    await currentWindow.onFocusChanged(async ({ payload: focused }) => {
        await emit('about-focused', focused);
        
        // on Linux, ignore focus changes that happen immediately after title bar mousedown (within 150ms)
        // this prevents false focus loss visual during drag operations
        const linuxTitleDragging = currentOS === 'linux' && (Date.now() - lastTitleBarMouseDown) < 150;
        
        if (focused){
            if (!linuxTitleDragging){
                titleBar.classList.remove('inactive');
                windowDiv.classList.remove('inactive');
            }
        }else{
            if (!linuxTitleDragging){
                titleBar.classList.add('inactive');
                windowDiv.classList.add('inactive');
            }
            
            // close about window when it loses focus, but only if settings window is not open
            try {
                const settingsIsOpen = await invoke('is_settings_window_open');
                if (!settingsIsOpen){
                    await currentWindow.close();
                }
            } catch (error) {
                await logError('Error closing about window on blur', error);
            }
        }
    });


    // demo button
    let isDemoRunning = false;
    const demoButton = document.querySelector('.demoButton');
    const demoButtonHTML = demoButton.innerHTML; // capture initial button HTML
    // async function resetDemoButton() {
    //     if (isDemoRunning){
    //         isDemoRunning = false;
    //         demoButton.innerHTML = demoButtonHTML;
    //     }
    // }
    try {
        demoButton.addEventListener('click', async (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();
                
                if (!isDemoRunning) {
                    isDemoRunning = true;
                    demoButton.innerHTML = '<span class="demo-wave-char" style="color:#FF0000;animation-delay:0s">c</span><span class="demo-wave-char" style="color:#FFBF00;animation-delay:0.075s">o</span><span class="demo-wave-char" style="color:#80FF00;animation-delay:0.15s">o</span><span class="demo-wave-char" style="color:#00FF40;animation-delay:0.225s">l</span> <span class="demo-wave-char" style="color:#00FFFF;animation-delay:0.3s">d</span><span class="demo-wave-char" style="color:#0040FF;animation-delay:0.375s">e</span><span class="demo-wave-char" style="color:#7F00FF;animation-delay:0.45s">m</span><span class="demo-wave-char" style="color:#FF00BF;animation-delay:0.525s">o</span>';
                    await emit('demo-start');
                } else {
                    isDemoRunning = false;
                    demoButton.innerHTML = demoButtonHTML;
                    await emit('demo-stop');
                }
            } catch (error) {
                await logError('Error handling demo button click', error);
            }
        });
    } catch (error) {
        await logError("Error initializing demo button", error);
    }


    // // reset demo button when settings window closes (if running), not really necessary
    // try {
    //     await listen('settings-window-closed', async () => {
    //         await resetDemoButton();
    //     });
    // } catch (error) {
    //     await logError("Error initializing settings-window-closed listener", error);
    // }


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


    // initialize window size
    try {
        const windowDiv = document.querySelector('.window');
        windowDiv.offsetHeight; // force layout calculation
        const rect = windowDiv.getBoundingClientRect();
        
        const scaleFactor = window.devicePixelRatio || 1;
        const paddingBuffer = scaleFactor > 1 ? 12 : 4; // more padding for high DPI
        
        // use the content dims with padding for safety
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

    document.body.style.opacity = '1';

    // bring window to front
    try {
        await currentWindow.setFocus(true);
        await currentWindow.setAlwaysOnTop(true);
        await currentWindow.setAlwaysOnTop(false);
        await emit('about-focused', true);
    } catch (error) {
        await logError("Error bringing window to front", error);
    }

    await log("About window initialized");
});
