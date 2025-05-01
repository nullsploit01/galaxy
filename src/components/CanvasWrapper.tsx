import { useFullscreen } from '../hooks/use-full-screen';
import Controls from './Controls';
import Galaxy from './Galaxy';
import Stars from './Stars';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
  const containerRef = useFullscreen<HTMLDivElement>();
  const handleSelectMode = (mode: string) => {
    console.log('Selected mode:', mode);
  };

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        camera={{
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 100,
          position: [3, 3, 3],
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Stars />
        <Galaxy />
        <Stats />
        <OrbitControls enableDamping />
      </Canvas>
      <Controls onSelect={handleSelectMode} />
    </div>
  );
};

export default CanvasWrapper;
