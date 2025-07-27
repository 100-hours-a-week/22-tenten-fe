import { deletePost } from '../../api/post';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';
import { usePathname } from 'next/navigation';
import { feedQueries } from '../../api/feedQueries';
import { accountQueries } from '@/features/account/api/accountQueries';
import useRoutings from '@/shared/hooks/useRoutings';

export function usePostDeleteHook({ id }: { id: number }) {
  const path = usePathname();
  const { showToast } = useToast();
  const { selectedCourse } = useUserStore();
  const { goMain } = useRoutings();

  async function deletePostExecute() {
    try {
      await deletePost({ postType: selectedCourse, id });
      queryClient.invalidateQueries({
        queryKey: feedQueries.postsKey(selectedCourse),
      });
      queryClient.invalidateQueries({
        queryKey: accountQueries.all(),
      });
      showToast('삭제 완료! ✌️');
      if (path.includes('post')) goMain(); //게시글 상세에서 게시글 지우기
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  }
  return { deletePostExecute };
}
