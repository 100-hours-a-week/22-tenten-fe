'use client';

import useScrollHook from '@/hooks/useScrollHook';
import LoadingSmall from '../../common/loading/LoadingSmall';
import PostCard from '../../post/PostCard';
import useMyCommentsHook from '@/hooks/profile/list/useMyCommentsHook';

export default function CommentList({ userId }: { userId: number }) {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isPending,
  } = useMyCommentsHook({ userId });
  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  if (!data && !isPending)
    return <div className="flex text-xs">댓글이 없습니다.</div>;

  return (
    <div className="flex flex-col py-2">
      {isPending && <LoadingSmall />}
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && !isPending && (
        <div className="text-center text-xs font-bold mb-8">
          마지막 댓글입니다.
        </div>
      )}
    </div>
  );
}
