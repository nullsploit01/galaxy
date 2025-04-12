import { useMemo } from 'react';
import { BufferAttribute } from 'three';

const Galaxy = () => {
  const parameters = {
    count: 100000,
    size: 0.015,
    radius: 6.5,
    radiusPower: 3,
    branches: 7,
    spin: 1,
    randomness: 0.8,
    randomnessPower: 5,
    insideColor: '#b88c7f',
    outsideColor: '#2e3547',
  };

  const points = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);

    for (let i = 0; i < parameters.count; i++) {
      const radius = Math.pow(Math.random(), parameters.radiusPower) * parameters.radius;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
      const spinAngle = radius * parameters.spin;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

      const i3 = i * 3;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }

    return new BufferAttribute(positions, 3);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points.array, 3]} />
      </bufferGeometry>
      <pointsMaterial
        depthWrite
        transparent
        sizeAttenuation
        size={parameters.size}
        color={parameters.insideColor}
      />
    </points>
  );
};

export default Galaxy;
