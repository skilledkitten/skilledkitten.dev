import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function useIconTool() {
  const [icons] = useState([
    { id: 1, label: 'Plus', icon: Plus },
    { id: 2, label: 'Minus', icon: Minus }
  ]);

  function toggleIcon(id: number) {
    console.log('Toggle icon', id);
  }

  return { icons, toggleIcon };
}
