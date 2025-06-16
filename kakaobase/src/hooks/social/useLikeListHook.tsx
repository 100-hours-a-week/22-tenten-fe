import {
  getCommentLikes,
  getPostLikes,
  getRecommentLikes,
} from '@/apis/likeList';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useLikeListHook({
  postId,
  postType,
}: {
  postId: number;
  postType: string;
}) {
  return useInfiniteQuery({
    queryKey: ['postLikes', postId, postType],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      if (postType === 'post') {
        //게시글
        const response = await getPostLikes({
          postId: postId,
          limit: 22,
          cursor: pageParam,
        });
        return response;
      } else if (postType === 'comment') {
        //댓글
        const response = await getCommentLikes({
          postId: postId,
          limit: 22,
          cursor: pageParam,
        });
        return response;
      } else {
        //대댓글
        const response = await getRecommentLikes({
          postId: postId,
          limit: 22,
          cursor: pageParam,
        });
        return response;
      }
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    initialPageParam: undefined,
  });
}
