import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
