'use client';

import UserItem from '../../../entities/users/ui/UserItem';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import useScrollHook from '@/shared/hooks/useScrollHook';
import { PostType } from '@/features/feeds/types/post';
import { likeQueries } from '../api/likeQueries';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function UserLikeList({
  feedId,
  feedType,
}: {
  feedId: number;
  feedType: PostType;
}) {
  const methods = useInfiniteQuery(likeQueries.likes(feedId, feedType));
  const {
    data,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = { ...methods };

  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  return (
    <div className="flex flex-col rounded-lg p-2 gap-2 w-full">
      {data?.pages.flat().map((item) => (
        <UserItem key={item.id} data={item} />
      ))}
      {isPending && <LoadingSmall />}
      {hasNextPage && <div className="h-[1px]" ref={observerRef} />}
      {!hasNextPage && (
        <div className="flex justify-center text-xs">
          더이상 표시할 유저가 없습니다.
        </div>
      )}
    </div>
  );
}
