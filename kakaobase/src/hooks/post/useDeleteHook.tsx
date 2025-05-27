import { deleteComment } from '@/apis/comment';
import { refreshToken } from '@/apis/login';
import { deletePost } from '@/apis/post';
import { deleteRecomment } from '@/apis/recomment';
import { queryClient } from '@/app/providers';
import { PostType } from '@/lib/postType';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDeleteHook({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const path = usePathname();
  const [isOpened, setOpen] = useState(false);
  async function deletePostExecute() {
    const postType =
      typeof window !== 'undefined'
        ? (localStorage.getItem('currCourse') as PostType) || 'ALL'
        : 'ALL';
    try {
      if (type === 'post') {
        await deletePost({ postType, id });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      } else if (type === 'comment') {
        await deleteComment({ id });
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      } else {
        await deleteRecomment({ id });
        queryClient.invalidateQueries({ queryKey: ['recomments'] });
      }
      setOpen(false);
      if (path.includes('post') && type === 'post')
        router.push('/'); //게시글 상세에서 게시글 지우기
      else if (path.includes('comment') && type === 'comment') router.back(); //댓글 상세에서 댓글 지우기
      //얘도 나중에 바꿔야 함
    } catch (e: any) {
      if (e.response.data.error === 'unauthorized') {
        refreshToken();
      } else {
        alert('문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        router.push('/');
      }
      console.log(e);
    }
  }
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  return { isOpened, deletePostExecute, closeModal, openModal };
}
