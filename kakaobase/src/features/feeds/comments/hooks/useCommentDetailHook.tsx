import { useEffect, useState } from 'react';
import { mapToPostEntity } from '@/features/feeds/lib/mapPost';
import { useRouter } from 'next/navigation';
import { getComment } from '../api/comment';
import { PostEntity } from '@/features/feeds/types/post';
import { useToast } from '@/shared/hooks/ToastContext';

export default function useCommentDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostEntity>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();
  const router = useRouter();

  const fetchComment = async () => {
    try {
      setLoading(true);
      const response = await getComment({ id });
      setPost(mapToPostEntity(response.data.data, 'comment'));
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
    fetchComment();
  }, [id]);

  return {
    post,
    loading,
    error,
  };
}
