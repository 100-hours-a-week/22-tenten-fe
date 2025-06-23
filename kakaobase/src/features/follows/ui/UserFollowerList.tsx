'use client';

import useFollowersHook from '../hooks/useFollowersHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';
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
    <div className="flex w-full flex-col gap-2">
      {data?.pages.flat().map((item) => (
        <UserItem key={item.id} data={item} />
      ))}
      {isPending && <LoadingSmall />}
      {isFetchingNextPage && <div className="h-[1px]" ref={observerRef} />}
      {!hasNextPage && (
        <div className="flex justify-center text-xs">
          더이상 표시할 유저가 없습니다.
        </div>
      )}
    </div>
  );
}
