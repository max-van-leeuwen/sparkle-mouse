// renderer for ✨ pretty particles ✨



import * as THREE from 'three';
import { log } from './logger.js';
import { lerp, remap, inverseLerp, Callback } from './helpers.js';
import vertexShader from './shaders/particles.vert?raw';
import fragmentShader from './shaders/particles.frag?raw';
import turbulenceVertexShader from './shaders/turbulence.vert?raw';
import turbulenceFragmentShader from './shaders/turbulence.frag?raw';
import debugTurbulenceVertexShader from './shaders/debug-turbulence.vert?raw';
import debugTurbulenceFragmentShader from './shaders/debug-turbulence.frag?raw';


// params
const maxSpeed = 60; // max. sprite animation speed (fps)
export function getMaxSpeed() { return maxSpeed; } // sprite animation speed
const frameRateClamp = 1/20; // minimum physics frame rate to prevent bursts (s, frame time)
const alternatingMeshes = true; // always render new particles on top of old by alternating between 2 particle mesh instances. switching active mesh on end of each cycle.
const debugShowTurbulence = false; // shows turbulence map
const turbulenceTextureSize = 1800; // turbulence texture resolution


// setting groups including hidden dynamic settings - all settings go through here for mapping and additional control
const settingGroups = {

    // on cursor movement
    onStill : [false, true],
    onMove : [false, true],

    // spawn a new particle once every this many ms. if frames are skipped, positions are interpolated for a smooth particle trail
    amount : [.05, 2000], // range (lower values means more particles!)

    // spawn once this often (ms) when amount slider is all the way down (only very occasionally, might be an interesting use case)
    amountWhenLowest : 10000,

    // no low-density mode when spawning loads of particles
    getDensityLowBoundForAmount : function(amount){
        return amount < .2 ? 1 : .15;
    },

    // custom density when cursor is not moving
    densityOnStill : .5,
    
    // lifetime (s)
    life : [.1, 5],

    // spawn radius
    radius : [0, .42],

    // scale-in anim
    grow : [false, true],

    // scale-out anim
    shrink : [false, true],

    // fade
    fade : [false, true],

    // overall particle scale
    size : [0.007, 1],

    // randomize size and lifetime
    randSizeLifeTime: [false, true],

    // bouncy
    bouncy : [false, true],

    // faster fluctuating size for shorter-lived particles
    getBouncySpeedByLife : function(life){
        return remap(life, 4, 8, 12, 5, true); // short-lived to longer-lived
    },

    // sparkly
    glittery : [false, true],

    // faster glittery speed for shorter-lived particles
    getGlitterySpeedByLife : function(life){
        return remap(life, 4, 8, 24, 14, true);
    },

    // gravity
    getGravity : function(gravitySetting) {
        // map with logarithmic curve centered at 0.5
        // (values near 0.5 stay closer to output center for longer)
        const range = [-.3, .3];
        if (gravitySetting < 0.5) {
            const t = gravitySetting / 0.5; // normalize to 0-1
            return lerp(range[0], 0, t, 0.5);
        } else {
            const t = (gravitySetting - 0.5) / 0.5; // normalize to 0-1
            return lerp(0, range[1], t, 0.5);
        }
    },

    // flying away from start, random direction
    outwards : [0, 1],

    // spinning
    spinning : [0, 20],

    // align to velocity direction
    align : [false, true],

    // flip texture horizontally when moving left
    flip : [false, true],

    // flying away horizontally
    glide : [0, 0.03],

    // multiplier for gliding based on particle size
    getGlideMultBySize : function(size) {
        return remap(size, settingGroups.size[0], settingGroups.size[1], .5, 2.2);
    },

    // transparency (0-1)
    getTranslucency : (amountSetting) => {
        const range = [.56, .4];
        return lerp(range[0], range[1], amountSetting, 1);
    },

    // image count
    imageCount : (v) => { 
        // handle array format (sum all frame counts)
        return v.reduce((sum, count) => sum + count, 0);
    },

    // start animation at frame 0 (or at a random index)
    fromStart : [false, true],

    // animation speed (fps)
    speed : (v) => { return v * maxSpeed },

    // check if particle lifetime is practically the same as sequence duration
    doRandomizeLifetime : (speed, fromStart, lifeSetting, imageCountArray) => {
        // check if there are no separate frame ranges (individual images, or just 1 gif)
        if (imageCountArray.length === 1 || imageCountArray.every(count => count === 1)) return true;
        if (speed == 0) return true; // only relevant with speed value
        if (!fromStart) return true; // only relevant when playing from start
        
        const imageCount = imageCountArray.reduce((sum, count) => sum + count, 0);
        const animDuration = imageCount/speed;
        
        // find what slider position would give us animDuration for creating a visually consistent slider threshold value
        const targetSliderPos = inverseLerp(settingGroups.life[0], settingGroups.life[1], animDuration, 1);
        
        // check if slider distance between current position and target is within threshold
        const sliderDiff = Math.abs(lifeSetting - targetSliderPos);
        const sliderThresh = 0.025; // slider distance threshold (0-1 range, represents visual distance in UI)
        return sliderDiff > sliderThresh;
    },

    // amount of cycles for GIF animation (0=infinite)
    cyclesPrepare : (cyclesSetting) => {
        return cyclesSetting || [0];
    },

    // texture shape
    aspectRatioPrepare : (aspectSetting) => {
        return aspectSetting !== undefined ? aspectSetting : 1; // default to square
    }
}
export function getSettingGroups() { return settingGroups; }



