import { PostType } from '@/features/feeds/types/post';
import api from '@/shared/api/api';

//좋아요 목록
export async function getLikes({
  feedId,
  feedType,
  limit,
  cursor,
}: {
  feedId: number;
  feedType: PostType;
  limit: number;
  cursor?: number;
}) {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get(`/${feedType}s/${feedId}/likes`, {
      params,
    });
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
