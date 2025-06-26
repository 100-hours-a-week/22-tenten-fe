import { deletePost } from '../api/post';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';
import { usePathname, useRouter } from 'next/navigation';

export function usePostDeleteHook({ id }: { id: number }) {
  const router = useRouter();
  const path = usePathname();
  const { showToast } = useToast();
  const { selectedCourse } = useUserStore();

  async function deletePostExecute() {
    try {
      await deletePost({ postType: selectedCourse, id });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      showToast('삭제 완료! ✌️');
      if (path.includes('post')) router.push('/main'); //게시글 상세에서 게시글 지우기
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  }
  return { deletePostExecute };
}
