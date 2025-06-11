import { getMyLikes } from '@/apis/profile';
import { PostEntity } from '@/dto/post/post';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export default function useMyLikesHook({
  userId,
}: {
  userId: number;
}): UseInfiniteQueryResult<InfiniteData<PostEntity[]>, Error> {
  return useInfiniteQuery({
    queryKey: ['liked-posts', userId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getMyLikes({
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
