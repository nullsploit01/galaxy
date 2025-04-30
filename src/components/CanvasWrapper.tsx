import { useFullscreen } from '../hooks/use-full-screen';
import Stars from './Stars';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
  const containerRef = useFullscreen<HTMLDivElement>();

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas>
        <Stars />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
