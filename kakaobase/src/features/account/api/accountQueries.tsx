import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getUserInfo, getMyPosts, getMyComments, getMyLikes } from './profile';

export const accountQueries = {
  all: () => ['user'],
  userInfoKey: (userId: number) => [
    ...accountQueries.all(),
    'userInfo',
    userId,
  ],
  myPostsKey: (userId: number) => [...accountQueries.all(), 'myPosts', userId],
  myCommentsKey: (userId: number) => [
    ...accountQueries.all(),
    'myComments',
    userId,
  ],
  myLikesKey: (userId: number) => [...accountQueries.all(), 'myLikes', userId],

  userInfo: (userId: number) =>
    queryOptions({
      queryKey: accountQueries.userInfoKey(userId),
      queryFn: () => getUserInfo({ userId }),
    }),

  myPosts: (userId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: accountQueries.myPostsKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getMyPosts({ userId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  myComments: (userId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: accountQueries.myCommentsKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getMyComments({ userId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  myLikes: (userId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: accountQueries.myLikesKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getMyLikes({ userId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),
};
