precision mediump float;
uniform sampler2D uColorTexture;
uniform float uOpacity;
varying vec2 vUv;
void main()
{
    float strength = 0.50 - distance(vUv, vec2(0.5));
    float radialFade = clamp(strength * 7.0, 0.0, 20.0);
    vec4 textureColor = texture2D(uColorTexture, vUv);
    float finalAlpha = textureColor.a * uOpacity * radialFade;
    
    gl_FragColor = vec4(textureColor.rgb * finalAlpha, finalAlpha);
}