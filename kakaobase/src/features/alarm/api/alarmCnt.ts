import api from '@/shared/api/api';

export default async function getAlarmCnt() {
  try {
    const response = await api.get('/users/notifications/counts');
    return response.data.data.count;
  } catch (e: unknown) {
    throw e;
  }
}
