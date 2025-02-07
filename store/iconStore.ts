import create from 'zustand';

interface Customization {
  size: number;
  strokeWidth: number;
  color: string;
  rotation: number;
  scale: number;
}

interface IconState {
  selectedIconId: number | null;
  setSelectedIconId: (id: number | null) => void;
  customization: Customization;
  updateCustomization: (updates: Partial<Customization>) => void;
  undo: () => void;
  redo: () => void;
  savePreset: (name: string) => void;
}

export const useIconStore = create<IconState>((set, get) => ({
  selectedIconId: null,
  setSelectedIconId: (id) => set({ selectedIconId: id }),
  customization: {
    size: 48,
    strokeWidth: 1,
    color: '#000000',
    rotation: 0,
    scale: 1,
  },
  updateCustomization: (updates) =>
    set((state) => ({
      customization: { ...state.customization, ...updates },
    })),
  undo: () => {
    console.log("Undo not implemented");
  },
  redo: () => {
    console.log("Redo not implemented");
  },
  savePreset: (name: string) => {
    console.log("Preset saved:", name);
  },
}));
