import { PostEntity } from '@/features/feeds/types/post';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { feedQueries } from '../../api/feedQueries';

export default function useRecommentList({
  commentId,
}: {
  commentId: number;
}): UseInfiniteQueryResult<InfiniteData<PostEntity[]>, Error> {
  return useInfiniteQuery(feedQueries.recomments(commentId));
}
