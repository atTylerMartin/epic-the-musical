import useSceneStore from '../store/useSceneStore';

function Toolbar({ stageRef }) {
  const clearAll = useSceneStore((s) => s.clearAll);

  const handleExport = () => {
    if (!stageRef.current) return;

    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0.92,
    });

    const link = document.createElement('a');
    link.download = 'epic-scene.jpg';
    link.href = dataURL;
    link.click();
  };

  const buttonStyle = {
    padding: '10px 16px',
    margin: '0 4px',
    background: '#533483',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.15s ease',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: 102,
        display: 'flex',
        gap: '8px',
      }}
    >
      <button onClick={clearAll} style={buttonStyle} onMouseOver={(e) => e.target.style.background = '#6d4ca3'} onMouseOut={(e) => e.target.style.background = '#533483'}>
        Clear All
      </button>
      <button onClick={handleExport} style={buttonStyle} onMouseOver={(e) => e.target.style.background = '#6d4ca3'} onMouseOut={(e) => e.target.style.background = '#533483'}>
        Export
      </button>
    </div>
  );
}

export default Toolbar;
