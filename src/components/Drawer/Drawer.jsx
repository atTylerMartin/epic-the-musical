import useSceneStore from '../../store/useSceneStore';
import { DRAWER_WIDTH, MOBILE_DRAWER_HEIGHT, useIsMobile } from '../../hooks/useStageSize';
import DrawerToggle from './DrawerToggle';
import ScenesTab from './ScenesTab';
import CharactersTab from './CharactersTab';
import PropsTab from './PropsTab';
import VehiclesTab from './VehiclesTab';

const TABS = ['scenes', 'characters', 'props', 'vehicles'];

function Drawer() {
  const drawerOpen = useSceneStore((s) => s.drawerOpen);
  const activeTab = useSceneStore((s) => s.activeTab);
  const toggleDrawer = useSceneStore((s) => s.toggleDrawer);
  const setActiveTab = useSceneStore((s) => s.setActiveTab);
  const isMobile = useIsMobile();

  const tabContent = {
    scenes: <ScenesTab />,
    characters: <CharactersTab />,
    props: <PropsTab />,
    vehicles: <VehiclesTab />,
  };

  const tabBar = (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #333',
        background: '#0f3460',
        borderRadius: isMobile ? '16px 16px 0 0' : 0,
        flexShrink: 0,
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1,
            padding: isMobile ? '14px 4px' : '12px 8px',
            border: 'none',
            background: activeTab === tab ? '#533483' : 'transparent',
            color: '#e0e0e0',
            cursor: 'pointer',
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: activeTab === tab ? 'bold' : 'normal',
            textTransform: 'capitalize',
            transition: 'background 0.15s ease',
            minHeight: '44px',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <DrawerToggle onClick={toggleDrawer} isOpen={drawerOpen} isMobile />
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            height: MOBILE_DRAWER_HEIGHT,
            background: '#16213e',
            borderTop: '1px solid #333',
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.25s ease',
          }}
        >
          {tabBar}
          <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
            {tabContent[activeTab]}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DrawerToggle onClick={toggleDrawer} isOpen={drawerOpen} isMobile={false} />
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
        {tabBar}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
          {tabContent[activeTab]}
        </div>
      </div>
    </>
  );
}

export default Drawer;
