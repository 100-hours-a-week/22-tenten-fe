'use client';
import useAlarm from '../hooks/useAlarm';
import AlarmItem from './AlarmItem';

export default function AlarmList() {
  const { alarmList } = useAlarm();
  return (
    <div className="flex flex-col w-full h-screen">
      {/* {alarmList.map((alarms, idx) => (
        <AlarmItem data={alarms} key={idx} />
      ))} */}
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
      <AlarmItem data={alarmList} />
    </div>
  );
}
