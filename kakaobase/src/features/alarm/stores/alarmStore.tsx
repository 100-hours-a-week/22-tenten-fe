import { create } from 'zustand';
import { AlarmItem } from '../types/AlarmFetchResponse';

export interface AlarmState {
  cnt: number;
  alarmList: AlarmItem[];
  setAlarmInfo: (
    updater: Partial<AlarmState> | ((prev: AlarmState) => Partial<AlarmState>)
  ) => void;
  clear: () => void;
}

export const useAlarmStore = create<AlarmState>()((set) => ({
  cnt: 0,
  alarmList: [],
  setAlarmInfo: (updater) =>
    set((state) => {
      const updates = typeof updater === 'function' ? updater(state) : updater;
      return { ...state, ...updates };
    }),
  clear: () =>
    set({
      cnt: 0,
      alarmList: [],
    }),
}));
