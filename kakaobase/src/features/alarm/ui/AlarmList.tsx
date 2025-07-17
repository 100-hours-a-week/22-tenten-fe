'use client';
import AlarmItem from './AlarmItem';
import { useAlarmStore } from '../stores/alarmStore';

export default function AlarmList() {
  const { alarmList } = useAlarmStore();

  return (
    <div className="flex flex-col w-full h-screen">
      {alarmList.map((alarm) => (
        <AlarmItem data={alarm} key={alarm.data.id} />
      ))}
    </div>
  );
}
