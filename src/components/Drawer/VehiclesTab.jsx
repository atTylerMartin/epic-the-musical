import useSceneStore from '../../store/useSceneStore';
import { vehicles } from '../../assets/manifest';

function VehiclesTab() {
  const canvasItems = useSceneStore((s) => s.canvasItems);
  const addVehicle = useSceneStore((s) => s.addVehicle);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
      }}
    >
      {vehicles.map((vehicle) => {
        const isUsed = canvasItems.some((i) => i.assetId === vehicle.id);
        return (
          <button
            key={vehicle.id}
            onClick={() => !isUsed && addVehicle(vehicle)}
            disabled={isUsed}
            style={{
              border: '1px solid #444',
              background: '#0f3460',
              color: '#e0e0e0',
              cursor: isUsed ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              overflow: 'hidden',
              opacity: isUsed ? 0.4 : 1,
              transition: 'opacity 0.15s ease',
            }}
          >
            <img
              src={vehicle.thumbnail}
              alt={vehicle.label}
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
              {vehicle.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default VehiclesTab;
