import postToS3 from '@/apis/imageS3';
import { postPost } from '@/features/posts/api/post';
import { queryClient } from '@/app/providers';
import { postSchema } from '@/features/posts/schemas/postSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/app/ToastContext';
import { useUserStore } from '@/stores/userStore';

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
      router.push(`/`);
    } catch (e: any) {
      if (e.response.data.error === 'unauthorized') {
        showToast('로그인이 필요합니다. 😭');
      } else {
        showToast('게시글 업로드 실패! 잠시 후 다시 시도해 주세요. 😭');
        router.push('/');
      }
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
