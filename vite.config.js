import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import glsl from 'vite-plugin-glsl';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
  const projectUrl = process.env.PROJECT_URL;
  const isLicensed = process.env.IS_LICENSED === 'true';
  const isSteam = process.env.IS_STEAM === 'true';

  if (!projectUrl) {
    throw new Error('PROJECT_URL environment variable is not set. Make sure config.env is loaded.');
  }

  const packageVersion = JSON.parse(
    readFileSync(resolve(__dirname, 'packages/sparkle-mouse/package.json'), 'utf-8')
  ).version;

  return {
  root: './src',
  resolve: {
    // resolve packages/sparkle-mouse's live source
    alias: [
      { find: /^sparkle-mouse\/(.*)$/, replacement: resolve(__dirname, 'packages/sparkle-mouse/src/$1.js') },
      { find: /^sparkle-mouse$/, replacement: resolve(__dirname, 'packages/sparkle-mouse/src/index.js') },
    ],
  },
  define: {
    '__PROJECT_URL__': JSON.stringify(projectUrl),
    '__DO_LOGGING__': mode !== 'production',
    '__PACKAGE_VERSION__': JSON.stringify(packageVersion),
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        settings: resolve(__dirname, 'src/settings.html'),
        about: resolve(__dirname, 'src/about.html'),
      },
    },
  },
  server: {
    port: 1420,
    strictPort: true,
  },
  plugins: [
    glsl({
      include: ['**/*.vert', '**/*.frag', '**/*.glsl'],
      compress: true,
      watch: true,
    }),
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    // obfuscate unlicensed
    ...(!isLicensed ? [obfuscator({
      include: ['src/**/*.js'],
      exclude: [/node_modules/],
      apply: 'build',
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
        // Preserve import paths and module names
        reservedStrings: [
          '@tauri-apps/.*',
          '.*\\.js',
          '.*\\.ts',
          '.*\\.json',
        ],
      },
    })] : []),
  ],
};
});