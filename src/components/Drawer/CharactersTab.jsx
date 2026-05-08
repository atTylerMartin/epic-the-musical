import useSceneStore from '../../store/useSceneStore';
import { characters } from '../../assets/manifest';
import { useIsMobile } from '../../hooks/useStageSize';

function CharactersTab() {
  const usedCharacterIds = useSceneStore((s) => s.usedCharacterIds);
  const addCharacter = useSceneStore((s) => s.addCharacter);
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
        gap: '8px',
      }}
    >
      {characters.map((char) => {
        const isUsed = usedCharacterIds.has(char.id);
        return (
          <button
            key={char.id}
            onClick={() => !isUsed && addCharacter(char)}
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
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '100%',
                height: isMobile ? '100px' : '140px',
                overflow: 'hidden',
                background: '#1a1a2e',
                flexShrink: 0,
              }}
            >
              <img
                src={char.thumbnail}
                alt={char.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="140"%3E%3Crect fill="%23333" width="100" height="140"/%3E%3C/svg%3E';
                }}
              />
            </div>
            <div style={{ padding: '6px 4px', fontSize: '12px', textAlign: 'center', background: '#0a1f3a' }}>
              {char.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default CharactersTab;
