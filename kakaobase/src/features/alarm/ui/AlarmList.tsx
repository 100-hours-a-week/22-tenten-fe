'use client';
import AlarmItem from './AlarmItem';
import { alarmQueries } from '../api/alarmQueries';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AlarmItem as AlarmItemType } from '../types/AlarmResponse';
import Loading from '@/shared/ui/Loading';

export default function AlarmList() {
  const { data, isPending } = useInfiniteQuery(alarmQueries.alarms());

  const flatNotifications: AlarmItemType[] = data
    ? data.pages.flatMap((page) => page.notifications)
    : [];

  if (isPending)
    return (
      <div className="flex flex-col w-full h-screen">
        <Loading />
      </div>
    );

  if (flatNotifications.length === 0)
    return (
      <div className="flex flex-col w-full h-screen items-center text-sm justify-center gap-4">
        아직 알림이 없습니다.
      </div>
    );

  return (
    <div className="flex flex-col w-full h-screen">
      {flatNotifications.map((alarm) => (
        <AlarmItem data={alarm} key={alarm.data.id} />
      ))}
    </div>
  );
}
