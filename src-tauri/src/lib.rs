use std::sync::{Mutex, atomic::{AtomicBool, Ordering}};
use std::collections::HashMap;
use tauri::{
    menu::{CheckMenuItemBuilder, IsMenuItem, MenuBuilder, MenuItemBuilder, PredefinedMenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Emitter, Manager, State,
};
use tauri_plugin_global_shortcut::GlobalShortcutExt;
use tauri_plugin_deep_link::DeepLinkExt;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use axum::{
    extract::Extension,
    routing::{get, post},
    Json, Router,
};
use std::net::SocketAddr;

// Project URL (set at compile time via build.rs)
const PROJECT_URL: &str = env!("PROJECT_URL");

// License status (set at compile time via build.rs from IS_LICENSED env var)
const IS_LICENSED: bool = if cfg!(feature = "unlicensed") { false } else { true };

// Steam build status (set at compile time via build.rs from IS_STEAM env var)
const IS_STEAM: bool = if cfg!(feature = "steam") { true } else { false };

// HTTP server address
const HTTP_SERVER_ADDR: ([u8; 4], u16) = ([127, 0, 0, 1], 58008);

// Keyboard shortcuts
#[cfg(target_os = "macos")]
const PAUSE_SHORTCUT: &str = "Shift+Ctrl+Cmd+P";

#[cfg(not(target_os = "macos"))]
const PAUSE_SHORTCUT: &str = "Alt+Shift+Ctrl+P";

#[cfg(target_os = "macos")]
#[allow(unused_imports)]
use core_foundation::base::TCFType;

#[cfg(target_os = "windows")]
use winapi::{
    shared::{
        windef::{POINT, HMONITOR},
        minwindef::DWORD,
    },
    um::{
        winuser::{GetCursorPos, GetSystemMetrics, SM_CXSCREEN, SM_CYSCREEN, MonitorFromPoint, MONITOR_DEFAULTTONEAREST},
        shellscalingapi::{GetDpiForMonitor, MDT_EFFECTIVE_DPI},
    },
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CursorPosition {
    pub x: f64,
    pub y: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DynamicMenuItem {
    pub id: String,
    pub title: String,
    pub is_checkbox: bool,
    pub checked: bool,
}

// Global state to store dynamic menu items and pause state
pub struct DynamicMenuState {
    pub items: Mutex<Vec<DynamicMenuItem>>,
    pub is_paused: Mutex<bool>,
    pub rebuilding_menu: AtomicBool, // Prevent concurrent menu rebuilds
    pub is_licensed: AtomicBool, // License status
    pub is_steam: AtomicBool, // Steam build status
    pub pending_sparkle_file: Mutex<Option<Vec<String>>>, // File paths passed at launch
    pub spawning: AtomicBool, // Runtime spawning state
    pub pending_pause: Mutex<Option<bool>>, // Pause state passed at launch
    pub pending_sparkle_params: Mutex<Option<HashMap<String, Value>>>, // Sparkle parameters from CLI args
    pub pending_image_paths: Mutex<Option<Vec<String>>>, // Image file paths from --image args
    pub cursor_streaming_active: AtomicBool, // Whether cursor streaming is active
    pub was_headless: AtomicBool, // Whether app was launched in headless mode (--headless flag)
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Command to log messages to the terminal
#[tauri::command]
fn log_to_terminal(message: String, level: Option<String>) {
    let log_level = level.unwrap_or_else(|| "INFO".to_string());
    match log_level.as_str() {
        "ERROR" => eprintln!("[ERROR] {}", message),
        "WARN" => println!("[WARN] {}", message),
        "DEBUG" => println!("[DEBUG] {}", message),
        _ => println!("[INFO] {}", message),
    }
}

// Command to get the current OS
#[tauri::command]
fn get_os() -> String {
    #[cfg(target_os = "macos")]
    return "macos".to_string();
    
    #[cfg(target_os = "windows")]
    return "windows".to_string();
    
    #[cfg(target_os = "linux")]
    return "linux".to_string();
    
    #[cfg(not(any(target_os = "macos", target_os = "windows", target_os = "linux")))]
    return "unknown".to_string();
}

// Command to get the license status. innocuous name for js calls. still, not at all secure lol (:
#[tauri::command]
fn get_is_licensed(state: State<'_, DynamicMenuState>) -> bool {
    state.is_licensed.load(Ordering::Relaxed)
}

// Command to get the Steam build status
#[tauri::command]
fn get_is_steam(state: State<'_, DynamicMenuState>) -> bool {
    state.is_steam.load(Ordering::Relaxed)
}

// Command to get and clear the pending sparkle file (if app was launched with one or more)
#[tauri::command]
fn get_pending_sparkle_file(state: State<'_, DynamicMenuState>) -> Option<Vec<String>> {
    let mut pending = state.pending_sparkle_file.lock().unwrap();
    pending.take() // Returns the value and sets it to None
}

// Command to get and clear the pending pause state (if app was launched with --pause)
#[tauri::command]
fn get_pending_pause(state: State<'_, DynamicMenuState>) -> Option<bool> {
    let mut pending = state.pending_pause.lock().unwrap();
    pending.take() // Returns the value and sets it to None
}

// Command to get and clear the pending sparkle parameters (if app was launched with --param=value args)
#[tauri::command]
fn get_pending_sparkle_params(state: State<'_, DynamicMenuState>) -> Option<HashMap<String, Value>> {
    let mut pending = state.pending_sparkle_params.lock().unwrap();
    pending.take() // Returns the value and sets it to None
}

// Command to get and clear the pending image paths (if app was launched with --image args)
#[tauri::command]
fn get_pending_image_paths(state: State<'_, DynamicMenuState>) -> Option<Vec<String>> {
    let mut pending = state.pending_image_paths.lock().unwrap();
    pending.take() // Returns the value and sets it to None
}

// Command to get the current spawning state
#[tauri::command]
fn get_spawning(state: State<'_, DynamicMenuState>) -> bool {
    state.spawning.load(Ordering::Relaxed)
}

// Command to check if app was launched in headless mode
#[tauri::command]
fn was_launched_headless(state: State<'_, DynamicMenuState>) -> bool {
    state.was_headless.load(Ordering::Relaxed)
}

// Command to set the spawning state (can be called from CLI via single-instance plugin)
#[tauri::command]
fn set_spawning(app: tauri::AppHandle, state: State<'_, DynamicMenuState>, value: bool) -> Result<(), String> {
    state.spawning.store(value, Ordering::Relaxed);
    // Emit event to frontend so scene.js can update
    app.emit("spawning-changed", value).map_err(|e| e.to_string())?;
    Ok(())
}

// Command to toggle pause state
#[tauri::command]
async fn toggle_pause(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
) -> Result<bool, String> {
    let new_paused_state = {
        let mut is_paused = state.is_paused.lock().unwrap();
        *is_paused = !*is_paused;
        *is_paused
    };
    
    // Rebuild tray menu with new pause state
    let items = {
        let items = state.items.lock().unwrap();
        items.clone()
    };
    rebuild_tray_menu(&app, &items, new_paused_state).await?;
    
    // Emit event to frontend with the new state
    app.emit("pause-toggled", new_paused_state).map_err(|e| e.to_string())?;
    
    Ok(new_paused_state)
}

// Command to sync pause state (when changed from settings)
#[tauri::command]
async fn sync_pause_state(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
    is_paused: bool,
) -> Result<(), String> {
    // Update internal state
    {
        let mut paused_state = state.is_paused.lock().unwrap();
        *paused_state = is_paused;
    }
    
    // Rebuild tray menu with new pause state
    let items = {
        let items = state.items.lock().unwrap();
        items.clone()
    };
    rebuild_tray_menu(&app, &items, is_paused).await?;
    
    Ok(())
}

// Command to check if settings window is open
#[tauri::command]
fn is_settings_window_open(app: tauri::AppHandle) -> bool {
    app.get_webview_window("settings").is_some()
}

// Command to open settings
#[tauri::command]
async fn open_settings_window(app: tauri::AppHandle, initialize_only: Option<bool>) -> Result<(), String> {
    let initialize_only = initialize_only.unwrap_or(false);
    
    // If window already exists, just focus it instead of recreating
    if let Some(window) = app.get_webview_window("settings") {
        window.show().map_err(|e| e.to_string())?;
        if !initialize_only {
            window.set_focus().map_err(|e| e.to_string())?;
        }
        return Ok(());
    }
    
    // Always create a new window
    use tauri::WebviewWindowBuilder;
    
    // build URL with initialize_only parameter
    let url = if initialize_only {
        tauri::WebviewUrl::App("settings.html?initialize_only=true".into())
    } else {
        tauri::WebviewUrl::App("settings.html".into())
    };
    
    let mut window_builder = WebviewWindowBuilder::new(
        &app,
        "settings",
        url
    )
    .title("Sparkle Mouse Settings")
    .decorations(false)
    .transparent(true)
    .always_on_top(false)
    .shadow(!cfg!(target_os = "windows")) // looks bad on Windows
    .skip_taskbar(cfg!(target_os = "macos")) // Show in taskbar on Windows, hide on macOS (since we use activation policy)
    .resizable(false)
    .fullscreen(false)
    .maximized(false)
    .center()
    .accept_first_mouse(true);

    // On Windows, additional browser args must match across all webviews sharing the same environment
    // Read from config to stay in sync with tauri.conf.json
    #[cfg(windows)]
    {
        if let Some(main_window) = app.config().app.windows.first() {
            if let Some(args) = &main_window.additional_browser_args {
                window_builder = window_builder.additional_browser_args(args);
            }
        }
    }

    // Set the icon if available
    if let Some(icon) = app.default_window_icon() {
        window_builder = window_builder.icon(icon.clone()).map_err(|e| e.to_string())?;
    }

    let window = window_builder.build().map_err(|e| e.to_string())?;

    // Add event handlers for window focus and close
    let app_handle = app.clone();
    // let window_handle = window.clone();
    window.on_window_event(move |event| {
        match event {
            // tauri::WindowEvent::Focused(focused) => {
            //     // When focused, set always on top to stay above the main window
            //     // When unfocused, disable always on top to behave like a regular window
            //     let _ = window_handle.set_always_on_top(*focused);
            // }
            tauri::WindowEvent::Destroyed => {
                // Emit event to notify frontend that settings window is closed
                let _ = app_handle.emit("settings-window-closed", ());
                
                // Close any open "about" window when settings is destroyed
                if let Some(about_win) = app_handle.get_webview_window("about") {
                    // ignore any error while destroying
                    let _ = about_win.destroy();
                }

                // Hide from dock when settings window closes (macOS)
                #[cfg(target_os = "macos")]
                {
                    let _ = app_handle.set_activation_policy(tauri::ActivationPolicy::Accessory);
                }
                // On Windows, the window closing automatically removes it from taskbar
            }
            _ => {}
        }
    });
    
    // Show the app in dock when settings window opens (macOS only)
    #[cfg(target_os = "macos")]
    {
        if !initialize_only {
            let _ = app.set_activation_policy(tauri::ActivationPolicy::Regular);
        }
    }
    // On Windows, the settings window will automatically appear in taskbar since skip_taskbar(false)
    
    
    Ok(())
}

// Command to open about window
#[tauri::command]
async fn open_about_window(app: tauri::AppHandle) -> Result<(), String> {
    // If window already exists, just focus it instead of recreating
    if let Some(window) = app.get_webview_window("about") {
        window.show().map_err(|e| e.to_string())?;
        window.set_focus().map_err(|e| e.to_string())?;
        return Ok(());
    }
    
    // Always create a new window
    use tauri::WebviewWindowBuilder;
    
    #[cfg_attr(not(windows), allow(unused_mut))]
    let mut window_builder = WebviewWindowBuilder::new(
        &app,
        "about",
        tauri::WebviewUrl::App("about.html".into())
    )
    .title("About Sparkle Mouse")
    .transparent(true)
    .decorations(false)
    .resizable(false)
    .shadow(!cfg!(target_os = "windows")) // looks bad on Windows
    .skip_taskbar(false)
    .fullscreen(false)
    .maximized(false)
    .center();

    // On Windows, additional browser args must match across all webviews sharing the same environment
    // Read from config to stay in sync with tauri.conf.json
    #[cfg(windows)]
    {
        if let Some(main_window) = app.config().app.windows.first() {
            if let Some(args) = &main_window.additional_browser_args {
                window_builder = window_builder.additional_browser_args(args);
            }
        }
    }

    let window = window_builder.build().map_err(|e| e.to_string())?;
    
    // Add event handler for about window close
    let app_handle = app.clone();
    window.on_window_event(move |event| {
        match event {
            tauri::WindowEvent::Destroyed => {
                // Emit event to notify frontend that about window is closed
                let _ = app_handle.emit("about-window-closed", ());
            }
            _ => {}
        }
    });
    
    Ok(())
}

// Command to open URL in default browser
#[tauri::command]
fn open_url(url: String) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&url)
            .spawn()
            .map_err(|e| format!("Failed to open URL: {}", e))?;
    }
    
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("cmd")
            .args(["/C", "start", &url])
            .spawn()
            .map_err(|e| format!("Failed to open URL: {}", e))?;
    }
    
    #[cfg(target_os = "linux")]
    {
        use std::process::Stdio;
        
        std::process::Command::new("xdg-open")
            .arg(&url)
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .map_err(|e| format!("Failed to open URL: {}", e))?;
    }
    
    Ok(())
}

