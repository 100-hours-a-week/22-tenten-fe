import { postComment } from '../../api/comment';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { recommentFormStateStore } from '../stores/recommentFormStateStore';
import { feedQueries } from '../../api/feedQueries';
import { useUserStore } from '@/entities/users/stores/userStore';
import { accountQueries } from '@/features/account/api/accountQueries';

export default function useCommentForm() {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { isWritingRecomment, commentId, stopRecomment } =
    recommentFormStateStore();
  const { selectedCourse } = useUserStore();
  const param = useParams();
  const postId = Number(param.postId);
  const { showToast, hideToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim() || loading) return;
    try {
      setLoading(true);
      if (isWritingRecomment) {
        await postComment({
          postId,
          content: comment,
          parent_id: commentId,
        });
        queryClient.invalidateQueries({
          queryKey: feedQueries.recommentsKey(commentId),
        });
        queryClient.invalidateQueries({
          queryKey: feedQueries.commentsKey(postId),
        });
        stopRecomment();
        hideToast();
        showToast('대댓글 달기 성공! ✌️');
      } else {
        await postComment({ postId, content: comment });
        showToast('댓글 달기 성공! ✌️');
        queryClient.invalidateQueries({
          queryKey: feedQueries.postKey(postId),
        });
        queryClient.invalidateQueries({
          queryKey: feedQueries.postsKey(selectedCourse),
        });
        queryClient.invalidateQueries({ queryKey: accountQueries.all() });
      }
      queryClient.invalidateQueries({
        queryKey: feedQueries.commentsKey(postId),
      });
      setComment('');
    } catch (e: any) {
      if (e.response.data.error === 'invalid_format') {
        showToast('댓글은 최대 2000자까지 작성할 수 있습니다. 😭');
      } else showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  };

  return { comment, handleChange, handleSubmit, loading };
}
