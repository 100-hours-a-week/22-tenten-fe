'use client';

import PostCard from '../../ui/PostCard';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import useScrollHook from '@/shared/hooks/useScrollHook';
import { useParams } from 'next/navigation';
import { feedQueries } from '../../api/feedQueries';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function CommentList() {
  const params = useParams();
  const postId = Number(params.postId);
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(feedQueries.comments(postId));

  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  return (
    <div className="flex flex-col pt-4 pb-20">
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && status === 'pending' ? (
        <LoadingSmall />
      ) : (
        <div className="text-center text-xs font-bold">마지막 댓글입니다.</div>
      )}
    </div>
  );
}
