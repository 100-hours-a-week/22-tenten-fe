'use client';

import { memo } from 'react';
import PostCard from '../../ui/PostCard';
import usePostList from '../hooks/usePostList';
import useScrollHook from '@/shared/hooks/useScrollHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';

const PostList = memo(function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
  } = usePostList();

  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  if (isPending)
    return (
      <div className="mt-8 h-screen">
        <LoadingSmall />
      </div>
    );

  return (
    <div className="flex flex-col py-2">
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && (
        <div className="text-center text-xs font-bold">
          마지막 게시글입니다.
        </div>
      )}
    </div>
  );
});

export default PostList;
