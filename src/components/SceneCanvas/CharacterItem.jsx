import { Group, Image } from 'react-konva';
import { useEffect, useState } from 'react';
import useSceneStore from '../../store/useSceneStore';

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

function AttachedPropImage({ prop, characterItemId }) {
  const [image] = useImage(prop.src);
  const updateAttachedProp = useSceneStore((s) => s.updateAttachedProp);
  const detachProp = useSceneStore((s) => s.detachProp);

  const width = image ? image.naturalWidth : 100;
  const height = image ? image.naturalHeight : 100;

  return (
    <Image
      image={image}
      x={prop.offsetX}
      y={prop.offsetY}
      width={width}
      height={height}
      offsetX={width / 2}
      offsetY={height / 2}
      scaleX={prop.scaleX}
      scaleY={prop.scaleY}
      rotation={prop.rotation}
      draggable
      onDragEnd={(e) => {
        e.cancelBubble = true;
        updateAttachedProp(characterItemId, prop.id, {
          offsetX: e.target.x(),
          offsetY: e.target.y(),
        });
      }}
      onDblClick={(e) => {
        e.cancelBubble = true;
        detachProp(characterItemId, prop.id);
      }}
      onDblTap={(e) => {
        e.cancelBubble = true;
        detachProp(characterItemId, prop.id);
      }}
    />
  );
}

function CharacterItem({ item, isSelected, onSelect, onDragEnd }) {
  const [image] = useImage(item.src);
  const updateItem = useSceneStore((s) => s.updateItem);

  const width = image ? image.naturalWidth : 100;
  const height = image ? image.naturalHeight : 100;

  return (
    <Group
      id={item.id}
      x={item.x}
      y={item.y}
      scaleX={item.scaleX}
      scaleY={item.scaleY}
      rotation={item.rotation}
      draggable
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
      onTap={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
      onDragEnd={(e) => {
        onDragEnd(e, item.id);
        updateItem(item.id, { x: e.target.x(), y: e.target.y() });
      }}
    >
      <Image
        image={image}
        width={width}
        height={height}
        offsetX={width / 2}
        offsetY={height / 2}
        strokeEnabled={isSelected}
        stroke="#ffd700"
        strokeWidth={2}
      />
      {(item.attachedProps || []).map((prop) => (
        <AttachedPropImage
          key={prop.id}
          prop={prop}
          characterItemId={item.id}
        />
      ))}
    </Group>
  );
}

export default CharacterItem;
