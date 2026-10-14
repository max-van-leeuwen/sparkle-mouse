// Max van Leeuwen

// particles fragment stage



// attributes
uniform sampler2D tex;
uniform float currentTime; // clock
uniform float life; // maximum lifetime
uniform float translucent; // transparency, 0 to 1
varying float dontRender; // > .5 = true
varying float alpha; // 0 to 1 multiplier
varying float lightness; // get fluctuating lightness amount 0 to 1, -1 = unused
varying vec2 vUv; // texture coordinates from vertex shader

uniform bool isActive;

// epsilon
const float EPS = 0.0001;
const float EPS1 = 0.9999;



void main(){

    // don't render tiny or no-scale particles
    if(dontRender > .5){
        discard;
    }

    // texture (premultiplied)
    vec4 texColor = texture2D(tex, vUv);
    if(texColor.a < EPS){
        discard;
    }

    // apply fluctuating lightness to texture (lightness == -1 when unused)
    if(lightness > EPS){
        // brightness
        float lightness2 = lightness * lightness; // cheaper than pow(6.)
        float brightFlash = lightness2 * lightness2 * lightness2; // 0 to 1 bright flash with bias to low end

        // unpremult
        vec3 unpremulted = texColor.rgb / texColor.a;

        // apply brightness
        unpremulted *= 1. + brightFlash * 1.39; // brightness
        unpremulted += brightFlash * .06; // offset

        // premult and clamp
        texColor.rgb = clamp(unpremulted, 0., 1.) * texColor.a;
    }

    // transparency
    texColor *= alpha * translucent;
    
    // // debugging active mesh visualizer (alternatingMeshes==true)
    // if(!isActive){ // make red
    //     texColor.g = 0.;
    //     texColor.b = 0.;
    // }

    // set color
    gl_FragColor = texColor;
}