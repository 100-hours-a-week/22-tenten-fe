import { getPost } from '../api/post';
import { mapToPostEntity } from '@/features/feeds/lib/mapPost';
import { useUserStore } from '@/entities/users/stores/userStore';
import { useQuery } from '@tanstack/react-query';

export default function usePostDetail({ id }: { id: number }) {
  const { selectedCourse } = useUserStore();

  const methods = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await getPost({ postType: selectedCourse, id });
      return mapToPostEntity(response, 'post');
    },
  });

  return {
    ...methods,
  };
}
