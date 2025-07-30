import postToS3 from '@/entities/images/api/imageS3';
import { postPost } from '../../api/post';
import { queryClient } from '@/shared/api/queryClient';
import { postSchema } from '../schemas/postSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';
import { feedQueries } from '../../api/feedQueries';
import { accountQueries } from '@/features/account/api/accountQueries';
import useRoutings from '@/shared/hooks/useRoutings';

export type NewPostData = z.infer<typeof postSchema>;

export const usePostEditorForm = () => {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const { selectedCourse, userId } = useUserStore();
  const { goMain } = useRoutings();

  const methods = useForm<NewPostData>({
    resolver: zodResolver(postSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      content: '',
      youtubeUrl: '',
      imageFile: undefined,
    },
  });

  const onSubmit = async (data: NewPostData) => {
    try {
      setLoading(true);
      let imageUrl = '';
      if (data.imageFile) {
        imageUrl = await postToS3(data.imageFile, 'post_image');
      }

      await postPost(
        { postType: selectedCourse },
        {
          content: data.content,
          image_url: imageUrl,
          youtube_url: data.youtubeUrl,
        }
      );
      queryClient.invalidateQueries({
        queryKey: feedQueries.postsKey(selectedCourse),
      });
      queryClient.invalidateQueries({
        queryKey: accountQueries.myPostsKey(userId),
      });
      showToast('게시글 등록 성공! ✌️');
    } catch (e: any) {
      showToast('게시글 업로드 실패! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
      goMain();
    }
  };

  return {
    ...methods,
    onSubmit,
    isLoading,
  };
};
