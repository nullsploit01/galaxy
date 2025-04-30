import { galaxyColors } from '../../constants/galaxyColors';
import { useFullscreen } from '../../hooks/use-full-screen';
import CameraController from './CameraController';
import Galaxy from './Galaxy';
import Stars from './Stars';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';

const CanvasWrapper = () => {
  const containerRef = useFullscreen<HTMLDivElement>();

  const totalGalaxies = 50;
  const distance = 500;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
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
        {/* Center galaxy */}
        <Galaxy
          key="center"
          count={120000}
          size={0.02}
          rad={5}
          radiusPower={5}
          branches={6}
          spin={1.2}
          randomnessPower={5}
          insideColor="#fff"
          outsideColor="#555"
          position={new Vector3(0, 0, 0)}
        />

        {[...Array(totalGalaxies)].map((_, i) => {
          const colorCombo = galaxyColors[i % galaxyColors.length]; // Ensures deterministic cycling

          const count = 50000 + Math.floor(Math.random() * 75000); // 50k–125k
          const size = 0.01 + Math.random() * 0.02; // 0.01–0.03
          const radius = 4 + Math.random() * 6; // 4–10
          const radiusPower = 2 + Math.random() * 2; // 2–4
          const branches = 6 + Math.floor(Math.random() * 10); // 6–10
          const spin = Math.random() * 2; // 0–2
          const randomnessPower = 3 + Math.random() * 3; // 3–6

          return (
            <Galaxy
              key={i}
              count={count}
              size={size}
              rad={radius}
              radiusPower={radiusPower}
              branches={branches}
              spin={spin}
              randomnessPower={randomnessPower}
              insideColor={colorCombo.insideColor}
              outsideColor={colorCombo.outsideColor}
              position={
                new Vector3(
                  (Math.random() - 0.5) * distance,
                  (Math.random() - 0.5) * distance,
                  (Math.random() - 0.5) * distance,
                )
              }
            />
          );
        })}
        <ambientLight intensity={2} />
        {/* <CameraControl makeDefault /> */}
        <CameraController />
        <Stats />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
