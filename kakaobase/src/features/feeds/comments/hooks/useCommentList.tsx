import { useInfiniteQuery } from '@tanstack/react-query';
import { feedQueries } from '../../api/feedQueries';

export default function useCommentList({ postId }: { postId: number }) {
  const methods = useInfiniteQuery(feedQueries.comments(postId));

  return { ...methods };
}
