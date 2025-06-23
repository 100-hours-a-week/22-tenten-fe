'use client';

import useScrollHook from '@/shared/hooks/useScrollHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import UserItem from '@/entities/users/ui/UserItem';
import useFollowingsHook from '../hooks/useFollowingsHook';

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
    <div className="flex w-full flex-col gap-2">
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
