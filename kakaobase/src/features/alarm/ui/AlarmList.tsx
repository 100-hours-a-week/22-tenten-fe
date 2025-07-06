'use client';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import useAlarm from '../hooks/useAlarm';
import AlarmItem from './AlarmItem';

export default function AlarmList() {
  const { alarmList } = useAlarm();

  if (!alarmList || alarmList === null)
    return (
      <div className="h-screen">
        <LoadingSmall />
      </div>
    );
  return (
    <div className="flex flex-col w-full h-screen">
      {alarmList.map((alarm, idx) => (
        <AlarmItem data={alarm} key={idx} />
      ))}
    </div>
  );
}
