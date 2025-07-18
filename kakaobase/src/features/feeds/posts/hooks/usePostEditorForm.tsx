import postToS3 from '@/entities/images/api/imageS3';
import { postPost } from '../api/post';
import { queryClient } from '@/shared/api/queryClient';
import { postSchema } from '../schemas/postSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';

export type NewPostData = z.infer<typeof postSchema>;

export const usePostEditorForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const { selectedCourse } = useUserStore();

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
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      showToast('게시글 등록 성공! ✌️');
      router.push(`/main`);
    } catch (e: any) {
      showToast('게시글 업로드 실패! 잠시 후 다시 시도해 주세요. 😭');
      router.push('/main');
    } finally {
      setLoading(false);
    }
  };

  return {
    ...methods,
    onSubmit,
    isLoading,
  };
};
