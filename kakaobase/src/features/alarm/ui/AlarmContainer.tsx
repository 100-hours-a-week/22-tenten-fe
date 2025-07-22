'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { alarmQueries } from '../api/alarmQueries';
import { useAlarmStore } from '../stores/alarmStore';
import useSocket from '@/features/socket/hooks/useSocket';

export default function AlarmContainer() {
  useSocket();
  const { setCnt } = useAlarmStore();
  const { data } = useInfiniteQuery(alarmQueries.alarms());

  useEffect(() => {
    if (data?.pages?.length) {
      setCnt(data.pages[0].unread_count);
    }
  }, [data?.pages, setCnt]);
  return null;
}