// populate the scene (returns a Promise that resolves to the animate function)
export async function showScene(settings, imageData, rendererAPI, cursorAPI, renderOutOfView = true) {
    
    // instance-specific state
    let spawning = true; // can be toggled to pause/resume particle spawning
    let onSpawningEnabled = null; // callback when spawning transitions to true
    let lastParticleSpawnTime = null; // timestamp (ms) of when a particle was last spawned
    let hasActiveParticles = false; // tracks if there are currently active particles
    
    // callback for particle activity changes
    const onParticleActivityChange = new Callback();

    // use scene-local time to avoid large absolute timestamps in shaders
    // (important for mediump precision on some GPU/driver combos)
    const sceneTimeOrigin = performance.now() / 1000;
    const nowS = () => (performance.now() / 1000) - sceneTimeOrigin;
    
    // canvas visibility check helper
    const isCanvasVisible = () => {
        if (renderOutOfView) return true;
        const canvas = rendererAPI.renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight;
    };
    
    // on particle activity change
    const notifyParticleActivity = (isActive) => {
        if (hasActiveParticles !== isActive) {
            hasActiveParticles = isActive;
            onParticleActivityChange.call(isActive);
        }
    };
    
    // read settings
    const onStill =             settings['mouse-state']=="still" || settings['mouse-state']=="still-move" ? settingGroups.onStill[1] : settingGroups.onStill[0];
    const onMove =              settings['mouse-state']=="move" || settings['mouse-state']=="still-move" ? settingGroups.onMove[1] : settingGroups.onMove[0];
    const amount =              settings['amount'] === 0 ? settingGroups.amountWhenLowest : lerp(settingGroups.amount[0], settingGroups.amount[1], 1-settings['amount'], 1);
    const life =                lerp(settingGroups.life[0], settingGroups.life[1], settings['life'], 1);
    const radius =              settings['radius'] === 1 ? 1 : lerp(settingGroups.radius[0], settingGroups.radius[1], settings['radius'], 0.5); // if radius==1, just spawn particles everywhere
    const grow =                settings['grow'] ? settingGroups.grow[1] : settingGroups.grow[0];
    const shrink =              settings['shrink'] ? settingGroups.shrink[1] : settingGroups.shrink[0];
    const fade =                settings['fade'] ? settingGroups.fade[1] : settingGroups.fade[0];
    const size =                lerp(settingGroups.size[0], settingGroups.size[1], settings['size'], 1);
    const randSizeLifeTime =    settings['randomize-size-lifetime'] ? settingGroups.randSizeLifeTime[1] : settingGroups.randSizeLifeTime[0];
    const bouncy =              settings['bouncy'] ? settingGroups.bouncy[1] : settingGroups.bouncy[0];
    const glittery =            settings['glittery'] ? settingGroups.glittery[1] : settingGroups.glittery[0];
    const gravity =             settingGroups.getGravity(settings['gravity']);
    const outwards =            lerp(settingGroups.outwards[0], settingGroups.outwards[1], settings['outwards']);
    const spinning =            lerp(settingGroups.spinning[0], settingGroups.spinning[1], settings['spinning']);
    const align =               settings['align'] ? settingGroups.align[1] : settingGroups.align[0];
    const flip =                settings['flip'] ? settingGroups.flip[1] : settingGroups.flip[0];
    const turbulenceStrength =  settings['turbulence'] ?? 0;
    const glide =               settings['glide'] ? settingGroups.glide[1] : settingGroups.glide[0];
    const translucent =         settings['translucent'] ? settingGroups.getTranslucency(settings['amount']) : 1;
    const imageCount =          settingGroups.imageCount(settings['image-count']);
    const fromStart =           settings['image-play-from-start'] ? settingGroups.fromStart[1] : settingGroups.fromStart[0];
    const speed =               settingGroups.speed(settings['image-speed']);
    const cycleCounts =         settingGroups.cyclesPrepare(settings['image-cycles']); // 0 = infinite, n =  n times
    const aspectRatio =         settingGroups.aspectRatioPrepare(settings['image-aspect-ratio']); // width/height
    const imageCountsArray =    settings['image-count'];
    
    // calculate image ranges (start/end indices for each file in sprite sheet)
    const imageRanges = [];
    let currentIndex = 0;
    for (let i = 0; i < imageCountsArray.length; i++) {
        const count = imageCountsArray[i];
        imageRanges.push({
            start: currentIndex,
            end: currentIndex + count - 1,
            count: count,
            cycles: cycleCounts[i] || 0
        });
        currentIndex += count;
    }
    
    // pre-calculate sprite sheet grid layout
    const spriteCols = Math.ceil(Math.sqrt(imageCount));
    const spriteRows = Math.ceil(imageCount / spriteCols);
    const spriteCellSize = { x: 1 / spriteCols, y: 1 / spriteRows };
    
    // prepare values and hidden settings
    const particleSpawnIntervalS = amount/1000; // particles/s
    const maxParticleCount = Math.ceil(life/particleSpawnIntervalS); // maximum simultaneous particle count before cycling
    const maxVelocityForLowDensity = 1; // maximum velocity to be considered low-density
    const lowDensityVerticalOffset = .04 * (size/150); // y pos random multiplier for low-density particles
    const relativeGlide = glide * settingGroups.getGlideMultBySize(size); // glide, multiplied
    const bouncySpeed = bouncy ? settingGroups.getBouncySpeedByLife(life) : -1; // fluctuating size speed, -1 if disabled
    const glitterySpeed = glittery ? settingGroups.getGlitterySpeedByLife(life) : -1; // fluctuating brightness speed, -1 if disabled
    const randomizeLifeTime = settingGroups.doRandomizeLifetime(speed, fromStart, settings['life'], imageCountsArray); // don't allow randomized lifetime if playing from start (i.e. a GIF) and the user's chosen lifetime is super close to gif play time. this allows exact single-shot particle animations

    // get scene
    const renderer = rendererAPI.renderer;
    const camera = rendererAPI.camera;
    const scene = rendererAPI.scene;

    // turbulence texture
    let turbulenceTexture = null;
    if (settings['turbulence'] > 0) {
        turbulenceTexture = await generateTurbulenceTexture(renderer);
        if (debugShowTurbulence) {
            const debugQuad = createTurbulenceDebug(turbulenceTexture);
            scene.add(debugQuad);
        }
    }

    // create particles buffer geometry using instancing
    const meshCount = alternatingMeshes ? 2 : 1;

    // arrays to hold geometries, materials, and meshes
    const particlesGeometries = [];
    const positionsArrays = [];
    const startTimesArrays = [];
    const particleMaterials = [];
    const particleSystems = [];

    // create shared base quad geometry
    const baseQuadGeometry = new THREE.InstancedBufferGeometry();
    const basePositions = new Float32Array([
        0, 0, 0,  // bottom-left
        0, 0, 0,  // bottom-right
        0, 0, 0,  // top-left
        0, 0, 0   // top-right
    ]);
    
    // quad coordinates for expansion in vertex shader
    const baseQuadCoords = new Float32Array([
        -0.5, -0.5,  // bottom-left
         0.5, -0.5,  // bottom-right
        -0.5,  0.5,  // top-left
         0.5,  0.5   // top-right
    ]);
    
    // indices for two triangles forming the quad
    const baseIndices = new Uint32Array([
        0, 1, 2,  // first triangle
        1, 3, 2   // second triangle
    ]);
    
    // set base geometry attributes (shared by all instances)
    baseQuadGeometry.setAttribute('position', new THREE.BufferAttribute(basePositions, 3));
    baseQuadGeometry.setAttribute('quadCoord', new THREE.BufferAttribute(baseQuadCoords, 2));
    baseQuadGeometry.setIndex(new THREE.BufferAttribute(baseIndices, 1));

    // create per-instance pre-computed random values. 4 per particle
    const instanceRandoms = new Uint8Array(maxParticleCount * 4);
    for (let i = 0; i < maxParticleCount * 4; i++){
        instanceRandoms[i] = Math.floor(Math.random() * 256);
    }

    // create material, wait for texture to fully load before continuing
    const particleTexture = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            // premultiply to prevent black pixels from affecting mipmaps
            texture.premultiplyAlpha = true;
            resolve(texture);
        };
        img.onerror = (error) => reject(error);
        img.src = imageData;
    });

    // shared uniform currentTime
    const sharedTimeUniform = { value: 0 };
    const sharedDeltaTimeUniform = { value: 0 };

    // create geometry, material, and mesh for each particle system
    for (let meshIndex = 0; meshIndex < meshCount; meshIndex++){
        // clone base geo
        const particlesGeometry = baseQuadGeometry.clone();

        // create per-instance attributes
        const instancePositions = new Float32Array(maxParticleCount * 3); // xyz per instance
        const instanceStartTimes = new Float32Array(maxParticleCount);    // startTime per instance
        
        // initialize startTimes to -1 (unused)
        instanceStartTimes.fill(-1);

        // add instance attributes (these will be accessed per-instance in vertex shader)
        particlesGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(instancePositions, 3));
        particlesGeometry.setAttribute('startTime', new THREE.InstancedBufferAttribute(instanceStartTimes, 1));
        particlesGeometry.setAttribute('randValues', new THREE.InstancedBufferAttribute(instanceRandoms, 4, true));
        
        // set instance count
        particlesGeometry.instanceCount = maxParticleCount;

        // store dynamic arrays for later use
        particlesGeometries.push(particlesGeometry);
        positionsArrays.push(instancePositions);
        startTimesArrays.push(instanceStartTimes);

        // create material
        const particlesMaterial = new THREE.ShaderMaterial({
            premultipliedAlpha: true,
            uniforms: {
                currentTime : sharedTimeUniform, // shared across all materials
                deltaTime : sharedDeltaTimeUniform, // shared across all materials
                life: {value: life},
                grow: {value: grow},
                shrink: {value:shrink},
                fade: {value:fade},
                size: {value:size},
                randomizeSizeLifeTime: {value:randSizeLifeTime},
                bouncySpeed: {value:bouncySpeed},
                glitterySpeed: {value:glitterySpeed},
                gravity: {value:gravity},
                outwards: {value:outwards},
                spinning: {value:spinning},
                align: {value:align},
                flip: {value:flip},
                turbulenceTex: {value: turbulenceTexture},
                turbulenceTexHeight: {value: turbulenceTextureSize},
                turbulenceStrength: {value:turbulenceStrength},
                glide: {value:relativeGlide},
                tex: {value: particleTexture},
                translucent: {value: translucent},
                imageCount : {value: imageCount},
                fromStart : {value: fromStart},
                speed : {value: speed},
                randomizeLifeTime : {value :randomizeLifeTime},
                aspectRatio : {value: aspectRatio},
                spriteCols : {value: spriteCols},
                spriteRows : {value: spriteRows},
                spriteCellSize : {value: new THREE.Vector2(spriteCellSize.x, spriteCellSize.y)},
                isActive : {value: meshIndex===0}, // mesh 0 starts active, mesh 1 starts inactive
                fileCount : {value: imageRanges.length},
                imageStarts : {value: imageRanges.map(r => r.start)},
                imageCounts : {value: imageRanges.map(r => r.count)},
                imageCycles : {value: imageRanges.map(r => r.cycles)},
                isFlipbook : {value: imageRanges.every(r => r.count === 1)}, // all files have 1 frame = flipbook mode (only relevant when fileCount > 1, so not in the case of a single GIF)
            },
            transparent: true,
            depthWrite: false,
            depthTest: false,
            blending: THREE.NormalBlending,
            forceSinglePass: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        // add to scene
        const particleSystem = new THREE.Mesh(particlesGeometries[meshIndex], particlesMaterial);
        particleSystem.renderOrder = meshIndex === 0 ? 2 : 1; // start mesh 0 active
        scene.add(particleSystem);

        particleMaterials.push(particlesMaterial);
        particleSystems.push(particleSystem);
    }

    // random values buffer
    const randomBufferSize = Math.max(9973, maxParticleCount); // using a prime number to avoid visual pattern repetition
    const randomBuffer = new Float32Array(randomBufferSize);
    for (let i = 0; i < randomBufferSize; i++){
        randomBuffer[i] = Math.random();
    }

    // place next particle in lineup at a position, set startTime
    let currentParticleIndex = 0; // current cycling particle index
    let activeMeshIndex = 0; // which mesh is currently active (0 or 1)
    let geoChanged = false; // tracks if geometry was modified this frame
    let minModifiedParticle = maxParticleCount; // track range of modified particles
    let maxModifiedParticle = -1;
    
    // flush geometry updates for current mesh
    function flushGeometryUpdates(){
        if (geoChanged){
            const particlesGeometry = particlesGeometries[activeMeshIndex];
            const instancePositionAttr = particlesGeometry.attributes.instancePosition;
            const startTimeAttr = particlesGeometry.attributes.startTime;
            
            const minInstance = minModifiedParticle;
            const maxInstance = maxModifiedParticle + 1;
            
            instancePositionAttr.updateRange = {
                offset: minInstance * 3,
                count: (maxInstance - minInstance) * 3
            };
            startTimeAttr.updateRange = {
                offset: minInstance,
                count: maxInstance - minInstance
            };
            
            instancePositionAttr.needsUpdate = true;
            startTimeAttr.needsUpdate = true;
            lastParticleSpawnTime = new Date().getTime();
            
            // notify that particles are now active
            notifyParticleActivity(true);

            // reset tracking
            geoChanged = false;
            minModifiedParticle = maxParticleCount;
            maxModifiedParticle = -1;
        }
    }
    
    function addParticle(x, y, startTime){
        // get active arrays
        const positions = positionsArrays[activeMeshIndex];
        const startTimes = startTimesArrays[activeMeshIndex];

        // with instancing, each particle uses only 1 position (not 4 vertices)
        const posIndex = currentParticleIndex * 3;
        
        // set position for this instance
        positions[posIndex] = x;
        positions[posIndex + 1] = y;
        positions[posIndex + 2] = 0;
        
        // set start time for this instance
        startTimes[currentParticleIndex] = startTime;

        // mark geometry as modified
        geoChanged = true;
        
        // track modified range for partial buffer updates
        if (currentParticleIndex < minModifiedParticle) minModifiedParticle = currentParticleIndex;
        if (currentParticleIndex > maxModifiedParticle) maxModifiedParticle = currentParticleIndex;

        // cycle index
        currentParticleIndex++;
        if (currentParticleIndex >= maxParticleCount){
            currentParticleIndex = 0;

            // swap meshes
            if (alternatingMeshes){
                // flush current mesh geometry before swapping
                flushGeometryUpdates();
                
                // set render orders, higher value draws later
                const newActiveMeshIndex = 1 - activeMeshIndex;
                particleSystems[activeMeshIndex].renderOrder = 1; // becoming inactive (background)
                particleSystems[newActiveMeshIndex].renderOrder = 2; // becoming active (on top)
                
                // update uniforms
                particleMaterials[activeMeshIndex].uniforms['isActive'].value = false;
                particleMaterials[newActiveMeshIndex].uniforms['isActive'].value = true;

                // switch active mesh index
                activeMeshIndex = newActiveMeshIndex;
            }
        }
    }

    // get the amount of new particles to spawn on this frame, based on elapsed time since last spawn
    // firstMove: if on this frame the cursor just started moving after standing still for >=1 frames
    let previousParticleTime = nowS(); // keep track of when a particle was last spawned
    let totalSpawnCount = 0; // total new particle count for this frame (excl leftover from previous frame)
    function particlesToSpawn(firstMove, currentTime){
        // reset timers on first frame of movement to prevent burst
        if (firstMove) previousParticleTime = currentTime - deltaTime; // est. one frame ago

        // get particle count since last frame
        const thisDeltaTime = Math.min(currentTime - previousParticleTime, frameRateClamp);
        const thisFrameCount = thisDeltaTime / particleSpawnIntervalS; // calculate new particle count (not always a whole number!)
        previousParticleTime = currentTime; // update for next frame

        // add to last frame's count
        totalSpawnCount += thisFrameCount;
        if (totalSpawnCount >= 1){ // if particles are to be spawned this frame
            const floored = Math.floor(totalSpawnCount); // whole number of particles to spawn, incl leftover prv frame
            totalSpawnCount -= floored; // leftover particles for next frame
            return floored;
        }
        return 0;
    }

    // request new particles to be updated
    function requestParticles(isFirst, spawningBecauseStill){
        // reset
        geoChanged = false;

        // prevent interpolation when spawning on still
        if (spawningBecauseStill) cursorAPI.breakInterpolation = true;

        // get per-particle position generator
        let positionGenerator = cursorAPI.getInterpolatedPositions();
        
        // if no cursor position yet (page load) and radius is 1 (spawn everywhere), create a dummy generator for position
        if (positionGenerator === null && radius === 1) {
            positionGenerator = {
                getPosition: () => ({ x: 0, y: 0 }),
                velocity: 0,
                distance: 0,
                trackingDeltaTime: null,
                finalize: () => {}
            };
        }
        
        if (positionGenerator === null) return;

        // get particle spawn density multiplier using velocity
        let particleDensity = 1;
        
        // set particle density to lower value on still, looks much nicer than having many particles appear
        if (spawningBecauseStill){
            particleDensity = settingGroups.densityOnStill;

        // when moving, reduce particle count based on velocity
        }else{
            const lowBound = settingGroups.getDensityLowBoundForAmount(amount); // min value to lift velocityRatio's 0 to
            if (lowBound == 1){ // skip density check for low particle counts
                particleDensity = 1;
            }else{
                const velocityRatio = positionGenerator.velocity / maxVelocityForLowDensity; // linear ratio
                particleDensity = remap(velocityRatio, 0, 1, lowBound, 1, true); // threshold to test against random() and destroy particle
            }
        }


        // check how many new particles should be spawned on this frame
        const currentTime = nowS();
        const particleSpawnCount = particlesToSpawn(isFirst && !spawningBecauseStill, currentTime);
        const timeBasedOffset = Math.floor(currentTime * 1000); // milliseconds index offset, reducing repetitions

        // inset the spawn area by the particle's half size so it doesn't spawn too far off-screen (useful for readability of large particles)
        const edgeInsetStrength = .25; // less than a full offset, that looks too empty around the edges because of individual image aspect ratios within the particles
        let spawnLeft = camera.left, spawnRight = camera.right, spawnBottom = camera.bottom, spawnTop = camera.top;
        if (radius === 1){
            const insetX = Math.min(size * 0.5 * aspectRatio * edgeInsetStrength, Math.max(0, (camera.right - camera.left) / 2));
            const insetY = Math.min(size * 0.5 * edgeInsetStrength, Math.max(0, (camera.top - camera.bottom) / 2));
            spawnLeft += insetX;
            spawnRight -= insetX;
            spawnBottom += insetY;
            spawnTop -= insetY;
        }

        // spawn particles, adjust individual positions
        for (let i = 0; i < particleSpawnCount; i++){

            // enforce density, adjust particle world pos
            let yOffset = 0;
            if (particleDensity != 1){
                if (Math.random() > particleDensity) continue; // enforce density when moving slowly by skipping some particles
                const randVertical = randomBuffer[(currentParticleIndex+i+1000) % randomBuffer.length];
                yOffset = remap(randVertical, 0, 1, -.35, 1) * lowDensityVerticalOffset; // low-density particles should be offset a bit (arbitrarily more up than down)
            }

            // get interpolation position and generate particle position
            const t = randSizeLifeTime 
                ? randomBuffer[(currentParticleIndex+i+1500) % randomBuffer.length] // random spacing
                : i / particleSpawnCount; // linear 0-1 for even spacing
            let particlePos = positionGenerator.getPosition(t);
            if (!particlePos) continue;

            // density offset after lerp
            particlePos.y += yOffset;

            if (radius === 1){
                // spawn anywhere on screen using camera bounds, with some inset
                particlePos.x = remap(randomBuffer[(currentParticleIndex+i+timeBasedOffset+2000) % randomBuffer.length], 0, 1, spawnLeft, spawnRight);
                particlePos.y = remap(randomBuffer[(currentParticleIndex+i+timeBasedOffset+2500) % randomBuffer.length], 0, 1, spawnBottom, spawnTop);

            } else if (radius > 0){
                // random area around lerped position
                const randAngle = randomBuffer[(currentParticleIndex+i+timeBasedOffset+2000) % randomBuffer.length];
                const areaAngle = randAngle * Math.PI * 2;
                const randRadius = Math.sqrt(randomBuffer[(currentParticleIndex+i+timeBasedOffset+2500) % randomBuffer.length]);
                const areaMagnitude = radius * randRadius;
                const areaWidth = Math.cos(areaAngle) * areaMagnitude;
                const areaHeight = Math.sin(areaAngle) * areaMagnitude;
                particlePos.x += areaWidth;
                particlePos.y += areaHeight;
            }

            const delayedStart = i * .00001; // visuals variation
            addParticle(particlePos.x, particlePos.y, currentTime + delayedStart);
        }

        // geometry update
        flushGeometryUpdates();

        // finalize cursorAPI for this generator
        positionGenerator.finalize();
    }

    // restart particle clocks
    function resetParticles(){
        for (let meshIndex = 0; meshIndex < meshCount; meshIndex++){
            const startTimes = startTimesArrays[meshIndex];
            startTimes.fill(-1);
            particlesGeometries[meshIndex].attributes.startTime.needsUpdate = true;
        }
        currentParticleIndex = 0;
        activeMeshIndex = 0;

        // reset mesh positions and render orders
        if (alternatingMeshes){
            particleSystems[0].renderOrder = 2; // active
            particleMaterials[0].uniforms['isActive'].value = true;
            if (particleSystems[1]){
                particleSystems[1].renderOrder = 1; // inactive
                particleMaterials[1].uniforms['isActive'].value = false;
            }
        }

        // reset
        onSpawningEnabled();
    }

    // reset tracking when spawning is enabled via CLI
    onSpawningEnabled = () => {
        previousParticleTime = nowS();
        totalSpawnCount = 0;
        cursorAPI.resetPathTracking();
    };

    // if spawning while cursor is still
    if (onStill){
        // 2nd on-stop call for regular onStill spawning
        const overlapTime = .2; // time to allow ignoring firstStop (s)
        let previousStopTime = 0; // keep track of when cursor was last stopped (s since app start)
        cursorAPI.onStop.add((firstStop, firstStopNotHoveringSettings) => {
            if (!spawning) return;
            if (cursorAPI.isHoveringSettings && radius!==1) return;
            if (!isCanvasVisible()) return;

            // check if first stop overlap applies
            const currentTime = nowS();
            let isFistStop = firstStop || firstStopNotHoveringSettings;
            if (isFistStop && !firstStopNotHoveringSettings) isFistStop = (currentTime - previousStopTime) > overlapTime;
            previousStopTime = currentTime;

            // reset particle spawn time tracking when coming back from hovering settings
            if (firstStopNotHoveringSettings) previousParticleTime = currentTime;
            
            requestParticles(isFistStop, true);
        });
    }

    // if spawning while cursor is moving
    if (onMove){
        const overlapTime = .2; // time to allow ignoring firstMove (s)
        let previousMoveTime = 0; // keep track of when cursor was last moved (s since app start)
        cursorAPI.onMove.add((firstMove, firstMoveNotHoveringSettings) => {
            if (!spawning) return;
            if (cursorAPI.isHoveringSettings && radius!==1) return;
            if (!isCanvasVisible()) return;
    
            // check if first move overlap applies
            const currentTime = nowS();
            let isFistMove = firstMove || firstMoveNotHoveringSettings;
            if (isFistMove && !firstMoveNotHoveringSettings) isFistMove = (currentTime - previousMoveTime) > overlapTime;
            previousMoveTime = currentTime;
    
            // reset particle spawn time tracking when coming back from hovering settings
            if (firstMoveNotHoveringSettings) previousParticleTime = currentTime;
    
            // cycle through particles
            requestParticles(isFistMove, false);
        });
    }

    // animation loop (called by main)
    let deltaTime = frameRateClamp; // s
    let lastTime = nowS(); // animation frame delta time store (s)

    function animate() {
        // update clock
        const currentTime = nowS(); // scene-local seconds since start
        deltaTime = currentTime - lastTime;
        if (deltaTime > frameRateClamp) deltaTime = frameRateClamp;
        lastTime = currentTime;

        // update shared time uniform once for all materials
        sharedTimeUniform.value = currentTime;
        sharedDeltaTimeUniform.value = deltaTime;

        // check if all particles have expired
        if (hasActiveParticles && lastParticleSpawnTime != null) {
            const now = new Date().getTime();
            if ((now - lastParticleSpawnTime) > (life * 1000)) {
                notifyParticleActivity(false);
            }
        }

        // particles were already set and animations happen in shader
        if (!rendererAPI.isPaused && !rendererAPI.isPerformancePaused) { // skip rendering if paused (can be set by notifyParticleActivity above)
            renderer.render(scene, camera);
        }
    }

    // instance-specific accessors
    const getSpawning = () => spawning;
    const setSpawning = (value) => {
        const wasSpawning = spawning;
        spawning = value;
        if (value && !wasSpawning && onSpawningEnabled) onSpawningEnabled();
    };

    return {
        animate, 
        resetParticles, 
        getSpawning, 
        setSpawning,
        onParticleActivityChange
    };
} 



