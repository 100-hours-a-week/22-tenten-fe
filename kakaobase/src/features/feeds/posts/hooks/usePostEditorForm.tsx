import postToS3 from '@/entities/images/api/imageS3';
import { postPost } from '../../api/post';
import { queryClient } from '@/shared/api/queryClient';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';
import { feedQueries } from '../../api/feedQueries';
import useRoutings from '@/shared/hooks/useRoutings';
import { accountListQueries } from '@/features/account/api/accountListQueries';
import { accountInfoQueries } from '@/features/account/api/accountInfoQueries';

export type NewPostData = {
  content?: string;
  youtubeUrl?: string;
  imageFile?: File;
};

export const usePostEditorForm = () => {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const { selectedCourse, userId } = useUserStore();
  const { goMain } = useRoutings();

  const methods = useForm<NewPostData>({
    resolver: async (...args) => {
      const [{ z }, { zodResolver }, { postSchema }] = await Promise.all([
        import('zod'),
        import('@hookform/resolvers/zod'),
        import('../schemas/postSchema'),
      ]);
      const schema = z.object({ postSchema });
      return zodResolver(schema)(...args);
    },
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
        queryKey: accountListQueries.myPostsKey(userId),
      });
      queryClient.invalidateQueries({
        queryKey: accountInfoQueries.all(),
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
