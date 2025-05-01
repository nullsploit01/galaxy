import { useFullscreen } from '../hooks/use-full-screen';
import Controls from './Controls';
import Galaxy from './Galaxy';
import Stars from './Stars';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

const CanvasWrapper = () => {
  const [mode, setMode] = useState<'galaxy' | 'portal' | 'galaxy collapsing'>('galaxy');

  const containerRef = useFullscreen<HTMLDivElement>();
  const handleSelectMode = (mode: 'galaxy' | 'portal' | 'galaxy collapsing') => {
    setMode(mode);
  };

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        camera={{
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          position: [3, 3, 3],
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Stars />
        <Galaxy isPortal={mode === 'portal'} isCollapsing={mode === 'galaxy collapsing'} />
        <Stats />
        <OrbitControls enableDamping />
      </Canvas>
      <Controls onSelect={handleSelectMode} />
    </div>
  );
};

export default CanvasWrapper;
