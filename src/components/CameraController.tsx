// CameraController.tsx
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Euler, Vector3 } from 'three';

const moveSpeed = 0.3;
const rotationSpeed = 0.002;

const CameraController = () => {
  const { camera, gl } = useThree();
  const keys = useRef<{ [key: string]: boolean }>({});
  const pointerLocked = useRef(false);
  const scrollDelta = useRef(0);

  const rotationEuler = useRef(new Euler(0, 0, 0, 'YXZ'));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = true);
    const onKeyUp = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = false);

    const onMouseMove = (e: MouseEvent) => {
      if (!pointerLocked.current) return;

      const deltaX = e.movementX * rotationSpeed;
      const deltaY = e.movementY * rotationSpeed;

      rotationEuler.current.y -= deltaX;
      rotationEuler.current.x -= deltaY;

      rotationEuler.current.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, rotationEuler.current.x),
      );

      camera.quaternion.setFromEuler(rotationEuler.current);
    };

    const onClick = () => gl.domElement.requestPointerLock();
    const onPointerLockChange = () => {
      pointerLocked.current = document.pointerLockElement === gl.domElement;
    };

    const onWheel = (e: WheelEvent) => {
      scrollDelta.current += e.deltaY > 0 ? 1 : -1;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    window.addEventListener('wheel', onWheel);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      window.removeEventListener('wheel', onWheel);
    };
  }, [gl, camera]);

  useFrame(() => {
    const direction = new Vector3();

    // keyboard movement
    if (keys.current['w']) direction.z -= 1;
    if (keys.current['s']) direction.z += 1;
    if (keys.current['a']) direction.x -= 1;
    if (keys.current['d']) direction.x += 1;
    if (keys.current['q']) direction.y -= 1;
    if (keys.current['e']) direction.y += 1;

    // scroll movement (forward/back only)
    if (scrollDelta.current !== 0) {
      direction.z += scrollDelta.current * -1; // reverse direction (up = forward)
      scrollDelta.current = 0; // reset after applying
    }

    direction.normalize().applyEuler(camera.rotation).multiplyScalar(moveSpeed);
    camera.position.add(direction);
  });

  return null;
};

export default CameraController;
