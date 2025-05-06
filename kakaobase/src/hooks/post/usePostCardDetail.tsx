import { useEffect, useState } from 'react';
import getPosts from '@/apis/postList';
import { PostState } from '@/stores/postStore';

export default function usePostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostState>();
  //const postType = 'pangyo_2';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts({});
        setPost(data.find((post) => post.id === id));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  return {
    post,
    loading,
    error,
  };
}
