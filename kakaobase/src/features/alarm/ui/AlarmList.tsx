'use client';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import AlarmItem from './AlarmItem';
import { useAlarmStore } from '../stores/alarmStore';

export default function AlarmList() {
  const { alarmList } = useAlarmStore();
  console.log(alarmList);

  if (!alarmList || alarmList === null)
    return (
      <div className="h-screen">
        <LoadingSmall />
      </div>
    );
  return (
    <div className="flex flex-col w-full h-screen">
      {alarmList.map((alarm) => (
        <AlarmItem data={alarm} key={alarm.data.id} />
      ))}
    </div>
  );
}
