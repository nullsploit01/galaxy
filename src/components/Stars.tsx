import starsFragmentShader from '../shaders/stars/fragment.glsl';
import starsVertexShader from '../shaders/stars/vertex.glsl';
import { useFrame } from '@react-three/fiber';
import { Fragment, useMemo, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, ShaderMaterial } from 'three';

const Stars = () => {
  const materialsRef = useRef<ShaderMaterial[]>([]);

  useFrame(({ clock }) => {
    materialsRef.current.forEach((mat) => {
      if (mat) mat.uniforms.uTime.value = clock.elapsedTime % 120;
    });
  });

  const createStars = (count: number, distance: number) => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const twinkleFactors = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;

      scales[i] = Math.random();
      phases[i] = Math.random() * Math.PI * 2;
      twinkleFactors[i] = 0.5 + Math.random();
    }

    return {
      bufferAttribute: new BufferAttribute(positions, 3),
      scalesAttribute: new BufferAttribute(scales, 1),
      phasesAttribute: new BufferAttribute(phases, 1),
      twinkleFactorsAttribute: new BufferAttribute(twinkleFactors, 1),
    };
  };

  const [nearStars, midStars, farStars] = useMemo(() => {
    return [createStars(1500, 1500), createStars(35000, 2500), createStars(55000, 4500)];
  }, []);

  return (
    <Fragment>
      <StarLayer
        stars={nearStars}
        size={20}
        onMaterialRef={(ref) => (materialsRef.current[0] = ref)}
      />
      <StarLayer
        stars={midStars}
        size={10}
        onMaterialRef={(ref) => (materialsRef.current[1] = ref)}
      />
      <StarLayer
        stars={farStars}
        size={5}
        onMaterialRef={(ref) => (materialsRef.current[2] = ref)}
      />
    </Fragment>
  );
};

const StarLayer = ({
  stars,
  size,
  onMaterialRef,
}: {
  stars: any;
  size: number;
  onMaterialRef: (ref: ShaderMaterial) => void;
}) => (
  <points>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[stars.bufferAttribute.array, 3]} />
      <bufferAttribute attach="attributes-aScale" args={[stars.scalesAttribute.array, 1]} />
      <bufferAttribute attach="attributes-aPhase" args={[stars.phasesAttribute.array, 1]} />
      <bufferAttribute
        attach="attributes-aTwinkleFactor"
        args={[stars.twinkleFactorsAttribute.array, 1]}
      />
    </bufferGeometry>
    <shaderMaterial
      ref={(ref) => ref && onMaterialRef(ref)}
      uniforms={{
        uSize: { value: size * Math.min(window.devicePixelRatio, 2) },
        uTime: { value: 0 },
      }}
      vertexShader={starsVertexShader}
      fragmentShader={starsFragmentShader}
      transparent
      depthWrite={false}
      blending={AdditiveBlending}
    />
  </points>
);

export default Stars;
