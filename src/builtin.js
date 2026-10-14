// built-in images and templates



import { log, logError } from './log.js';
import { invoke } from '@tauri-apps/api/core';



// built-in images
import bubble from './assets/sparkle_images/bubble.png';
import cursor_mac from './assets/sparkle_images/cursor_mac.png';
import cursor_winxp from './assets/sparkle_images/cursor_winxp.png';
import emoji_mess from './assets/sparkle_images/emoji_mess.png';
import emoji_spicy from './assets/sparkle_images/emoji_spicy.png';
import fire from './assets/sparkle_images/fire.png';
import flower_power from './assets/sparkle_images/flower_power.png';
import heart_sparkle from './assets/sparkle_images/heart_sparkle.png';
import hearts_colorful from './assets/sparkle_images/hearts_colorful.png';
import hearts from './assets/sparkle_images/hearts.png';
import pixie_dust from './assets/sparkle_images/pixie_dust.png';
import rainbow from './assets/sparkle_images/rainbow.png';
import solitaire from './assets/sparkle_images/solitaire.png';
import snowflakes from './assets/sparkle_images/snowflakes.png';
import sparkles from './assets/sparkle_images/sparkles.png';
import webcore_flowers from './assets/sparkle_images/webcore_flowers.png';

import sparkle_mouse from './assets/UI/sparkle-mouse.png';


export const builtinImages = {
    "image:bubble": {
        img: bubble,
        name: "🫧 Bubble",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:cursor_auto": {
        img: cursor_mac,
        name: "🖱️ Cursor (Auto)",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:cursor_mac": {
        img: cursor_mac,
        name: "🖱️ Cursor (Unix)",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:cursor_winxp": {
        img: cursor_winxp,
        name: "🖱️ Cursor (Windows)",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:emoji_mess": {
        img: emoji_mess,
        name: "💯 Emoji Mess",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [96],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:emoji_spicy": {
        img: emoji_spicy,
        name: "🌶️ Emoji Spicy",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [9],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:fire": {
        img: fire,
        name: "🔥 Fire",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:flower_power": {
        img: flower_power,
        name: "🌺 Flower Power",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [16],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:heart_sparkle": {
        img: heart_sparkle,
        name: "💖 Heart Sparkle",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:hearts_colorful": {
        img: hearts_colorful,
        name: "💚 Hearts Colorful",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [12],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:hearts": {
        img: hearts,
        name: "❤️ Hearts",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [2],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:pixie_dust": {
        img: pixie_dust,
        name: "🧚 Pixie Dust",
        defaultSpeed: 0.16,
        playFromStart: false,
        imageCount: [5],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:rainbow": {
        img: rainbow,
        name: "🌈 Rainbow",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 40/155,
        cycles: [0],
    },
    "image:snowflakes": {
        img: snowflakes,
        name: "❄️ Snowflakes",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [7],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:solitaire": {
        img: solitaire,
        name: "♣️ Solitaire",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [52],
        aspectRatio: 71/96,
        cycles: [0],
    },
    "image:sparkles": {
        img: sparkles, // image data
        name: "✨ Sparkles", // in dropdown list
        defaultSpeed: 0, // 0-1 value
        playFromStart: false, // indicates if image should be animated
        imageCount: [1], // frame counts per file
        aspectRatio: 1, // individual cell width/height
        cycles: [0], // loop counts per file (0=infinite)
    },
    "image:sparkle_mouse": {
        img: sparkle_mouse,
        name: "🐁 Sparkle Mouse",
        defaultSpeed: 0,
        playFromStart: false,
        imageCount: [1],
        aspectRatio: 1,
        cycles: [0],
    },
    "image:webcore_flowers": {
        img: webcore_flowers,
        name: "🍄 Webcore Flowers",
        defaultSpeed: 0.11,
        playFromStart: false,
        imageCount: [
            14,
            2,
            30,
            24,
            2,
            6,
            8,
            3,
            12,
            4,
            4,
            2,
            11,
            2,
            15,
            2,
            8,
            10,
            2,
            14,
            6,
            5,
            4,
            12,
            2,
            13,
            4,
            5,
            3,
            3,
            132,
            3,
            8,
            2,
            11,
            8,
            8,
            11
        ],
        aspectRatio: 1.1746987951807228,
        cycles: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],
    },
}
export const defaultImage = "image:sparkles"; // set default image



// built-in templates
import template_love from './templates/love.sparkle?raw';
import template_sparkles from './templates/sparkles.sparkle?raw';
import template_heartsconfetti from './templates/hearts confetti.sparkle?raw';
import template_fire from './templates/fire.sparkle?raw';
import template_flower_power from './templates/flower power.sparkle?raw';
import template_bubbles from './templates/bubbles.sparkle?raw';
import template_cursor_trailing from './templates/cursor trailing.sparkle?raw';
import template_cursor_madness from './templates/cursor madness.sparkle?raw';
import template_pixie_dust from './templates/manic pixie dream dust.sparkle?raw';
import template_snowflakes from './templates/snowflakes.sparkle?raw';
import template_solitaire from './templates/solitaire.sparkle?raw';
import template_rainbow from './templates/rainbow.sparkle?raw';
import template_toomany from './templates/too many.sparkle?raw';
import template_webcore_flowers from './templates/webcore flowers.sparkle?raw';

// includes a forbidden char (*) to prevent user file name clashing
export const builtInTemplates = [
    { id: '*builtin_sparkles',          name: '✨ Sparkles',                data:template_sparkles },
    { id: '*builtin_love',              name: '♥️ Love',                    data:template_love },
    { id: '*builtin_hearts',            name: '💚 Hearts Confetti',         data:template_heartsconfetti },
    { id: '*builtin_fire',              name: '🔥 Fire',                    data:template_fire },
    { id: '*builtin_flower_power',      name: '🌺 Flower Power',            data:template_flower_power },
    { id: '*builtin_bubbles',           name: '🫧 Bubbles',                 data:template_bubbles },
    { id: '*builtin_cursor_trailing',   name: '🖱️ Cursor Trailing',         data:template_cursor_trailing },
    { id: '*builtin_cursor_madness',    name: '🖱️ Cursor Madness!',         data:template_cursor_madness },
    { id: '*builtin_pixie_dust',        name: '🧚 Manic Pixie Dream Dust',  data:template_pixie_dust },
    { id: '*builtin_snowflakes',        name: '❄️ Snowflakes',              data:template_snowflakes },
    { id: '*builtin_solitaire',         name: '♣️ Solitaire',               data:template_solitaire },
    { id: '*builtin_rainbow',           name: '🌈 Rainbow',                 data:template_rainbow },
    { id: '*builtin_toomany',           name: '✨ Too Many',                data:template_toomany },
    { id: '*builtin_webcore_flowers',   name: '🍄 Webcore Flowers',         data:template_webcore_flowers },
];
export const defaultTemplate = builtInTemplates[0].data; // set default template

// set auto cursor to current OS
(async () => {
    try {
        const os = await invoke('get_os');
        if (os === 'windows'){
            builtinImages["image:cursor_auto"].img = cursor_winxp;
        }
    } catch (error) {
        await logError('Error setting auto cursor', error);
    }
})();
