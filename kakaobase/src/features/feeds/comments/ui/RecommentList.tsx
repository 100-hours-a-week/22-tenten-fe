'use client';

import PostCard from '../../ui/PostCard';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import useScrollHook from '@/shared/hooks/useScrollHook';
import useRecommentList from '../hooks/useRecommentList';
import { useParams } from 'next/navigation';
import { ArrowRightToLine } from 'lucide-react';

export default function RecommentList({commentId} : {commentId : number}) {
  const params = useParams();
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

  return (
    <div className="flex flex-col ml-12">
      {data?.pages.flat().map((post) => (
        <div className='flex'>
          <PostCard key={post.id} post={post} />
        </div>
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}

      {!hasNextPage && isPending && (
        <LoadingSmall />
      )}
    </div>
  );
}
