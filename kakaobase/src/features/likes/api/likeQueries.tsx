import { PostType } from '@/features/feeds/types/post';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { getLikes } from './likeList';

export const likeQueries = {
  all: () => ['like'],
  likeKey: (feedId: number, feedType: PostType) => [
    ...likeQueries.all(),
    feedId,
    feedType,
  ],
  likes: (feedId: number, feedType: PostType) =>
    infiniteQueryOptions({
      queryKey: likeQueries.likeKey(feedId, feedType),
      queryFn: ({ pageParam }: { pageParam?: number }) => {
        const response = getLikes({
          feedId,
          feedType,
          limit: 22,
          cursor: pageParam,
        });
        return response;
      },
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialPageParam: undefined,
    }),
};
