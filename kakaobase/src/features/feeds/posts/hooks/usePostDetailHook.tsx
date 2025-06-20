import { useEffect, useState } from 'react';
import { getPost } from '../api/post';
import { mapToPostEntity } from '@/features/feeds/lib/mapPost';
import { useRouter } from 'next/navigation';
import { PostEntity } from '@/features/feeds/types/post';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';

export default function usePostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostEntity>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { selectedCourse } = useUserStore();
  const { showToast } = useToast();
  const router = useRouter();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await getPost({ postType: selectedCourse, id });
      setPost(mapToPostEntity(response, 'post'));
    } catch (e: any) {
      setError(e as Error);
      if (e.response.data.error === 'unauthorized') {
        showToast('로그인이 필요합니다. 😭');
      } else {
        showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return {
    post,
    loading,
    error,
  };
}
