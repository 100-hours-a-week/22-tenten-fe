import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

//게시글 좋아요 목록
export async function getPostLikes({ postId }: { postId: number }) {
  try {
    const response = await api.get(`/posts/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//댓글 좋아요 목록
export async function getCommentLikes({ postId }: { postId: number }) {
  try {
    const response = await api.get(`/comments/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//대댓글 좋아요 목록
export async function getRecommentLikes({ postId }: { postId: number }) {
  try {
    const response = await api.get(`/recomments/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
