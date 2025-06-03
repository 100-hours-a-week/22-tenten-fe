import { profileImageSchema } from '@/schemas/profileImageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useTokenCheck from '../user/useTokenCheckHook';
import { useEffect, useState } from 'react';
import postToS3 from '@/apis/imageS3';
import editProfile from '@/apis/editProfile';
import { refreshToken } from '@/apis/login';

export type imageData = z.infer<typeof profileImageSchema>;

export default function useImageEditHook() {
  const { checkUnauthorized } = useTokenCheck();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    checkUnauthorized();
    setPreviewUrl(localStorage.getItem('profile'));
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
    checkUnauthorized();

    try {
      setLoading(true);
      let imageUrl = '';
      if (data.imageFile) {
        imageUrl = await postToS3(data.imageFile, 'profile_image');
      } //이미지 잘 옴

      setPreviewUrl(imageUrl);
      console.log('미리보기 이미지 수정 완료');
      localStorage.setItem('profile', imageUrl);
      console.log('로컬 스토리지에 프로필 저장 완료');

      await editProfile({ imageUrl }); //이거 지금 안 됨
      alert('프로필 이미지 저장 완료');
    } catch (e: any) {
      console.log('이미지 등록 안 됨', e.response);
      methods.setError('imageFile', {
        message: '프로필 이미지 저장 실패',
      });
      if (e.response?.data.error === 'unauthorized') {
        //로그인 했는데 이거 뜸
        refreshToken();
      } else {
        alert(
          '프로필 이미지 업로드 실패 : 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading, ...methods, previewUrl };
}
