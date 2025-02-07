import create from 'zustand';

interface IconState {
  selectedIconId: number | null;
  setSelectedIconId: (id: number | null) => void;
}

export const useIconStore = create<IconState>((set) => ({
  selectedIconId: null,
  setSelectedIconId: (id) => set({ selectedIconId: id }),
}));
