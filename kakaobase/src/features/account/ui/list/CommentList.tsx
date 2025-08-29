'use client';

import useScrollHook from '@/shared/hooks/useScrollHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import PostCard from '../../../feeds/ui/PostCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { accountListQueries } from '../../api/accountListQueries';

export default function CommentList({ userId }: { userId: number }) {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isPending,
  } = useInfiniteQuery(accountListQueries.myComments(userId));

  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  if (!data && !isPending)
    return <div className="flex text-xs">댓글이 없습니다.</div>;

  return (
    <div className="flex flex-col py-2 w-full">
      {isPending && <LoadingSmall />}
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && !isPending && (
        <div className="text-center text-xs font-bold">마지막 댓글입니다.</div>
      )}
    </div>
  );
}
