// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // On Windows, attach to console if CLI arguments are present
    #[cfg(target_os = "windows")]
    {
        let args: Vec<String> = std::env::args().collect();
        let has_cli_args = args.len() > 1;
        
        if has_cli_args {
            unsafe {
                use winapi::um::wincon::{AttachConsole, ATTACH_PARENT_PROCESS};
                // Attach to parent console (if launched from terminal)
                AttachConsole(ATTACH_PARENT_PROCESS);
            }
        }
    }
    
    sparkle_mouse_lib::run()
}
