import { useMemo } from 'react';
import { BufferAttribute } from 'three';

const Stars = () => {
  const count = 100000;
  const distance = 1000;
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3 + 0] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;
    }

    return new BufferAttribute(positions, 3);
  }, []);

  return (
    <points>
      <bufferGeometry>
        {/* <bufferAttribute attach="attributes-position" {...points} /> */}
        <bufferAttribute attach="attributes-position" args={[points.array, 3]} />
      </bufferGeometry>
      <pointsMaterial
        needsUpdate
        transparent
        color="white"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={true}
      />
    </points>
  );
};

export default Stars;
