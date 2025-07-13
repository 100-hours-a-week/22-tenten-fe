import { deleteComment } from '../api/comment';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import useRoutings from '@/shared/hooks/useRoutings';
import { useParams, usePathname } from 'next/navigation';

export function useCommentDeleteHook({ id }: { id: number }) {
  const path = usePathname();
  const params = useParams();
  const postId = Number(params.postId);
  const { showToast } = useToast();
  const { goBack } = useRoutings();

  async function deleteCommentExecute() {
    try {
      await deleteComment({ id });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      showToast('삭제 완료! ✌️');
      if (path.includes('comment')) goBack(); //댓글 상세에서 댓글 지우기
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  }

  return { deleteCommentExecute };
}
