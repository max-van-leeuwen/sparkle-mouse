# Sparkle Mouse (JS Bundle)

This JS bundle contains the full Sparkle Mouse renderer!

Simply add it to your self-hosted website (like [Neocities](https://sparkle-mouse.neocities.org/)).

The bundle is in sync with the latest Sparkle Mouse package on [npm](https://www.npmjs.com/package/sparkle-mouse).

## How To Use

Upload this file to your site: [sparkle-mouse.bundle.iife.js](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples/bundled-package/bundled-site-example/sparkle-mouse.bundle.iife.js) and add the following code to your HTML:
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


    // to use your own images/GIFs, use this to download a pre-made template to disk. then upload that, and load it using start('template.sparkle'). (You can skip this downloading step and generate templates on the fly, but pre-generating reduces loading times for users)
    const images = ['./image1.png', './image2.gif']; // (paths or Image objects)
    SparkleMouse.SparkleMouse.createSparkleSettings(images, { ...SparkleMouse.SparkleMouse.defaultSparkle, amount: 0.5, life: 1 }, true);

    // to see all available settings, check out the full documentation at:
    // https://www.npmjs.com/package/sparkle-mouse
</script>
```

## Building

If you want to re-build this JS bundle, follow the instructions below.

Install dependencies:
```bash
npm install
npm update sparkle-mouse
```

Build the bundle:
```bash
npm run build
```

This will create [`bundled-site-example/sparkle-mouse.bundle.iife.js`](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples/bundled-package/bundled-site-example/sparkle-mouse.bundle.iife.js).