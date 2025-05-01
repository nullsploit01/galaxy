uniform float uTime;
uniform float uIsPortal;
uniform float uIsCollapsing;

varying vec3 vColor;

void main()
{
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 4.0);

    vec3 baseColor = vColor;

    if (uIsPortal > 0.5) {
        baseColor = mix(baseColor, vec3(0.2, 0.8, 1.0), 0.8);
    }

    if (uIsCollapsing > 0.5) {
        float pulse = 0.5 + 0.5 * sin(uTime * 0.5);
        baseColor = mix(baseColor, vec3(1.0, 0.5, 0.0), pulse); // toward orange-hot
    }

    vec3 color = mix(vec3(0.0), baseColor, strength);
    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}