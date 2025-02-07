import { useState, useCallback } from 'react';

export const useColorManipulation = () => {
  const [color, setColor] = useState('#000000');

  const adjustBrightness = useCallback((amount: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const factor = 1 + amount;

    const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
    const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
    const newB = Math.min(255, Math.max(0, Math.round(b * factor)));

    const newColor = `#${newR.toString(16).padStart(2, '0')}${newG
      .toString(16)
      .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

    setColor(newColor);
    return newColor;
  }, [color]);

  return {
    color,
    setColor,
    adjustBrightness,
  };
};