// generate turbulence texture once on start
// this could be a baked texture, but it's nice to be able to procedurally change parameters to tweak the look
function generateTurbulenceTexture(renderer){
    const turbulenceSize = 10;
    return new Promise((resolve) => {
        const texWidth = turbulenceTextureSize;
        const texHeight = turbulenceTextureSize;
        const renderTarget = new THREE.WebGLRenderTarget(texWidth, texHeight, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat, // rg: noise, ba: slope for align's rotation
            type: THREE.HalfFloatType,
            wrapS: THREE.MirroredRepeatWrapping,
            wrapT: THREE.MirroredRepeatWrapping,
            generateMipmaps: false,
        });
        
        // create scene for rendering
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                resolution: { value: new THREE.Vector2(texWidth, texHeight) },
                turbulenceScale: { value: turbulenceSize },
                aspectRatio: { value: texWidth / texHeight },
                seed: { value: Math.random() * 1000 },
            },
            vertexShader: turbulenceVertexShader,
            fragmentShader: turbulenceFragmentShader,
        });
        const quad = new THREE.Mesh(geometry, material);
        scene.add(quad);

        // render to texture
        const originalTarget = renderer.getRenderTarget();
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        renderer.setRenderTarget(originalTarget);
        
        // cleanup
        geometry.dispose();
        material.dispose();
        scene.remove(quad);
        resolve(renderTarget.texture);
    });
}



// show turbulence texture fullscreen
function createTurbulenceDebug(turbulenceTexture) {
    const debugMaterial = new THREE.ShaderMaterial({
        uniforms: {
            turbulenceTex: { value: turbulenceTexture },
        },
        vertexShader: debugTurbulenceVertexShader,
        fragmentShader: debugTurbulenceFragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
    });
    const debugQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), debugMaterial);
    debugQuad.frustumCulled = false;
    return debugQuad;
}