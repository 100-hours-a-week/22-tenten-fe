import { queryOptions } from '@tanstack/react-query';
import { getUserInfo } from './profile';

export const accountInfoQueries = {
  all: () => ['user'],
  userInfoKey: (userId: number) => [
    ...accountInfoQueries.all(),
    'userInfo',
    userId,
  ],
  userInfo: (userId: number) =>
    queryOptions({
      queryKey: accountInfoQueries.userInfoKey(userId),
      queryFn: () => getUserInfo({ userId }),
      enabled: userId > 0,
    }),
};
