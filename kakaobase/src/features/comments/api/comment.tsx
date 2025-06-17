import api from '@/shared/api/api';

//댓글 삭제
export async function deleteComment({ id }: { id: number }) {
  try {
    const response = await api.delete(`comments/${id}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

export async function getComment({ id }: { id: number }) {
  try {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//댓글 생성
export async function postComment({
  postId,
  content,
  parent_id,
}: {
  postId: number;
  content: string;
  parent_id?: number;
}) {
  try {
    const response = await api.post(`/posts/${postId}/comments`, {
      content,
      parent_id,
    });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
