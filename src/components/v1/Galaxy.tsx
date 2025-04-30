import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { BufferAttribute, Color, Group, Vector3 } from 'three';

interface GalaxyProps {
  count?: number;
  size?: number;
  rad?: number;
  radiusPower?: number;
  branches?: number;
  spin?: number;
  randomnessPower?: number;
  insideColor?: string;
  outsideColor?: string;
  position?: Vector3;
  rotationSpeed?: 0.001;
}

const Galaxy: React.FC<GalaxyProps> = ({
  count = 100000,
  size = 0.015,
  rad = 6.5,
  radiusPower = 3,
  branches = 7,
  spin = 1,
  randomnessPower = 5,
  insideColor = '#b88c7f',
  outsideColor = 'gray',
  position = new Vector3(0, 0, 0),
  rotationSpeed = 0.001,
}) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), radiusPower) * rad;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

      const i3 = i * 3;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }

    return new BufferAttribute(positions, 3);
  }, []);

  const colors = useMemo(() => {
    const mixedColors = new Float32Array(count * 3);

    const colorInside = new Color(insideColor);
    const colorOutside = new Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), radiusPower) * rad;
      const mixedColor = colorInside.clone().lerp(colorOutside, radius / rad);

      const i3 = i * 3;
      mixedColors[i3 + 0] = mixedColor.r;
      mixedColors[i3 + 1] = mixedColor.g;
      mixedColors[i3 + 2] = mixedColor.b;
    }

    return new BufferAttribute(mixedColors, 3);
  }, []);

  return (
    <mesh ref={groupRef} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points.array, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors.array, 3]} />
        </bufferGeometry>
        <pointsMaterial depthWrite vertexColors sizeAttenuation size={size} color={insideColor} />
      </points>
    </mesh>
  );
};

export default Galaxy;
