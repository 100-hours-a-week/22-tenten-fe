import { create } from 'zustand';
import { AlarmItem } from '../types/AlarmResponse';
import { AckResponse } from '@/features/socket/types/Response';

const initialAlarmState = {
  cnt: 0,
  alarmList: [] as AlarmItem[],
};
export interface AlarmState {
  cnt: number;
  alarmList: AlarmItem[];

  cntDecrement: () => void;
  cntIncrement: () => void;
  addAlarm: (alarm: AlarmItem) => void;
  setAlarmList: (alarmList: AlarmItem[]) => void;
  setCnt: (cnt: number) => void;
  removeAlarm: (alarm: AckResponse) => void;
  readAlarm: (alarm: AckResponse) => void;
  clear: () => void;
}

export const useAlarmStore = create<AlarmState>()((set) => ({
  ...initialAlarmState,
  cntDecrement: () => set((prev) => ({ cnt: Math.max(0, prev.cnt - 1) })),
  cntIncrement: () => set((prev) => ({ cnt: prev.cnt + 1 })),
  addAlarm: (alarm) =>
    set((prev) => ({ alarmList: [...prev.alarmList, alarm] })),
  setAlarmList: (alarmList) => set({ alarmList: alarmList }),
  setCnt: (cnt) => set({ cnt: cnt }),
  readAlarm: (alarm) =>
    set((prev) => ({
      alarmList: prev.alarmList.map((state) =>
        state.data.id === alarm.id
          ? {
              ...state,
              data: {
                ...state.data,
                is_read: true,
              },
            }
          : state
      ),
    })),

  removeAlarm: (alarm) =>
    set((prev) => {
      const removed = prev.alarmList.find((n) => n.data.id === alarm.id);
      const isUnread = removed && !removed.data.is_read;
      return {
        cnt: isUnread ? Math.max(0, prev.cnt - 1) : prev.cnt,
      };
    }),

  clear: () => set({ ...initialAlarmState }),
}));
