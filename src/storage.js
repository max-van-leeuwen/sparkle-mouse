// storageAPI
//  macos root dir: /Users/user/Library/Application Support/com.maxvanleeuwen.sparkle-mouse



import { log, logError } from './log.js';
import { appDataDir, resolve } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile, readDir, remove } from '@tauri-apps/plugin-fs';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { defaultTemplate, builtInTemplates } from './builtin.js';
import { templateAbout, templateVersion } from 'sparkle-mouse/helpers';



// storage API initialization
export async function initializeStorageAPI() {
    
    // only initialize for main and settings windows
    const currentWindow = getCurrentWindow();
    const windowLabel = currentWindow.label;
    if (windowLabel !== 'main' && windowLabel !== 'settings') {
        await log(`Skipping storageAPI initialization for window: ${windowLabel}`);
        return;
    }
    
    const storageAPI = {
        builtInTemplates: {
            loadSettings: loadBuiltInTemplateSettings
        },
        customTemplates: {
            dir: null,
            loadTemplates: loadTemplates,
            loadSettings: loadCustomTemplateSettings,
            saveTemplate: saveCustomTemplate,
            deleteTemplate: deleteCustomTemplate
        },
        liveTemplate: {
            dir: null,
            loadSettings: null,
            saveSettings: null
        },
        config: {
            dir: null,
            loadSettings: null,
            loadSetting: loadConfigSetting,
            saveSettings: null,
            saveSetting: saveConfigSetting
        }
    };



    // get app's root directory
    const appDir = await appDataDir();
    const appDirExists = await exists(appDir);
    if (!appDirExists) {
        await log("Creating app dir");
        await mkdir(appDir, { recursive: true });
    }

    // custom templates
    const templatesDirName = 'Templates'; // place custom templates in 'Templates' folder
    const templatesDirPath = await resolve(appDir, templatesDirName);
    const templatesExists = await exists(templatesDirPath);
    if (!templatesExists) {
        await log("Creating templates dir");
        await mkdir(templatesDirPath, { recursive: true });
    }
    const templateExtension = '.sparkle';

    // live template
    const liveTemplateDirName = "Live"; // place live template in root folder
    const liveTemplateDirPath = await resolve(appDir, liveTemplateDirName);
    const liveTemplateDirExists = await exists(liveTemplateDirPath);
    if (!liveTemplateDirExists) {
        await log("Creating live template dir");
        await mkdir(liveTemplateDirPath, { recursive: true });
    }
    const liveTemplateFileName = 'live' + templateExtension; // name of live template file
    const liveTemplateFilePath = await resolve(liveTemplateDirPath, liveTemplateFileName);
    
    const defaultLiveTemplateSettings = JSON.parse(defaultTemplate);

    // app config
    const configDirName = '.config'; // hidden folder
    const configDirPath = await resolve(appDir, configDirName);
    const configDirExists = await exists(configDirPath);
    if (!configDirExists) {
        await log("Creating config dir");
        await mkdir(configDirPath, { recursive: true });
    }
    const configFileExtension = '.json';
    const configFileName = 'config' + configFileExtension;
    const configFilePath = await resolve(configDirPath, configFileName);
    const defaultConfigSettings = {
        firstRun: true, // checks if app has been run before, becomes false on app start
        isPaused: false,
        selectedTemplate: "*builtin_sparkles",
        selectedMonitor: "primary-monitor"
    };

    // assign directory paths and functions to storageAPI
    storageAPI.customTemplates.dir = templatesDirPath;
    storageAPI.liveTemplate.dir = liveTemplateDirPath;
    storageAPI.liveTemplate.loadSettings = createLoadSettings(liveTemplateFilePath, defaultLiveTemplateSettings);
    storageAPI.liveTemplate.saveSettings = createSaveSettings(liveTemplateFilePath);
    storageAPI.config.dir = configDirPath;
    storageAPI.config.loadSettings = createLoadSettings(configFilePath, defaultConfigSettings);
    storageAPI.config.saveSettings = createSaveSettings(configFilePath);

    async function loadBuiltInTemplateSettings(templateId) {
        const template = builtInTemplates.find(t => t.id === templateId);
        return createLoadSettings(template.data, defaultLiveTemplateSettings);
    }

    async function loadCustomTemplateSettings(name) {
        return createLoadSettings(await resolve(templatesDirPath, name) + templateExtension, {});
    }

    async function saveCustomTemplate(name, settings) {
        const templateFilePath = await resolve(templatesDirPath, name) + templateExtension;
        const tempSaveFunction = createSaveSettings(templateFilePath);
        await tempSaveFunction(settings, `Saving new template ${name}`);
    }

    async function deleteCustomTemplate(name) {
        try {
            const templateFilePath = await resolve(templatesDirPath, name + templateExtension);
            const fileExists = await exists(templateFilePath);
            if (fileExists) {
                await remove(templateFilePath);
                await log(`Deleted template: ${name}`);
            } else {
                await logError(`Template file not found: ${name}`);
            }
        } catch (error) {
            await logError(`Error deleting template ${name}`, error);
        }
    }

    async function loadConfigSetting(key, defaultValue) {
        const allSettings = await storageAPI.config.loadSettings();
        return allSettings[key] !== undefined ? allSettings[key] : defaultValue;
    }

    async function saveConfigSetting(key, value) {
        const allSettings = await storageAPI.config.loadSettings();
        allSettings[key] = value;
        await storageAPI.config.saveSettings(allSettings, `Saving settings for key '${key}': ${value}`);
    }

    async function loadTemplates(){
        try {
            // get all entries in dir
            const entries = await readDir(templatesDirPath);
            
            // filter files and prepare
            const sparkleFiles = await Promise.all(
                entries
                    .filter(entry => {
                        return entry.isFile && entry.name.toLowerCase().endsWith(templateExtension);
                    })
                    .map(async (entry) => {
                        const fileName = entry.name.slice(0, -templateExtension.length);
                        const filePath = await resolve(templatesDirPath, entry.name);
                        
                        return {
                            fileName,
                            filePath,
                            loadSettings:createLoadSettings(filePath, {}) // to be loaded later
                        };
                    })
            );
            return sparkleFiles;
            
        } catch (error) {
            await logError('Error getting template files', error);
            return [];
        }
    }

    // generic load-settings function creator
    // filePath can be a file path string or raw template string content
    function createLoadSettings(filePath, defaultSettings){
        return async function() {
            try {
                let settingsContent;
                
                // check if filePath is raw content (contains newlines or JSON structure)
                const isRawContent = filePath.includes('\n') || filePath.trim().startsWith('{');
                
                if (isRawContent) {
                    // treat as raw template string
                    settingsContent = filePath;
                } else {
                    // treat as file path
                    const fileExists = await exists(filePath);
            
                    if (!fileExists) {
                        if (defaultSettings) {
                            await log(`No settings file found for ${filePath}`);
                            const tempSaveFunction = createSaveSettings(filePath);
                            await tempSaveFunction(defaultSettings, `Generating new settings file for ${filePath}`);
                            return defaultSettings; // return saved default settings
                        } else {
                            await log(`No settings file found and no defaults provided, ignoring for ${filePath}`);
                            return {};
                        }
                    }

                    settingsContent = await readTextFile(filePath);
                }
                
                if (!settingsContent) {
                    await log(`Settings content is empty`);
                    return defaultSettings || {};
                }
                
                const parsedSettings = JSON.parse(settingsContent);
                return { ...defaultSettings, ...parsedSettings }; // fill missing data with defaults (if user manually deleted from json)

            } catch (error) {
                await logError('Error loading from file', error);
                return defaultSettings || {};
            }
        }
    }

    // generic save-settings function creator
    function createSaveSettings(filePath){
        return async function(settings, logStr) {
            try {                
                if (logStr !== undefined) {
                    await log(logStr || `Saving all settings`);
                }
                
                // add "about" field as first element for .sparkle files
                let settingsToSave = settings;
                if (filePath.endsWith('.sparkle')) {
                    settingsToSave = { "about": templateAbout, "version": templateVersion, ...settings };
                }
                
                let content = JSON.stringify(settingsToSave, null, 2);
                
                await writeTextFile(filePath, content);
            } catch (error) {
                await logError('Error saving to file', error);
            }
        }
    }

    // live settings from file
    const liveSettings = await storageAPI.liveTemplate.loadSettings();
    
    await log(`Initialized storageAPI for window: ${windowLabel}`);

    return { storageAPI, liveSettings };
}