import { recommentFormStateStore } from '../comments/stores/recommentFormStateStore';
import { PostEntity } from '../types/post';

export default function RecommentHandler({ post }: { post: PostEntity }) {
  const {
    isWritingRecomment,
    isRecommentOpen,
    commentId,
    writeRecomment,
    stopRecomment,
    hideRecomment,
    showRecomment,
  } = recommentFormStateStore();

  return (
    <div className="text-xs flex gap-4 ">
      <div
        onClick={() => {
          if (isWritingRecomment && commentId === post.id) {
            stopRecomment();
          } else {
            writeRecomment({ id: post.id, name: post.nickname });
          }
        }}
      >
        {isWritingRecomment && commentId === post.id ? '취소' : '답글 달기'}
      </div>
      <div
        onClick={
          isRecommentOpen && commentId === post.id
            ? hideRecomment
            : () => showRecomment({ id: post.id })
        }
      >
        {isRecommentOpen && commentId === post.id ? '숨기기' : '대댓글 보기'}
      </div>
    </div>
  );
}
