import api from '../lib/api';
import { mapToPostEntity } from '@/lib/mapPost';

//프로필 정보 조회
export async function getUserInfo({ userId }: { userId: number }) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//사용자 게시글 목록 조회
export async function getMyPosts({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor?: number;
}) {
  try {
    const params: Record<string, any> = { limit };
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get(`/users/${userId}/posts`, {
      params,
    });
    return response.data.data.map((p: any) => mapToPostEntity(p, 'post'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

// 사용자 댓글 목록 조회
export async function getMyComments({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor?: number;
}) {
  try {
    const params: Record<string, any> = { limit };
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get(`/users/${userId}/comments`, {
      params,
    });

    return response.data.data.map((p: any) => mapToPostEntity(p, 'comment'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//사용자 좋아요 목록 조회
export async function getMyLikes({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor?: number;
}) {
  try {
    const params: Record<string, any> = { limit };
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get(`/users/${userId}/liked-posts`, {
      params,
    });
    return response.data.data.map((p: any) => mapToPostEntity(p, 'post'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
