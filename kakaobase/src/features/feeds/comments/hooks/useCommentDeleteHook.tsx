import { deleteComment } from '../../api/comment';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import useRoutings from '@/shared/hooks/useRoutings';
import { useParams, usePathname } from 'next/navigation';
import { feedQueries } from '../../api/feedQueries';
import { useUserStore } from '@/entities/users/stores/userStore';
import { accountListQueries } from '@/features/account/api/accountListQueries';

export function useCommentDeleteHook({ id }: { id: number }) {
  const path = usePathname();
  const params = useParams();
  const postId = Number(params.postId);
  const { showToast } = useToast();
  const { goBack } = useRoutings();
  const { selectedCourse, userId } = useUserStore();

  async function deleteCommentExecute() {
    try {
      await deleteComment({ id });
      queryClient.invalidateQueries({ queryKey: feedQueries.postKey(postId) });
      queryClient.invalidateQueries({
        queryKey: feedQueries.postsKey(selectedCourse),
      });
      queryClient.invalidateQueries({
        queryKey: feedQueries.commentsKey(postId),
      });
      queryClient.invalidateQueries({
        queryKey: accountListQueries.all(),
      });
      showToast('삭제 완료! ✌️');
      if (path.includes('comment')) goBack(); //댓글 상세에서 댓글 지우기
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  }

  return { deleteCommentExecute };
}
