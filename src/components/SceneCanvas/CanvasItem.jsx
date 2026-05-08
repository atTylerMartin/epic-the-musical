import { Image } from 'react-konva';
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

function CanvasItem({ item, isSelected, onSelect, onDragEnd, onDoubleClick }) {
  const [image] = useImage(item.src);
  const updateItem = useSceneStore((s) => s.updateItem);

  const width = image ? image.naturalWidth : 100;
  const height = image ? image.naturalHeight : 100;
  const offsetX = width / 2;
  const offsetY = height / 2;

  return (
    <Image
      id={item.id}
      image={image}
      x={item.x}
      y={item.y}
      width={width}
      height={height}
      offsetX={offsetX}
      offsetY={offsetY}
      scaleX={item.scaleX}
      scaleY={item.scaleY}
      rotation={item.rotation}
      draggable
      onClick={() => onSelect(item.id)}
      onTap={() => onSelect(item.id)}
      onDblClick={onDoubleClick}
      onDragEnd={(e) => {
        onDragEnd(e, item.id);
        updateItem(item.id, { x: e.target.x(), y: e.target.y() });
      }}
      strokeEnabled={isSelected}
      stroke="#ffd700"
      strokeWidth={2}
    />
  );
}

export default CanvasItem;
