import { Course } from '@/shared/types/Course';
import api from '@/shared/api/api';

interface postParams {
  postType: Course;
  id?: number;
}

//게시글 삭제
export async function deletePost({ postType, id }: postParams) {
  try {
    const response = await api.delete(`posts/${postType}/${id}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

interface postBody {
  content?: string;
  image_url?: string;
  youtube_url?: string;
}

//게시글 생성
export async function postPost(
  { postType }: postParams,
  { content, image_url, youtube_url }: postBody
) {
  try {
    const response = await api.post(`/posts/${postType}`, {
      content,
      image_url,
      youtube_url,
    });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//게시글 상세 조회
export async function getPost({ postType, id }: postParams) {
  try {
    const response = await api.get(`/posts/${postType}/${id}`);
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
