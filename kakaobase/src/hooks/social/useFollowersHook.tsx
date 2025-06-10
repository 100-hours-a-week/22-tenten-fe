import { getFollowings } from '@/apis/follow';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useFollowersHook({ userId }: { userId: number }) {
  return useInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getFollowings({
        userId: userId,
        limit: 30,
        cursor: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.at(-1),
    initialPageParam: undefined,
  });
}
