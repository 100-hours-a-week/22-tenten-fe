import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUserStore } from '@/entities/users/stores/userStore';
import { feedQueries } from '../../api/feedQueries';

export default function usePostList() {
  const { selectedCourse } = useUserStore();

  useEffect(() => {
    const targetId = sessionStorage.getItem('scrollToPostId');
    if (!targetId) return;

    const el = document.querySelector(`[data-post-id="${targetId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    sessionStorage.removeItem('scrollToPostId');
  }, []);

  const methods = useInfiniteQuery(feedQueries.posts(selectedCourse));

  return { ...methods };
}
