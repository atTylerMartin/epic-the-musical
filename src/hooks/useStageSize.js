import { useState, useEffect } from 'react';
import useSceneStore from '../store/useSceneStore';

export const DRAWER_WIDTH = 320;
export const MOBILE_DRAWER_HEIGHT = 340;
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return isMobile;
}

export function useStageSize() {
  const drawerOpen = useSceneStore((s) => s.drawerOpen);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (mobile) {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - (drawerOpen ? MOBILE_DRAWER_HEIGHT : 0),
        });
      } else {
        setSize({
          width: window.innerWidth - (drawerOpen ? DRAWER_WIDTH : 0),
          height: window.innerHeight,
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [drawerOpen]);

  return size;
}
