import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.js'),
                main: resolve(__dirname, 'src/main.js'),
                cursor: resolve(__dirname, 'src/cursor.js'),
                demo: resolve(__dirname, 'src/demo.js'),
                shapes: resolve(__dirname, 'src/shapes.js'),
                helpers: resolve(__dirname, 'src/helpers.js'),
                renderer: resolve(__dirname, 'src/renderer.js'),
                scene: resolve(__dirname, 'src/scene.js'),
                spritesheet: resolve(__dirname, 'src/spritesheet.js'),
                logger: resolve(__dirname, 'src/logger.js'),
            },
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}.js`,
        },
        outDir: 'dist',
        emptyOutDir: true,
        minify: false,
        rollupOptions: {
            external: ['three', 'omggif', 'upng-js'],
        },
    },
});
