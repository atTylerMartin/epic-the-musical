import useSceneStore from '../../store/useSceneStore';
import { props } from '../../assets/manifest';

function PropsTab() {
  const addProp = useSceneStore((s) => s.addProp);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
      }}
    >
      {props.map((prop) => (
        <button
          key={prop.id}
          onClick={() => addProp(prop)}
          style={{
            border: '1px solid #444',
            background: '#0f3460',
            color: '#e0e0e0',
            cursor: 'pointer',
            borderRadius: '4px',
            overflow: 'hidden',
            transition: 'background 0.15s ease',
          }}
        >
          <img
            src={prop.thumbnail}
            alt={prop.label}
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
            {prop.label}
          </div>
        </button>
      ))}
    </div>
  );
}

export default PropsTab;
