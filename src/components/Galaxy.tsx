import galaxyFragmentShader from '../shaders/galaxy/fragment.glsl';
import galaxyVertexShader from '../shaders/galaxy/vertex.glsl';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { BufferAttribute, Color, ShaderMaterial, Vector3 } from 'three';

interface GalaxyProps {
  count?: number;
  rad?: number;
  radiusPower?: number;
  branches?: number;
  spin?: number;
  randomness?: number;
  randomnessPower?: number;
  insideColor?: string;
  outsideColor?: string;
  position?: Vector3;
  rotationSpeed?: 0.001;
}

const Galaxy: React.FC<GalaxyProps> = ({
  count = 100000,
  rad = 5,
  radiusPower = 3,
  branches = 6,
  spin = 1,
  randomness = 0.5,
  randomnessPower = 3,
  insideColor = '#ff6030',
  outsideColor = '#1b3984',
  position = new Vector3(0, 0, 0),
}) => {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomnessArray = new Float32Array(count * 3);
    const mixedColors = new Float32Array(count * 3);

    const colorInside = new Color(insideColor);
    const colorOutside = new Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), radiusPower) * rad;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;

      const i3 = i * 3;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / rad);
      mixedColors[i3 + 0] = mixedColor.r;
      mixedColors[i3 + 1] = mixedColor.g;
      mixedColors[i3 + 2] = mixedColor.b;

      randomnessArray[i] = randomX;
      randomnessArray[i + 1] = randomY;
      randomnessArray[i + 2] = randomZ;

      scales[i] = Math.random();
    }

    return {
      position: new BufferAttribute(positions, 3),
      color: new BufferAttribute(mixedColors, 3),
      scale: new BufferAttribute(scales, 1),
      randomnessArray: new BufferAttribute(randomnessArray, 3),
    };
  }, []);

  return (
    <mesh position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.position.array, 3]} />
          <bufferAttribute attach="attributes-color" args={[points.color.array, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[points.scale.array, 1]} />
          <bufferAttribute
            attach="attributes-aRandomness"
            args={[points.randomnessArray.array, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          needsUpdate
          depthWrite={false}
          vertexColors
          vertexShader={galaxyVertexShader}
          fragmentShader={galaxyFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uSize: { value: 10 * Math.min(window.devicePixelRatio, 2) },
          }}
        />
      </points>
    </mesh>
  );
};

export default Galaxy;
