import { postComment } from '@/apis/comment';
import { queryClient } from '@/app/providers';
import { useToast } from '@/app/ToastContext';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function useCommentForm() {
  const [comment, setComment] = useState('');
  const path = usePathname();
  const param = useParams();
  const postId = Number(param.postId);
  const commentId = Number(param.commentId);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
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
      }
    } catch (e: any) {
      showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setComment('');
    }
  };

  return { comment, handleChange, handleSubmit };
}