// Command to show folder in file explorer
#[tauri::command]
fn show_in_folder(path: String) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&path)
            .spawn()
            .map_err(|e| format!("Failed to open folder: {}", e))?;
    }
    
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("explorer")
            .arg(&path)
            .spawn()
            .map_err(|e| format!("Failed to open folder: {}", e))?;
    }
    
    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(&path)
            .spawn()
            .map_err(|e| format!("Failed to open folder: {}", e))?;
    }
    
    Ok(())
}

// Command to open templates folder
#[tauri::command]
fn open_templates_folder(app: tauri::AppHandle) -> Result<(), String> {
    let app_data_dir = app.path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    
    let templates_dir = app_data_dir.join("Templates");
    let templates_path = templates_dir.to_str()
        .ok_or_else(|| "Failed to convert templates path to string".to_string())?;
    
    show_in_folder(templates_path.to_string())
}

// get the Steam install directory
#[cfg(target_os = "macos")]
fn get_steam_install_dir() -> Result<std::path::PathBuf, String> {
    std::env::current_exe()
        .map_err(|e| format!("Failed to get executable path: {}", e))?
        .parent() // Contents/MacOS
        .and_then(|p| p.parent()) // Contents
        .and_then(|p| p.parent()) // Sparkle Mouse.app
        .and_then(|p| p.parent()) // install dir (steamapps/common/Sparkle Mouse)
        .map(|p| p.to_path_buf())
        .ok_or_else(|| "Failed to resolve install directory from executable path".to_string())
}

