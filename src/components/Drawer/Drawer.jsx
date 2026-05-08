import { useState } from 'react';
import useSceneStore from '../../store/useSceneStore';
import { DRAWER_WIDTH } from '../../hooks/useStageSize';
import DrawerToggle from './DrawerToggle';
import ScenesTab from './ScenesTab';
import CharactersTab from './CharactersTab';
import PropsTab from './PropsTab';
import VehiclesTab from './VehiclesTab';

function Drawer() {
  const drawerOpen = useSceneStore((s) => s.drawerOpen);
  const activeTab = useSceneStore((s) => s.activeTab);
  const toggleDrawer = useSceneStore((s) => s.toggleDrawer);
  const setActiveTab = useSceneStore((s) => s.setActiveTab);

  const tabContent = {
    scenes: <ScenesTab />,
    characters: <CharactersTab />,
    props: <PropsTab />,
    vehicles: <VehiclesTab />,
  };

  return (
    <>
      <DrawerToggle onClick={toggleDrawer} isOpen={drawerOpen} />
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: DRAWER_WIDTH,
          background: '#16213e',
          borderLeft: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #333',
            background: '#0f3460',
          }}
        >
          {['scenes', 'characters', 'props', 'vehicles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px 8px',
                border: 'none',
                background: activeTab === tab ? '#533483' : 'transparent',
                color: '#e0e0e0',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                textTransform: 'capitalize',
                transition: 'background 0.15s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
          {tabContent[activeTab]}
        </div>
      </div>
    </>
  );
}

export default Drawer;
