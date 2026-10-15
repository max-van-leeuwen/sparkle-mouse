# Contributing

Thanks for wanting to help with Sparkle Mouse!

## Setup

```bash
npm install
```

The repo has two parts:
- `packages/sparkle-mouse`: the npm package (the particles themselves)
- `src` and `src-tauri`: the desktop app, which uses the package's `renderer.js` and `scene.js` too

## Working on the npm package

```bash
npm run dev -w sparkle-mouse
```

This opens a playground that runs straight from `packages/sparkle-mouse/src`, so changes show up right away. It has buttons for start/stop/destroy, demo shapes and a WebGL context loss, which are the bits most likely to break.

## Working on the desktop app

```bash
npm run test
```

See the main README for platform builds.

## Before opening a pull request

```bash
npm run check
```

This builds the package and the desktop app's web bundle (and type checks the package, if it has types). The same check runs automatically on every pull request.

If you change anything in `packages/sparkle-mouse/src`, please try the desktop app too, since it shares that code.

Smaller pull requests that do one thing are much easier to review!
