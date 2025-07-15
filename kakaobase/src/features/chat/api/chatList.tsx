import { Chat } from '../types/Chat';
import api from '@/shared/api/api';

interface ChatsParams {
  limit?: number;
  cursor?: number;
}

export default async function getChatList({
  limit,
  cursor,
}: ChatsParams): Promise<Chat[]> {
  try {
    const params: Record<string, any> = { limit };
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get('/chat/bot', { params });
    return response.data.data.chats;
  } catch (e: unknown) {
    throw e;
  }
}
