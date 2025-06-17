import api from '@/shared/lib/api';

//게시글 좋아요 목록
export async function getPostLikes({
  postId,
  limit,
  cursor,
}: {
  postId: number;
  limit: number;
  cursor?: number;
}) {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get(`/posts/${postId}/likes`, {
      params,
    });
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//댓글 좋아요 목록
export async function getCommentLikes({
  postId,
  limit,
  cursor,
}: {
  postId: number;
  limit: number;
  cursor?: number;
}) {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get(`/comments/${postId}/likes`, {
      params,
    });
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//대댓글 좋아요 목록
export async function getRecommentLikes({
  postId,
  limit,
  cursor,
}: {
  postId: number;
  limit: number;
  cursor?: number;
}) {
  const params: Record<string, any> = { limit };
  if (cursor !== undefined) params.cursor = cursor;
  try {
    const response = await api.get(`/recomments/${postId}/likes`, {
      params,
    });
    return response.data.data;
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof Error) throw e;
  }
}
