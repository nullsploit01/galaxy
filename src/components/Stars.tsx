import starsFragmentShader from '../shaders/stars/fragment.glsl';
import starsVertexShader from '../shaders/stars/vertex.glsl';
import { Fragment, useMemo } from 'react';
import { BufferAttribute } from 'three';

const Stars = () => {
  const countPerLayer = 50000;
  const distance = 3000;

  const stars = useMemo(() => {
    const positions = new Float32Array(countPerLayer * 3);
    const scales = new Float32Array(countPerLayer);
    for (let i = 0; i < countPerLayer; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;

      scales[i] = Math.random();
    }

    return {
      bufferAttribute: new BufferAttribute(positions, 3),
      scalesAttribute: new BufferAttribute(scales, 1),
    };
  }, []);

  return (
    <Fragment>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.bufferAttribute.array, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[stars.scalesAttribute.array, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{ uSize: { value: 10 * Math.min(window.devicePixelRatio, 2) } }}
          vertexShader={starsVertexShader}
          fragmentShader={starsFragmentShader}
        />
      </points>
    </Fragment>
  );
};

export default Stars;
