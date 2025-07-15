import api from '@/shared/api/api';

//대댓글 삭제
export async function deleteRecomment({ id }: { id: number }) {
  try {
    const response = await api.delete(`recomments/${id}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
