import { Fragment, useMemo } from 'react';
import { BufferAttribute } from 'three';

const Stars = () => {
  const countPerLayer = 50000;
  const distance = 500;

  const stars = useMemo(() => {
    const positions = new Float32Array(countPerLayer * 3);
    for (let i = 0; i < countPerLayer; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;
    }

    return {
      bufferAttribute: new BufferAttribute(positions, 3),
    };
  }, []);

  return (
    <Fragment>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.bufferAttribute.array, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
          transparent={true}
          opacity={0.5}
        />
      </points>
    </Fragment>
  );
};

export default Stars;
