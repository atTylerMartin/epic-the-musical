import { DRAWER_WIDTH, MOBILE_DRAWER_HEIGHT } from '../../hooks/useStageSize';

function DrawerToggle({ onClick, isOpen, isMobile }) {
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        style={{
          position: 'fixed',
          bottom: isOpen ? MOBILE_DRAWER_HEIGHT + 8 : 16,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '44px',
          padding: '0 20px',
          background: '#533483',
          border: 'none',
          color: '#e0e0e0',
          cursor: 'pointer',
          zIndex: 101,
          borderRadius: '22px',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          transition: 'bottom 0.25s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {isOpen ? '▼ Close' : '▲ Browse'}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        right: isOpen ? DRAWER_WIDTH : 0,
        top: '16px',
        width: '40px',
        height: '44px',
        background: '#533483',
        border: 'none',
        color: '#e0e0e0',
        cursor: 'pointer',
        zIndex: 101,
        borderRadius: isOpen ? '4px 0 0 4px' : '0 4px 4px 0',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'right 0.25s ease, border-radius 0.25s ease',
      }}
      title="Toggle drawer"
    >
      {isOpen ? '◀' : '▶'}
    </button>
  );
}

export default DrawerToggle;
