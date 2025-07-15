'use client';

import useScrollHook from '@/shared/hooks/useScrollHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import PostCard from '../../../feeds/ui/PostCard';
import { accountQueries } from '../../api/accountQueries';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function PostList({ userId }: { userId: number }) {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isPending,
  } = useInfiniteQuery(accountQueries.myPosts(userId));

  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  if (!data && !isPending)
    return <div className="flex text-xs">게시글이 없습니다.</div>;

  return (
    <div className="flex flex-col py-2 w-full">
      {isPending && <LoadingSmall />}
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && !isPending && (
        <div className="text-center text-xs font-bold">
          마지막 게시글입니다.
        </div>
      )}
    </div>
  );
}
