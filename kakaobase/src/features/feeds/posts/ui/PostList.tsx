'use client';

import { useEffect } from 'react';
import PostCard from '../../ui/PostCard';
import usePostList from '../hooks/usePostList';
import useScrollHook from '@/shared/hooks/useScrollHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';

export default function PostList() {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePostList();

  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  return (
    <div className="flex flex-col py-2">
      {status === 'pending' && <LoadingSmall />}
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && status !== 'pending' && (
        <div className="text-center text-xs font-bold mb-8">
          마지막 게시글입니다.
        </div>
      )}
    </div>
  );
}
