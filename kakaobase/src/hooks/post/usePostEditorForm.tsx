import postToS3 from '@/apis/imageS3';
import { refreshToken } from '@/apis/login';
import { postPost } from '@/apis/post';
import { queryClient } from '@/app/providers';
import { PostType } from '@/lib/postType';
import { postSchema } from '@/schemas/postSchema';
import { usePostStore } from '@/stores/postStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useTokenCheck from '../user/useTokenCheckHook';

export type NewPostData = z.infer<typeof postSchema>;

export const usePostEditorForm = () => {
  const router = useRouter();
  const content = usePostStore((state) => state.content);
  const youtubeUrl = usePostStore((state) => state.youtubeUrl);
  const imageUrl = usePostStore((state) => state.imageUrl);
  const [isLoading, setLoading] = useState(false);
  const { checkUnauthorized } = useTokenCheck();

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
    checkUnauthorized();
    let postType = localStorage.getItem('currCourse') as PostType;
    if (!postType) postType = 'ALL';

    try {
      setLoading(true);
      let imageUrl = '';
      if (data.imageFile) {
        imageUrl = await postToS3(data.imageFile, 'post_image');
      }

      await postPost(
        { postType },
        {
          content: data.content,
          image_url: imageUrl,
          youtube_url: data.youtubeUrl,
        }
      );

      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.push(`/`);
    } catch (e: any) {
      if (e.response.data.error === 'unauthorized') {
        refreshToken();
      } else {
        alert(
          '게시글 업로드 실패 : 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    ...methods,
    onSubmit,
    imageUrl,
    youtubeUrl,
    content,
    setValue: methods.setValue,
    isLoading,
  };
};
