<div align="center">
<img src="readme-media/sparkle-mouse.gif" width="200" height="200" style="image-rendering: pixelated;"/>
<br>
<i><small>logo by <a href="https://livicg.co.uk">Livi Wilmore</a></small></i>
<br><br>


# ✨ Coming soon! ✨


# Sparkle Mouse
### Cute Customizable Particles! 🐁✨
GPU optimized sparkles for Windows + Mac + Web
<br>Tauri 2.0 App & JS Package
<br>Made with Three.js

[![Website](https://img.shields.io/badge/Website-sparklemou.se-blue)](https://www.sparklemou.se)

<br><b>[Video (youtube)!](https://www.youtube.com/watch?v=I9LLf8ShzNA)</b><br>
<a href="https://www.youtube.com/watch?v=I9LLf8ShzNA"><img src="https://img.youtube.com/vi/I9LLf8ShzNA/hqdefault.jpg" alt="Sparkle Mouse Demo" width="160"/></a>

</div>

- The sparkle-mouse [JS package](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples/bundled-package) is 100% free. Use it on your website! [Here's](https://sparkle-mouse.neocities.org) a live example.

- The desktop app is open-source. Please buy the installer ([itch.io](https://maxvanleeuwen.itch.io/sparkle-mouse)) to support development! Thank you :)

<br>

<div align="center">
<img src="readme-media/flowers-2.gif" alt="Flowers 2" width="400"/>
</div>

<br>

## What Can It Do?

Sparkle Mouse brings that nostalgic webcore aesthetic to your desktop or website. It renders customizable particles next to you cursor, or full-screen.

<br>
<img src="readme-media/UI.gif" height="400" style="image-rendering: pixelated;"/>

<i>(the UI looks like Windows XP :P)</i>
<br><br>

Your sparkle settings are stored as <i>.sparkle</i> template files! Share them with friends between desktops, or use them on a web installation of Sparkle Mouse.

I optimized the particles to run fully on the GPU, even with many different GIFs it runs pretty smooth!

<br>

<p>
<img src="readme-media/flowers.gif" alt="Flowers" width="400"/>
<br><i>Flower GIFs from GeoCities are playing on each particle, download this template <a href="https://maxvanleeuwen.itch.io/webcore-fish-sparkle-template">here</a>!</i>
</p>

<br>

<p>
<img src="readme-media/rainbow.gif" alt="Rainbow" width="400"/>
<br><i>Custom images and settings can make particles look like anything.</i>
</p>

<br><br>

The desktop app can be controlled through HTTP API and CLI (get started: `sparkle-mouse -h`) in case you want to connect it to your own apps or scripts. 

<img src="readme-media/sparkle-mouse-cli.gif" alt="Command-Line Interface" width="400"/>

For example, run `sparkle-mouse --headless template.sparkle` to start the app with a template file, without showing the UI.

<br>

<img src="readme-media/manual-drawing.gif" alt="Custom shapes drawing" width="400"/>

See [this](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples) python example to learn how to draw shapes, using the HTTP API.
<br>

<br>

## .Sparkle Files?

<br> 

<img src="readme-media/sparkle-file.jpg" alt=".Sparkle File" width="400"/>

<br>
These are templates! Containing all sparkle settings.

Double-click to open. When placed in the templates folder, the desktop app automatically shows it in its templates list.
But these files can also be used on web, or with CLI.

It's a JSON file containing all settings + image data (base64 and/or built-in image identifier). 

Find the default sparkle template [here](readme-media/Sparkles.sparkle)!

<br>

## Repo Contents
This repo contains:
1. Tauri 2.0 desktop app (Mac + Win)
2. [npm package](https://www.npmjs.com/package/sparkle-mouse?activeTab=readme): sparkle-mouse

    ```bash
    # install using one of these:
    npm install sparkle-mouse
    yarn add sparkle-mouse
    pnpm add sparkle-mouse
    ```
3. The [bundled package](https://github.com/max-van-leeuwen/sparkle-mouse/tree/main/examples/bundled-package), for self-hosted sites like [Neocities](https://sparkle-mouse.neocities.org)!

<br>

## Local Build
```bash
# mac
npm run build:mac

# mac notarized, see .config.env
npm run build:macnotarized

# windows
npm run build:win

# linux (not currently working)
npm run build:linux

# these automatically generate attribution.txt

# on mac, dmg is packaged twice:
# 1st time to let tauri generate bundle_dmg.sh
# 2nd time to bundle after plist modification
```

<br>

## Test Run
```bash
# test
npm run test

# test headless
npm run test:headless

# quick version setter (package.json, Cargo.toml, etc)
npm run set-version 1.0.5

# test CLI
npm run build:macnotarized # or other platform
./src-tauri/target/release/sparkle-mouse --headless --size=0.5 --amount=0.8

# simulate github actions build variant (replace "+1" with: +1 standard, +2 unlicensed, +3 steam, +4 steam-unlicensed)
sed -i '' -E 's/"version": "([0-9]+\.[0-9]+\.[0-9]+)"/"version": "\1+1"/' src-tauri/tauri.conf.json
npm run test
git checkout -- src-tauri/tauri.conf.json # always revert when done!

# clear cache, reinstall
npm run clean
```

<br>

## Linux? (X11)
Linux is not supported. But I got pretty far! Give it a shot if you're feeling adventurous.

```
# force GPU on linux and run:
DRI_PRIME=1 npm run test
```

On Fedora/vanilla GNOME, the tray icon requires the AppIndicator extension. This is suggested by the RPM package on install:
```bash
sudo dnf install gnome-shell-extension-appindicator
gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com
```

<br>

## Support this project
If you like this project and want to support it, please consider buying the [executable](https://maxvanleeuwen.itch.io/sparkle-mouse) or [donating](https://ko-fi.com/maxvanleeuwen)! :)


<br>
<br>

![Cursors](readme-media/cursors.gif)