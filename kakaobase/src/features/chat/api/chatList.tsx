import { PostsParams } from '@/features/feeds/posts/api/postList';
import api from '@/shared/api/api';

export default async function getChatList({ limit, cursor }: PostsParams) {
  try {
    const params: Record<string, any> = { limit };
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get('/chat/bot', { params });
    console.log(response);
    return response.data;
  } catch (e: unknown) {
    throw e;
  }
}
