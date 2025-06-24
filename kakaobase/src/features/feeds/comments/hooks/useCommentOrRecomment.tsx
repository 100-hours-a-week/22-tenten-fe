import { useToast } from '@/shared/hooks/ToastContext';
import { commentFormStateStore } from '../stores/commentFormStateStore';
import { PostEntity } from '../../types/post';

export default function useCommentOrRecomment({
  post,
  handleRecommentVisibility,
  isOpen,
}: {
  post: PostEntity;
  handleRecommentVisibility?: () => void;
  isOpen?: boolean;
}) {
  const { isWritingRecomment, setWritingObjectState, clear } =
    commentFormStateStore();
  const { openToast, hideToast } = useToast();

  function handleRecomment() {
    if (!isWritingRecomment) {
      setWritingObjectState({
        isWritingRecomment: true,
        commentId: post.id,
      });
      openToast(`${post.nickname} 님에게 답글 다는 중 💬`);
      if (!isOpen) {
        handleRecommentVisibility?.();
      }
    } else {
      clear();
      hideToast();
    }
  }
  return { handleRecomment };
}
