import { Post } from '@/features/feeds/types/post';
import api from '@/shared/api/api';
import { mapToPostEntity } from '@/features/feeds/lib/mapPost';
import { PostsParams } from '../../posts/api/postList';

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

    return response.data.data.map((p: any) => mapToPostEntity(p, 'comment'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
