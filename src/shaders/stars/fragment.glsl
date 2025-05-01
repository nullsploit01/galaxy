varying float vTwinkle;

void main()
{
    vec3 baseColor = vec3(0.8, 0.9, 1.0); 

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.4, 0.5, distanceToCenter);

    float twinkle = clamp(vTwinkle, 0.3, 1.5); 

    vec3 finalColor = baseColor * twinkle;

    gl_FragColor = vec4(finalColor, alpha * twinkle);

    #include <colorspace_fragment>
}