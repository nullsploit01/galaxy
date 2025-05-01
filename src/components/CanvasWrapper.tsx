import { useFullscreen } from '../hooks/use-full-screen';
import Galaxy from './Galaxy';
import Stars from './Stars';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
  const containerRef = useFullscreen<HTMLDivElement>();

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas>
        <Stars />
        <Galaxy />
        <Stats />
        {/* <CameraController /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
