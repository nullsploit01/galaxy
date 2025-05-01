uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute float aPhase;

varying float vTwinkle;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z); // for depth write effect

    vTwinkle = 0.5 + (0.5 * sin(uTime * 2.0 + aPhase));
}