import { postComment } from '../api/comment';
import { queryClient } from '@/shared/api/queryClient';
import { useToast } from '@/shared/hooks/ToastContext';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function useCommentForm() {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const param = useParams();
  const postId = Number(param.postId);
  const commentId = Number(param.commentId);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim() || loading) return;
    try {
      setLoading(true);
      if (path.includes('comment')) {
        await postComment({
          postId,
          content: comment,
          parent_id: commentId,
        });
        queryClient.invalidateQueries({ queryKey: ['recomments'] });
      } else {
        await postComment({ postId, content: comment });
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        queryClient.invalidateQueries({ queryKey: ['post', postId] });
      }
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
