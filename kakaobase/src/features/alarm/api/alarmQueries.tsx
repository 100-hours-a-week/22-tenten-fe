import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import getAlarms from './alarmList';
import getAlarmCnt from './alarmCnt';

export const alarmQueries = {
  all: () => ['alarms'],
  alarmsKey: () => [...alarmQueries.all(), 'lists'],
  alarmCountKey: () => [...alarmQueries.all(), 'cnt'],
  alarms: (limit = 22) =>
    infiniteQueryOptions({
      queryKey: alarmQueries.alarmsKey(),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getAlarms({ limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.notifications?.at(-1)?.data.id,
      initialPageParam: undefined,
    }),
  alarmCnt: () =>
    queryOptions({
      queryKey: alarmQueries.alarmCountKey(),
      queryFn: () => getAlarmCnt(),
    }),
};
