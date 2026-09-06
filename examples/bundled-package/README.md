# Sparkle Mouse (JS Bundle)

This package bundles Sparkle Mouse and all its dependencies into a single JS file.

Perfect for self-hosted sites, like Neocities ([example](https://sparkle-mouse.neocities.org/))!

This bundle is in sync with the latest Sparkle Mouse package on [npm](https://www.npmjs.com/package/sparkle-mouse).

## How To Use

Grab grab the JS bundle ([sparkle-mouse.bundle.iife.js)](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples/bundled-package/bundled-site-example/sparkle-mouse.bundle.iife.js)) and use this HTML:
```html
<script src="sparkle-mouse.bundle.iife.js"></script>
<script>
    const sparkles = new SparkleMouse.SparkleMouse();

    // load with default sparkles
    sparkles.start();

    // OR load a custom template.sparkle
    sparkles.start('./template.sparkle').catch(err => {
        console.error(err);
    });

    // OR start with custom settings (using the default as the base)
    sparkles.start({ ...SparkleMouse.SparkleMouse.defaultSparkle, amount: 0.5, life: 1 }).catch(err => {
        console.error(err);
    });


    // to use your own images as sparkles, run this once to download a pre-made template to disk. then load it using start('template.sparkle'). (You may also skip the downloading step and generate them on the fly, but pre-generating reduces loading times for users)
    const images = ['./image1.png', './image2.gif']; // (paths or Image objects)
    SparkleMouse.SparkleMouse.createSparkleSettings(images, { ...SparkleMouse.SparkleMouse.defaultSparkle, amount: 0.5, life: 1 }, true);

    // to see all available settings, check out the full documentation at:
    // https://www.npmjs.com/package/sparkle-mouse
</script>
```
Calling `start()` multiple times just restarts with the latest settings.

`createSparkleSettings` processes images on every page load, which is slow. Call it once with `downloadNow: true` as the third argument to save the result as a `.sparkle` file, then load that file directly with `sparkles.start('./template.sparkle')` instead.

## Building

Install dependencies:
```bash
npm install
npm update sparkle-mouse
```

Build the bundle:
```bash
npm run build
```

This will create `bundled-site-example/sparkle-mouse.bundle.iife.js`.