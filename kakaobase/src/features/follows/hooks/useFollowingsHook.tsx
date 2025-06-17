import { getFollowings } from '../api/follow';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useFollowingsHook({ userId }: { userId: number }) {
  return useInfiniteQuery({
    queryKey: ['followings', userId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getFollowings({
        userId: userId,
        limit: 28,
        cursor: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      const lastItem = lastPage.at(-1);
      return lastItem ? lastItem.id : undefined;
    },
    initialPageParam: undefined,
  });
}
