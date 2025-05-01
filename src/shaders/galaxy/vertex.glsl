uniform float uSize;
uniform float uTime;
uniform float uIsPortal;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;

    angle += angleOffset;

    if(uIsPortal > 0.5)
    {
        modelPosition.x = cos(angle );
        modelPosition.z = sin(angle );

        modelPosition.x += aRandomness.x * 0.01;
        modelPosition.y += aRandomness.y * 0.01;
        modelPosition.z += aRandomness.z * 0.01;
    }
    else
    {
        modelPosition.x = cos(angle ) * distanceToCenter ;
        modelPosition.z = sin(angle ) * distanceToCenter;

        modelPosition.x += aRandomness.x;
        modelPosition.y += aRandomness.y;
        modelPosition.z += aRandomness.z;
    }

    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale;
    gl_PointSize *= ( 1.0 / - viewPosition.z );

    vColor = color;
}