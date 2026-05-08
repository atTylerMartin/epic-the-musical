import { useState, useEffect } from 'react';
import useSceneStore from '../store/useSceneStore';

export const DRAWER_WIDTH = 320;

export function useStageSize() {
  const drawerOpen = useSceneStore((s) => s.drawerOpen);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth - (drawerOpen ? DRAWER_WIDTH : 0);
      setSize({ width: w, height: window.innerHeight });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [drawerOpen]);

  return size;
}
