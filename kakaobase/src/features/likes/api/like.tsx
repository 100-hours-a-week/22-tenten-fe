import api from '@/shared/api/api';

interface idParam {
  id: number;
}

//게시글 좋아요 등록
export async function likePost({ id }: idParam) {
  try {
    const response = await api.post(`/posts/${id}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//게시글 좋아요 취소
export async function deletePostLike({ id }: idParam) {
  try {
    const response = await api.delete(`/posts/${id}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//댓글 좋아요 등록
export async function likeComment({ id }: idParam) {
  try {
    const response = await api.post(`/comments/${id}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//댓글 좋아요 취소
export async function deleteCommentLike({ id }: idParam) {
  try {
    const response = await api.delete(`/comments/${id}/likes`, {});
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//대댓글 좋아요 등록
export async function likeRecomment({ id }: idParam) {
  try {
    const response = await api.post(`/recomments/${id}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//대댓글 좋아요 취소
export async function deleteRecommentLike({ id }: idParam) {
  try {
    const response = await api.delete(`/recomments/${id}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
