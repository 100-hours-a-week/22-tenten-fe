import api from '@/shared/api/api';
import { mapToPostEntity } from '@/features/feeds/lib/mapPost';
import { PostsParams } from '../types/postParams';
import { Post } from '../types/post';

//게시글 목록 조회
export async function getPosts({
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

//댓글 목록 조회
export async function getComments(
  id: number,
  { limit, cursor }: PostsParams
): Promise<Post[]> {
  try {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    const response = await api.get(`/posts/${id}/comments`, {
      params,
    });

    return response.data.data.map((p: any) => mapToPostEntity(p, 'comment'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}

//대댓글 목록 조회
export async function getRecomments(
  commentId: number,
  { limit, cursor }: PostsParams
): Promise<Post[]> {
  try {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get(`/comments/${commentId}/recomments`, {
      params,
    });
    return response.data.data.map((p: any) => mapToPostEntity(p, 'recomment'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
