import { useFullscreen } from '../hooks/use-full-screen';
import Controls from './Controls';
import Galaxy from './Galaxy';
import Stars from './Stars';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const CanvasWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode') || 'galaxy';
  const containerRef = useFullscreen<HTMLDivElement>();

  const handleSelectMode = (mode: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('mode', mode);
    window.location.href = newUrl.toString();
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
