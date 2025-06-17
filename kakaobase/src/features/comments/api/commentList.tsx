import { Post } from '@/types/post/post';
import api from '@/lib/api';
import { mapToPostEntity } from '@/lib/mapPost';
import { PostsParams } from '@/features/posts/api/postList';

export default async function getComments(
  id: number,
  { limit, cursor }: PostsParams
): Promise<Post[]> {
  try {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    const response = await api.get(`/posts/${id}/comments`, {
      params,
    });

    return response.data.data.comments.map((p: any) =>
      mapToPostEntity(p, 'comment')
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
