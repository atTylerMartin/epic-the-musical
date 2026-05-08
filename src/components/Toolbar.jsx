import useSceneStore from '../store/useSceneStore';

function Toolbar({ stageRef }) {
  const clearAll = useSceneStore((s) => s.clearAll);

  const handleExport = () => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL({ mimeType: 'image/jpeg', quality: 0.92 });
    const link = document.createElement('a');
    link.download = 'epic-scene.jpg';
    link.href = dataURL;
    link.click();
  };

  const buttonStyle = {
    padding: '0 16px',
    height: '44px',
    background: '#533483',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        left: '12px',
        zIndex: 102,
        display: 'flex',
        gap: '8px',
      }}
    >
      <button onClick={clearAll} style={buttonStyle}>Clear All</button>
      <button onClick={handleExport} style={buttonStyle}>Export</button>
    </div>
  );
}

export default Toolbar;
