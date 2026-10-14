// debug turbulence visualizer



uniform sampler2D turbulenceTex;
varying vec2 vUv;

void main() {
    vec4 turbulence = texture2D(turbulenceTex, vUv);
    vec3 color = vec3(turbulence.x, turbulence.y, 0.);
    gl_FragColor = vec4(color, .7);
}
