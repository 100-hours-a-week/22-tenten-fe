import { deleteRecomment } from '../api/recomment';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';

export function useRecommentDeleteHook({ id }: { id: number }) {
  const { showToast } = useToast();
  async function deleteRecommentExecute() {
    try {
      await deleteRecomment({ id });
      queryClient.invalidateQueries({ queryKey: ['recomments'] });
      showToast('삭제 완료! ✌️');
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  }

  return { deleteRecommentExecute };
}
