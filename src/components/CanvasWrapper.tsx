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
      <Canvas>
        <Stars />
        <Galaxy />
        <Stats />
        <OrbitControls />
      </Canvas>
      <Controls onSelect={handleSelectMode} />
    </div>
  );
};

export default CanvasWrapper;
