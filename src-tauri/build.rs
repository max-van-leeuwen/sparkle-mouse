fn main() {
    // Load config.env file from the workspace root (parent directory)
    let manifest_dir = std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let workspace_root = manifest_dir
        .parent()
        .expect("Failed to get parent directory");
    
    let env_public_path = workspace_root.join("config.env");
    
    // Load config.env first
    if env_public_path.exists() {
        dotenvy::from_path(&env_public_path).ok();
    }
    
    // Enable "unlicensed" feature if IS_LICENSED is explicitly set to "false"
    if std::env::var("IS_LICENSED").unwrap_or_default().to_lowercase() == "false" {
        println!("cargo:rustc-cfg=feature=\"unlicensed\"");
    }
    
    // Enable "steam" feature if IS_STEAM is explicitly set to "true"
    if std::env::var("IS_STEAM").unwrap_or_default().to_lowercase() == "true" {
        println!("cargo:rustc-cfg=feature=\"steam\"");
    }

    // Set PROJECT_URL from environment variable (required)
    let project_url = std::env::var("PROJECT_URL")
        .expect("PROJECT_URL environment variable must be set (check config.env in workspace root)");
    println!("cargo:rustc-env=PROJECT_URL={}", project_url);
    
    tauri_build::build()
}
