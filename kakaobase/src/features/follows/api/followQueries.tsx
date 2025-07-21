import { infiniteQueryOptions } from '@tanstack/react-query';
import { getFollowers, getFollowings } from './follow';

export const followQueries = {
  all: () => ['follow'],
  followersKey: (userId: number) => [
    ...followQueries.all(),
    'followers',
    userId,
  ],
  followingsKey: (userId: number) => [
    ...followQueries.all(),
    'followings',
    userId,
  ],

  followers: (userId: number) =>
    infiniteQueryOptions({
      queryKey: followQueries.followersKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getFollowers({
          userId: userId,
          limit: 28,
          cursor: pageParam,
        }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  followings: (userId: number) =>
    infiniteQueryOptions({
      queryKey: followQueries.followingsKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getFollowings({
          userId: userId,
          limit: 28,
          cursor: pageParam,
        }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),
};
