'use client';

import useScrollHook from '@/hooks/useScrollHook';
import LoadingSmall from '../common/loading/LoadingSmall';
import UserItem from './UserItem';
import useFollowingsHook from '@/hooks/social/useFollowingsHook';

export default function UserFollowingList({ userId }: { userId: number }) {
  const {
    data,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useFollowingsHook({ userId });
  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });
  return (
    <div
      className="flex flex-col my-[6rem] p-2 bg-containerColor rounded-lg flex-grow self-center w-full max-w-sm animate-slide-in overflow-y-auto gap-2"
      data-scroll-area
    >
      {data?.pages.flat().map((item) => (
        <UserItem key={item.id} data={item} />
      ))}
      {hasNextPage && <div ref={observerRef} className="h-[1px]" />}
      {isPending && <LoadingSmall />}
      {!hasNextPage && (
        <div className="flex justify-center text-xs">
          더이상 표시할 유저가 없습니다.
        </div>
      )}
    </div>
  );
}
