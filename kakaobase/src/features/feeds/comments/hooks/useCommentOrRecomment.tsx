import { recommentFormStateStore } from '../stores/recommentFormStateStore';
import { PostEntity } from '../../types/post';

export default function useCommentOrRecomment({ post }: { post: PostEntity }) {
  const { isWritingRecomment, isRecommentOpen, setWritingObjectState } =
    recommentFormStateStore();

  function writeRecomment() {
    setWritingObjectState({
      commentId: post.id,
      commentWriter: post.nickname,
      isRecommentOpen: true,
      isWritingRecomment: true,
    });
  }
  function stopRecomment() {
    setWritingObjectState({
      commentId: 0,
      commentWriter: '',
      isWritingRecomment: false,
    });
  }
  function handleRecommentWritingState() {
    if (isWritingRecomment) stopRecomment();
    else writeRecomment();
  }
  function openRecomment() {
    setWritingObjectState({
      isRecommentOpen: true,
    });
  }
  function closeRecomment() {
    setWritingObjectState({
      isRecommentOpen: false,
    });
  }
  function handleRecommentShowState() {
    if (isRecommentOpen) closeRecomment();
    else openRecomment();
  }
  return {
    handleRecommentWritingState,
    handleRecommentShowState,
    openRecomment,
    closeRecomment,
  };
}
