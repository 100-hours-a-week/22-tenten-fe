import { getMyPosts } from '@/features/account/api/profile';
import { PostEntity } from '@/entities/feeds/types/post';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export default function useMyPostsHook({
  userId,
}: {
  userId: number;
}): UseInfiniteQueryResult<InfiniteData<PostEntity[]>, Error> {
  return useInfiniteQuery({
    queryKey: ['posts', userId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getMyPosts({
        userId: userId,
        limit: 6,
        cursor: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    initialPageParam: undefined,
  });
}
