import { getMyComments } from '../../api/profile';
import { PostEntity } from '@/types/post/post';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export default function useMyCommentsHook({
  userId,
}: {
  userId: number;
}): UseInfiniteQueryResult<InfiniteData<PostEntity[]>, Error> {
  return useInfiniteQuery({
    queryKey: ['comments', userId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getMyComments({
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
