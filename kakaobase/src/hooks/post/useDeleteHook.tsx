import { deleteComment } from '@/apis/comment';
import { deletePost } from '@/features/posts/api/post';
import { deleteRecomment } from '@/apis/recomment';
import { queryClient } from '@/app/providers';
import { useToast } from '@/app/ToastContext';
import { useUserStore } from '@/stores/userStore';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDeleteHook({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const path = usePathname();
  const [isOpened, setOpen] = useState(false);
  const { showToast } = useToast();
  const { selectedCourse } = useUserStore();
  async function deletePostExecute() {
    try {
      if (type === 'post') {
        await deletePost({ postType: selectedCourse, id });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      } else if (type === 'comment') {
        await deleteComment({ id });
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      } else {
        await deleteRecomment({ id });
        queryClient.invalidateQueries({ queryKey: ['recomments'] });
      }
      setOpen(false);
      showToast('삭제 완료! ✌️');
      if (path.includes('post') && type === 'post')
        router.push('/'); //게시글 상세에서 게시글 지우기
      else if (path.includes('comment') && type === 'comment') router.back(); //댓글 상세에서 댓글 지우기
      //얘도 나중에 바꿔야 함
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
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
