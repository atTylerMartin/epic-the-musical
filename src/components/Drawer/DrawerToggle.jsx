import { DRAWER_WIDTH } from '../../hooks/useStageSize';

function DrawerToggle({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        right: isOpen ? DRAWER_WIDTH : 0,
        top: '16px',
        width: '40px',
        height: '40px',
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
