import { create } from "zustand";

interface FilterState {
  dayBefore: number;
  setDayBefore: (days: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dayBefore: 30,
  setDayBefore: (days) => set({ dayBefore: days }),
}));
