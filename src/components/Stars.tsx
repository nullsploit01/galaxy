import { useLoader } from '@react-three/fiber';
import { Fragment, useMemo } from 'react';
import { AdditiveBlending, BufferAttribute, TextureLoader } from 'three';

const Stars = () => {
  const textures = useLoader(
    TextureLoader,
    Array.from({ length: 10 }, (_, i) => `./textures/star/star${i + 1}.webp`),
  );

  const countPerLayer = 50000;
  const distance = 500;

  // Generate 10 star layers (one per texture)
  const stars = useMemo(() => {
    return textures.map((texture, index) => {
      const positions = new Float32Array(countPerLayer * 3);
      for (let i = 0; i < countPerLayer; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * distance;
        positions[i3 + 1] = (Math.random() - 0.5) * distance;
        positions[i3 + 2] = (Math.random() - 0.5) * distance;
      }

      return {
        key: `star-layer-${index}`,
        texture,
        bufferAttribute: new BufferAttribute(positions, 3),
      };
    });
  }, [textures]);

  return (
    <Fragment>
      {stars.map(({ key, texture, bufferAttribute }) => (
        <points key={key}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[bufferAttribute.array, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={texture}
            size={1}
            sizeAttenuation
            depthWrite={false}
            transparent
            alphaTest={0.5}
            blending={AdditiveBlending}
          />
        </points>
      ))}
    </Fragment>
  );
};

export default Stars;
