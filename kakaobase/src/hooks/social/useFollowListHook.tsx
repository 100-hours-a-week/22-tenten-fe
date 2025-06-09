import { getFollowers, getFollowings } from '@/apis/follow';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function useFollowListHook({ userId }: { userId: number }) {
  const path = usePathname();
  //팔로워 목록
  if (path.includes('follwers')) {
    return useInfiniteQuery({
      queryKey: ['followers', userId],
      queryFn: async ({ pageParam }: { pageParam?: number }) => {
        const response = await getFollowings({
          userId: userId,
          limit: 30,
          cursor: pageParam,
        });
        return response;
      },
      getNextPageParam: (lastPage) => lastPage.at(-1),
      initialPageParam: undefined,
    });
  } else {
    //팔로잉 목록
    return useInfiniteQuery({
      queryKey: ['followings', userId],
      queryFn: async ({ pageParam }: { pageParam?: number }) => {
        const response = await getFollowers({
          userId: userId,
          limit: 30,
          cursor: pageParam,
        });
        return response;
      },
      getNextPageParam: (lastPage) => lastPage.at(-1),
      initialPageParam: undefined,
    });
  }
}
