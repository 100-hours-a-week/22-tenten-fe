import { PostsParams } from '@/features/feeds/posts/api/postList';
import { Chat, ChatList } from '../types/Chats';
import api from '@/shared/api/api';

export default async function getChatList({
  limit,
  cursor,
}: PostsParams): Promise<Chat[]> {
  try {
    const params: Record<string, any> = { limit };
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get('/chat/bot', { params });
    return response.data.data.chats;
  } catch (e: unknown) {
    throw e;
  }
}
