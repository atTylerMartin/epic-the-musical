import { useRef } from 'react';
import SceneCanvas from './components/SceneCanvas/SceneCanvas';
import Drawer from './components/Drawer/Drawer';
import Toolbar from './components/Toolbar';

export default function App() {
  const stageRef = useRef(null);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
      <SceneCanvas stageRef={stageRef} />
      <Drawer />
      <Toolbar stageRef={stageRef} />
    </div>
  );
}
