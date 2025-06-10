import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

//프로필 정보 조회
export default async function getUserInfo({ userId }: { userId: number }) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
