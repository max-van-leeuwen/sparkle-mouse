#!/usr/bin/env node

// Update Tauri app version
// Example: node scripts/update-version.js 1.0.5

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const newVersion = process.argv[2];

// validate version
if (!newVersion) {
    console.error('Error: No valid version number given');
    process.exit(1);
}
const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
if (!versionRegex.test(newVersion)) {
    console.error('Error: No valid version number given');
    process.exit(1);
}

const files = [
    {
        path: join(rootDir, 'package.json'),
        name: 'package.json',
        update: (content) => {
            const parsed = JSON.parse(content);
            const oldVersion = parsed.version;
            parsed.version = newVersion;
            return {
            content: JSON.stringify(parsed, null, 2) + '\n',
            oldVersion
            };
        }
    },
    {
        path: join(rootDir, 'src-tauri', 'Cargo.toml'),
        name: 'src-tauri/Cargo.toml',
        update: (content) => {
            const versionMatch = content.match(/^version = "(.+)"$/m);
            const oldVersion = versionMatch ? versionMatch[1] : 'unknown';
            const updated = content.replace(
            /^version = ".+"$/m,
            `version = "${newVersion}"`
            );
            return { content: updated, oldVersion };
        }
    },
    {
        path: join(rootDir, 'src-tauri', 'tauri.conf.json'),
        name: 'src-tauri/tauri.conf.json',
        update: (content) => {
            const parsed = JSON.parse(content);
            const oldVersion = parsed.version;
            parsed.version = newVersion;
            return {
            content: JSON.stringify(parsed, null, 2) + '\n',
            oldVersion
            };
        }
    }
];

for (const file of files) {
    try {
        const content = readFileSync(file.path, 'utf8');
        const { content: updatedContent, oldVersion } = file.update(content);
        writeFileSync(file.path, updatedContent, 'utf8');
        console.log(`${file.name}: ${oldVersion} → ${newVersion}`);
    } catch (error) {
        console.error(`Error: ${file.name}:`, error.message);
    }
}

console.log(`\nDone! Updated to version ${newVersion}`);