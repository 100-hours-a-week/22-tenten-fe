import { infiniteQueryOptions } from '@tanstack/react-query';
import getAlarms from './alarmList';

export const alarmQueries = {
  all: () => ['alarms'],
  alarmsKey: () => [...alarmQueries.all(), 'lists'],
  alarms: (limit = 6) =>
    infiniteQueryOptions({
      queryKey: alarmQueries.alarmsKey(),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getAlarms({ limit: 22, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.notifications?.at(-1)?.data.id,
      initialPageParam: undefined,
    }),
};
