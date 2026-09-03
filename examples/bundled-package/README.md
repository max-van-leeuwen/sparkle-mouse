# Sparkle Mouse (JS Bundle)

This package bundles Sparkle Mouse and all its dependencies into a single JS file.

Perfect for self-hosted sites, like Neocities!

## Usage

Grab the JS bundle [sparkle-mouse.bundle.iife.js](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples/bundled-package/bundled-site-example/sparkle-mouse.bundle.iife.js) and add this to your site's HTML:
```html
<script src="sparkle-mouse.bundle.iife.js"></script>
<script>
    const sparkles = new SparkleMouse.SparkleMouse();
    sparkles.start('./template.sparkle').catch(err => {
        console.error(err);
    });
</script>
```

## Building

Install dependencies:
```bash
npm install
```

Build the bundle:
```bash
npm run build
```

This will create `bundled-site-example/sparkle-mouse.bundle.iife.js`.