import { useCallback, useState } from 'react';
import getPosts from '@/apis/postList';
import { useParams, usePathname, useRouter } from 'next/navigation';
import getComments from '@/apis/commentList';
import { getRecomments } from '@/apis/recomment';
import type { PostEntity } from '@/stores/postType';

export default function usePosts(limit: number, course: string) {
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const path = usePathname();
  const param = useParams();
  const router = useRouter();

  const fetchPosts = useCallback(
    async (reset: boolean = false) => {
      if (!reset && loading) return;

      const postId = Number(param.postId);
      const commentId = Number(param.commentId);

      try {
        setLoading(true);

        if (reset) {
          setCursor(undefined);
          setPosts([]);
          setHasMore(true);
        }

        const currentCursor = reset ? undefined : cursor;
        let data: PostEntity[] = [];

        if (path.includes('comment')) {
          data = await getRecomments(commentId, {
            limit,
            cursor: currentCursor,
          });
        } else if (path.includes('post')) {
          data = await getComments(postId, { limit, cursor: currentCursor });
        } else {
          data = await getPosts({ limit, cursor: currentCursor, course });
        }

        if (reset) {
          setPosts(data);
        } else {
          setPosts((prev) => [
            ...prev,
            ...data.filter((newPost) => !prev.some((p) => p.id === newPost.id)),
          ]);
        }

        setCursor(data.length > 0 ? data[data.length - 1].id : undefined);
        setHasMore(data.length === limit);
      } catch (e: any) {
        setError(e as Error);
        if (e.response.data.error === 'unauthorized') {
          router.push('/login');
        } else {
          alert('문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, limit, cursor, path, param, course]
  );

  return { posts, loading, error, hasMore, fetchPosts };
}
