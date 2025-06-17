import api from '@/shared/lib/api';
import type { Post } from '@/entities/feeds/types/post';
import { mapToPostEntity } from '@/entities/feeds/lib/mapPost';

export interface PostsParams {
  limit?: number;
  cursor?: number;
  course?: string;
}

export default async function getPosts({
  limit,
  cursor,
  course,
}: PostsParams): Promise<Post[]> {
  try {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    const response = await api.get(`/posts/${course}`, {
      params,
    });

    return response.data.data.map((p: any) => mapToPostEntity(p, 'post'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
