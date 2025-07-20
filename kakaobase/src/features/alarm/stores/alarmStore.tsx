import { create } from 'zustand';
import { AlarmItem } from '../types/AlarmResponse';

const initialAlarmState = {
  cnt: 0,
  alarmList: [] as AlarmItem[],
};

export interface AlarmState {
  cnt: number;
  alarmList: AlarmItem[];
  setAlarmList: (alarmList: AlarmItem[]) => void;
  setCnt: (cnt: number) => void;
  clear: () => void;
}

export const useAlarmStore = create<AlarmState>()((set) => ({
  ...initialAlarmState,
  setCnt: (cnt) => set({ cnt: cnt }),
  setAlarmList: (alarmList) => set({ alarmList: alarmList }),
  clear: () => set({ cnt: 0 }),
}));
