// Max van Leeuwen

// particles vertex stage



attribute vec3 instancePosition; // per-instance position
attribute float startTime; // this particle's spawn time (once per cycle, -1 when unused)
attribute vec4 randValues; // pre-computed random values (0-1, normalized Uint8)
attribute vec2 quadCoord; // quad coordinates (-.5 to .5 for each vertex) - per-vertex, shared across instances
uniform float currentTime; // clock
uniform float deltaTime; // frame delta time (s)
uniform float aspectRatio; // width/height ratio for texture
uniform float life; // maximum lifetime
uniform bool grow; // particle scale-in animation duration (0-.25x)
uniform bool shrink; // scale-out anim
uniform bool fade; // fade anim
uniform float size; // overall particle scale
uniform bool randomizeSizeLifeTime; // randomize size and lifetime
uniform float bouncySpeed; // fluctuating size speed (-1 if unused)
uniform float glitterySpeed; // fluctuating lightness speed (-1 if unused)
uniform float gravity; // falling
uniform float outwards; // flying away from start, random direction
uniform float spinning; // spinning
uniform bool align; // align particles with velocity direction
uniform bool flip; // flip texture horizontally when moving left
uniform sampler2D turbulenceTex; // turbulence texture: rg = noise value, ba = baked d/du derivative
uniform float turbulenceTexHeight; // turbulence texture height in texels (for row-snapping)
uniform float turbulenceStrength; // turbulence strength
uniform float glide; // flying away horizontally
uniform float imageCount; // sprite sheet texture count
uniform bool fromStart; // if playing sequence from start instead of random frames (for GIFs)
uniform float speed; // fps, can be 0
uniform bool randomizeLifeTime; // allow randomization of lifetime
uniform float spriteCols; // pre-calculated sprite sheet columns
uniform float spriteRows; // pre-calculated sprite sheet rows
uniform vec2 spriteCellSize; // pre-calculated cell size (1/cols, 1/rows)
uniform float fileCount; // number of separate images/GIFs
uniform float imageStarts[128]; // start index for each file (max 64 files)
uniform float imageCounts[128]; // frame count for each file
uniform float imageCycles[128]; // cycle count for each file (0 = infinite)
uniform bool isFlipbook; // true if all files have 1 frame (flipbook mode), false otherwise

// send to fragment stage
varying float dontRender; // skip rendering this particle
varying float alpha; // transparency
varying float lightness; // lightness of particle
varying vec2 vUv; // texture coordinates for fragment shader

// params
const float idealInTime = .17; // scaling and fading time (s)
const float inset = 0.005; // tiny uv inset to prevent edge bleeding

const float EPS = 0.0001; // epsilon >0
const float EPS1 = 0.9999; // epsilon <1
const float EPS11 = 1.0001; // epsilon >1
const float PI2 = 6.2831853; // PI*2



// helpers


    // simple remap function (clamped)
    float remap(float value, float minSrc, float maxSrc, float minDst, float maxDst){
        float result = minDst + (value - minSrc) * (maxDst - minDst) / (maxSrc - minSrc);
        return clamp(result, min(minDst, maxDst), max(minDst, maxDst));
    }

    // derive new random value from vec4 of randoms using an index
    float deriveRandom(float index){
        vec4 p = randValues * 127.1;
        p.xyz += index * vec3(1.0, 1.3, 1.7);
        p.w += startTime * 0.1;
        return fract(p.x * p.y + p.z * p.w);
    }

    // cubic ease-out curve (starts fast, ends slow)
    float easeOutCubic(float t){
        float a = 1. - t;
        return 1. - a * a * a;
    }

    // mod/div for whole numbers stored as floats
    // plain mod(x, y) = x - y*floor(x/y) can return y itself when the GPU rounds x/y a hair below a whole number
    float intDiv(float x, float y){
        return floor((x + .5) / y);
    }
    float intMod(float x, float y){
        return x - intDiv(x, y) * y;
    }



