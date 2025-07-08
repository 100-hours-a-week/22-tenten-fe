'use client';

import PostCard from '../../ui/PostCard';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import useScrollHook from '@/shared/hooks/useScrollHook';
import useRecommentList from '../hooks/useRecommentList';
import { recommentFormStateStore } from '../stores/recommentFormStateStore';

export default function RecommentList({ commentId }: { commentId: number }) {
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useRecommentList({ commentId });
  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  const { isRecommentOpen, commentId: commentIdForRecommentList } =
    recommentFormStateStore();
  if (!isRecommentOpen || commentIdForRecommentList !== commentId) return null;

  return (
    <div className="flex flex-col ml-12">
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && isPending && <LoadingSmall />}
    </div>
  );
}
