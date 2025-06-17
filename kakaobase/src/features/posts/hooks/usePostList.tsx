import getPosts from '@/features/posts/api/postList';
import { PostEntity } from '@/types/post/post';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

export default function usePostList(): UseInfiniteQueryResult<
  InfiniteData<PostEntity[]>,
  Error
> {
  const { selectedCourse } = useUserStore();

  useEffect(() => {
    const targetId = sessionStorage.getItem('scrollToPostId');
    if (!targetId) return;

    const el = document.querySelector(`[data-post-id="${targetId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    sessionStorage.removeItem('scrollToPostId');
    sessionStorage.removeItem('scrollPosition');
  }, []);

  return useInfiniteQuery({
    queryKey: ['posts', selectedCourse],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getPosts({
        limit: 6,
        cursor: pageParam,
        course: selectedCourse,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    initialPageParam: undefined,
  });
}
