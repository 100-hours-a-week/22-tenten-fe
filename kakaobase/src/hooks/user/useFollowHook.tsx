import { deleteFollow, postFollow } from '@/apis/follow';
import { queryClient } from '@/app/providers';
import { useToast } from '@/app/ToastContext';
import { useEffect, useState } from 'react';

export function useFollowToggle(initial: boolean, id: number) {
  const [following, setFollowing] = useState(initial);
  const { showToast } = useToast();

  useEffect(() => {
    if (initial !== undefined) {
      setFollowing(initial);
    }
  }, [initial]);

  const toggleFollow = async () => {
    try {
      if (following) {
        await deleteFollow({ id });
        showToast('언팔로우 성공! ✌️');
      } else {
        postFollow({ id });
        showToast('팔로우 성공! ✌️');
      }
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['recomments'] });
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
