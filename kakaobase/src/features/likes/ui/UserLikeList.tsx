'use client';

import UserItem from '../../../entities/users/ui/UserItem';
import useLikeListHook from '../hooks/useLikeListHook';
import LoadingSmall from '@/shared/ui/LoadingSmall';
import useScrollHook from '@/shared/hooks/useScrollHook';

export default function UserLikeList({
  postId,
  postType,
}: {
  postId: number;
  postType: string;
}) {
  const {
    data,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useLikeListHook({
    postId,
    postType,
  });
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
