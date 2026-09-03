import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const licenseText = readFileSync(resolve(__dirname, 'LICENSE'), 'utf-8');
const licenseBanner = `/*!\n${licenseText.split('\n').map(line => ` * ${line}`).join('\n')}\n */\n\n`;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SparkleMouse',
      fileName: 'sparkle-mouse.bundle',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        // Put everything in one file
        inlineDynamicImports: true,
        // Make the library available globally
        extend: true,
        globals: {}
      }
    },
    // Ensure assets are inlined
    assetsInlineLimit: 100000000, // 100MB - ensures everything is inlined
    outDir: 'bundled-site-example',
    emptyOutDir: false // Don't delete
  },
  plugins: [{
    name: 'prepend-license',
    closeBundle() {
      const filePath = resolve(__dirname, 'bundled-site-example/sparkle-mouse.bundle.iife.js');
      const content = readFileSync(filePath, 'utf-8');
      writeFileSync(filePath, licenseBanner + content);
    }
  }]
});
