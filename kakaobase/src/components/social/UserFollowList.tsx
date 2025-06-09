'use client';

import LoadingSmall from '../common/loading/LoadingSmall';
import UserItem from './UserItem';
import useFollowListHook from '@/hooks/social/useFollowListHook';

export default function UserFollowList({ userId }: { userId: number }) {
  const { data, hasNextPage, isFetching } = useFollowListHook({ userId });
  return (
    <div className="flex flex-col my-[6rem] p-2 bg-containerColor rounded-lg flex-grow self-center w-full max-w-sm animate-slide-in overflow-y-auto gap-2">
      {data?.pages.flat().map((item) => (
        <UserItem key={item.id} data={item} />
      ))}
      {isFetching && <LoadingSmall />}
      {!hasNextPage && (
        <div className="flex justify-center text-xs">
          {' '}
          더이상 표시할 유저가 없습니다.
        </div>
      )}
    </div>
  );
}
