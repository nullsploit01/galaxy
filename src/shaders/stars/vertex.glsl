uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute float aPhase;
attribute float aTwinkleFactor;

varying float vTwinkle;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale;
    gl_PointSize = (1.0 / - viewPosition.z); 

    float slowWave = sin(uTime * 0.5 + aPhase);
    float fastWave = sin(uTime * 2.0 + aPhase * 1.5);

    float twinkleRaw = (slowWave + fastWave) * 0.5; 
    twinkleRaw = (twinkleRaw + 1.0) * 0.5;

    vTwinkle = 0.5 + twinkleRaw * aTwinkleFactor;
}