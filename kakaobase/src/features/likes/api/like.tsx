import { PostType } from '@/features/feeds/types/post';
import api from '@/shared/api/api';

interface idParam {
  feedId: number;
  feedType: PostType;
}

//좋아요 등록
export async function postLike({ feedId, feedType }: idParam) {
  try {
    const response = await api.post(`/${feedType}s/${feedId}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//좋아요 취소
export async function deleteLike({ feedId, feedType }: idParam) {
  try {
    const response = await api.delete(`/${feedType}s/${feedId}/likes`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
