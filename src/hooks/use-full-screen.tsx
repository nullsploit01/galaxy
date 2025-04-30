import { useEffect, useRef } from 'react';

export function useFullscreen<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleDblClick = () => {
      const el = elementRef.current;
      if (!el) return;

      const isFullscreen = document.fullscreenElement || (document as any).webkitFullscreenElement;

      if (!isFullscreen) {
        el.requestFullscreen?.() || (el as any).webkitRequestFullscreen?.();
      } else {
        document.exitFullscreen?.() || (document as any).webkitExitFullscreen?.();
      }
    };

    const triggerResize = () => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    };

    window.addEventListener('dblclick', handleDblClick);
    document.addEventListener('fullscreenchange', triggerResize);
    document.addEventListener('webkitfullscreenchange', triggerResize);

    return () => {
      window.removeEventListener('dblclick', handleDblClick);
      document.removeEventListener('fullscreenchange', triggerResize);
      document.removeEventListener('webkitfullscreenchange', triggerResize);
    };
  }, []);

  return elementRef;
}
