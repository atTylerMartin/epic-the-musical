import { Text } from 'react-konva';
import useSceneStore from '../../store/useSceneStore';
import CanvasItem from './CanvasItem';

function HorseItem({ item, isSelected, onSelect, onDragEnd }) {
  const popCharacterFromHorse = useSceneStore((s) => s.popCharacterFromHorse);

  const handleDblClick = () => {
    if (item.loadedCharacters && item.loadedCharacters.length > 0) {
      popCharacterFromHorse(item.id);
    }
  };

  return (
    <>
      <CanvasItem
        item={item}
        isSelected={isSelected}
        onSelect={onSelect}
        onDragEnd={onDragEnd}
        onDoubleClick={handleDblClick}
      />
      {item.loadedCharacters && item.loadedCharacters.length > 0 && (
        <Text
          x={item.x}
          y={item.y - 30}
          text={`${item.loadedCharacters.length} loaded`}
          fontSize={14}
          fill="#ffd700"
          listening={false}
        />
      )}
    </>
  );
}

export default HorseItem;
