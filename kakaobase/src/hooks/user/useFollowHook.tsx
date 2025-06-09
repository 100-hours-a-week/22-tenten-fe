import { deleteFollow, postFollow } from '@/apis/follow';
import { useToast } from '@/app/ToastContext';
import { useState } from 'react';

export function useFollowToggle(initial: boolean, id: number) {
  const [following, setFollowing] = useState(initial);
  const { showToast } = useToast();

  const toggleFollow = async () => {
    try {
      if (following) {
        await deleteFollow({ id });
        showToast('언팔로우 성공! ✌️');
      } else {
        postFollow({ id });
        showToast('팔로우 성공! ✌️');
      }
      setFollowing(!following);
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
