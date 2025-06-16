import { profileImageSchema } from '@/schemas/profileImageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import postToS3 from '@/apis/imageS3';
import { editProfile } from '@/apis/editProfile';
import { useToast } from '@/app/ToastContext';
import { useUserStore } from '@/stores/userStore';

export type imageData = z.infer<typeof profileImageSchema>;

export default function useImageEditHook() {
  const [loading, setLoading] = useState(false);
  const { imageUrl, setUserInfo } = useUserStore();
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);
  const { showToast } = useToast();

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, []);

  const methods = useForm<imageData>({
    resolver: zodResolver(profileImageSchema),
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