#[cfg(target_os = "windows")]
fn get_steam_install_dir() -> Result<std::path::PathBuf, String> {
    // exe_path is already directly inside the install dir on Windows
    std::env::current_exe()
        .map_err(|e| format!("Failed to get executable path: {}", e))?
        .parent()
        .map(|p| p.to_path_buf())
        .ok_or_else(|| "Failed to resolve install directory from executable path".to_string())
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
fn get_steam_install_dir() -> Result<std::path::PathBuf, String> {
    Err("Steam DLC import is not supported on this platform".to_string())
}

// import DLC template files (.sparkle) that Steam installed next to the executable
// moves them to the /templates/ folder
// does not overwrite in templates, does not delete original if it already exists (so it it will try again on next app restart)
#[tauri::command]
fn import_bundled_templates(app: tauri::AppHandle) -> Result<Vec<String>, String> {
    // only Steam builds have DLC content installed alongside the executable
    if !IS_STEAM {
        return Ok(Vec::new());
    }

    let app_data_dir = app.path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    let templates_dir = app_data_dir.join("Templates");

    let install_dir = get_steam_install_dir()?;

    let entries = match std::fs::read_dir(&install_dir) {
        Ok(entries) => entries,
        Err(_) => return Ok(Vec::new()), // install dir not readable, nothing to import
    };

    let mut imported = Vec::new();

    for entry in entries.flatten() {
        let path = entry.path();

        // case-insensitive, matching the JS-side template loader
        let is_sparkle_file = path.is_file()
            && path.extension()
                .and_then(|ext| ext.to_str())
                .map(|ext| ext.eq_ignore_ascii_case("sparkle"))
                .unwrap_or(false);
        if !is_sparkle_file {
            continue;
        }

        let file_name = match path.file_name() {
            Some(name) => name,
            None => continue,
        };
        let dest_path = templates_dir.join(file_name);

        // only ever touch the source if we just successfully delivered it - a naming
        // collision (or a copy failure) leaves it untouched, to try again next launch
        if !dest_path.exists() && std::fs::copy(&path, &dest_path).is_ok() {
            imported.push(file_name.to_string_lossy().to_string());
            let _ = std::fs::remove_file(&path);
        }
    }

    Ok(imported)
}

// read/write the current user's Path in the registry (HKCU\Environment), no admin rights needed
#[cfg(target_os = "windows")]
mod windows_user_path {
    use winapi::shared::minwindef::{DWORD, HKEY};
    use winapi::um::processenv::ExpandEnvironmentStringsW;
    use winapi::um::winnt::{KEY_QUERY_VALUE, KEY_SET_VALUE, REG_SZ};
    use winapi::um::winreg::{RegCloseKey, RegOpenKeyExW, RegQueryValueExW, RegSetValueExW, HKEY_CURRENT_USER};
    use winapi::um::winuser::{SendMessageTimeoutW, HWND_BROADCAST, SMTO_ABORTIFHUNG, WM_SETTINGCHANGE};

    pub use winapi::um::winnt::REG_EXPAND_SZ;

    const ERROR_SUCCESS: i32 = 0;
    const ERROR_FILE_NOT_FOUND: i32 = 2;

    pub struct UserPath {
        pub value: String,    // as stored, %VARIABLES% unexpanded
        pub value_type: DWORD, // REG_EXPAND_SZ or REG_SZ
        pub exists: bool,
    }

    // null-terminated UTF-16
    fn wide(text: &str) -> Vec<u16> {
        text.encode_utf16().chain(std::iter::once(0)).collect()
    }

    // closes the registry key when dropped
    struct Key(HKEY);
    impl Drop for Key {
        fn drop(&mut self) {
            unsafe {
                RegCloseKey(self.0);
            }
        }
    }

    fn open_environment_key(access: DWORD) -> Result<Key, String> {
        let subkey = wide("Environment");
        let mut hkey: HKEY = std::ptr::null_mut();
        let status = unsafe { RegOpenKeyExW(HKEY_CURRENT_USER, subkey.as_ptr(), 0, access, &mut hkey) };
        if status != ERROR_SUCCESS {
            return Err(format!("Failed to open HKCU\\Environment (error {})", status));
        }
        Ok(Key(hkey))
    }

    pub fn read() -> Result<UserPath, String> {
        let key = open_environment_key(KEY_QUERY_VALUE)?;
        let name = wide("Path");

        // first call: size and type
        let mut value_type: DWORD = 0;
        let mut size_bytes: DWORD = 0;
        let status = unsafe {
            RegQueryValueExW(key.0, name.as_ptr(), std::ptr::null_mut(), &mut value_type, std::ptr::null_mut(), &mut size_bytes)
        };
        if status == ERROR_FILE_NOT_FOUND {
            // the user has no Path of their own yet
            return Ok(UserPath { value: String::new(), value_type: REG_EXPAND_SZ, exists: false });
        }
        if status != ERROR_SUCCESS {
            return Err(format!("Failed to read user Path (error {})", status));
        }
        if value_type != REG_SZ && value_type != REG_EXPAND_SZ {
            return Err(format!("User Path has an unexpected registry type ({})", value_type));
        }

        // second call: the data
        let mut buffer: Vec<u16> = vec![0; size_bytes as usize / 2 + 1];
        let mut size_bytes = (buffer.len() * 2) as DWORD;
        let status = unsafe {
            RegQueryValueExW(key.0, name.as_ptr(), std::ptr::null_mut(), &mut value_type, buffer.as_mut_ptr() as *mut u8, &mut size_bytes)
        };
        if status != ERROR_SUCCESS {
            return Err(format!("Failed to read user Path (error {})", status));
        }
        let length = (size_bytes as usize / 2).min(buffer.len());
        let value = String::from_utf16_lossy(&buffer[..length]).trim_end_matches('\0').to_string();

        Ok(UserPath { value, value_type, exists: true })
    }

    pub fn write(value: &str, value_type: DWORD) -> Result<(), String> {
        let key = open_environment_key(KEY_SET_VALUE)?;
        let name = wide("Path");
        let data = wide(value);
        let status = unsafe {
            RegSetValueExW(key.0, name.as_ptr(), 0, value_type, data.as_ptr() as *const u8, (data.len() * 2) as DWORD)
        };
        if status != ERROR_SUCCESS {
            return Err(format!("Failed to write user Path (error {})", status));
        }
        Ok(())
    }

    // expands %VARIABLES% in one Path entry (falls back to the entry itself)
    pub fn expand(entry: &str) -> String {
        let source = wide(entry);
        let needed = unsafe { ExpandEnvironmentStringsW(source.as_ptr(), std::ptr::null_mut(), 0) };
        if needed == 0 {
            return entry.to_string();
        }
        let mut buffer: Vec<u16> = vec![0; needed as usize];
        let written = unsafe { ExpandEnvironmentStringsW(source.as_ptr(), buffer.as_mut_ptr(), needed) };
        if written == 0 || written > needed {
            return entry.to_string();
        }
        String::from_utf16_lossy(&buffer[..written as usize - 1]) // without the terminating null
    }

    // for comparing Path entries: Windows paths are case-insensitive, ignore quotes and trailing slashes
    pub fn normalize_entry(entry: &str) -> String {
        entry
            .trim()
            .trim_matches('"')
            .trim_end_matches(|c: char| c == '\\' || c == '/')
            .to_lowercase()
    }

    // WM_SETTINGCHANGE "Environment", like the System Properties dialog does; skips hung windows instead of waiting on them
    pub fn notify_environment_changed() {
        let area = wide("Environment");
        let mut result: usize = 0;
        unsafe {
            SendMessageTimeoutW(HWND_BROADCAST, WM_SETTINGCHANGE, 0, area.as_ptr() as isize, SMTO_ABORTIFHUNG, 1000, &mut result);
        }
    }
}

// Command to register CLI shortcut (creates symlink/PATH entry on first run)
// runs on a blocking worker thread: never on the main thread, which serves every window (IPC, assets, window events)
#[tauri::command]
async fn register_cli_shortcut() -> Result<String, String> {
    tauri::async_runtime::spawn_blocking(register_cli_shortcut_blocking)
        .await
        .map_err(|e| format!("CLI shortcut registration task failed: {}", e))?
}

fn register_cli_shortcut_blocking() -> Result<String, String> {
    #[cfg(target_os = "macos")]
    {
        use std::os::unix::fs::symlink;
        use std::path::PathBuf;
        
        // Get the path to the current executable and resolve any symlinks
        let exe_path = std::env::current_exe()
            .map_err(|e| format!("Failed to get executable path: {}", e))?;
        let exe_path = std::fs::canonicalize(&exe_path)
            .map_err(|e| format!("Failed to resolve executable path: {}", e))?;
        
        // Use ~/.local/bin for user-owned CLI shortcut (no permissions needed)
        let home_dir = std::env::var("HOME")
            .map_err(|e| format!("Failed to get HOME directory: {}", e))?;
        let bin_dir = PathBuf::from(&home_dir).join(".local").join("bin");
        let symlink_path = bin_dir.join("sparkle-mouse");
        
        // Create ~/.local/bin if it doesn't exist
        if !bin_dir.exists() {
            std::fs::create_dir_all(&bin_dir)
                .map_err(|e| format!("Failed to create ~/.local/bin: {}", e))?;
        }
        
        // Remove existing symlink if present (ignore errors if it doesn't exist)
        let _ = std::fs::remove_file(&symlink_path);
        
        // Create the symlink
        symlink(&exe_path, &symlink_path)
            .map_err(|e| format!("Failed to create symlink: {}", e))?;
        
        // Ensure ~/.local/bin is in PATH by updating shell config files
        let path_export = "export PATH=\"$HOME/.local/bin:$PATH\"";
        let mut updated_configs = Vec::new();
        
        let shell_configs = [
            PathBuf::from(&home_dir).join(".zshrc"),
            PathBuf::from(&home_dir).join(".bash_profile"),
            PathBuf::from(&home_dir).join(".bashrc"),
        ];
        
        for config_path in &shell_configs {
            if config_path.exists() {
                if let Ok(content) = std::fs::read_to_string(config_path) {
                    // Check if PATH export already exists
                    if !content.contains(".local/bin") || !content.contains("PATH") {
                        // Append the PATH export
                        if std::fs::write(
                            config_path,
                            format!("{}\n\n# Added by Sparkle Mouse for CLI access\n{}\n", content.trim_end(), path_export)
                        ).is_ok() {
                            updated_configs.push(config_path.file_name().unwrap().to_string_lossy().to_string());
                        }
                    }
                }
            }
        }
        
        if updated_configs.is_empty() {
            Ok(format!("CLI shortcut registered. Restart terminal to use 'sparkle-mouse' command."))
        } else {
            Ok(format!("CLI shortcut registered. Updated {} to include ~/.local/bin in PATH. Restart terminal to use 'sparkle-mouse' command.", 
                updated_configs.join(", ")
            ))
        }
    }
    
    #[cfg(target_os = "windows")]
    {
        // Get the directory containing the executable
        let exe_path = std::env::current_exe()
            .map_err(|e| format!("Failed to get executable path: {}", e))?;
        let exe_dir = exe_path.parent()
            .ok_or("Failed to get executable directory")?;
        let exe_dir_str = exe_dir.to_string_lossy().to_string();
        let target_entry = windows_user_path::normalize_entry(&exe_dir_str);

        // read the user Path straight from the registry, exactly as stored (%VARIABLES% unexpanded)
        let user_path = windows_user_path::read()?;

        // compare case-insensitively, both as stored and with %VARIABLES% expanded
        let already_present = user_path.value.split(';').any(|entry| {
            !entry.trim().is_empty()
                && (windows_user_path::normalize_entry(entry) == target_entry
                    || windows_user_path::normalize_entry(&windows_user_path::expand(entry)) == target_entry)
        });

        // nothing to do: no write, no broadcast
        if already_present {
            return Ok("CLI shortcut already registered. Use 'sparkle-mouse' in your terminal.".to_string());
        }

        // append, keeping every existing entry and the value's registry type untouched
        let existing = user_path.value.trim().trim_end_matches(';');
        let new_value = if existing.is_empty() {
            exe_dir_str.clone()
        } else {
            format!("{};{}", existing, exe_dir_str)
        };
        windows_user_path::write(&new_value, user_path.value_type)?;

        // tell other apps (Explorer, new terminals) the environment changed - in the background, hung windows are skipped
        let _ = std::thread::Builder::new()
            .name("path-change-broadcast".to_string())
            .spawn(windows_user_path::notify_environment_changed);

        Ok(format!("CLI shortcut registered! Restart your terminal to use 'sparkle-mouse'."))
    }
    
    #[cfg(target_os = "linux")]
    {
        use std::os::unix::fs::symlink;
        use std::path::PathBuf;
        
        // Get the path to the current executable and resolve any symlinks
        let exe_path = std::env::current_exe()
            .map_err(|e| format!("Failed to get executable path: {}", e))?;
        let exe_path = std::fs::canonicalize(&exe_path)
            .map_err(|e| format!("Failed to resolve executable path: {}", e))?;
        
        // Create symlink in ~/.local/bin
        let home_dir = std::env::var("HOME")
            .map_err(|e| format!("Failed to get HOME directory: {}", e))?;
        let local_bin = PathBuf::from(home_dir).join(".local").join("bin");
        let symlink_path = local_bin.join("sparkle-mouse");
        
        // Create ~/.local/bin if it doesn't exist
        if !local_bin.exists() {
            std::fs::create_dir_all(&local_bin)
                .map_err(|e| format!("Failed to create ~/.local/bin: {}", e))?;
        }
        
        // Remove existing symlink if present (ignore errors if it doesn't exist)
        let _ = std::fs::remove_file(&symlink_path);
        
        // Create the symlink
        symlink(&exe_path, &symlink_path)
            .map_err(|e| format!("Failed to create symlink: {}", e))?;
        
        Ok(format!("CLI shortcut registered! You can now use 'sparkle-mouse' from the terminal."))
    }
}

// Command to get cursor position (obsolete / old because slow)
#[tauri::command]
fn get_cursor_position() -> Result<CursorPosition, String> {
    get_cursor_pos()
}

// Command to start cursor position streaming
#[tauri::command]
fn start_cursor_streaming(state: State<DynamicMenuState>) {
    state.cursor_streaming_active.store(true, Ordering::SeqCst);
}

// Command to stop cursor position streaming
#[tauri::command]
fn stop_cursor_streaming(state: State<DynamicMenuState>) {
    state.cursor_streaming_active.store(false, Ordering::SeqCst);
}

// Platform-specific cursor position implementations
#[cfg(target_os = "macos")]
mod macos_cursor {
    use super::*;
    use core_graphics::event_source::{CGEventSource, CGEventSourceStateID};
    use std::cell::RefCell;
    
    // Cache the event source per-thread to avoid recreating it every frame
    // CGEventSource creation can be slow and cause intermittent delays
    thread_local! {
        static EVENT_SOURCE: RefCell<Option<CGEventSource>> = const { RefCell::new(None) };
    }
    
    pub fn get_cursor_pos() -> Result<CursorPosition, String> {
        use core_graphics::event::CGEvent;
        
        EVENT_SOURCE.with(|cell| {
            let mut source_ref = cell.borrow_mut();
            
            // Initialize on first use
            if source_ref.is_none() {
                *source_ref = CGEventSource::new(CGEventSourceStateID::CombinedSessionState).ok();
            }
            
            let event_source = source_ref.as_ref()
                .ok_or("Failed to create event source")?;
            
            let event = CGEvent::new(event_source.clone())
                .map_err(|_| "Failed to create event")?;
            
            let location = event.location();
            
            Ok(CursorPosition {
                x: location.x,
                y: location.y,
            })
        })
    }
}

#[cfg(target_os = "macos")]
fn get_cursor_pos() -> Result<CursorPosition, String> {
    macos_cursor::get_cursor_pos()
}

#[cfg(target_os = "windows")]
fn get_cursor_pos() -> Result<CursorPosition, String> {
    unsafe {
        let mut point = POINT { x: 0, y: 0 };
        if GetCursorPos(&mut point) != 0 {
            // GetCursorPos returns physical pixels on DPI-aware applications
            // We need to convert to logical pixels to match Tauri's monitor API
            
            // Get the monitor containing the cursor
            let monitor: HMONITOR = MonitorFromPoint(point, MONITOR_DEFAULTTONEAREST);
            
            // Get the DPI for this monitor
            let mut dpi_x: DWORD = 96; // default DPI
            let mut dpi_y: DWORD = 96;
            
            // Try to get actual DPI (requires Windows 8.1+)
            let dpi_result = GetDpiForMonitor(
                monitor,
                MDT_EFFECTIVE_DPI,
                &mut dpi_x as *mut DWORD,
                &mut dpi_y as *mut DWORD,
            );
            
            // Calculate scale factor (96 DPI = 100% = scale 1.0)
            let scale_factor = if dpi_result == 0 { // S_OK
                dpi_x as f64 / 96.0
            } else {
                // Fallback: assume no scaling if we can't get DPI
                1.0
            };
            
            // Convert physical pixels to logical pixels
            Ok(CursorPosition {
                x: point.x as f64 / scale_factor,
                y: point.y as f64 / scale_factor,
            })
        } else {
            Err("Failed to get cursor position".to_string())
        }
    }
}

// linux
#[cfg(not(any(target_os = "macos", target_os = "windows")))]
mod linux_cursor {
    use super::*;
    use x11::xlib::*;
    use std::cell::RefCell;
    use std::ptr;
    use std::sync::OnceLock;
    
    // Cache scale factor at startup (when GDK is safe to use from main thread)
    static CACHED_SCALE_FACTOR: OnceLock<f64> = OnceLock::new();
    
    // Initialize scale factor - call this once from main thread during app setup
    pub fn init_scale_factor() {
        let scale = detect_scale_factor();
        let _ = CACHED_SCALE_FACTOR.set(scale);
        eprintln!("[INFO] Linux display scale factor: {}", scale);
    }
    
    // Detect scale factor using GDK (must be called from main thread)
    fn detect_scale_factor() -> f64 {
        use gtk::gdk;
        use gtk::prelude::*;
        
        // Try to get scale factor from GDK
        if let Some(display) = gdk::Display::default() {
            if let Some(monitor) = display.primary_monitor().or_else(|| {
                // Fallback to first monitor if primary is not available
                if display.n_monitors() > 0 {
                    display.monitor(0)
                } else {
                    None
                }
            }) {
                return monitor.scale_factor() as f64;
            }
        }
        
        // Fallback to environment variable or 1.0
        std::env::var("GDK_SCALE")
            .ok()
            .and_then(|s| s.parse::<f64>().ok())
            .unwrap_or(1.0)
    }
    
    // Get cached scale factor (safe to call from any thread)
    fn get_scale_factor() -> f64 {
        *CACHED_SCALE_FACTOR.get_or_init(|| {
            // If not initialized, try environment variable or default to 1.0
            std::env::var("GDK_SCALE")
                .ok()
                .and_then(|s| s.parse::<f64>().ok())
                .unwrap_or(1.0)
        })
    }
    
    // Cache the X Display connection per-thread to avoid reconnecting every frame 
    thread_local! {
        static X_DISPLAY: RefCell<Option<*mut Display>> = const { RefCell::new(None) };
    }
    
    pub fn get_cursor_pos() -> Result<CursorPosition, String> {
        X_DISPLAY.with(|cell| {
            let mut display_ref = cell.borrow_mut();
            
            unsafe {
                // Initialize on first use
                if display_ref.is_none() {
                    let display = XOpenDisplay(ptr::null());
                    if display.is_null() {
                        return Err("Failed to open X display".to_string());
                    }
                    *display_ref = Some(display);
                }
                
                let display = display_ref.as_ref()
                    .ok_or("X display not available")?;
                
                // Get root window
                let root = XDefaultRootWindow(*display);
                
                // Query pointer position (returns physical pixels on X11)
                let mut root_return: Window = 0;
                let mut child_return: Window = 0;
                let mut root_x: i32 = 0;
                let mut root_y: i32 = 0;
                let mut win_x: i32 = 0;
                let mut win_y: i32 = 0;
                let mut mask_return: u32 = 0;
                
                let result = XQueryPointer(
                    *display,
                    root,
                    &mut root_return,
                    &mut child_return,
                    &mut root_x,
                    &mut root_y,
                    &mut win_x,
                    &mut win_y,
                    &mut mask_return,
                );
                
                if result == 0 {
                    return Err("XQueryPointer failed".to_string());
                }
                
                // Get scale factor to convert physical pixels to logical pixels
                // XQueryPointer returns physical pixels, but Tauri uses logical pixels
                let scale_factor = get_scale_factor();
                
                Ok(CursorPosition {
                    x: root_x as f64 / scale_factor,
                    y: root_y as f64 / scale_factor,
                })
            }
        })
    }
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
fn get_cursor_pos() -> Result<CursorPosition, String> {
    linux_cursor::get_cursor_pos()
}



// unused refresh rate getters

// // Command to get monitor refresh rate (nullable): returns Ok(Some(rate)) or Ok(None) when unknown
// #[tauri::command]
// fn get_refresh_rate() -> Result<Option<f64>, String> {
//     get_monitor_refresh_rate()
// }

// // Platform-specific refresh rate implementations
// #[cfg(target_os = "macos")]
// fn get_monitor_refresh_rate() -> Result<Option<f64>, String> {
//     use core_graphics::display::{CGDirectDisplayID, CGMainDisplayID, CGDisplayCopyDisplayMode, CGDisplayModeGetRefreshRate};

//     unsafe {
//         let display_id: CGDirectDisplayID = CGMainDisplayID();
//         let mode = CGDisplayCopyDisplayMode(display_id);
//         if mode.is_null() {
//             // Could not get mode; return None (unknown)
//             return Ok(None);
//         }
//         let refresh_rate = CGDisplayModeGetRefreshRate(mode);

//         // If refresh rate is 0, treat as unknown (variable/undetermined)
//         if refresh_rate == 0.0 {
//             Ok(None)
//         } else {
//             Ok(Some(refresh_rate))
//         }
//     }
// }

// #[cfg(target_os = "windows")]
// fn get_monitor_refresh_rate() -> Result<Option<f64>, String> {
//     use winapi::um::wingdi::{EnumDisplaySettingsA, DEVMODEA, ENUM_CURRENT_SETTINGS};
//     use std::ptr;

//     unsafe {
//         let mut dev_mode: DEVMODEA = std::mem::zeroed();
//         dev_mode.dmSize = std::mem::size_of::<DEVMODEA>() as u16;

//         if EnumDisplaySettingsA(ptr::null(), ENUM_CURRENT_SETTINGS, &mut dev_mode) != 0 {
//             let refresh_rate = dev_mode.dmDisplayFrequency as f64;

//             // If refresh rate is <= 0 treat as unknown
//             if refresh_rate > 0.0 {
//                 Ok(Some(refresh_rate))
//             } else {
//                 Ok(None)
//             }
//         } else {
//             Err("Failed to get display settings".to_string())
//         }
//     }
// }

// #[cfg(not(any(target_os = "macos", target_os = "windows")))]
// fn get_monitor_refresh_rate() -> Result<Option<f64>, String> {
//     Ok(None)
// }



// Command to get screen dimensions
#[tauri::command]
fn get_screen_size(app: tauri::AppHandle) -> Result<CursorPosition, String> {
    get_screen_dimensions(app)
}

#[cfg(target_os = "macos")]
fn get_screen_dimensions(_app: tauri::AppHandle) -> Result<CursorPosition, String> {
    use core_graphics::display;
    
    unsafe {
        let display_id = display::CGMainDisplayID();
        let bounds = display::CGDisplayBounds(display_id);
        
        Ok(CursorPosition {
            x: bounds.size.width,
            y: bounds.size.height,
        })
    }
}

#[cfg(target_os = "windows")]
fn get_screen_dimensions(_app: tauri::AppHandle) -> Result<CursorPosition, String> {
    unsafe {
        let width = GetSystemMetrics(SM_CXSCREEN);
        let height = GetSystemMetrics(SM_CYSCREEN);
        
        if width > 0 && height > 0 {
            Ok(CursorPosition {
                x: width as f64,
                y: height as f64,
            })
        } else {
            Err("Failed to get screen dimensions".to_string())
        }
    }
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
fn get_screen_dimensions(app: tauri::AppHandle) -> Result<CursorPosition, String> {
    // On Linux use Tauri's cross-platform monitor API
    
    // Try to get the primary monitor from any available window
    match app.get_webview_window("main") {
        Some(window) => {
            // Try primary monitor first
            match window.primary_monitor() {
                Ok(Some(monitor)) => {
                    let size = monitor.size();
                    return Ok(CursorPosition {
                        x: size.width as f64,
                        y: size.height as f64,
                    });
                }
                Ok(None) => {}
                Err(_) => {}
            }
            
            // Try available monitors
            match window.available_monitors() {
                Ok(monitors) => {
                    if let Some(monitor) = monitors.into_iter().next() {
                        let size = monitor.size();
                        return Ok(CursorPosition {
                            x: size.width as f64,
                            y: size.height as f64,
                        });
                    }
                }
                Err(_) => {}
            }
        }
        None => {}
    }
    
    // Try to get any window as fallback
    if let Some((_, window)) = app.webview_windows().iter().next() {
        match window.primary_monitor() {
            Ok(Some(monitor)) => {
                let size = monitor.size();
                return Ok(CursorPosition {
                    x: size.width as f64,
                    y: size.height as f64,
                });
            }
            _ => {}
        }
        
        match window.available_monitors() {
            Ok(monitors) => {
                if let Some(monitor) = monitors.into_iter().next() {
                    let size = monitor.size();
                    return Ok(CursorPosition {
                        x: size.width as f64,
                        y: size.height as f64,
                    });
                }
            }
            _ => {}
        }
    }
    
    Err("No monitor found".to_string())
}

// Command to add a dynamic menu item
#[tauri::command]
async fn add_dynamic_menu_item(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
    id: String,
    title: String,
) -> Result<(), String> {
    let (items, is_paused) = {
        let mut items = state.items.lock().unwrap();
        items.push(DynamicMenuItem { id, title, is_checkbox: false, checked: false });
        let items_clone = items.clone();
        let is_paused = *state.is_paused.lock().unwrap();
        (items_clone, is_paused)
    };
    rebuild_tray_menu(&app, &items, is_paused).await
}

// Command to remove a dynamic menu item
#[tauri::command]
async fn remove_dynamic_menu_item(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
    id: String,
) -> Result<(), String> {
    let (items, is_paused) = {
        let mut items = state.items.lock().unwrap();
        items.retain(|item| item.id != id);
        let items_clone = items.clone();
        let is_paused = *state.is_paused.lock().unwrap();
        (items_clone, is_paused)
    };
    rebuild_tray_menu(&app, &items, is_paused).await
}

// Command to add a dynamic checkbox menu item
#[tauri::command]
async fn add_dynamic_checkbox_menu_item(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
    id: String,
    title: String,
    checked: bool,
) -> Result<(), String> {
    let (items, is_paused) = {
        let mut items = state.items.lock().unwrap();
        items.push(DynamicMenuItem { id, title, is_checkbox: true, checked });
        let items_clone = items.clone();
        let is_paused = *state.is_paused.lock().unwrap();
        (items_clone, is_paused)
    };
    rebuild_tray_menu(&app, &items, is_paused).await
}

// Command to update the checked state of a dynamic menu item
#[tauri::command]
async fn update_dynamic_menu_item_checked(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
    id: String,
    checked: bool,
) -> Result<(), String> {
    let (items, is_paused) = {
        let mut items = state.items.lock().unwrap();
        if let Some(item) = items.iter_mut().find(|item| item.id == id) {
            item.checked = checked;
        }
        let items_clone = items.clone();
        let is_paused = *state.is_paused.lock().unwrap();
        (items_clone, is_paused)
    };
    rebuild_tray_menu(&app, &items, is_paused).await
}

// Command to clear all dynamic menu items
#[tauri::command]
async fn clear_dynamic_menu_items(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
) -> Result<(), String> {
    let (items, is_paused) = {
        let mut items = state.items.lock().unwrap();
        items.clear();
        let items_clone = items.clone();
        let is_paused = *state.is_paused.lock().unwrap();
        (items_clone, is_paused)
    };
    rebuild_tray_menu(&app, &items, is_paused).await
}

// Command to set all template menu items at once (batch operation to avoid race conditions)
#[tauri::command]
async fn set_template_menu_items(
    app: tauri::AppHandle,
    state: State<'_, DynamicMenuState>,
    items: Vec<DynamicMenuItem>,
) -> Result<(), String> {
    let (items_clone, is_paused) = {
        let mut state_items = state.items.lock().unwrap();
        state_items.clear();
        state_items.extend(items);
        let items_clone = state_items.clone();
        let is_paused = *state.is_paused.lock().unwrap();
        (items_clone, is_paused)
    };
    rebuild_tray_menu(&app, &items_clone, is_paused).await
}

// Command to quit the application
#[tauri::command]
fn quit_app(app: tauri::AppHandle) {
    // On Windows, properly close all windows before exit to avoid window class unregistration errors
    #[cfg(target_os = "windows")]
    {
        // Get all webview windows and close them
        let windows: Vec<_> = app.webview_windows().into_iter().collect();
        for (_label, window) in windows {
            let _ = window.close();
        }
        
        // Give windows time to close properly before exit
        std::thread::spawn(move || {
            std::thread::sleep(std::time::Duration::from_millis(100));
            app.exit(0);
        });
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        app.exit(0);
    }
}

// Helper function to create static menu items (works with both App and AppHandle)
fn create_static_menu_items<R: tauri::Runtime>(app: &impl tauri::Manager<R>, is_paused: bool) -> Result<(tauri::menu::CheckMenuItem<R>, tauri::menu::MenuItem<R>, tauri::menu::MenuItem<R>, tauri::menu::MenuItem<R>), String> {
    let pause = CheckMenuItemBuilder::with_id("pause", "Pause")
        .checked(is_paused)
        .accelerator(PAUSE_SHORTCUT)
        .build(app)
        .map_err(|e| e.to_string())?;
    let settings = MenuItemBuilder::with_id("settings", "Settings...").build(app).map_err(|e| e.to_string())?;
    

    // emojis are ugly on windows, skip
    #[cfg(target_os = "windows")]
    let about = MenuItemBuilder::with_id("about", "About Sparkle Mouse").build(app).map_err(|e| e.to_string())?;

    #[cfg(not(target_os = "windows"))]
    let about = MenuItemBuilder::with_id("about", "About Sparkle Mouse 🐁✨").build(app).map_err(|e| e.to_string())?;
    

    let quit = MenuItemBuilder::with_id("quit", "Quit").build(app).map_err(|e| e.to_string())?;
    
    Ok((pause, settings, about, quit))
}

// Function to rebuild the tray menu
async fn rebuild_tray_menu(
    app: &tauri::AppHandle,
    dynamic_items: &[DynamicMenuItem],
    is_paused: bool,
) -> Result<(), String> {
    // Check if we're already rebuilding the menu to prevent race conditions
    if let Some(state) = app.try_state::<DynamicMenuState>() {
        // Use compare_exchange to atomically check and set the flag
        // This prevents race conditions where multiple threads could both see false
        match state.rebuilding_menu.compare_exchange(
            false,
            true,
            Ordering::Acquire,
            Ordering::Relaxed
        ) {
            Ok(_) => {
                // Acquired the lock, proceed with rebuild
            }
            Err(_) => {
                // Another rebuild is already in progress, skip this one
                return Ok(());
            }
        }
    }
    // Get the tray icon
    let tray = match app.tray_by_id("sparkle-mouse-tray") {
        Some(tray) => tray,
        None => return Err("Tray icon not found".to_string()),
    };
    
    // Create static menu items using helper function
    let (pause, settings, about, quit) = create_static_menu_items(app, is_paused)?;
    
    // Create dynamic menu items
    let mut dynamic_menu_items = Vec::new();
    for item in dynamic_items {
        if item.is_checkbox {
            let checkbox_item = CheckMenuItemBuilder::with_id(&item.id, &item.title)
                .checked(item.checked)
                .build(app)
                .map_err(|e| e.to_string())?;
            dynamic_menu_items.push(checkbox_item.kind());
        } else {
            let menu_item = MenuItemBuilder::with_id(&item.id, &item.title)
                .build(app)
                .map_err(|e| e.to_string())?;
            dynamic_menu_items.push(menu_item.kind());
        }
    }
    
    // Build the complete menu
    let mut menu_builder = MenuBuilder::new(app)
        .item(&pause)
        .separator()
        .item(&settings)
        .item(&about);
    
    // Add template groups if any exist
    if !dynamic_items.is_empty() {
        menu_builder = menu_builder.separator();
        
        // Separate built-in and custom templates
        let builtin_indices: Vec<_> = dynamic_items.iter()
            .enumerate()
            .filter(|(_, item)| item.id.starts_with("template_builtin_"))
            .map(|(idx, _)| idx)
            .collect();
            
        let custom_indices: Vec<_> = dynamic_items.iter()
            .enumerate()
            .filter(|(_, item)| item.id.starts_with("template_") && !item.id.starts_with("template_builtin_"))
            .map(|(idx, _)| idx)
            .collect();
        
        // Add templates submenu
        if !builtin_indices.is_empty() {
            let mut builtin_submenu = tauri::menu::SubmenuBuilder::with_id(app, "builtin_submenu", "Built-In Templates");
            for &idx in &builtin_indices {
                builtin_submenu = builtin_submenu.item(&dynamic_menu_items[idx]);
            }
            
            let builtin_submenu_item = builtin_submenu.build().map_err(|e| e.to_string())?;
            menu_builder = menu_builder.item(&builtin_submenu_item);
        }
        
        // Add Custom templates section
        if !custom_indices.is_empty() {
            for &idx in &custom_indices {
                menu_builder = menu_builder.item(&dynamic_menu_items[idx]);
            }
        }
        
        // Add More Sparkle Templates and Open Folder items after templates
        menu_builder = menu_builder.separator();
        let more_templates_item = MenuItemBuilder::with_id("more_templates", "More Sparkle Templates...")
            .build(app)
            .map_err(|e| e.to_string())?;
        menu_builder = menu_builder.item(&more_templates_item);
        
        let open_folder_item = MenuItemBuilder::with_id("open_templates_folder", "Open Folder...")
            .build(app)
            .map_err(|e| e.to_string())?;
        menu_builder = menu_builder.item(&open_folder_item);
    }
    
    // Add separator and quit at the bottom
    let menu = menu_builder
        .separator()
        .item(&quit)
        .build().map_err(|e| e.to_string())?;
    
    // Update the tray menu
    let result = tray.set_menu(Some(menu)).map_err(|e| e.to_string());
    
    // Reset the rebuilding flag
    if let Some(state) = app.try_state::<DynamicMenuState>() {
        state.rebuilding_menu.store(false, Ordering::Release);
    }
    
    result
}

// Helper function to parse sparkle parameters from command-line arguments
// Arguments like --amount=0.1 will be parsed into a HashMap
// Supports arrays: --image-count=[1,2,3] or single values: --image-count=1 (auto-wrapped to [1])
fn parse_sparkle_params(arg: &str) -> Option<(String, Value)> {
    if arg.starts_with("--") && arg.contains('=') {
        let parts: Vec<&str> = arg[2..].splitn(2, '=').collect();
        if parts.len() == 2 {
            let key = parts[0].to_string();
            let value_str = parts[1];
            
            // Parameters that should become arrays
            let array_params = ["image-count", "image-cycles"];
            let is_array_param = array_params.contains(&key.as_str());
            
            // Try to parse as array (e.g., [1,2,3])
            if value_str.starts_with('[') && value_str.ends_with(']') {
                if let Ok(array) = serde_json::from_str::<Vec<Value>>(value_str) {
                    return Some((key, Value::Array(array)));
                }
            }
            
            // Try to parse as different types
            let value = if let Ok(num) = value_str.parse::<f64>() {
                let num_value = Value::Number(serde_json::Number::from_f64(num).unwrap_or(serde_json::Number::from(0)));
                // Auto-wrap single numbers in array for array parameters
                if is_array_param {
                    Value::Array(vec![num_value])
                } else {
                    num_value
                }
            } else if let Ok(b) = value_str.parse::<bool>() {
                Value::Bool(b)
            } else {
                Value::String(value_str.to_string())
            };
            
            return Some((key, value));
        }
    }
    None
}

// case-insensitive
fn has_sparkle_extension(name: &str) -> bool {
    name.to_lowercase().ends_with(".sparkle")
}

// Helper function to parse --image argument (supports both array and single value)
// Examples: --image="path.png" or --image=["path1.png","path2.png"]
fn parse_image_arg(arg: &str) -> Vec<String> {
    if !arg.starts_with("--image=") {
        return Vec::new();
    }
    
    let value_str = &arg[8..]; // Skip "--image="
    
    // Try to parse as JSON array
    if value_str.starts_with('[') && value_str.ends_with(']') {
        if let Ok(array) = serde_json::from_str::<Vec<String>>(value_str) {
            return array;
        }
    }
    
    // Single value (not in brackets)
    vec![value_str.to_string()]
}

const SPARKLE_MOUSE_LOGO: [&str; 2] = [
r#"

                     ✧     _    _     ⁺                              ✧·        
        *                 | |  | |            ⊹           *            
  ·   ___ _ __   __ _ _ __| | _| | ___     _ __ ___   ___  _   _ ___  ___ 
     / __| '_ \ / _` | '__| |/ / |/ _ \   | '_ ` _ \ / _ \| | | / __|/ _ \  ⊹
     \__ \ |_) | (_| | |  |   <| |  __/   | | | | | | (_) | |_| \__ \  __/
     |___/ .__/ \__,_|_|  |_|\_\_|\___|   |_| |_| |_|\___/ \__,_|___/\___|
   +     | |                 ✧             ⋅                             
         |_|         *                               ✧       
        ⊹                       ⊹                                 ˣ

             ✧⁺⋆｡°✩₊ ────────────    ⋅⋆☆⋆⋅    ──────────── ₊✩°｡⋆⁺✧
"#,
r#"

                     ⋆     _    _     ˣ                              ✧⋆        
        +                 | |  | |            ✧           +            
  ⋆   ___ _ __   __ _ _ __| | _| | ___     _ __ ___   ___  _   _ ___  ___ 
     / __| '_ \ / _` | '__| |/ / |/ _ \   | '_ ` _ \ / _ \| | | / __|/ _ \  ✧
     \__ \ |_) | (_| | |  |   <| |  __/   | | | | | | (_) | |_| \__ \  __/
     |___/ .__/ \__,_|_|  |_|\_\_|\___|   |_| |_| |_|\___/ \__,_|___/\___|
   ₊     | |                 ⊹             ⋆                            
         |_|         +                               ⊹       
        ✧                       ·                                 ⁺

             ✧⁺⋆｡°✩₊ ────────────    ⋅⋆☆⋆⋅    ──────────── ₊✩°｡⋆⁺✧
"#,
];

const SPARKLE_MOUSE_MESSAGE: &str = r#" 

                                     🐁✨


                                      HI!
                         Thank you for your support <3

                                   [ Enter ]"#;

fn print_hi() {
    use std::io::{self, Read, Write};
    use std::sync::{Arc, atomic::{AtomicBool, Ordering}};
    use std::{thread, time::Duration};

    #[cfg(target_os = "windows")]
    {
        // Enable ANSI escape codes on Windows
        use winapi::um::consoleapi::{GetConsoleMode, SetConsoleMode};
        use winapi::um::processenv::GetStdHandle;
        use winapi::um::winbase::STD_OUTPUT_HANDLE;
        use winapi::um::wincon::ENABLE_VIRTUAL_TERMINAL_PROCESSING;
        
        unsafe {
            let handle = GetStdHandle(STD_OUTPUT_HANDLE);
            let mut mode: u32 = 0;
            if GetConsoleMode(handle, &mut mode) != 0 {
                SetConsoleMode(handle, mode | ENABLE_VIRTUAL_TERMINAL_PROCESSING);
            }
        }

        // Animation control flag
        let running = Arc::new(AtomicBool::new(true));
        let running_clone = running.clone();

        // Animation thread: cycles through logo frames
        let handle = thread::spawn(move || {
            let mut frame = 0;
            let logo_count = SPARKLE_MOUSE_LOGO.len();
            
            // Clear screen using cls command
            let _ = std::process::Command::new("cmd")
                .args(["/C", "cls"])
                .status();
            
            io::stdout().flush().ok();
            
            while running_clone.load(Ordering::Relaxed) {
                // Move cursor to home position and clear screen
                print!("\x1B[H\x1B[2J");
                // Print logo frame
                print!("{}", SPARKLE_MOUSE_LOGO[frame]);
                print!("{}", SPARKLE_MOUSE_MESSAGE);
                io::stdout().flush().ok();
                frame = (frame + 1) % logo_count;
                thread::sleep(Duration::from_millis(180));
            }
        });

        // Wait for a single key press
        let _ = io::stdin().read(&mut [0u8]).unwrap();

        // Stop animation
        running.store(false, Ordering::Relaxed);
        // Wait for animation thread to finish
        let _ = handle.join();

        // Clear the screen and print logo
        print!("\x1B[H\x1B[2J");
        io::stdout().flush().ok();
        println!("{}", SPARKLE_MOUSE_LOGO[0]);
    }

    #[cfg(any(target_os = "macos", target_os = "linux"))]
    {
        // Animation control flag
        let running = Arc::new(AtomicBool::new(true));
        let running_clone = running.clone();

        // Animation thread: cycles through logo frames
        let handle = thread::spawn(move || {
            let mut frame = 0;
            let logo_count = SPARKLE_MOUSE_LOGO.len();
            
            // Initial clear using clear command
            let _ = std::process::Command::new("clear").status();
            
            while running_clone.load(Ordering::Relaxed) {
                // Clear screen using clear command for macOS/Linux
                let _ = std::process::Command::new("clear").status();
                // Print logo frame
                print!("{}", SPARKLE_MOUSE_LOGO[frame]);
                print!("{}", SPARKLE_MOUSE_MESSAGE);
                io::stdout().flush().ok();
                frame = (frame + 1) % logo_count;
                thread::sleep(Duration::from_millis(180));
            }
        });

        // Wait for a single key press
        let _ = io::stdin().read(&mut [0u8]).unwrap();

        // Stop animation
        running.store(false, Ordering::Relaxed);
        // Wait for animation thread to finish
        let _ = handle.join();

        // Clear the screen and print logo
        let _ = std::process::Command::new("clear").status();
        println!("{}", SPARKLE_MOUSE_LOGO[0]);
    }
    
    // Print help below the logo
    print_help(false);
}

fn print_version() {
    println!("Sparkle Mouse v{}", env!("CARGO_PKG_VERSION"));
}

fn print_help(show_logo: bool) {
    if show_logo {
        println!("{}", SPARKLE_MOUSE_LOGO[0]);
    }
    
    let http_addr = format!("{}.{}.{}.{}:{}", 
        HTTP_SERVER_ADDR.0[0], HTTP_SERVER_ADDR.0[1], 
        HTTP_SERVER_ADDR.0[2], HTTP_SERVER_ADDR.0[3], 
        HTTP_SERVER_ADDR.1);
    
    let help_text = format!(
r#"
✦ INFO
  ✧ The active instance intercepts all commands
  ✧ HTTP API available @ {} for custom drawing controls!
  ✧ More info & examples: {{PROJECT_URL}}

✦ OPTIONS
  --help, -h                            Show this message
  --version, -v                         Show version
  --headless                            Start without opening settings window
  --pause=false                         Stop rendering instantly
  <file.sparkle>                        Load .sparkle template file

✦ PARAMETERS
  --amount=0                            Particle density (0-1)
  --size=0                              Size (0-1, 0 = tiny but visible)
  --life=0.5                            Lifetime duration (0.5-6 seconds)
  --radius=0                            Spawn radius (0-1)
  --mouse-state=still                   Spawn trigger (still|move|still-move)
  --translucent=false                   Render translucently
  --spinning=0                          Rotating speed
  --align=false                         Align rotation to motion
  --turbulence=0                        Random chaotic motion
  --gravity=0.5                         Up/down (0-1, 0.5 = none)
  --glide=false                         Horizontal motion
  --outwards=0                          Exploding motion (0-1)
  --grow=false                          Scale-in on start
  --shrink=false                        Scale-out on end
  --fade=false                          Fade on start/end
  --bouncy=false                        Fluctuate size
  --glittery=false                      Fluctuate brightness
  --flip=false                          Flip texture when moving left
  --image-speed=0                       Sheet playback (0-60fps)
  --image-play-from-start=false         Sheet start
  --image-count=1                       Frame counts (single or array)
  --image-cycles=0                      Loop counts (single or array, 0 = inf)
  --image="<path>"                      Load custom image/GIF (single or array)

✦ EXAMPLES
  sparkle-mouse --headless --image='["image1.png","image2.jpg"]' --size=0.3
  sparkle-mouse template.sparkle
  sparkle-mouse base.sparkle extra.sparkle

"#, http_addr);
// Also works:
// --image-aspect-ratio=1
// --image-data=image:bubble // warning: base64 is not supported because of max arg string length in CLI

    println!("{}", help_text.replace("{PROJECT_URL}", PROJECT_URL));
}

fn print_unlicensed() {
    println!("{}", SPARKLE_MOUSE_LOGO[0]);
    
    // Calculate centering for 80-character terminal width
    let terminal_width = 80;
    let url_len = PROJECT_URL.len();
    let padding = (terminal_width - url_len) / 2;
    let centered_url = format!("{}{}", " ".repeat(padding), PROJECT_URL); // auto-centered url, assuming standard terminal width
    
    println!(
r#"


                              To use CLI features
                         please support Sparkle Mouse:
{}

"#, centered_url);
    println!("");
}

// HTTP server root endpoint - API documentation
async fn handle_root() -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "name": "Sparkle Mouse HTTP API",
        "version": env!("CARGO_PKG_VERSION"),
        "endpoints": {
            "/": "GET - Show API information",
            "/spawning": "POST boolean - Enable/disable particle spawning",
            "/cursor-tracking": "POST boolean - Enable/disable cursor tracking",
            "/draw": "POST {x: number, y: number} - Set particle draw position",
            "/pause": "POST boolean - Pause/unpause rendering",
            "/template": "POST {files: string[]} - Load .sparkle template file(s)",
            "/parameters": "POST {param: value, ...} - Set sparkle parameters (amount, size, life, radius, mouse-state, translucent, spinning, align, turbulence, gravity, glide, outwards, grow, shrink, fade, bouncy, glittery, flip, image-speed, image-play-from-start, image-count [array], image-cycles [array])",
            "/images": "POST {paths: string[]} - Set custom image path(s)"
        }
    }))
}

// HTTP server handler for draw commands
async fn handle_draw(
    Extension(app): Extension<tauri::AppHandle>,
    Json(pos): Json<CursorPosition>,
) -> Json<serde_json::Value> {
    // Emit draw position to frontend
    let _ = app.emit("draw-position-changed", pos);
    Json(serde_json::json!({"success": true}))
}

// HTTP server handler for cursor tracking control
async fn handle_cursor_tracking(
    Extension(app): Extension<tauri::AppHandle>,
    Json(enabled): Json<bool>,
) -> Json<serde_json::Value> {
    // Emit cursor tracking state to frontend
    let _ = app.emit("cursor-tracking-changed", enabled);
    Json(serde_json::json!({"success": true}))
}

// HTTP server handler for spawning control
async fn handle_spawning(
    Extension(app): Extension<tauri::AppHandle>,
    Json(enabled): Json<bool>,
) -> Json<serde_json::Value> {
    // Emit spawning state to frontend
    let _ = app.emit("spawning-changed", enabled);
    Json(serde_json::json!({"success": true}))
}

// HTTP server handler for pause control
async fn handle_pause(
    Extension(app): Extension<tauri::AppHandle>,
    Json(paused): Json<bool>,
) -> Json<serde_json::Value> {
    // Update pause state
    if let Some(state) = app.try_state::<DynamicMenuState>() {
        {
            let mut is_paused = state.is_paused.lock().unwrap();
            *is_paused = paused;
        }
        
        // Rebuild tray menu with new pause state
        let items = {
            let items = state.items.lock().unwrap();
            items.clone()
        };
        let app_clone = app.clone();
        tauri::async_runtime::spawn(async move {
            let _ = rebuild_tray_menu(&app_clone, &items, paused).await;
        });
        
        // Emit event to frontend
        let _ = app.emit("pause-toggled", paused);
    }
    Json(serde_json::json!({"success": true}))
}

// HTTP server handler for template loading
async fn handle_template(
    Extension(app): Extension<tauri::AppHandle>,
    Json(data): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    // Extract files array from request
    if let Some(files) = data.get("files").and_then(|f| f.as_array()) {
        let sparkle_files: Vec<String> = files
            .iter()
            .filter_map(|f| f.as_str().map(|s| s.to_string()))
            .collect();
        
        if !sparkle_files.is_empty() {
            let _ = app.emit("sparkle-files-opened", sparkle_files);
        }
    }
    Json(serde_json::json!({"success": true}))
}

// HTTP server handler for sparkle parameters
async fn handle_parameters(
    Extension(app): Extension<tauri::AppHandle>,
    Json(params): Json<HashMap<String, Value>>,
) -> Json<serde_json::Value> {
    // Emit sparkle parameters to frontend
    if !params.is_empty() {
        let _ = app.emit("sparkle-params-changed", params);
    }
    Json(serde_json::json!({"success": true}))
}

// HTTP server handler for image paths
async fn handle_images(
    Extension(app): Extension<tauri::AppHandle>,
    Json(data): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    // Extract paths array from request
    if let Some(paths) = data.get("paths").and_then(|p| p.as_array()) {
        let image_paths: Vec<String> = paths
            .iter()
            .filter_map(|p| p.as_str().map(|s| s.to_string()))
            .collect();
        
        if !image_paths.is_empty() {
            let _ = app.emit("image-paths-changed", image_paths);
        }
    }
    Json(serde_json::json!({"success": true}))
}

// Start HTTP server for local API
async fn start_http_server(app: tauri::AppHandle) {
    let router = Router::new()
        .route("/", get(handle_root))
        .route("/spawning", post(handle_spawning))
        .route("/cursor-tracking", post(handle_cursor_tracking))
        .route("/draw", post(handle_draw))
        .route("/pause", post(handle_pause))
        .route("/template", post(handle_template))
        .route("/parameters", post(handle_parameters))
        .route("/images", post(handle_images))
        .layer(Extension(app));
    
    let addr = SocketAddr::from(HTTP_SERVER_ADDR);
    
    println!("[INFO] Starting HTTP server on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, router).await.unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Check if running on Wayland (Linux only)
    #[cfg(target_os = "linux")]
    {
        if let Ok(session_type) = std::env::var("XDG_SESSION_TYPE") {
            if session_type.to_lowercase() == "wayland" {
                // Show error dialog using native message box
                use std::process::Command;
                let _ = Command::new("zenity")
                    .args(&[
                        "--error",
                        "--title=X11 Required",
                        "--text=Sparkle Mouse requires an X11 session (Wayland is not supported).\n\nPlease log out and select 'GNOME on Xorg' or 'X11' at the login screen.",
                        "--width=400"
                    ])
                    .spawn();
                
                // Also print to console
                eprintln!("\n[ERROR] Sparkle Mouse requires X11 (Wayland not supported)");
                eprintln!("Please log out and select 'GNOME on Xorg' or 'X11' at the login screen.\n");
                std::process::exit(1);
            }
        }
    }
    
    let args: Vec<String> = std::env::args().collect();
    
    // Check if launched in headless mode (--headless flag or SPARKLE_HEADLESS env var for dev mode)
    let was_headless = args.iter().any(|arg| arg == "--headless") || 
                       std::env::var("SPARKLE_HEADLESS").is_ok();
    
    // Check license for CLI features
    if !IS_LICENSED {
        let has_restricted_args = args.iter().skip(1).any(|arg| {
            // Allow .sparkle files (for file associations) and headless flag
            !has_sparkle_extension(arg) && arg != "--headless"
        });
        
        if has_restricted_args {
            print_unlicensed();
            std::process::exit(0);
        }
    }
    
    // Check for help and version flags before initializing Tauri
    for arg in args.iter().skip(1) {
        if arg == "--hi" || arg == "--hello" {
            print_hi();
            std::process::exit(0);
        } else if arg == "--help" || arg == "-h" {
            print_help(true);
            std::process::exit(0);
        } else if arg == "--version" || arg == "-v" {
            print_version();
            std::process::exit(0);
        }
    }
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_autostart::Builder::new()
                .arg("--headless")
                .build()
        )
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_single_instance::init(|app, args, _cwd| {
            // This runs in the existing instance when a new instance tries to start
            // args[0] is the executable, args[1+] are the arguments
            let mut sparkle_params: HashMap<String, Value> = HashMap::new();
            let mut image_paths: Vec<String> = Vec::new();
            let mut sparkle_files: Vec<String> = Vec::new();
            
            for arg in args.iter().skip(1) {
                if has_sparkle_extension(arg) {
                    // Collect the file to emit later as an array
                    sparkle_files.push(arg.clone());
                } else if arg.starts_with("--image=") {
                    // Parse --image="path" or --image=["path1","path2"] argument
                    let paths = parse_image_arg(arg);
                    image_paths.extend(paths);
                } else if arg == "--pause=true" {
                    // Set pause to true
                    if let Some(state) = app.try_state::<DynamicMenuState>() {
                        {
                            let mut is_paused = state.is_paused.lock().unwrap();
                            *is_paused = true;
                        }
                        let items = state.items.lock().unwrap().clone();
                        let app_clone = app.clone();
                        tauri::async_runtime::spawn(async move {
                            let _ = rebuild_tray_menu(&app_clone, &items, true).await;
                        });
                        let _ = app.emit("pause-toggled", true);
                    }
                } else if arg == "--pause=false" {
                    // Set pause to false
                    if let Some(state) = app.try_state::<DynamicMenuState>() {
                        {
                            let mut is_paused = state.is_paused.lock().unwrap();
                            *is_paused = false;
                        }
                        let items = state.items.lock().unwrap().clone();
                        let app_clone = app.clone();
                        tauri::async_runtime::spawn(async move {
                            let _ = rebuild_tray_menu(&app_clone, &items, false).await;
                        });
                        let _ = app.emit("pause-toggled", false);
                    }
                } else if let Some((key, value)) = parse_sparkle_params(arg) {
                    // Collect any other --key=value arguments as sparkle parameters
                    sparkle_params.insert(key, value);
                }
            }
            
            // Emit sparkle files if any were found (as array to match initial launch behavior)
            if !sparkle_files.is_empty() {
                let _ = app.emit("sparkle-files-opened", sparkle_files);
            }
            
            // Emit image paths if any were found
            if !image_paths.is_empty() {
                let _ = app.emit("image-paths-changed", image_paths);
            }
            
            // Emit sparkle parameters if any were found
            if !sparkle_params.is_empty() {
                let _ = app.emit("sparkle-params-changed", sparkle_params);
            }

            // Launched again without arguments (e.g. double-clicking the shortcut): open/focus settings
            // (macOS handles this via RunEvent::Reopen instead)
            #[cfg(not(target_os = "macos"))]
            if args.len() <= 1 {
                let app_clone = app.clone();
                tauri::async_runtime::spawn(async move {
                    let _ = open_settings_window(app_clone, Some(false)).await;
                });
            }
        }))
        .manage(DynamicMenuState {
            items: Mutex::new(Vec::new()),
            is_paused: Mutex::new(false),
            rebuilding_menu: AtomicBool::new(false),
            is_licensed: AtomicBool::new(IS_LICENSED),
            is_steam: AtomicBool::new(IS_STEAM),
            pending_sparkle_file: Mutex::new(None),
            spawning: AtomicBool::new(false), // Default spawning state
            pending_pause: Mutex::new(None),
            pending_sparkle_params: Mutex::new(None),
            pending_image_paths: Mutex::new(None),
            cursor_streaming_active: AtomicBool::new(true), // Start streaming by default
            was_headless: AtomicBool::new(was_headless), // Whether app was launched in headless mode
        })
        .invoke_handler(tauri::generate_handler![
            greet, 
            log_to_terminal,
            get_os,
            get_is_licensed,
            get_is_steam,
            get_pending_sparkle_file,
            get_pending_pause,
            get_pending_sparkle_params,
            get_pending_image_paths,
            get_spawning,
            was_launched_headless,
            set_spawning,
            toggle_pause, 
            sync_pause_state,
            is_settings_window_open,
            open_settings_window,
            open_about_window,
            add_dynamic_menu_item,
            add_dynamic_checkbox_menu_item,
            update_dynamic_menu_item_checked,
            remove_dynamic_menu_item,
            clear_dynamic_menu_items,
            set_template_menu_items,
            quit_app,
            register_cli_shortcut,
            get_cursor_position,
            start_cursor_streaming,
            stop_cursor_streaming,
            get_screen_size,
            open_url,
            show_in_folder,
            open_templates_folder,
            import_bundled_templates,
            // get_refresh_rate
        ])
        .setup(|app| {
            // Create initial tray menu (without dynamic items) using helper function
            let (pause, settings, about, quit) = create_static_menu_items(app, false)?;
            
            let menu = MenuBuilder::new(app)
                .items(&[
                    &pause,
                    &PredefinedMenuItem::separator(app)?,
                    &settings,
                    &about,
                    &PredefinedMenuItem::separator(app)?,
                    &quit,
                ])
                .build()?;

            // Create tray icon (using 128x128 for high DPI support)
            let tray_icon_bytes = include_bytes!("../icons/tray/128x128.png");
            let tray_icon = tauri::image::Image::from_bytes(tray_icon_bytes)?;
            
            let _tray = TrayIconBuilder::with_id("sparkle-mouse-tray")
                .menu(&menu)
                .icon(tray_icon)
                .icon_as_template(true) // macOS: adapts to menu bar style (light/dark mode)
                .on_menu_event(move |app, event| {
                    let event_id = event.id().as_ref();
                    match event_id {
                        "pause" => {
                            // Toggle pause state and rebuild menu
                            if let Some(state) = app.try_state::<DynamicMenuState>() {
                                let new_paused_state = {
                                    let mut is_paused = state.is_paused.lock().unwrap();
                                    *is_paused = !*is_paused;
                                    *is_paused
                                };
                                
                                // Get current menu items
                                let items = {
                                    let items = state.items.lock().unwrap();
                                    items.clone()
                                };
                                
                                // Rebuild menu with new pause state (spawn async task)
                                let app_clone = app.clone();
                                let items_clone = items.clone();
                                tauri::async_runtime::spawn(async move {
                                    let _ = rebuild_tray_menu(&app_clone, &items_clone, new_paused_state).await;
                                });
                                
                                // Emit event to frontend
                                let _ = app.emit("pause-toggled", new_paused_state);
                            }
                        }
                        "settings" => {
                            let _ = app.emit("tray-settings", ());
                        }
                        "about" => {
                            let app_clone = app.clone();
                            tauri::async_runtime::spawn(async move {
                                let _ = open_about_window(app_clone).await;
                            });
                        }
                        "more_templates" => {
                            // Open templates page in default browser
                            let templates_path = if IS_STEAM { "/templates-steam" } else { "/templates" };
                            let url = format!("{}{}", PROJECT_URL, templates_path);
                            let _ = open_url(url);
                        }
                        "open_templates_folder" => {
                            // Open templates folder in file explorer
                            let _ = open_templates_folder(app.clone());
                        }
                        "quit" => {
                            // On Windows, properly close all windows before exit
                            #[cfg(target_os = "windows")]
                            {
                                let windows: Vec<_> = app.webview_windows().into_iter().collect();
                                for (_label, window) in windows {
                                    let _ = window.close();
                                }
                                
                                let app_clone = app.clone();
                                std::thread::spawn(move || {
                                    std::thread::sleep(std::time::Duration::from_millis(100));
                                    app_clone.exit(0);
                                });
                            }
                            
                            #[cfg(not(target_os = "windows"))]
                            {
                                app.exit(0);
                            }
                        }
                        _ => {
                            // Handle dynamic menu items
                            let _ = app.emit("tray-dynamic-item", event_id);
                        }
                    }
                })
                .on_tray_icon_event(|_tray, event| {
                    if let TrayIconEvent::Click { button: MouseButton::Left, .. } = event {
                    }
                })
                .build(app)?;
            
            // Hide from dock on macOS
            #[cfg(target_os = "macos")]
            {
                app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            }
            
            // Initialize Linux cursor scale factor from main thread
            #[cfg(not(any(target_os = "macos", target_os = "windows")))]
            {
                linux_cursor::init_scale_factor();
            }
            
            if let Some(window) = app.get_webview_window("main") {
                // Set the window to ignore mouse events (click-through)
                let _ = window.set_ignore_cursor_events(true);
                
                // Linux/X11 specific setup for proper overlay behavior
                #[cfg(target_os = "linux")]
                {
                    window.with_webview(|webview| {
                        use gtk::prelude::*;
                        
                        let webview = webview.inner();
                        if let Some(gtk_window) = webview.ancestor(gtk::Window::static_type()) {
                            let gtk_window: gtk::Window = gtk_window.downcast().unwrap();
                            
                            // Set window type hint to prevent Ubuntu UI from hiding and remain visible on Show Desktop
                            // DOCK type prevents triggering fullscreen auto-hide behavior and survives Show Desktop (Super+D)
                            gtk_window.set_type_hint(gdk::WindowTypeHint::Dock);
                            
                            if let Some(gdk_window) = gtk_window.window() {
                                // Set input shape to allow clicks to pass through
                                let empty_region = cairo::Region::create();
                                gdk_window.input_shape_combine_region(&empty_region, 0, 0);
                            }
                        }
                    }).ok();
                }
            }
            
            // Handle .sparkle file open events (file associations)
            // The deep_link plugin's on_event handler already captures initial file opens via RunEvent::Opened
            // We just need to check get_current() for any URLs that were passed during launch
            let app_handle_for_deep_link = app.app_handle().clone();
            
            // Check for initial deep link URLs (file associations during launch)
            if let Ok(Some(urls)) = app.deep_link().get_current() {
                let mut sparkle_files: Vec<String> = Vec::new();
                for url in &urls {
                    // Convert file:// URL to path
                    if let Some(path) = url.to_file_path().ok() {
                        if path.extension().and_then(|e| e.to_str()).map_or(false, |ext| ext.eq_ignore_ascii_case("sparkle")) {
                            let path_str = path.to_string_lossy().to_string();
                            sparkle_files.push(path_str);
                        }
                    }
                }
                
                // Store in pending state for frontend to retrieve
                if !sparkle_files.is_empty() {
                    if let Some(state) = app.try_state::<DynamicMenuState>() {
                        let mut pending = state.pending_sparkle_file.lock().unwrap();
                        // Merge with any CLI args (shouldn't happen but just in case)
                        if let Some(existing) = pending.as_mut() {
                            existing.extend(sparkle_files);
                        } else {
                            *pending = Some(sparkle_files);
                        }
                    }
                }
            }
            
            // Register handler for runtime file opens (when app is already running)
            app.deep_link().on_open_url(move |event| {
                // Get URLs once (takes ownership of event)
                let urls = event.urls();
                // urls contains file:// URLs for file associations
                let mut sparkle_files: Vec<String> = Vec::new();
                for url in urls {
                    // Convert file:// URL to path
                    if let Some(path) = url.to_file_path().ok() {
                        if path.extension().and_then(|e| e.to_str()).map_or(false, |ext| ext.eq_ignore_ascii_case("sparkle")) {
                            let path_str = path.to_string_lossy().to_string();
                            sparkle_files.push(path_str);
                        }
                    }
                }
                // Emit all collected sparkle files as an array (for runtime opens)
                if !sparkle_files.is_empty() {
                    let _ = app_handle_for_deep_link.emit("sparkle-files-opened", sparkle_files);
                }
            });
            
            // Check if app was launched with command-line arguments
            // Store them for the frontend to retrieve once it's ready
            {
                let args: Vec<String> = std::env::args().collect();
                let mut sparkle_params: HashMap<String, Value> = HashMap::new();
                let mut image_paths: Vec<String> = Vec::new();
                let mut sparkle_files: Vec<String> = Vec::new();
                
                for arg in args.iter().skip(1) {
                    if has_sparkle_extension(arg) {
                        sparkle_files.push(arg.clone());
                    } else if arg.starts_with("--image=") {
                        // Parse --image="path" or --image=["path1","path2"] argument
                        let paths = parse_image_arg(arg);
                        image_paths.extend(paths);
                    } else if arg == "--pause=true" {
                        // Set initial pause state to true
                        if let Some(state) = app.try_state::<DynamicMenuState>() {
                            let mut is_paused = state.is_paused.lock().unwrap();
                            *is_paused = true;
                            let mut pending = state.pending_pause.lock().unwrap();
                            *pending = Some(true);
                        }
                    } else if arg == "--pause=false" {
                        // Set initial pause state to false
                        if let Some(state) = app.try_state::<DynamicMenuState>() {
                            let mut is_paused = state.is_paused.lock().unwrap();
                            *is_paused = false;
                            let mut pending = state.pending_pause.lock().unwrap();
                            *pending = Some(false);
                        }
                    } else if let Some((key, value)) = parse_sparkle_params(arg) {
                        // Collect any other --key=value arguments as sparkle parameters
                        sparkle_params.insert(key, value);
                    }
                }
                
                // Store sparkle files if any were found
                if !sparkle_files.is_empty() {
                    if let Some(state) = app.try_state::<DynamicMenuState>() {
                        let mut pending = state.pending_sparkle_file.lock().unwrap();
                        *pending = Some(sparkle_files);
                    }
                }
                
                // Store image paths if any were found
                if !image_paths.is_empty() {
                    if let Some(state) = app.try_state::<DynamicMenuState>() {
                        let mut pending = state.pending_image_paths.lock().unwrap();
                        *pending = Some(image_paths);
                    }
                }
                
                // Store sparkle parameters if any were found
                if !sparkle_params.is_empty() {
                    if let Some(state) = app.try_state::<DynamicMenuState>() {
                        let mut pending = state.pending_sparkle_params.lock().unwrap();
                        *pending = Some(sparkle_params);
                    }
                }
            }
            
            // Register global shortcut for pause/unpause
            let app_handle = app.app_handle().clone();
            app.global_shortcut().on_shortcut(PAUSE_SHORTCUT, move |_app, _shortcut, event| {
                // Only trigger on key press, not release
                if event.state != tauri_plugin_global_shortcut::ShortcutState::Pressed {
                    return;
                }
                
                // Toggle pause state when shortcut is pressed
                if let Some(state) = app_handle.try_state::<DynamicMenuState>() {
                    let new_paused_state = {
                        let mut is_paused = state.is_paused.lock().unwrap();
                        *is_paused = !*is_paused;
                        *is_paused
                    };
                    
                    // Get current menu items
                    let items = {
                        let items = state.items.lock().unwrap();
                        items.clone()
                    };
                    
                    // Rebuild menu with new pause state (spawn async task)
                    let app_clone = app_handle.clone();
                    let items_clone = items.clone();
                    tauri::async_runtime::spawn(async move {
                        let _ = rebuild_tray_menu(&app_clone, &items_clone, new_paused_state).await;
                    });
                    
                    // Emit event to frontend
                    let _ = app_handle.emit("pause-toggled", new_paused_state);
                }
            }).map_err(|e| format!("Failed to register global shortcut: {}", e))?;
            
            // Start HTTP server for local API commands
            if IS_LICENSED {
                let app_for_server = app.app_handle().clone();
                tauri::async_runtime::spawn(async move {
                    start_http_server(app_for_server).await;
                });
            }
            
            // Start cursor position streaming thread
            let app_for_cursor = app.app_handle().clone();
            let builder = std::thread::Builder::new()
                .name("cursor-streaming".to_string());
            
            builder.spawn(move || {
                use std::time::{Duration, Instant};
                
                // Prevent App Nap on macOS to avoid throttling during autostart
                #[cfg(target_os = "macos")]
                let _app_nap_guard = {
                    use core_foundation::string::CFString;
                    use core_foundation::base::TCFType;
                    
                    // Create IOPMAssertion to prevent App Nap
                    // kIOPMAssertionTypeNoIdleSleep = prevent system sleep
                    // kIOPMAssertionTypePreventUserIdleSystemSleep = prevent user idle sleep
                    unsafe {
                        // IOKit function declarations
                        #[link(name = "IOKit", kind = "framework")]
                        extern "C" {
                            fn IOPMAssertionCreateWithName(
                                assertion_type: core_foundation::string::CFStringRef,
                                assertion_level: u32,
                                reason: core_foundation::string::CFStringRef,
                                assertion_id: *mut u32,
                            ) -> i32;
                            #[allow(dead_code)]
                            fn IOPMAssertionRelease(assertion_id: u32) -> i32;
                        }
                        
                        let assertion_type = CFString::new("PreventUserIdleSystemSleep");
                        let reason = CFString::new("Sparkle Mouse cursor tracking");
                        let mut assertion_id: u32 = 0;
                        
                        let result = IOPMAssertionCreateWithName(
                            assertion_type.as_concrete_TypeRef(),
                            255, // kIOPMAssertionLevelOn
                            reason.as_concrete_TypeRef(),
                            &mut assertion_id,
                        );
                        
                        // Return guard that releases assertion on drop
                        struct AppNapGuard(u32);
                        impl Drop for AppNapGuard {
                            fn drop(&mut self) {
                                unsafe {
                                    #[link(name = "IOKit", kind = "framework")]
                                    extern "C" {
                                        fn IOPMAssertionRelease(assertion_id: u32) -> i32;
                                    }
                                    IOPMAssertionRelease(self.0);
                                }
                            }
                        }
                        
                        if result == 0 {
                            Some(AppNapGuard(assertion_id))
                        } else {
                            eprintln!("[WARN] Failed to create IOPMAssertion for cursor streaming");
                            None
                        }
                    }
                };
                
                // Set high thread priority on all platforms
                #[cfg(target_os = "macos")]
                {
                    unsafe {
                        // Use pthread to set thread priority
                        #[repr(C)]
                        struct sched_param {
                            sched_priority: i32,
                        }
                        
                        extern "C" {
                            fn pthread_self() -> usize;
                            fn pthread_setschedparam(
                                thread: usize,
                                policy: i32,
                                param: *const sched_param,
                            ) -> i32;
                        }
                        
                        let thread = pthread_self();
                        let param = sched_param {
                            sched_priority: 31, // High priority (range 0-31)
                        };
                        
                        const SCHED_RR: i32 = 2; // Round-robin scheduling
                        let result = pthread_setschedparam(thread, SCHED_RR, &param);
                        
                        if result != 0 {
                            eprintln!("[WARN] Failed to set thread priority for cursor streaming");
                        }
                    }
                }
                
                #[cfg(target_os = "windows")]
                {
                    unsafe {
                        use winapi::um::processthreadsapi::{
                            GetCurrentThread, SetThreadPriority,
                        };
                        use winapi::um::winbase::THREAD_PRIORITY_HIGHEST;
                        
                        SetThreadPriority(GetCurrentThread(), THREAD_PRIORITY_HIGHEST as i32);
                    }
                }
                
                #[cfg(target_os = "linux")]
                {
                    unsafe {
                        #[repr(C)]
                        struct sched_param {
                            sched_priority: i32,
                        }
                        
                        extern "C" {
                            fn pthread_self() -> usize;
                            fn pthread_setschedparam(
                                thread: usize,
                                policy: i32,
                                param: *const sched_param,
                            ) -> i32;
                        }
                        
                        let thread = pthread_self();
                        let param = sched_param {
                            sched_priority: 1, // Slightly elevated (requires root for higher values)
                        };
                        
                        const SCHED_RR: i32 = 2;
                        let _ = pthread_setschedparam(thread, SCHED_RR, &param);
                    }
                }
                
                let interval = Duration::from_millis(16); // 16ms = ~60fps
                let mut next_time = Instant::now();
                
                loop {
                    // Check if streaming is active
                    if let Some(state) = app_for_cursor.try_state::<DynamicMenuState>() {
                        if state.cursor_streaming_active.load(Ordering::SeqCst) {
                            // Get cursor position and emit event
                            if let Ok(pos) = get_cursor_pos() {
                                let _ = app_for_cursor.emit("cursor-position-stream", pos);
                            }
                        }
                    }
                    
                    // Sleep until next interval
                    next_time += interval;
                    let now = Instant::now();
                    if next_time > now {
                        std::thread::sleep(next_time - now);
                    } else {
                        // Fell behind, reset
                        next_time = now + interval;
                    }
                }
            }).expect("Failed to spawn cursor streaming thread");
            
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building application")
        .run(|app_handle, event| {
            // Handle app reopen events (double-clicking while already running on macOS)

            #[cfg(target_os = "macos")]
            {
                use tauri::RunEvent;
                if let RunEvent::Reopen { .. } = event {
                    // Prevent dock icon from appearing when reopened
                    let _ = app_handle.set_activation_policy(tauri::ActivationPolicy::Accessory);
                    
                    // Open settings window if it's not already open
                    if app_handle.get_webview_window("settings").is_none() {
                        let app_clone = app_handle.clone();
                        tauri::async_runtime::spawn(async move {
                            let _ = open_settings_window(app_clone, Some(false)).await;
                        });
                    }
                }
            }
            
            // Suppress unused variable warning on non-macOS platforms
            #[cfg(not(target_os = "macos"))]
            let _ = (app_handle, event);
        });
}
