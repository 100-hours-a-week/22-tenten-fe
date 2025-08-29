import { feedQueries } from '@/features/feeds/api/feedQueries';
import { deleteFollow, postFollow } from '../api/follow';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/entities/users/stores/userStore';
import { accountInfoQueries } from '@/features/account/api/accountInfoQueries';
import { followQueries } from '../api/followQueries';

export function useFollowToggle(initial: boolean, id: number) {
  const [following, setFollowing] = useState(initial);
  const { userId } = useUserStore();
  const { showToast, hideToast } = useToast();

  useEffect(() => {
    if (initial !== undefined) {
      setFollowing(initial);
    }
  }, [initial]);

  const toggleFollow = async () => {
    try {
      hideToast();
      if (following) {
        await deleteFollow({ id });
        showToast('언팔로우 성공! ✌️');
      } else {
        await postFollow({ id });
        showToast('팔로우 성공! ✌️');
      }
      setFollowing((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: feedQueries.all() });
      queryClient.invalidateQueries({
        queryKey: accountInfoQueries.all(),
      });
      queryClient.invalidateQueries({
        queryKey: followQueries.all(),
      });
    } catch (e) {
      if (following) showToast('언팔로우 실패 😭');
      else showToast('팔로우 실패 😭');
    }
  };

  return {
    following,
    toggleFollow,
  };
}
