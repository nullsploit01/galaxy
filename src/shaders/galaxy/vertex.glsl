uniform float uSize;
uniform float uTime;
uniform float uIsPortal;
uniform float uIsCollapsing;

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
    else if (uIsCollapsing > 0.5)
    {
        float collapseSpeed = 0.4;
        float explosionSpeed = 2.0;

        float shrink = max(0.0, 1.0 - uTime * collapseSpeed * 0.1);

        float explosionStart = 0.2; 
        float explosionTime = max(0.0, uTime - (1.0 - explosionStart) / (collapseSpeed * 0.1));
        float expand = explosionTime * explosionSpeed;

        float swirlSpeed = 3.0 + (1.0 - shrink) * 5.0;
        float swirlAngle = angle + uTime * swirlSpeed;

        float radius = distanceToCenter;

        if (shrink > explosionStart)
        {
            float inwardDistance = radius * shrink;

            modelPosition.x = cos(swirlAngle) * inwardDistance;
            modelPosition.z = sin(swirlAngle) * inwardDistance;

            float chaos = (1.0 - shrink) * 0.1;
            modelPosition.x += aRandomness.x * chaos * sin(uTime * 20.0);
            modelPosition.y += aRandomness.y * chaos * cos(uTime * 20.0);
            modelPosition.z += aRandomness.z * chaos * sin(uTime * 20.0);
        }
        else
        {
            float outwardDistance = radius * expand;

            modelPosition.x = cos(swirlAngle) * outwardDistance;
            modelPosition.z = sin(swirlAngle) * outwardDistance;

            modelPosition.y /= aRandomness.y * (0.5 + 0.5 * sin(uTime * 5.0)) * expand * 0.1;
        }
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