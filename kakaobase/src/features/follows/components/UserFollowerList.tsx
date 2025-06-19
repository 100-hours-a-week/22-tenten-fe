'use client';

import useFollowersHook from '../hooks/useFollowersHook';
import LoadingSmall from '@/shared/ui/loading/LoadingSmall';
import useScrollHook from '@/shared/hooks/useScrollHook';
import UserItem from '@/entities/users/ui/UserItem';

export default function UserFollowerList({ userId }: { userId: number }) {
  const {
    data,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useFollowersHook({ userId });
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
      {isPending && <LoadingSmall />}
      {isFetchingNextPage && <div className="h-[1px]" ref={observerRef} />}
      {!hasNextPage && (
        <div className="flex justify-center text-xs">
          {' '}
          더이상 표시할 유저가 없습니다.
        </div>
      )}
    </div>
  );
}
