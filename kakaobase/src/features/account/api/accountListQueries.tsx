import { infiniteQueryOptions } from '@tanstack/react-query';
import { getUserInfo, getMyPosts, getMyComments, getMyLikes } from './profile';

export const accountListQueries = {
  all: () => ['user'],
  myPostsKey: (userId: number) => [
    ...accountListQueries.all(),
    'myPosts',
    userId,
  ],
  myCommentsKey: (userId: number) => [
    ...accountListQueries.all(),
    'myComments',
    userId,
  ],
  myLikesKey: (userId: number) => [
    ...accountListQueries.all(),
    'myLikes',
    userId,
  ],

  myPosts: (userId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: accountListQueries.myPostsKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getMyPosts({ userId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  myComments: (userId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: accountListQueries.myCommentsKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getMyComments({ userId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),

  myLikes: (userId: number, limit = 6) =>
    infiniteQueryOptions({
      queryKey: accountListQueries.myLikesKey(userId),
      queryFn: ({ pageParam }: { pageParam?: number }) =>
        getMyLikes({ userId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),
};
