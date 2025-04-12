import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { AdditiveBlending, BufferAttribute, TextureLoader } from 'three';

const Stars = () => {
  const starTexture = useLoader(TextureLoader, './textures/star/star.png');
  const count = 500000;
  const distance = 500;
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
        <bufferAttribute attach="attributes-position" args={[points.array, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        size={1}
        sizeAttenuation={true}
        depthWrite={true}
        transparent
        alphaTest={0.5}
        blending={AdditiveBlending}
      />
    </points>
  );
};

export default Stars;
