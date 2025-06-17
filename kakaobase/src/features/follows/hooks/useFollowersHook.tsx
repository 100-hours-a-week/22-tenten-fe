import { getFollowers } from '@/features/follows/api/follow';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useFollowersHook({ userId }: { userId: number }) {
  return useInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getFollowers({
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
