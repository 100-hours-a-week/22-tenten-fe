import { deleteComment } from '../api/comment';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import { usePathname, useRouter } from 'next/navigation';

export function useCommentDeleteHook({ id }: { id: number }) {
  const router = useRouter();
  const path = usePathname();
  const { showToast } = useToast();

  async function deleteCommentExecute() {
    try {
      await deleteComment({ id });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      showToast('삭제 완료! ✌️');
      if (path.includes('comment')) router.back(); //댓글 상세에서 댓글 지우기
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  }

  return { deleteCommentExecute };
}
