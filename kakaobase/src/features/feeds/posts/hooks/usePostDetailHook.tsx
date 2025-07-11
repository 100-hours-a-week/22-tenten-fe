import { useUserStore } from '@/entities/users/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { feedQueries } from '../../api/feedQueries';

export default function usePostDetail({ id }: { id: number }) {
  const { selectedCourse } = useUserStore();

  const methods = useQuery(feedQueries.postDetail(id, selectedCourse));

  return {
    ...methods,
  };
}
