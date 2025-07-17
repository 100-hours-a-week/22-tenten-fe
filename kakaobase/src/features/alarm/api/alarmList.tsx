import api from '@/shared/api/api';
import { AlarmFetchData } from '../types/AlarmResponse';

export default async function getAlarms({
  limit,
  cursor,
}: {
  limit?: number;
  cursor?: number;
}): Promise<AlarmFetchData> {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get('/users/notifications', params);
    return response.data.data;
  } catch (e: unknown) {
    throw e;
  }
}
