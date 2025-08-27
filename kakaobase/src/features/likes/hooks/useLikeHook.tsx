import { deleteLike, postLike } from '@/features/likes/api/like';
import { queryClient } from '@/shared/api/queryClient';
import { useEffect, useState } from 'react';
import { likeQueries } from '../api/likeQueries';
import { PostType } from '@/features/feeds/types/post';
import { useToast } from '@/shared/hooks/ToastContext';
import { feedQueries } from '@/features/feeds/api/feedQueries';
import { accountListQueries } from '@/features/account/api/accountListQueries';

export function useLikeToggle(
  initial: boolean,
  likeCnt: number,
  id: number,
  type: PostType
) {
  const [isLiked, setLiked] = useState(initial);
  const [likeCount, setLikeCount] = useState(likeCnt);
  const { showToast } = useToast();

  useEffect(() => {
    setLiked(initial);
    setLikeCount(likeCnt);
  }, [initial, likeCnt]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isLiked) {
        await deleteLike({ feedId: id, feedType: type });
        setLikeCount((prev) => prev - 1);
        showToast('좋이요 삭제 완료 ✌️');
      } else {
        await postLike({ feedId: id, feedType: type });
        setLikeCount((prev) => prev + 1);
        showToast('좋이요 등록 완료 ✌️');
      }
      queryClient.invalidateQueries({
        queryKey: likeQueries.all(),
      });
      queryClient.invalidateQueries({
        queryKey: feedQueries.all(),
      });
      queryClient.invalidateQueries({
        queryKey: accountListQueries.all(),
      });
      setLiked(!isLiked);
    } catch (e) {
      showToast('좋이요 실패 😭');
    }
  };

  return {
    likeCount,
    isLiked,
    toggleLike,
  };
}
