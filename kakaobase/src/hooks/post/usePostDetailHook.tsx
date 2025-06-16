import { useEffect, useState } from 'react';
import { getPost } from '@/apis/post';
import { mapToPostEntity } from '@/lib/mapPost';
import { usePathname, useRouter } from 'next/navigation';
import { getComment } from '@/apis/comment';
import { PostEntity } from '@/stores/postType';
import { useToast } from '@/app/ToastContext';
import { useUserStore } from '@/stores/userStore';

export default function usePostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostEntity>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { selectedCourse } = useUserStore();
  const { showToast } = useToast();
  const path = usePathname();
  const router = useRouter();

  const fetchPost = async () => {
    let response = [];
    try {
      setLoading(true);
      if (path.includes('comment')) {
        response = await getComment({ id });
        setPost(mapToPostEntity(response.data.data, 'comment'));
      } else {
        response = await getPost({ postType: selectedCourse, id });
        setPost(mapToPostEntity(response, 'post'));
      }
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
