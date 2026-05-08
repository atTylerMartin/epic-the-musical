import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useSceneStore from '../../store/useSceneStore';
import { useStageSize, DRAWER_WIDTH, useIsMobile } from '../../hooks/useStageSize';
import CanvasItem from './CanvasItem';
import CharacterItem from './CharacterItem';
import HorseItem from './HorseItem';

function useImage(src) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImage(img);
    img.onerror = () => setImage(null);
    img.src = src;
  }, [src]);
  return [image];
}

function BackgroundImage({ src, width, height }) {
  const [image] = useImage(src);
  return (
    <KonvaImage
      image={image}
      width={width}
      height={height}
      listening={false}
    />
  );
}

function rectsOverlap(a, b, margin = 0) {
  return !(
    a.x + a.width + margin < b.x ||
    b.x + b.width + margin < a.x ||
    a.y + a.height + margin < b.y ||
    b.y + b.height + margin < a.y
  );
}

function SceneCanvas({ stageRef }) {
  const stageSize = useStageSize();
  const isMobile = useIsMobile();
  const currentBackground = useSceneStore((s) => s.currentBackground);
  const canvasItems = useSceneStore((s) => s.canvasItems);
  const drawerOpen = useSceneStore((s) => s.drawerOpen);
  const removeItem = useSceneStore((s) => s.removeItem);
  const updateItem = useSceneStore((s) => s.updateItem);
  const loadCharacterIntoHorse = useSceneStore((s) => s.loadCharacterIntoHorse);
  const attachPropToCharacter = useSceneStore((s) => s.attachPropToCharacter);

  const [selectedId, setSelectedId] = useState(null);

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleItemDragEnd = (e, itemId) => {
    const pos = stageRef.current.getPointerPosition();
    const draggedItem = canvasItems.find((i) => i.id === itemId);

    if (drawerOpen && pos.x > stageSize.width) {
      removeItem(itemId);
      return;
    }

    if (draggedItem?.type === 'prop') {
      const draggedNode = stageRef.current.findOne(`#${itemId}`);
      if (draggedNode) {
        const draggedRect = draggedNode.getClientRect({ relativeTo: stageRef.current });

        for (const character of canvasItems.filter((i) => i.type === 'character')) {
          const charNode = stageRef.current.findOne(`#${character.id}`);
          if (charNode) {
            const charRect = charNode.getClientRect({ relativeTo: stageRef.current });
            if (rectsOverlap(draggedRect, charRect, 80)) {
              const dropX = e.target.x();
              const dropY = e.target.y();
              const offsetX = (dropX - character.x) / character.scaleX;
              const offsetY = (dropY - character.y) / character.scaleY;
              attachPropToCharacter(itemId, character.id, offsetX, offsetY);
              setSelectedId(null);
              return;
            }
          }
        }
      }
    }

    if (draggedItem?.type === 'character') {
      const draggedNode = stageRef.current.findOne(`#${itemId}`);
      if (draggedNode) {
        const draggedRect = draggedNode.getClientRect({ relativeTo: stageRef.current });

        for (const horse of canvasItems.filter((i) => i.isHorse)) {
          const horseNode = stageRef.current.findOne(`#${horse.id}`);
          if (horseNode) {
            const horseRect = horseNode.getClientRect({ relativeTo: stageRef.current });
            if (rectsOverlap(draggedRect, horseRect)) {
              loadCharacterIntoHorse(itemId, horse.id);
              setSelectedId(null);
              return;
            }
          }
        }
      }
    }
  };

  const handleItemSelect = (id) => {
    setSelectedId(id);
  };

  const handleScaleChange = (value) => {
    if (selectedId) {
      const scale = parseFloat(value);
      updateItem(selectedId, { scaleX: scale, scaleY: scale });
    }
  };

  const selectedItem = canvasItems.find((i) => i.id === selectedId);

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        style={{ background: '#0f0f1e' }}
        onClick={handleStageClick}
      >
        <Layer>
          {currentBackground && (
            <BackgroundImage
              src={currentBackground}
              width={stageSize.width}
              height={stageSize.height}
            />
          )}

          {canvasItems
            .sort((a, b) => {
              if (a.isHorse) return -1;
              if (b.isHorse) return 1;
              return 0;
            })
            .map((item) =>
              item.isHorse ? (
                <HorseItem
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={handleItemSelect}
                  onDragEnd={handleItemDragEnd}
                />
              ) : item.type === 'character' ? (
                <CharacterItem
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={handleItemSelect}
                  onDragEnd={handleItemDragEnd}
                />
              ) : (
                <CanvasItem
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={handleItemSelect}
                  onDragEnd={handleItemDragEnd}
                  onDoubleClick={() => {}}
                />
              )
            )}
        </Layer>
      </Stage>

      {selectedItem && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '72px' : '16px',
            left: isMobile ? '12px' : '16px',
            right: isMobile ? '12px' : 'auto',
            background: '#533483',
            padding: '10px 14px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 50,
          }}
        >
          <label style={{ color: '#e0e0e0', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Size:
          </label>
          <input
            type="range"
            min="0.05"
            max="2"
            step="0.05"
            value={selectedItem.scaleX}
            onChange={(e) => handleScaleChange(e.target.value)}
            style={{ flex: 1, minWidth: '80px', cursor: 'pointer' }}
          />
          <span style={{ color: '#e0e0e0', fontSize: '12px', minWidth: '36px', textAlign: 'right' }}>
            {(selectedItem.scaleX * 100).toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default SceneCanvas;
