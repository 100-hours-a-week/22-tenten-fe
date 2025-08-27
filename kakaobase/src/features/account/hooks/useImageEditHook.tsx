import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import postToS3 from '@/entities/images/api/imageS3';
import { editProfile } from '@/features/account/api/editProfile';
import { useToast } from '@/shared/hooks/ToastContext';
import { useUserStore } from '@/entities/users/stores/userStore';
import { queryClient } from '@/shared/api/queryClient';
import { accountInfoQueries } from '../api/accountInfoQueries';
import { feedQueries } from '@/features/feeds/api/feedQueries';

export type imageData = { imageFile?: File };

export default function useImageEditHook() {
  const [loading, setLoading] = useState(false);
  const { imageUrl, setUserInfo } = useUserStore();
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);
  const { showToast } = useToast();

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const methods = useForm<imageData>({
    resolver: async (...args) => {
      const [{ z }, { zodResolver }, { imageSchema }] = await Promise.all([
        import('zod'),
        import('@hookform/resolvers/zod'),
        import('@/entities/images/schemas/imageSchema'),
      ]);
      const schema = z.object({ imageFile: imageSchema });
      return zodResolver(schema)(...args);
    },
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      imageFile: undefined,
    },
  });

  const onSubmit = async (data: imageData) => {
    try {
      setLoading(true);
      let imageUrl = '';
      if (data.imageFile) {
        imageUrl = await postToS3(data.imageFile, 'profile_image');
      }
      setPreviewUrl(imageUrl);
      setUserInfo({ imageUrl: imageUrl });

      await editProfile({ imageUrl });
      queryClient.invalidateQueries({ queryKey: accountInfoQueries.all() });
      queryClient.invalidateQueries({ queryKey: feedQueries.all() });
      showToast('프로필 이미지 저장 완료! ✌️');
    } catch (e: any) {
      if (e.response?.data.error === 'unauthorized') {
        showToast('로그인이 필요합니다. 😭');
      } else {
        showToast('프로필 이미지 업로드 실패! 잠시 후 다시 시도해 주세요. 😭');
      }
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading, ...methods, previewUrl };
}
