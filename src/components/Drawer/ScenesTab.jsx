import useSceneStore from '../../store/useSceneStore';
import { backgroundGroups } from '../../assets/manifest';

function ScenesTab() {
  const currentBackground = useSceneStore((s) => s.currentBackground);
  const setBackground = useSceneStore((s) => s.setBackground);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {backgroundGroups.map(({ group, scenes }) => (
        <div key={group}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 'bold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#ffd700',
              marginBottom: '8px',
              paddingBottom: '4px',
              borderBottom: '1px solid #2a4a7a',
            }}
          >
            {group}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
            }}
          >
            {scenes.map((bg) => (
              <button
                key={bg.id}
                onClick={() => setBackground(bg.src)}
                style={{
                  border: currentBackground === bg.src ? '3px solid #ffd700' : '1px solid #444',
                  background: '#0f3460',
                  color: '#e0e0e0',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'border 0.15s ease',
                }}
              >
                <img
                  src={bg.thumbnail}
                  alt={bg.label}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
                  }}
                />
                <div style={{ padding: '4px', fontSize: '12px', textAlign: 'center' }}>
                  {bg.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScenesTab;