void main(){

    // age

        // get lifetime
        float lifeTime = life; // maximum lifetime
        if(randomizeLifeTime && randomizeSizeLifeTime) lifeTime *= remap(deriveRandom(7.), 0., 1., .5, 1.); // randomized lifetime
        float isActive = step(0., startTime); // 0 if startTime < 0, 1 if startTime >= 0
        float age = mix(0., currentTime-startTime, isActive); // time since particles start (s)
        float t = age/lifeTime; // lifetime ratio (0-1)

        // alive check
        dontRender = step(1., t) + step(t, EPS); // 1 if dead, 0 if alive
        if(dontRender > 0.5){
            gl_Position = vec4(0., 0., 0., 0.);
            return;
        }

        // dynamic inTime
        float halfLifeTime = lifeTime * .5;
        float inTime = min(halfLifeTime, idealInTime); // inTime should not be longer than half of lifeTime, prevents out-anim glitches (only relevant for very short-lived particles)

    // position

        // velocity tracking
        vec2 velocity = vec2(0., 0.);
        float glideDirection = 0.; // store glide direction for flip persistence

        // derive random size
        float decodedRandSize = mix(1., mix(.75, 1.25, deriveRandom(8.)), float(randomizeSizeLifeTime));

        // horizontal fly-away
        float hor = 0.;
        if(glide > EPS){
            glideDirection = remap(deriveRandom(9.), 0., 1., -glide, glide); // random horizontal direction on spawn
            float a = 1. - min(age*.7, 1.); // cheaper than pow
            float horMultiplier = (1. - a*a*a) * 1.5; // imitating a horizontal force on spawn
            hor = glideDirection * horMultiplier;
            
            // derivative for velocity
            if((align || flip) && age < 1.43){ // a = 0 when age*.7 >= 1, so at age=1.43 this calculation is not needed
                velocity.x += glideDirection * 1.5 * 3. * a * a * 0.7;
            }
        }

        // down
        float downForce = 0.;
        if(abs(gravity) > EPS){
            downForce = -age*age*gravity - age*gravity*.4*remap(decodedRandSize, .5, 1., 1., 2.); // stylized gravity, larger particles fall faster
            
            // derivative for velocity
            if((align || flip)){
                velocity.y += -2. * age * gravity - gravity * .4 * remap(decodedRandSize, .5, 1., 1., 2.);
            }
        }

        // outwards
        vec2 outwardsOffset = vec2(0., 0.);
        if(outwards > EPS){
            float outwardsAngle = deriveRandom(10.) * PI2; // rad
            float outwardsSpeed = deriveRandom(11.)*.5+.5; // different speeds (.5-1x)
            
            // calculate accumulated distance with decreasing speed over time (100% to 30%)
            float accumulatedDistance = t - .35 * t * t; // integral of speed(t) = 1-.7t
            outwardsOffset = vec2(cos(outwardsAngle), sin(outwardsAngle)) * accumulatedDistance * outwards * outwardsSpeed * lifeTime;
            
            // derivative for velocity
            if((align || flip)){
                float velocityMagnitude = (1. - .7 * t) * outwards * outwardsSpeed;
                velocity += vec2(cos(outwardsAngle), sin(outwardsAngle)) * velocityMagnitude;
            }
        }

    // size

        // in/out scaling
        float outDelayRange = remap(lifeTime, .29, life, .3, .56); // the longer the particle lives, the more its out-animation is delayed
        float outDelay = (lifeTime-inTime) * (lifeTime < .29 ? 0. : outDelayRange); // delay within available out-anim, none when lifetime is too short
        float particleGrowShrinkScale = grow ? clamp(age/inTime, 0., 1.) : 1.; // scale-in (0-1x mult)
        float scaleOut = remap(age, inTime + outDelay, lifeTime, 1., 0.);
        if(shrink){
            particleGrowShrinkScale *= scaleOut; // scale-out starts when inTime is over
        }
        particleGrowShrinkScale = smoothstep(0., 1., particleGrowShrinkScale); // smooth curve

        // bouncy / fluctuating scale
        float fluctuatingSize = 1.;
        if(bouncySpeed > -.5){
            float a = 1.-scaleOut; // cheaper than pow
            float scaleOutReduce = shrink ? (1.-a*a) : 1.; // multiplier to reduce bounciness on scale-out
            float bouncyRand = deriveRandom(0.);
            float bouncyStrength = sin( age*bouncySpeed + bouncyRand*6.) * scaleOutReduce; // bounciness
            float bouncyAmount = remap(lifeTime, .7, 1.6, .8, .42); // stronger bouncyness on shorter lifetimes (in both directions max = 1)
            fluctuatingSize = remap(bouncyStrength, -1., 1., 1.-bouncyAmount, 1.+bouncyAmount); // particle scale multiplier
        }

        // final scale (multiply quad vtx positions instead of using gl_pointSize because of varying limits for ALIASED_POINT_SIZE_RANGE)
        float finalScale = decodedRandSize * size * particleGrowShrinkScale * fluctuatingSize;
            
        // turbulence displacement
        vec2 turbulenceOffset = vec2(0., 0.);
        if(turbulenceStrength > EPS){
            float turbulenceMagnitude = remap(turbulenceStrength, 0., .5, .3, 1.); // the turbulence magnitude is determined by the first half of the slider
            float turbulenceSpeed = remap(turbulenceStrength, .25, 1., .005, .03); // the speed is not affected in the first 25% of the slider
            float scaledTurbulenceMagnitude = turbulenceMagnitude * remap(size, 0., 1., .8, 2.7); // turbulence magnitude is smaller for smaller particles

            // particles scroll horizontally through one of the rows in the turbulence texture
            float rowIndex = floor(deriveRandom(15.) * turbulenceTexHeight);
            float rowV = (rowIndex + 0.5) / turbulenceTexHeight;
            float screenU = instancePosition.x + deriveRandom(13.);

            vec2 startOffset = texture2D(turbulenceTex, vec2(screenU, rowV)).rg;
            screenU += age * turbulenceSpeed;
            vec4 turbulenceSample = texture2D(turbulenceTex, vec2(screenU, rowV));
            turbulenceOffset = (turbulenceSample.rg - startOffset) * (2. * scaledTurbulenceMagnitude);

            // flip slope when mirrored
            float turbulenceTile = floor(screenU);
            bool turbulenceMirrored = intMod(turbulenceTile, 2.) > 0.5;
            float mirrorSign = turbulenceMirrored ? -1. : 1.;

            // .ba is velocity
            if((align || flip)){
                vec2 turbulenceVelocity = turbulenceSample.ba * mirrorSign * turbulenceSpeed * scaledTurbulenceMagnitude;
                velocity += turbulenceVelocity;
            }
        }

        float totalRotation = 0.;
        
        // rotation follows velocity
        if(align){
            vec2 rotationVelocity = velocity;
            
            // when glide is the only horizontal motion, preserve glide direction when horizontal velocity becomes 0
            if(glide > EPS && turbulenceStrength < EPS && outwards < EPS && abs(velocity.x) < EPS){
                rotationVelocity.x = glideDirection;
            }
            
            if(length(rotationVelocity) > EPS){
                totalRotation += atan(rotationVelocity.y, rotationVelocity.x) - 1.571; // -pi/2, up = 0 degrees
            }
        }
        
        // spinning rotation
        if(!align && !flip && spinning > EPS){
            float spinRand1 = deriveRandom(1.);
            float spinRand2 = deriveRandom(2.);
            float spinRand3 = deriveRandom(3.);
            
            float spinSpeed = spinRand1*.5+.5; // [.5 - 1]
            float flipDirection = step(spinRand2, .5); // 1 if flip, 0 if not
            spinSpeed = mix(spinSpeed, -spinSpeed, flipDirection); // [-1 - -.5] | [.5 - 1]

            // accumulated rotation with decreasing speed over time
            float accumulatedRotation = t - 0.4 * t * t; // integral of speed(t) = 1-.8t, because spinning speed goes from 100%-20% over lifetime
            totalRotation += ( spinRand3 * PI2) + (accumulatedRotation * spinning * spinSpeed * lifeTime);
        }
            
        vec2 adjustedQuadCoord = vec2(quadCoord.x * aspectRatio, quadCoord.y); // aspect ratio
        vec2 rotatedQuadCoord = adjustedQuadCoord;
        
        // mesh rotation
        if(abs(totalRotation) > EPS){
            float cosAngle = cos(totalRotation);
            float sinAngle = sin(totalRotation);
            rotatedQuadCoord = vec2(
                adjustedQuadCoord.x * cosAngle - adjustedQuadCoord.y * sinAngle,
                adjustedQuadCoord.x * sinAngle + adjustedQuadCoord.y * cosAngle
            );
        }
            
        // expand quad in world space
        vec3 particlePosition = vec3(
            instancePosition.x + hor + outwardsOffset.x + turbulenceOffset.x,
            instancePosition.y + downForce + outwardsOffset.y + turbulenceOffset.y,
            instancePosition.z
        );
        particlePosition.xy += rotatedQuadCoord * finalScale;
            
        // set projected position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(particlePosition, 1.);

    // color

        // lightness
        lightness = -1.; // -1 when unused
        if(glitterySpeed > -.5){
            float glitteryRand = deriveRandom(4.);
            lightness = sin( age*glitterySpeed + glitteryRand*6. )*.5+.5; // fluctuating lightness between 0 to 1
        }

        // transparency
        alpha = 1.;
        if(fade){
            // fade-in when not scaling in, or when both grow and shrink
            float doFadeIn = (!grow || (grow && shrink)) ? 1. : 0.;
            float fadeIn = remap(age, 0., inTime, 0., 1.);
            alpha = mix(alpha, fadeIn, doFadeIn);

            // fade-out when not scaling out, or when both grow and shrink
            float doFadeOut = (!shrink || (grow && shrink)) ? 1. : 0.;
            float fadeOut = remap(age, inTime + outDelay, lifeTime, 1., 0.);
            alpha *= mix(1., fadeOut, doFadeOut);

            alpha = smoothstep(0., 1., alpha);
        }

        // coords
        if(imageCount > EPS11){ // if multiple images in sprite sheet

            // use pre-calculated grid values from uniforms
            float spriteRand1 = deriveRandom(5.);
            float spriteRand2 = deriveRandom(6.);
            
            // multi-image, each particle picks a random file and animates within it
            if(fileCount > 1. && !isFlipbook) {
                // pick a random file index
                float fileIndexFloat = floor(spriteRand1 * fileCount);
                fileIndexFloat = min(fileIndexFloat, fileCount - 1.); // clamp to valid range
                int fileIndex = int(fileIndexFloat);
                
                // get file frame range
                float fileStart = imageStarts[fileIndex];
                float fileFrameCount = imageCounts[fileIndex];
                float fileCycles = imageCycles[fileIndex];
                
                // animate through frames based on speed
                float hasSpeed = step(EPS, speed);
                
                // determine random starting frame offset within range (0 - fileFrameCount-1)
                // only start at 0 if fromStart is true and speed > 0 (for GIF playback)
                float shouldStartAtZero = fromStart ? hasSpeed : 0.;
                float randomStartOffset = mix(min(floor(deriveRandom(17.) * fileFrameCount), fileFrameCount - 1.), 0., shouldStartAtZero);
                
                float frameOffset = mix(0., floor(age * speed + spriteRand2), hasSpeed);
                
                // add random start offset to animation
                float totalFrameOffset = frameOffset + randomStartOffset;
                
                // apply loop count for this file
                float maxFrames = fileCycles * fileFrameCount;
                float infiniteLoop = intMod(totalFrameOffset, fileFrameCount); // wrap around within file frames
                float finiteLoop = min(totalFrameOffset, maxFrames - 1.); // clamp to last frame of all cycles
                float isInfinite = step(fileCycles, EPS);
                float localFrameIndex = mix(intMod(finiteLoop, fileFrameCount), infiniteLoop, isInfinite);
                localFrameIndex = clamp(localFrameIndex, 0., fileFrameCount - 1.); // never leave this file's range
                float spriteIndex = fileStart + localFrameIndex; // sprite index in sprite sheet
                float row = intDiv(spriteIndex, spriteCols);
                float col = spriteIndex - row * spriteCols;
                
                vec2 cellOffset = vec2(col * spriteCellSize.x, (spriteRows - 1. - row) * spriteCellSize.y);
                vec2 localUv = quadCoord + .5;
                
                // flip horizontally when moving left
                float flipDecision = velocity.x;
                if(glide > EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = glideDirection; // use glide direction if only gliding
                } else if(abs(velocity.x) < EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = deriveRandom(18.) - 0.5; // no motion, randomly flip for variation
                }
                if(flip && flipDecision < -EPS){
                    localUv.x = 1. - localUv.x;
                }
                
                // inset UVs to prevent sampling neighboring frames
                vec2 insetLocalUv = mix(vec2(inset), vec2(1. - inset), localUv);
                
                vUv = cellOffset + insetLocalUv * spriteCellSize;
                
            // flipbook, cycle through all frames
            } else {
                // animate through frames based on speed
                float hasSpeed = step(EPS, speed);
                
                // pick starting frame: only start at 0 if fromStart is true and speed > 0 (for GIF playback)
                float shouldStartAtZero = fromStart ? hasSpeed : 0.;
                float startIndex = mix(min(floor(spriteRand1 * imageCount), imageCount - 1.), 0., shouldStartAtZero); // random frame (clamped) or 0
                
                float frameOffset = mix(0., floor(age * speed + spriteRand2), hasSpeed);
                float fileCycles = imageCycles[0];
                float maxFrames = fileCycles * imageCount;
                float infiniteLoop = intMod(startIndex + frameOffset, imageCount);
                float finiteLoop = min(startIndex + frameOffset, maxFrames - 1.);
                float isInfinite = step(fileCycles, EPS);
                float spriteIndex = mix(intMod(finiteLoop, imageCount), infiniteLoop, isInfinite);
                spriteIndex = clamp(spriteIndex, 0., imageCount - 1.); // stay on the sheet
                float row = intDiv(spriteIndex, spriteCols);
                float col = spriteIndex - row * spriteCols;
                
                vec2 cellOffset = vec2(col * spriteCellSize.x, (spriteRows - 1. - row) * spriteCellSize.y);
                vec2 localUv = quadCoord + .5;
                
                // flip horizontally when moving left
                float flipDecision = velocity.x;
                if(glide > EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = glideDirection; // use glide direction if only gliding
                } else if(abs(velocity.x) < EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = deriveRandom(18.) - 0.5; // no motion, randomly flip for variation
                }
                if(flip && flipDecision < -EPS){
                    localUv.x = 1. - localUv.x;
                }
                
                // inset UVs to prevent sampling from neighboring frames
                vec2 insetLocalUv = mix(vec2(inset), vec2(1. - inset), localUv);
                
                vUv = cellOffset + insetLocalUv * spriteCellSize;
            }

        }else{ // if only one image in sprite sheet
        
            // convert quad coordinates (-.5 to .5) to texture coordinates (0 to 1)
            vUv = quadCoord + .5;
            
            // flip horizontally when moving left
            float flipDecision = velocity.x;
            if(glide > EPS && turbulenceStrength < EPS && outwards < EPS){
                flipDecision = glideDirection; // use glide direction if only gliding
            } else if(abs(velocity.x) < EPS && turbulenceStrength < EPS && outwards < EPS){
                flipDecision = deriveRandom(18.) - 0.5; // no motion, randomly flip for variation
            }
            if(flip && flipDecision < -EPS){
                vUv.x = 1. - vUv.x;
            }
        }
}