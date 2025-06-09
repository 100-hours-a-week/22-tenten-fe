import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

//팔로우 요청 api
export async function postFollow({ id }: { id: number }) {
  try {
    await api.post(
      `/users/${id}/follows`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getClientCookie('accessToken')}`,
        },
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//팔로우 취소 api
export async function deleteFollow({ id }: { id: number }) {
  try {
    await api.delete(`/users/${id}/follows`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//팔로워 목록 조회
export async function getFollowers({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor?: number;
}) {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get(`/users/${userId}/followers`, {
      params,
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//팔로잉 목록 조회
export async function getFollowings({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor?: number;
}) {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get(`/users/${userId}/followings`, {
      params,
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
