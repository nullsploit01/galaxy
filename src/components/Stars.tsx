import starsFragmentShader from '../shaders/stars/fragment.glsl';
import starsVertexShader from '../shaders/stars/vertex.glsl';
import { useFrame } from '@react-three/fiber';
import { Fragment, useMemo, useRef } from 'react';
import { BufferAttribute, ShaderMaterial } from 'three';

const Stars = () => {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime % 10;
    }
  });

  const countPerLayer = 20000;
  const distance = 500;

  const stars = useMemo(() => {
    const positions = new Float32Array(countPerLayer * 3);
    const scales = new Float32Array(countPerLayer);
    const phases = new Float32Array(countPerLayer);

    for (let i = 0; i < countPerLayer; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;

      scales[i] = Math.random();
      phases[i] = Math.random() * Math.PI * 2;
    }

    return {
      bufferAttribute: new BufferAttribute(positions, 3),
      scalesAttribute: new BufferAttribute(scales, 1),
      phasesAttribute: new BufferAttribute(phases, 1),
    };
  }, []);

  return (
    <Fragment>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.bufferAttribute.array, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[stars.scalesAttribute.array, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[stars.phasesAttribute.array, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            uSize: { value: 10 * Math.min(window.devicePixelRatio, 2) },
            uTime: { value: 0 },
          }}
          needsUpdate={true}
          vertexShader={starsVertexShader}
          fragmentShader={starsFragmentShader}
        />
      </points>
    </Fragment>
  );
};

export default Stars;
