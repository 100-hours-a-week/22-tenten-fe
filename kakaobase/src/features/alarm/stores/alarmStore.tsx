import { create } from 'zustand';

const initialAlarmState = {
  cnt: 0,
};

export interface AlarmState {
  cnt: number;
  setCnt: (cnt: number) => void;
  clear: () => void;
}

export const useAlarmStore = create<AlarmState>()((set) => ({
  ...initialAlarmState,
  setCnt: (cnt) => set({ cnt: cnt }),
  clear: () => set({ cnt: 0 }),
}));
