'use client';

import UserItem from '../../../entities/users/ui/UserItem';
import useLikeListHook from '../hooks/useLikeListHook';
import LoadingSmall from '@/shared/ui/loading/LoadingSmall';
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
    <div
      className="flex flex-col my-[6rem] p-2 bg-containerColor rounded-lg flex-grow self-center w-full max-w-sm animate-slide-in overflow-y-auto gap-2"
      data-scroll-area
    >
      {data?.pages.flat().map((item) => (
        <UserItem key={item.id} data={item} />
      ))}
      {isPending && <LoadingSmall />}
      {hasNextPage && <div className="h-[1px]" ref={observerRef} />}
      {!hasNextPage && (
        <div className="flex justify-center text-xs">
          {' '}
          더이상 표시할 유저가 없습니다.
        </div>
      )}
    </div>
  );
}
