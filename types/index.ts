import Konva from "konva";

export type DrawObject = {
  id: string;
  type: 'image' | 'rectangle';
  imageUrl?: string;
  shapeProps: Konva.RectConfig | Konva.ImageConfig
}

export interface DrawObjectEventHandlers {
  isSelected: boolean;
  onSelect: () => void;
  onShapePropsChange: (BaseDrawObject) => void;
}
