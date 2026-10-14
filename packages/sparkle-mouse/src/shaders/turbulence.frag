// turbulence fragment



uniform vec2 resolution;
uniform float turbulenceScale;
uniform float aspectRatio;
uniform float seed;
varying vec2 vUv;

// 2D Simplex Noise (within [-1, 1]) by Ken Perlin, implemented by Ian McEwan, Ashima Arts.
// snoiseGrad returns the noise value together with its slope
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
vec3 snoiseGrad(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m1 = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    vec3 m4raw = m1*m1; m4raw = m4raw*m4raw; // m1^4, before the hash-based normalization below
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    vec3 norm = 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h); // norm only depends on which corner you're near, not on exact position
    vec3 M = m4raw * norm; // M_k = m1_k^4 * norm_k, matches original snoise()'s "m" after normalization
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    float value = 130.0 * dot(M, g);

    vec3 m1cubed = m1*m1*m1;
    vec3 nm1c = norm * m1cubed;
    vec2 gradient = -8.0 * (nm1c.x * g.x * x0 + nm1c.y * g.y * x12.xy + nm1c.z * g.z * x12.zw)
                  + M.x * vec2(a0.x, h.x) + M.y * vec2(a0.y, h.y) + M.z * vec2(a0.z, h.z);
    gradient *= 130.0;
    return vec3(gradient, value);
}

void main() {
    // each texture row is an independently seeded 1D noise track
    float rowIndex = floor(vUv.y * resolution.y);
    float rowSeed = rowIndex * 52.97 + seed; // random number
    float u = vUv.x * aspectRatio * turbulenceScale + seed;
    vec2 coord = vec2(u, rowSeed);

    // 1st (value range unchanged from before: -0.875, 0.875)
    vec3 g1X = snoiseGrad(coord * 1.);
    vec3 g2X = snoiseGrad(coord * 2. + vec2(100.));
    vec3 g4X = snoiseGrad(coord * 4. + vec2(200.));
    float turb1X = g1X.z * .5 + g2X.z * .25 + g4X.z * .125;
    float turb1X_du = g1X.x * 1. * .5 + g2X.x * 2. * .25 + g4X.x * 4. * .125;

    vec3 g1Y = snoiseGrad(coord * 1. + vec2(50.));
    vec3 g2Y = snoiseGrad(coord * 2. + vec2(150.));
    vec3 g4Y = snoiseGrad(coord * 4. + vec2(250.));
    float turb1Y = g1Y.z * .5 + g2Y.z * .25 + g4Y.z * .125;
    float turb1Y_du = g1Y.x * 1. * .5 + g2Y.x * 2. * .25 + g4Y.x * 4. * .125;

    // 2nd
    vec3 h1X = snoiseGrad(coord * 1. + vec2(300.));
    vec3 h2X = snoiseGrad(coord * 2. + vec2(400.));
    vec3 h4X = snoiseGrad(coord * 4. + vec2(500.));
    float turb2X = h1X.z * .5 + h2X.z * .25 + h4X.z * .125;
    float turb2X_du = h1X.x * 1. * .5 + h2X.x * 2. * .25 + h4X.x * 4. * .125;

    vec3 h1Y = snoiseGrad(coord * 1. + vec2(350.));
    vec3 h2Y = snoiseGrad(coord * 2. + vec2(450.));
    vec3 h4Y = snoiseGrad(coord * 4. + vec2(550.));
    float turb2Y = h1Y.z * .5 + h2Y.z * .25 + h4Y.z * .125;
    float turb2Y_du = h1Y.x * 1. * .5 + h2Y.x * 2. * .25 + h4Y.x * 4. * .125;

    // multiplied (-.765625, .765625)
    float noiseX = turb1X * turb2X;
    float noiseX_du = turb1X_du * turb2X + turb1X * turb2X_du;
    float noiseY = turb1Y * turb2Y;
    float noiseY_du = turb1Y_du * turb2Y + turb1Y * turb2Y_du;

    // large-scale noise for low-freq motion variation
    vec3 largeX = snoiseGrad(coord * .25 + vec2(600.));
    vec3 largeY = snoiseGrad(coord * .25 + vec2(650.));

    // combine with large noise (-1, 1)
    noiseX += largeX.z * .234375;
    noiseX_du += largeX.x * .25 * .234375;
    noiseY += largeY.z * .234375;
    noiseY_du += largeY.x * .25 * .234375;

    // rescale slope back to texture UV space
    float duDvUv = aspectRatio * turbulenceScale;
    noiseX_du *= duDvUv;
    noiseY_du *= duDvUv;

    gl_FragColor = vec4(noiseX * .5 + .5, noiseY * .5 + .5, noiseX_du, noiseY_du);
}
